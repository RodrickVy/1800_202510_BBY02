document.addEventListener("DOMContentLoaded",async (e)=>{
  

Account.addListener('leauguesPages', async (user)=>{
    const allLeagues = await LeaguesService.getAllLeagues();

    let currentLeague;

    console.log(JSON.stringify(user) +" User data");

    allLeagues.forEach((league)=>{

        if(league.code === user.league){
           
        loadTemplate('userLeaguesContainer', `
            <div id='${league.code}_card'>
             <div class="card py-2 mx-2" style="width: 18rem">
             <div class="card-body">
                 <h5 class="card-title">${league.name}</h5><br>
                 <p class="card-subtitle">${user.city}</p>
                 <br/>
                 <p class="card-text">
                    ${toTitleCase(user.skillLevel)}
                 </p>
       
             </div>
         </div>
            </div>
               `);
        }

    })

    if(currentLeague === null){
        loadText('userLeaguesContainer',"No Leagues Selected. ");
    }

});

});