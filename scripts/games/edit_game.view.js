/* On DOM load, listens for 'editGameLoader' to render a pre-filled game edit form based on the selected game ID. */
document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('editGameLoader', async (userAccount) => {
        if (!userAccount.id) return;

        const gameId = localStorage.getItem('gameToEdit');


        const game = await GamesService.getGameById(gameId);
        const team = await TeamsService.getTeamById(game.teamId);

        const leagues = await LeaguesService.getAllLeagues();

        if (!gameId || team === undefined) return navigateToRoute(___PAGES.games);

        const container = document.getElementById('gameEditor');

        container.innerHTML = `
            <div class="card p-4" style="background-color: #D0DDD7">
                <div class="mb-3">
                    <label class="form-label">Team</label>
                    <input type="text" class="form-control" value="${team.name}" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Rec League</label>
                    <input type="text" class="form-control" value="${leagues.find(l => l.id === team.recLeague)?.name}" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">League Level</label>
                    <input type="text" class="form-control" value="${team.leagueLevel}" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Game Time</label>
                    <input type="datetime-local" class="form-control" id="gameTimeInput" value="${new Date(game.gameTime).toISOString().slice(0, 16)}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Location</label>
                    <input type="text" class="form-control" id="gameLocationInput" value="${game.location}" placeholder="Enter game location">
                    <div id="locationSuggestions" class="list-group position-absolute w-100" style="z-index: 1000;"></div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Details</label>
                    <textarea class="form-control" id="gameDetailsInput" rows="3">${game.details}</textarea>
                </div>
                <button class="btn btn-custom" id="saveGameBtn">Save Changes</button>
                <button class="btn mt-2 btn-custom" id="cancelBtn">Cancel</button>
            </div>
        `;

        const gameTimeInput = document.getElementById('gameTimeInput');
        const gameLocationInput = document.getElementById('gameLocationInput');
        const locationSuggestions = document.getElementById('locationSuggestions');
        const gameDetailsInput = document.getElementById('gameDetailsInput');
        const saveGameBtn = document.getElementById('saveGameBtn');
        const cancelBtn = document.getElementById('cancelBtn');

        // Geoapify Autocomplete
        const GEOAPIFY_API_KEY = '7c829fa05d8f445391d6bccc7bba73c2';

        gameLocationInput.addEventListener('input', async () => {
            const query = gameLocationInput.value;
            if (query.length < 3) {
                locationSuggestions.innerHTML = '';
                return;
            }

            const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${GEOAPIFY_API_KEY}`);
            const data = await response.json();

            locationSuggestions.innerHTML = data.features.map(feature => `
                <button type="button" class="list-group-item list-group-item-action">
                    ${feature.properties.formatted}
                </button>
            `).join('');

            Array.from(locationSuggestions.children).forEach(item => {
                item.addEventListener('click', () => {
                    gameLocationInput.value = item.textContent.trim();
                    locationSuggestions.innerHTML = '';
                });
            });
        });

        document.addEventListener('click', (e) => {
            if (!gameLocationInput.contains(e.target)) {
                locationSuggestions.innerHTML = '';
            }
        });

        // Adding event listener upon clicking the save game button.
        saveGameBtn.addEventListener('click', async () => {
            const updatedData = {
                gameTime: new Date(gameTimeInput.value).toISOString(),
                location: gameLocationInput.value,
                details: gameDetailsInput.value,
            };

            try {
                await GamesService.updateGame(gameId, updatedData);

                const allSubs = [...(game.subs || []), ...(game.acceptedSubs || [])];

                for (const subId of allSubs) {
                    await NotificationService.createNotification({
                        id: '',
                        title: `Game details updated for ${toTitleCase(team.name)} (${humanizeDateTime(new Date(updatedData.gameTime))})`,
                        body: `The time, location, or details of your game with ${toTitleCase(team.name)} may have changed.`,
                        sensitivity: 2,
                        action: 'Games',
                        actionData: game.id,
                        userIds: [subId]
                    });
                }

                alert('Game updated and notifications sent.');
                navigateToRoute(___PAGES.gameDetails);
            } catch (err) {

                alert('Failed to update game. Please try again.');
            }
        });

        cancelBtn.addEventListener('click', () => {
            navigateToRoute(___PAGES.gameDetails);
        });
    });
});
