document.addEventListener("DOMContentLoaded", async (e) => {

    const allLeagues = await LeaguesService.getAllLeagues();
    var leagueToViewCode = localStorage.getItem("leagueToView");
    let currentLeague;

    if (leagueToViewCode !== null) {
        leagueToViewCode;
        allLeagues.forEach(league => {
            if (league.id === leagueToViewCode) {
                currentLeague = league;
            }
        });
    } else {

        navigateToRoute(___PAGES.leagues);
    }
    loadTemplate('LeagueName', currentLeague.name);

    let cityOptions = '';

    currentLeague.city.forEach((cityOption) => {

        cityOptions += `<option value="${cityOption}" id='selectOption_${cityOption.toLowerCase()}'>${cityOption}</option>`;
    });
    loadTemplate('city', cityOptions);

    let levelOptions = '';

    currentLeague.level.forEach((levelOption) => {

        levelOptions += `<option value="${levelOption}" id='selectOption_${levelOption.toLowerCase().replaceAll("+", '')}'>${toTitleCase(levelOption)}</option>`;
    });

    loadTemplate('skillLevel', levelOptions);

    listenToIfExists(`selectLeagueBtn`, 'click', (e) => {
        Account.updateUser(Account.userAccount.id, (user) => {
            return {
                league: leagueToViewCode,
                skillLevel: document.getElementById('skillLevel').value,
                city: document.getElementById('city').value
            }
        }).then((e) => {
            navigateToRoute(___PAGES.leagues);
        })
    })
})



