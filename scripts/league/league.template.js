document.addEventListener('DOMContentLoaded', async () => {

   const leagues = await LeaguesService.getAllLeagues();
   let allLeagues = '<br><br>';
   leagues.forEach((league) => {
      console.log(___PAGES.eachLeague + " League page");
      allLeagues += `

          <div id='${league.id}_card' class="rec_card">
      
           <div class="rec_card_img_holder">    <img class=" rec_card_img " src="${league.logo}" alt="League Image"/></div>
       
           <div class="rec_card_body">
               <h5 class="card-title">${league.name}</h5>
               <a class="card-url" href="${league.url}" target="_blank">Visit Website</a>
               <br/>
               <p class="card-text">
                  ${league.details}
               </p>
           </div>
     
          </div>
       `;
   });

   loadTemplate('leaguesTemplate', allLeagues);

   leagues.forEach((league) => {
      listenToIfExists(league.id + "_card", "click", (e) => {
         localStorage.setItem("query-league", league.id);
         navigateToRoute(___PAGES.games);
      })
   })

})