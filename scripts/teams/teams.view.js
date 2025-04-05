document.addEventListener('DOMContentLoaded', async () => {
    Account.addListener('teams', async (user) => {
        await TeamsService.getAllTeams();
        localStorage.setItem('teamToEdit', '');

        let teamsHTML = "";
        let myTeamsHTML = "";

        for (const team of TeamsService.teams) {

            const allLeagues = await LeaguesService.getAllLeagues();
            const league = allLeagues.filter((_league) => _league.id !== team.recLeague)[0];
            if (team.creatorId === user.id) {
                myTeamsHTML += `
                <div  class="rec_card"  >
                <div class="rec_card_img_holder">
                 <img class="rec_card_img"  src="${team.teamBanner}" alt="Card image cap">
                 </div>
                  <div class="rec_card_body">
                  <div >${toTitleCase(team.name)}</div>
                  
                    <h5  >${league.name}</h5>
                    <p class="card-text">${team.description}</p>
                    <button id="${team.id}_edit" class="btn btn-sm btn-custom" type="button">Edit</button>
                
                </div>
                </div>
                       `;
            } else {
                teamsHTML += `
                <div class="rec_card"  id="${team.id}_view">
                <div class="rec_card_img_holder">
                 <img class="rec_card_img"  src="${team.teamBanner}" alt="Card image cap">
                 </div>
                  <div class="rec_card_body">
                  <div>${toTitleCase(team.name)}</div>
                  
                    <h5 >${league.name}</h5>
                    <p class="card-text">${team.description}</p>
                
                </div>
                </div>
               `;
            }

        }

        if (TeamsService.userOwnedTeams.length === 0) {
            myTeamsHTML = '<h6 class=" text-center"> <br><br>You haven\'t created any teams click the add team button to create one</h6>'
        }
        loadTemplate('teamsContainer', `${teamsHTML}`);
        loadTemplate('myTeamsContainer', `${myTeamsHTML}`);
        TeamsService.teams.forEach(team => {
            listenToIfExists(`${team.id}_edit`, 'click', (e) => {
                localStorage.setItem('teamToEdit', team.id);
                navigateToRoute(___PAGES.editTeam)
            });

            listenToIfExists(`${team.id}_view`, 'click', (e) => {
                localStorage.setItem('teamToView', team.id);
                navigateToRoute(___PAGES.teamDetails)
            })
        })
    })
});
