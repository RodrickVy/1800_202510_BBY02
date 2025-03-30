document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('gamesLoader', async (userAccount) => {
        if (!userAccount.id) return;
        await TeamsService.getAllTeams();
        const games = [...((await GamesService.loadAllGames()) || []),
        ];


        console.log(games)
        const sortedGames = games.sort((a, b) => new Date(a.gameTime) - new Date(b.gameTime));

        const now = new Date();
        const endOfWeek = new Date();
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));

        const gamesThisWeek = sortedGames.filter(game => new Date(game.gameTime) <= endOfWeek);
        const upcomingGames = sortedGames.filter(game => new Date(game.gameTime) > endOfWeek);

        const container = document.getElementById('gamesContainer');
        container.innerHTML = '';

        const renderGameCard = async (game) => {
            const league = await LeaguesService.getLeagueById(game.recLeague);
            const team = TeamsService.teams.filter((_team)=> game.teamId === _team.id)[0];
            console.log();
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="game-tile" style="display: flex; margin: 10px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor: pointer;">
                    <img src="${league.logo}" alt="${league.name}" style="height: 100%; width: 80px; object-fit: cover; margin-right: 10px;">
                    <div style="display: flex; flex-direction: column;">
                        <span style="font-weight: bold; font-size: 18px;">${game.details}</span>
                        <span>${new Date(game.gameTime).toLocaleString()}</span>
                        <span>Team: ${team.name}</span>
                        <span>League: ${league.name}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                localStorage.setItem("gameToView", game.id);
                navigateToRoute(___PAGES.gameDetails)
            });

            container.appendChild(card);
        };

        const renderGamesSection = async (title, gamesArray) => {
            const sectionTitle = document.createElement('h4');
            sectionTitle.textContent = title;
            container.appendChild(sectionTitle);

            for (const game of gamesArray) {
                const gameDate = new Date(game.gameTime);
                const today =  new Date(new Date().getTime() + 60 * 60 * 1000);
                if(gameDate > today){
                    await renderGameCard(game);
                }
            }
        };

        await renderGamesSection('Games This Week', gamesThisWeek);
        await renderGamesSection('Upcoming Games', upcomingGames);


        listenToIfExists('addGameBtn', 'click',(e)=>{
            navigateToRoute(___PAGES.addGame);
        });
    });
});
