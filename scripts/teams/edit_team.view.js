document.addEventListener('DOMContentLoaded', async () => {

    Account.addListener('teams', async (user) => {
        await TeamsService.getAllTeams();
        const teamName = document.getElementById("teamName");
        const leagueSelect = document.getElementById("leagueSelect");
        const teamDescription = document.getElementById("teamDescription");
        const levelInLeague = document.getElementById("levelInLeague");
        const editTeamBtn = document.getElementById("updateTeamBtn");
        const teamBanner = document.getElementById("teamBanner");
        const teamBannerInput = document.getElementById("teamBannerInput");
        const editTeam = localStorage.getItem('teamToEdit');
        const leagues = await LeaguesService.getAllLeagues();



        const teamToEdit = TeamsService.userOwnedTeams.find((team) => team.id === editTeam);
        console.log(teamToEdit);
        if (teamToEdit !== undefined) {
            let teamBannerUrl = teamToEdit.teamBanner;
            teamBanner.src = teamBannerUrl;
            function updateLeagueSelection() {
                const isInitialLoad = leagueSelect.value === 'league1';
                if (isInitialLoad) {
                    let leaguesAsOptions = '';
                    leagues.forEach(league => {
                        leaguesAsOptions += `<option value="${league.id}">${league.name}</option>`;
                    })
                    loadTemplate('leagueSelect', leaguesAsOptions);
                    loadValue('leagueSelect', teamToEdit.recLeague);
                }
                let leagueLevelOptions = '';
                leagues.forEach(league => {

                    if (leagueSelect.value === league.id) {
                        league.level.forEach(level => {
                            leagueLevelOptions += `<option value="${level}" >${level}</option>`;
                        })
                    }
                })
                function leagueSelected() {
                    return leagues.find((league) => league.id === leagueSelect.value);
                }
                loadTemplate('levelInLeague', leagueLevelOptions);
                loadValue('levelInLeague', leagueSelected().level[0]);
                if (isInitialLoad) {
                    loadValue('levelInLeague', teamToEdit.leagueLevel);
                } else {
                    loadValue('levelInLeague', leagueSelected().level[0]);
                }
                console.log(leagueLevelOptions)
                console.log(levelInLeague.value);
            }

            updateLeagueSelection();
            leagueSelect.addEventListener('change', (event) => {
                updateLeagueSelection();
            });

            loadValue('teamName', teamToEdit.name);
            loadValue('teamDescription', teamToEdit.description);

            editTeamBtn.addEventListener('click', (event) => {
                TeamsService.updateTeam(teamToEdit.id, {
                    name: teamName.value,
                    description: teamDescription.value,
                    leagueLevel: levelInLeague.value,
                    recLeague: leagueSelect.value,
                    teamBanner: teamBannerUrl < 1 ? DFEAULTS.teamBanner : teamBannerUrl,
                }).then(() => {
                    localStorage.setItem('teamToEdit', '');
                    navigateToRoute(___PAGES.teams);
                });

            });
            teamBannerInput.addEventListener('change', async (event) => {

                const file = event.target.files[0];
                const data = await StorageService.uploadMedia(file, user.uid + "_team_" + teamToEdit.id, 'media');
                TeamsService.updateTeam(teamToEdit.id, {
                    name: teamName.value,
                    description: teamDescription.value,
                    leagueLevel: levelInLeague.value,
                    recLeague: leagueSelect.value,
                    teamBanner: data.downloadUrl,

                }).then(() => {
                    teamBannerUrl = data.downloadUrl;
                    teamBanner.src = teamBannerUrl;
                });
            })
        } else {
            navigateToRoute(___PAGES.teams);
        }

    });

});