document.addEventListener("DOMContentLoaded", async (e) => {

    Account.addListener('leauguesPages', async (user) => {
        const allLeagues = await LeaguesService.getAllLeagues();

        let currentLeague;

        console.log(JSON.stringify(user) + " User data");

        allLeagues.forEach((league) => {

            if (league.id === user.league) {

                loadTemplate('userLeaguesContainer', `
                    <div id='${league.id}_card' class="d-flex justify-content-center">
                        <div class="card py-2 mx-2 card-custom" style="width: 12rem;">
                            <div class="card-body p-2 text-center">
                                <h5 class="card-title">${league.name}</h5>
                                <p class="card-text">
                                     ${toTitleCase(user.skillLevel)}
                                </p>
                            </div>
                        </div>
                    </div>
                `);
                ;
            }
        })

        if (currentLeague === null) {
            loadText('userLeaguesContainer', "No Leagues Selected. ");
        }

    });

});