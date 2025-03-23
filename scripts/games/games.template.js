document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('gamesLoader', async (userAccount) => {
        if (!userAccount.id) return;

        const games = [...((await GamesService.loadAllGames()) || []),{
            "id": "game12345",
            "captainId": "user98765",
            "teamId": "team5678",
            "gameTime": "2025-04-05T15:30:00Z",
            "location": "Central Park Soccer Field, New York, NY",
            "details": "Friendly match. Please arrive 15 minutes early.",
            "subs": ["user1122", "user3344"],
            "acceptedSubs": ["user3344"],
            "played": false,
            "recLeague": "league001",
            "leagueLevel": "Intermediate"
        }
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
            const leagueImage = `${league.id}`;

            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="game-tile" style="display: flex; margin: 10px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor: pointer;">
                    <img src="${leagueImage}" alt="${league.id}" style="height: 100%; width: 80px; object-fit: cover; margin-right: 10px;">
                    <div style="display: flex; flex-direction: column;">
                        <span style="font-weight: bold; font-size: 18px;">${game.details}</span>
                        <span>${new Date(game.gameTime).toLocaleString()}</span>
                        <span>Team ID: ${game.teamId}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                localStorage.setItem("gameToView", game.id);
                window.location.href = './gameDetails.html';
            });

            container.appendChild(card);
        };

        const renderGamesSection = async (title, gamesArray) => {
            const sectionTitle = document.createElement('h2');
            sectionTitle.textContent = title;
            container.appendChild(sectionTitle);

            for (const game of gamesArray) {
                await renderGameCard(game);
            }
        };

        await renderGamesSection('Games This Week', gamesThisWeek);
        await renderGamesSection('Upcoming Games', upcomingGames);
    });
});
