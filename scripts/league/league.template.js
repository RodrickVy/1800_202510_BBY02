document.addEventListener('DOMContentLoaded', async () =>  {

   const leagues = await LeaguesService.getAllLeagues();
   let allLeagues = '';
   leagues.forEach((league) => {
    console.log(___PAGES.eachLeague +"League page");
       allLeagues +=   `
       <div id='${league.code}_card'>
        <div class="card py-2 mx-2" style="width: 18rem">
        <img class="card-image card-img-top" src="images/${league.code}.jpg" alt="League Image"/>
        <div class="card-body">
            <h5 class="card-title">${league.name}</h5><br>
            <a class="card-url">${league.url}</a>
            <br/>
            <p class="card-text">
               ${league.details}
            </p>
  
        </div>
    </div>
       </div>
          `;


   });

   loadTemplate('leaguesTemplate',allLeagues);


   leagues.forEach((league)=>{
    listenToIfExists(league.code+"_card","click" ,(e)=>{
        localStorage.setItem("leagueToView",league.code);
        navigateToRoute(___PAGES.eachLeague);
      })
   })

})