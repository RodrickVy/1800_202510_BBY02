document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('gameCreationLoader', async (userAccount) => {
        if (!userAccount.id) return;

        const teams = await TeamsService.getAllTeams();
        const userTeams = TeamsService.userOwnedTeams;
        const leagues = await LeaguesService.getAllLeagues();

        const formContainer = document.getElementById('createGameLoader');

        formContainer.innerHTML = `
            <div class="card p-4">
                <h3>Create New Game</h3>
                <div class="mb-3">
                    <label for="teamSelect" class="form-label">Select Your Team</label>
                    <select class="form-select" id="teamSelect">
                        <option value="">Choose your team</option>
                        ${userTeams.map(team => `<option value="${team.id}" data-rec-league="${team.recLeagueId}" data-league-level="${team.leagueLevel}">${team.name}</option>`).join('')}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="recLeagueSelect" class="form-label">Recreational League</label>
                    <select class="form-select" id="recLeagueSelect" disabled>
                        ${leagues.map(league => `<option value="${league.id}">${league.name}</option>`).join('')}
                    </select>
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
                </div>
                <div class="mb-3">
                    <label for="gameDetailsInput" class="form-label">Details</label>
                    <textarea class="form-control" id="gameDetailsInput" rows="3"></textarea>
                </div>
                <button class="btn btn-primary" id="createGameBtn">Create Game</button>
            </div>
        `;

        const teamSelect = document.getElementById('teamSelect');
        const recLeagueSelect = document.getElementById('recLeagueSelect');
        const leagueLevelInput = document.getElementById('leagueLevelInput');
        const createGameBtn = document.getElementById('createGameBtn');

        teamSelect.addEventListener('change', () => {
            const selectedOption = teamSelect.options[teamSelect.selectedIndex];
            const recLeagueId = selectedOption.getAttribute('data-rec-league');
            const leagueLevel = selectedOption.getAttribute('data-league-level');

            recLeagueSelect.value = recLeagueId;
            leagueLevelInput.value = leagueLevel;
        });

        createGameBtn.addEventListener('click', async () => {
            const gameId = generateUniqueId();

            const gameData = {
                id: gameId,
                captainId: userAccount.id,
                teamId: teamSelect.value,
                recLeague: recLeagueSelect.value,
                leagueLevel: leagueLevelInput.value,
                gameTime: document.getElementById('gameTimeInput').value,
                location: document.getElementById('gameLocationInput').value,
                details: document.getElementById('gameDetailsInput').value,
                subs: [],
                acceptedSubs: [],
                played: false,
            };

            try {
                await GamesService.createGame(gameData);
                alert('Game created successfully!');
                window.location.href = './games.html';
            } catch (error) {
                console.error('Error creating game:', error);
                alert('Error creating game, please try again.');
            }
        });

        // Initialize maps API autocomplete for location (Optional: Include your maps API script)
        const gameLocationInput = document.getElementById('gameLocationInput');
        if (typeof google !== 'undefined') {
            const autocomplete = new google.maps.places.Autocomplete(gameLocationInput);
        }
    });
});
