// Event listener for DOMContentLoaded to handle leagues pages and show selected leagues
document.addEventListener("DOMContentLoaded", async (e) => {

    Account.addListener('leauguesPages', async (user) => {
        const allLeagues = await LeaguesService.getAllLeagues();
        let currentLeague;

        if (currentLeague === null) {
            loadText('userLeaguesContainer', "No Leagues Selected. ");
        }
    });
});