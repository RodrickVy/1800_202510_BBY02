/* On DOM load, listens for 'gameCreationLoader' to render the game creation form with user's teams and leagues. */
document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('gameCreationLoader', async (userAccount) => {
        if (!userAccount.id) return;

        const teams = await TeamsService.getAllTeams();
        const userTeams = TeamsService.userOwnedTeams;
        const leagues = await LeaguesService.getAllLeagues();

        const formContainer = document.getElementById('createGameContainer');

        formContainer.innerHTML = `
            <div class="card p-4" style="background-color: #D0DDD7">
                <div class="mb-3">
                    <label for="teamSelect" class="form-label">Select Your Team</label>
                    <select class="form-select" id="teamSelect">
                        <option value="">Choose Your Team</option>
                        ${userTeams.map(team => `<option value="${team.id}" data-rec-league="${team.recLeague}" data-league-level="${team.leagueLevel}">${toTitleCase(team.name)}</option>`).join('')}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="recLeagueSelect" class="form-label">Recreational League</label>
                    <input class="form-select" id="recLeagueSelect" disabled>
                </div>
                <div class="mb-3">
                    <label for="leagueLevelInput" class="form-label">League Level</label>
                    <input type="text" class="form-control" id="leagueLevelInput" disabled>
                </div>
                <div class="mb-3">
                    <label for="gameTimeInput" class="form-label">Game Time</label>
                    <input type="datetime-local" class="form-control" id="gameTimeInput">
                </div>
                <div class="mb-3">
                    <label for="gameLocationInput" class="form-label">Location</label>
                    <input type="text" class="form-control" id="gameLocationInput" placeholder="Enter game location">
                    <div id="locationSuggestions" class="list-group position-absolute w-100" style="z-index: 1000;"></div>
                </div>
                <div class="mb-3">
                    <label for="gameDetailsInput" class="form-label">Details</label>
                    <textarea class="form-control" id="gameDetailsInput" rows="3"></textarea>
                </div>
                <button class="btn btn-custom" id="createGameBtn">Create Game</button>
                <br>
                 <button class="btn btn-custom" id="cancelBtn">Cancel</button>
            </div>
        `;

        const teamSelect = document.getElementById('teamSelect');
        const recLeagueSelect = document.getElementById('recLeagueSelect');
        const leagueLevelInput = document.getElementById('leagueLevelInput');
        const createGameBtn = document.getElementById('createGameBtn');
        const gameTimeInput = document.getElementById('gameTimeInput');
        const gameLocationInput = document.getElementById('gameLocationInput');
        const locationSuggestions = document.getElementById('locationSuggestions');
        const gameDetailsInput = document.getElementById('gameDetailsInput');
        const cancelBtn = document.getElementById('cancelBtn');

        teamSelect.addEventListener('change', () => {
            const selectedOption = teamSelect.options[teamSelect.selectedIndex];
            const recLeagueId = selectedOption.getAttribute('data-rec-league');
            const leagueLevel = selectedOption.getAttribute('data-league-level');

            const leagueFromId = leagues.find((_league) => _league.id === recLeagueId);
            recLeagueSelect.value =  toTitleCase(leagueFromId.name);
            leagueLevelInput.value  = toTitleCase(leagueLevel);
        });

        // Initialize maps API autocomplete for location (Optional: Include your maps API script)
        // Location autocomplete implementation using Geoapify API

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

        // Upon click, event listener for the create a game button. 
        createGameBtn.addEventListener('click', async () => {
            const gameId = generateUniqueId();

            const selectedOption = teamSelect.options[teamSelect.selectedIndex];
            const recLeagueId = selectedOption.getAttribute('data-rec-league');
            const leagueLevel = selectedOption.getAttribute('data-league-level');
            const gameData = {
                id: gameId,
                captainId: userAccount.id,
                teamId: teamSelect.value,
                recLeague: recLeagueId,
                leagueLevel: leagueLevel,
                gameTime: (new Date(gameTimeInput.value)).toISOString(),
                location: gameLocationInput.value,
                details: gameDetailsInput.value,
                subs: [],
                acceptedSubs: [],
                played: false,
            };

            try {
                await GamesService.createGame(gameId, gameData);
                navigateToRoute(___PAGES.games)
            } catch (error) {

                alert('Error creating game, please try again.');
            }
        });

        cancelBtn.addEventListener('click', () => {
            navigateToRoute(___PAGES.games);
        })

    });
});
