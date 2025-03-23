document.addEventListener('DOMContentLoaded', async () => {

    Account.addListener('teams', async (user) => {
        await TeamsService.getAllTeams();
        const teamName = document.getElementById("teamName");
        const leagueSelect = document.getElementById("leagueSelect");
        const teamDescription = document.getElementById("teamDescription");
        const levelInLeague = document.getElementById("levelInLeague");
        const createTeamBtn = document.getElementById("createTeamBtn");
        const editTeam = localStorage.getItem('teamToEdit');
        const leagues = await LeaguesService.getAllLeagues();


        let leaguesAsOptions = '';

        leagues.forEach(league => {
            leaguesAsOptions += '<option value="' + league.id + '">' + league.name + '</option>';
        })

        loadTemplate('leagueSelect', leaguesAsOptions);

        let leagueLevelOptions = '';
        leagues[0].level.forEach(level => {
            leagueLevelOptions += '<option value="' + level + '">' + level + '</option>';
        })

        loadTemplate('levelInLeague', leagueLevelOptions);
        leagueSelect.addEventListener('change', (event) => {
            leagueLevelOptions = '';
            leagues.forEach(league => {


                if (league.id === leagueSelect.value) {
                    console.log(league.id + "===" + leagueSelect.value + " " + league.level[0])

                    league.level.forEach(level => {
                        leagueLevelOptions += '<option value="' + level + '">' + level + '</option>';
                    })

                    loadTemplate('levelInLeague', leagueLevelOptions);
                }
            });

        });

        createTeamBtn.addEventListener('click', (event) => {
            console.log("Create button clicked")
            TeamsService.createTeam({
                id: generateUniqueId(),
                name: teamName.value,
                description: teamDescription.value,
                skillLevel: levelInLeague.value,
                recLeague: leagueSelect.value,
                games: [],
                creatorId: user.id,
                teamBoard: [],
                teamTrophies: [],

            }).then((_) => {
                navigateToRoute(___PAGES.teams);
            })
        });

    });

});