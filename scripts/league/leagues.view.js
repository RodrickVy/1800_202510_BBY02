document.addEventListener("DOMContentLoaded", async (e) => {

    Account.addListener('leauguesPages', async (user) => {
        const allLeagues = await LeaguesService.getAllLeagues();

        let currentLeague;

        console.log(JSON.stringify(user) + " User data");


        if (currentLeague === null) {
            loadText('userLeaguesContainer', "No Leagues Selected. ");
        }

    });

});