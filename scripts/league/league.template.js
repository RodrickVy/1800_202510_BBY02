document.addEventListener('DOMContentLoaded', async () =>  {

   const leagues = await LeaguesService.getAllLeagues();
   let allLeagues = '';
   leagues.forEach((league) => {
       allLeagues +=   `
           <div class="card py-2 mx-2" style="width: 18rem">
        <img class="card-image card-img-top" src="images/${league.code}.jpg" alt="League Image"/>
        <div class="card-body">
            <h5 class="card-title">${league.name}</h5>
             <p class="card-subtitle">${league.city}</p>
             <br>
            <a class="card-url">${league.url}</a>
            <br/>
            <p class="card-text">
               ${league.details}
            </p>
            <button class="btn btn-primary card-href" onclick="saveLeagueDocumentIDAndRedirect()">Select</button>
        </div>
    </div>`;
   });

   loadTemplate('leaguesTemplate',allLeagues);
})