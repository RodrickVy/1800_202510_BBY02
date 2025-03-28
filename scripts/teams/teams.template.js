document.addEventListener('DOMContentLoaded', async () => {
   Account.addListener('teams',async (user)=>{
       await TeamsService.getAllTeams();
       localStorage.setItem('teamToEdit', '');

       let teamsHTML = "<br>";
       let myTeamsHTML = "<br>";

       for (const team of TeamsService.teams) {

           const allLeagues = await LeaguesService.getAllLeagues();
           const league = allLeagues.filter((_league)=> _league.id !== team.recLeague)[0];
           if (team.creatorId === user.id) {
               myTeamsHTML += `
                <div id="${team.id}_view" class="card bg-light m-2" style="max-width: 18rem;">
                 <img class="card-img-top" width="100%" src="${team.teamBanner}" alt="Card image cap">
                  <div class="card-header">${team.name}</div>
                  <div class="card-body">
                    <h5 class="card-title">${league.name}</h5>
                    <p class="card-text">${team.description}</p>
                    <button id="${team.id}_edit" class="btn btn-sm btn-custom" type="button">Edit</button>
                  </div>
                </div>
                       `;
           }else{
               teamsHTML += `<div id="${team.id}_view" class="card bg-light m-2" style="max-width: 18rem;">
                 <img class="card-img-top" width="100%" src="${team.teamBanner}" alt="Card image cap">
                  <div class="card-header">${team.name}</div>
                  <div class="card-body">
                    <h5 class="card-title">${league.name}</h5>
                    <p class="card-text">${team.description}</p>
                  </div>
                </div>`;
           }

       }

       if(TeamsService.userOwnedTeams.length === 0){
           myTeamsHTML = '<h6 class=" text-center"> You haven\'t created any teams click the add team button to create one</h6>'
       }
       loadTemplate('teamsContainer',`<div class="row">${teamsHTML}</div>`);
       loadTemplate('myTeamsContainer',`<div class="row">${myTeamsHTML}</div>`);
       TeamsService.teams.forEach(team => {
           listenToIfExists(`${team.id}_edit`,'click', (e) => {
               localStorage.setItem('teamToEdit', team.id);
               navigateToRoute(___PAGES.editTeam)
           });

           listenToIfExists(`${team.id}_view`,'click', (e) => {
               localStorage.setItem('teamToView', team.id);
               navigateToRoute(___PAGES.teamDetails)
           })
       })
   })
});
