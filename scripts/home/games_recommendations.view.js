document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('recommendGameLoader', async (userAccount) => {
        if (!userAccount.id) return;

        await TeamsService.getAllTeams();
        const container = document.getElementById('recommendedGamesContainer');
        container.innerHTML = '';

        const recommendedGames = await GamesService.getRecommendedGames(userAccount.id);

        if (!recommendedGames || recommendedGames.length === 0) {
            container.innerHTML = '<p class="text-muted m-2 text-sm-center">No recommended games at the moment.</p>';
            return;
        }

        for (const game of recommendedGames) {
            const league = await LeaguesService.getLeagueById(game.recLeague);
            const team = TeamsService.teams.find((_team) => game.teamId === _team.id);

            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="game-tile" style="display: flex; margin: 10px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor: pointer;">
                    <img src="${league.logo}" alt="${league.name}" style="height: 100%; width: 80px; object-fit: cover; margin-right: 10px;">
                    <div style="display: flex; flex-direction: column;">
                        <span style="font-weight: bold; font-size: 18px;">${game.details}</span>
                        <span>${humanizeDateTime(new Date(game.gameTime))}</span>
                        <span>Team: ${team.name}</span>
                        <span>League: ${league.name}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                localStorage.setItem("gameToView", game.id);
                navigateToRoute(___PAGES.gameDetails);
            });

            container.appendChild(card);
        }

        const hotTeamsContainer = document.getElementById('hotTeamsContainer');
        const loadHotTeams =  async () => {
            const allGames = await GamesService.loadAllGames();
            const teamGameCounts = {};

            allGames.forEach(game => {
                if (!teamGameCounts[game.teamId]) teamGameCounts[game.teamId] = 0;
                teamGameCounts[game.teamId]++;
            });

            const sortedTeamIds = Object.entries(teamGameCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(entry => entry[0]);

            for (const teamId of sortedTeamIds) {
                const team = TeamsService.teams.find(t => t.id === teamId);
                const league = await LeaguesService.getLeagueById(team.recLeague)
                if (team) {
                    const card = document.createElement('div');
                    card.className = 'team-card';
                    card.innerHTML = `
                        <div class="team-tile" style="display: flex; align-items: center; margin: 10px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor: pointer;">
                            <img src="${team.teamBanner}" alt="${team.name}" style="height: 60px; width: 60px; object-fit: cover; border-radius: 5px; margin-right: 15px;">
                            <div style="display: flex; flex-direction: column;">
                                <strong style="font-size: 18px;">${team.name}</strong>
                                <small class="text-muted">League: ${league.name}</small>
                                <small class="text-muted">League Level: ${team.leagueLevel}</small>
                            </div>
                        </div>
                    `;
                    card.addEventListener('click', () => {
                        localStorage.setItem("teamToView", team.id);
                        navigateToRoute(___PAGES.teamDetails);
                    });
                    hotTeamsContainer.appendChild(card);
                }
            }
        }

        await loadHotTeams();
    });
});