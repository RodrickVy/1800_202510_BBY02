document.addEventListener('DOMContentLoaded', async () => {

    Account.addListener('teams', async (user) => {
        await TeamsService.getAllTeams();
        const teamName = document.getElementById("teamName");
        const leagueSelect = document.getElementById("leagueSelect");
        const teamDescription = document.getElementById("teamDescription");
        const levelInLeague = document.getElementById("levelInLeague");
        const createTeamBtn = document.getElementById("createTeamBtn");
        const teamBanner = document.getElementById("teamBanner");
        const teamBannerInput = document.getElementById("teamBannerInput");
        const editTeam = localStorage.getItem('teamToEdit');
        const leagues = await LeaguesService.getAllLeagues();
        const gameId = generateUniqueId();
        let teamBannerUrl = '';
        let leaguesAsOptions = '';

        leagues.forEach(league => {
            leaguesAsOptions += `<option value="${league.id}">${league.name}</option>`;
        })

        loadTemplate('leagueSelect', leaguesAsOptions);

        let leagueLevelOptions = '';
        leagues[0].level.forEach(level => {
            leagueLevelOptions += `<option value="${level}">${level}</option>`;
        })

        loadTemplate('levelInLeague', leagueLevelOptions);
        leagueSelect.addEventListener('change', (event) => {
            leagueLevelOptions = '';
            leagues.forEach(league => {
                if (league.id === leagueSelect.value) {

                    league.level.forEach(level => {
                        leagueLevelOptions += `<option value="${level}">${level}</option>`;
                    })

                    loadTemplate('levelInLeague', leagueLevelOptions);
                }
            });

        });

        createTeamBtn.addEventListener('click', (event) => {
            TeamsService.createTeam({
                id: gameId,
                name: teamName.value,
                description: teamDescription.value,
                leagueLevel: levelInLeague.value,
                recLeague: leagueSelect.value,
                games: [],
                creatorId: user.id,
                teamBoard: [],
                teamTrophies: [],
                teamBanner: teamBannerUrl.length < 1 ? DFEAULTS.teamBanner : teamBannerUrl,

            }).then((_) => {
                navigateToRoute(___PAGES.teams);
            })
        });

        teamBannerInput.addEventListener('change', async (event) => {
            try {
                const data = await StorageService.uploadMedia((event.target.files[0]), user.uid + "_game_" + gameId, 'media');
                teamBannerUrl = data.downloadUrl;
                teamBanner.src = data.downloadUrl;
            } catch (error) {
                console.error(error);
            }

        });

    });

});