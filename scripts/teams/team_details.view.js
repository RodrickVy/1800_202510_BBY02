document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('teamDetailsLoader', async (userAccount) => {
        const teamId = localStorage.getItem('teamToView');
        if (!teamId) return navigateToRoute(___PAGES.teams);

        await TeamsService.getAllTeams();
        const team = TeamsService.teams.filter((_team) => _team.id === teamId)[0];

        if (!team) return navigateToRoute(___PAGES.teams);

        const league = await LeaguesService.getLeagueById(team.recLeague);
        const captain = await Account.loadUserData(team.creatorId);
        console.log(JSON.stringify(captain));
        const container = document.getElementById('teamDetailsContainer');

        container.innerHTML = `
            <div style="width:100%; height:6rem;overflow-clip: clip">
                <img src="${team.teamBanner}" alt="${team.name} banner" width="100%">
            </div>
            <div class="card p-4">
                <h2>${team.name}</h2>
                <p>${team.description || 'No description provided.'}</p>
                <div class="d-flex align-items-center my-3">
                    <img src="${league.logo}" alt="${league.name}" style="width: 60px; height: 60px; margin-right: 10px;">
                    <div>
                        <h5 class="mb-0">${league.name}</h5>
                        <small class="text-muted">Level: ${toTitleCase(team.leagueLevel)}</small>
                    </div>
                </div>
                  <h4>Team Captain</h4>
                    <div class="d-flex align-items-center">
                        <img src="${captain.profileUrl}" alt="${captain.name}" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 10px;">
                        <div>
                        <h5 class="mb-0">${captain.name}</h5>
                        <small class="text-muted">${captain.email}</small>
                    </div>
                </div>
                <h4 class="mt-4">Upcoming Games</h4>
                <div id="upcomingGames" class="list-group mb-4"></div>
            </div>
        `;

        async function loadUpcomingGames() {
            const allGames = await GamesService.getGamesByTeamId(teamId);
            const upcomingGames = allGames.filter(game => !game.played && new Date(game.gameTime) > new Date());

            const upcomingGamesContainer = document.getElementById('upcomingGames');
            if (upcomingGames.length === 0) {
                upcomingGamesContainer.innerHTML = '<p class="text-muted">No upcoming games scheduled.</p>';
                return;
            }

            upcomingGames.sort((a, b) => new Date(a.gameTime) - new Date(b.gameTime));
            upcomingGames.forEach(game => {
                upcomingGamesContainer.innerHTML += `
                    <div id="${game.id}_link" class="list-group-item d-flex align-items-center">
                        <img src="${team.teamBanner}" alt="${league.name}" style="width:40px;height:40px;margin-right:10px;">
                        <div>
                            <strong>${new Date(game.gameTime).toLocaleString()}</strong><br>
                            <small class="text-muted">${game.location}</small>
                        </div>
                    </div>
                `
            });

            upcomingGames.forEach(game => {
                listenToIfExists(`${game.id}_link`, 'click', (e) => {
                    localStorage.setItem('gameToView', game.id);
                    navigateToRoute(___PAGES.gameDetails);
                })
            });
        }

        await loadUpcomingGames();
    });
});