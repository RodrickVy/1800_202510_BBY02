document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('gamesLoader', async (userAccount) => {
        if (!userAccount.id) return;
        await TeamsService.getAllTeams();
        const allLeagues = await LeaguesService.getAllLeagues();
        const games = [...((await GamesService.loadAllGames()) || []),
        ];
        const queryLeague = localStorage.getItem('query-league');
        const queryTeam = localStorage.getItem('query-team');
        const querySkill = localStorage.getItem('query-skill');

        // Checks if filter is set up up storage if not we don't try to use the filter
        const filterIsSetUp = (queryFilter) => {

            return queryFilter !== undefined && queryFilter !== null && queryFilter.length > 3;
        }
        //  Checks if there is at least one filter setup
        const haveFilters = () => {
            return filterIsSetUp(queryLeague) || filterIsSetUp(queryTeam) || filterIsSetUp(queryTeam);
        }


        const setUpFilterChips = () => {

            let chips = '';
            if (filterIsSetUp(queryLeague)) {
                const _league = allLeagues.find((league) => league.id === queryLeague);
                chips += `<span id="query-league" class="badge bg-info text-dark">League : ${_league.name}   <i id="query-league-icon" style="cursor: pointer" class="fas fa-times m-2 gameQueryFilter "></i></span>`;
            }

            if (filterIsSetUp(queryTeam)) {
                const _team = TeamsService.teams.find((team) => team.id === queryTeam);
                chips += `<span id="query-team" class="badge  bg-info text-dark">Team : ${_team.name}  <i id="query-team-icon" style="cursor: pointer" class="fas fa-times m-2 gameQueryFilter "></i></span>`;
            }

            if (filterIsSetUp(querySkill)) {
                chips += `<span id="query-skill" class="badge  bg-info text-dark">Level : ${querySkill}  <i id="query-skill-icon" style="cursor: pointer" class="fas fa-times m-2 gameQueryFilter "></i></span>`;
            }

            loadTemplate('queryFilters', chips);
            $('#query-league-icon').click((e) => {
                localStorage.setItem('query-league', '');
                removeElement('query-league');
                reload();
            })
            $('#query-team-icon').click((e) => {
                localStorage.setItem('query-team', '');
                removeElement('query-team');
                reload();
            })
            $('#query-skill-icon').click((e) => {
                localStorage.setItem('query-skill', '');
                removeElement('query-skill');
                reload();
            })
        }


        function resetAllFilters() {
            localStorage.setItem('query-team', '');
            localStorage.setItem('query-league', '');
            localStorage.setItem('query-skill', '');
        }

        setUpFilterChips();


        // Checks if the page is loaded with a query in local storage
        const haveLeagueQuery = () => {
            return queryLeague !== undefined && queryLeague !== null && queryLeague.length > 3;
        }
        //  Checks the game against all the filters setup and returns true if the game passes
        const gamePassesFilters = (game) => {
            const leagueFilterSetup = filterIsSetUp(queryLeague);
            const skillFilterSetup = filterIsSetUp(querySkill);
            const teamFilterSetup = filterIsSetUp(queryTeam);


            const gameLeague = allLeagues.find((league) => league.id === game.recLeague);
            const gameTeam = TeamsService.teams.find((team) => team.id === game.teamId);
            console.log(`${leagueFilterSetup} && ${game.recLeague === queryLeague} || ${!leagueFilterSetup}`)
            return ((leagueFilterSetup && game.recLeague === queryLeague) || !leagueFilterSetup)
                && ((skillFilterSetup && gameTeam.leagueLevel === querySkill) || !skillFilterSetup)
                && ((teamFilterSetup && game.teamId === queryTeam) || !teamFilterSetup);


        }

        // Checks if game has already been played or not based on the date
        const gameNotPlayedYet = (game) => {
            const gameDate = new Date(game.gameTime);
            const today = new Date(new Date().getTime() + 60 * 60 * 1000);

            return gameDate > today;
        }


        const sortedGames = games.sort((a, b) => new Date(a.gameTime) - new Date(b.gameTime)).filter((game) => {
            return gameNotPlayedYet(game) && gamePassesFilters(game);
        });

        const now = new Date();
        const endOfWeek = new Date();
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));

        const gamesThisWeek = sortedGames.filter(game => new Date(game.gameTime) <= endOfWeek);
        const upcomingGames = sortedGames.filter(game => new Date(game.gameTime) > endOfWeek);

        const container = document.getElementById('gamesContainer');
        container.innerHTML = '';

        const renderGameCard = async (game) => {
            const league = await LeaguesService.getLeagueById(game.recLeague);
            const team = TeamsService.teams.filter((_team) => game.teamId === _team.id)[0];
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
                await renderGameCard(game);
            }
        };

        if (haveFilters()) {
            const league = allLeagues.filter((league) => league.id === queryLeague)[0];
            const allGames = [...gamesThisWeek, ...upcomingGames];

            await renderGamesSection(allGames.length + ' game/s matched. ', [...gamesThisWeek, ...upcomingGames]);


        } else {
            await renderGamesSection('Games This Week', gamesThisWeek);
            await renderGamesSection('Upcoming Games', upcomingGames);
        }


        listenToIfExists('addGameBtn', 'click', (e) => {
            navigateToRoute(___PAGES.addGame);
        });

        const upcoming_games = await GamesService.getUpcomingGames();

        console.log('upcoming games', upcoming_games);
        // Once filters have been shown they are reset , so on reload all the games can be displayed.
        resetAllFilters();
    });
});
