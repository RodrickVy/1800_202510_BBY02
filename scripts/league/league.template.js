document.addEventListener('DOMContentLoaded', async () => {

   const leagues = await LeaguesService.getAllLeagues();
   let allLeagues = '';
   leagues.forEach((league) => {
      console.log(___PAGES.eachLeague + " League page");
      allLeagues += `
          <div id='${league.id}_card' class="league-card">
           <div class="card py-2 mx-2 card-custom" style="width: 18rem">
           <img class="card-image card-img-top" src="${league.logo}" alt="League Image"/>
           <div class="card-body">
               <h5 class="card-title">${league.name}</h5>
               <a class="card-url" href="${league.url}" target="_blank">Visit Website</a>
               <br/>
               <p class="card-text">
                  ${league.details}
               </p>
           </div>
       </div>
          </div>
       `;
   });

   loadTemplate('leaguesTemplate', allLeagues);

   leagues.forEach((league) => {
      listenToIfExists(league.id + "_card", "click", (e) => {
         localStorage.setItem("leagueToView", league.id);
         navigateToRoute(___PAGES.games);
      })
   })

})