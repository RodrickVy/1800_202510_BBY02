document.addEventListener('DOMContentLoaded', async () => {

    Account.addListener('teams',async (user)=> {
        const teamName = document.getElementById("teamName");
        const leagueSelect = document.getElementById("leagueSelect");
        const teamDescription = document.getElementById("teamDescription");
        const levelInLeague = document.getElementById("levelInLeague");
        const createTeamBtn = document.getElementById("createTeamBtn");
        const editTeam = localStorage.getItem('teamToEdit');
        const leagues = await LeaguesService.getAllLeagues();

        if(editTeam.length > 1){
            const teams = await TeamsService.getAllTeams();
            teams.forEach(team=>{
                let leaguesAsOptions = '';


                let leagueLevelOptions = '';

                leagues.forEach(league => {
                    leaguesAsOptions += '<option value="' + league.code + '">' + league.name + '</option>';
                    if(team.recLeague === league.code){
                      league.level.forEach(level => {
                            leagueLevelOptions += '<option value="' + level + '">' + level + '</option>';
                        })
                    }
                })
                loadTemplate('leagueSelect', leaguesAsOptions);
                leagueSelect.addEventListener('change', (event) => {
                    leagueLevelOptions = '';
                    leagues.forEach(league => {


                        if (league.code === leagueSelect.value) {
                            console.log(league.code + "===" + leagueSelect.value + " " + league.level[0])

                            league.level.forEach(level => {
                                leagueLevelOptions += '<option value="' + level + '">' + level + '</option>';
                            })

                            loadTemplate('levelInLeague', leagueLevelOptions);
                        }
                    });

                });



                loadTemplate('levelInLeague', leagueLevelOptions);
                leagueSelect.addEventListener('change', (event) => {
                    leagueLevelOptions = '';
                    leagues.forEach(league => {


                        if (league.code === leagueSelect.value) {
                            console.log(league.code + "===" + leagueSelect.value + " " + league.level[0])

                            league.level.forEach(level => {
                                leagueLevelOptions += '<option value="' + level + '">' + level + '</option>';
                            })

                            loadTemplate('levelInLeague', leagueLevelOptions);
                        }
                    });

                });
                if(team.id === editTeam){
                    loadValue('teamName',team.name);
                    loadValue('leagueSelect',team.recLeague);
                    loadValue('levelInLeague',team.skillLevel);
                    loadValue('teamDescription', team.description);
                    loadText('createTeamBtn',"Update Team");
                }



                createTeamBtn.addEventListener('click', (event) => {
                    TeamsService.updateTeam(team.id,{
                        id: generateUniqueId(),
                        name: teamName.value,
                        description: teamDescription.value,
                        skillLevel: levelInLeague.value,
                        recLeague: leagueSelect.value,


                    });
                    localStorage.setItem('teamToEdit', '');
                    navigateToRoute(___PAGES.teams);
                });

            })
        }else{


            let leaguesAsOptions = '';

            leagues.forEach(league => {
                leaguesAsOptions += '<option value="' + league.code + '">' + league.name + '</option>';
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


                    if (league.code === leagueSelect.value) {
                        console.log(league.code + "===" + leagueSelect.value + " " + league.level[0])

                        league.level.forEach(level => {
                            leagueLevelOptions += '<option value="' + level + '">' + level + '</option>';
                        })

                        loadTemplate('levelInLeague', leagueLevelOptions);
                    }
                });

            });


            createTeamBtn.addEventListener('click', (event) => {
                TeamsService.createTeam({
                    id: generateUniqueId(),
                    name: teamName.value,
                    description: teamDescription.value,
                    skillLevel: levelInLeague.value,
                    recLeague: leagueSelect.value,
                    games: [],
                    creatorId:user.id,
                    teamBoard: [],
                    teamTrophies: [],

                });

                navigateToRoute(___PAGES.teams);

            });

        }





    });

});