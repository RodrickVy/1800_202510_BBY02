document.addEventListener('DOMContentLoaded', async () => {
   Account.addListener('teams',async (user)=>{
       const teams = await TeamsService.getAllTeams();
       localStorage.setItem('teamToEdit', '');

       let teamsHTML = "";
       let myTeamsHTML = "";
       teams.forEach(team => {

           if(team.creatorId === user.id) {
               console.log(team.creatorId  +"  = "+ Account.auth.currentUser.uid);
               myTeamsHTML += `
                    <div class="col-md-3 mb-3">
                        <div style="padding: 10px; box-shadow: none" class=" text-center shadow-sm">
                            <div  >
                                <h5 class="card-title">${team.name}</h5>
                                <p class="card-text">Skill Level: ${team.skillLevel || "Unknown"}</p>
                                <button id="${team.id}_edit" class="btn btn-secondary btn-sm" type="button"  >Edit</button>
                            </div>
                        </div>
                    </div>`;


           }
           teamsHTML += `
                    <div class="col-md-3 mb-3"  id="${team.id}_view">
                        <div style="padding: 10px; box-shadow: none" class=" text-center shadow-sm">
                            <div  >
                                <h5 class="card-title">${team.name}</h5>
                                <p class="card-text">${team.description || "Unknown"}</p>
                               
                                <p class="card-text">Skill Level: ${team.skillLevel || "Unknown"}</p>
                                <button class="btn btn-secondary btn-sm" type="button"  >More</button>
                            </div>
                        </div>
                    </div>`;
       });

       loadTemplate('teamsContainer',`<div class="row">${teamsHTML}</div>`);
       loadTemplate('myTeamsContainer',`<div class="row">${myTeamsHTML}</div>`);

       teams.forEach(team => {

           listenToIfExists(`${team.id}_edit`,'click', (e) => {
               localStorage.setItem('teamToEdit', team.id);
               navigateToRoute(___PAGES.addTeam)
           });

       })
   })
});
