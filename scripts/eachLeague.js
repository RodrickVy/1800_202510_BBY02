var leagueDocID = localStorage.getItem("leagueDocID");    //visible to all functions on this page

function getLeagueName(id) {
    Account.fs.collection("leagues")
        .doc(id)
        .get()
        .then((thisLeague) => {
            var leagueName = thisLeague.data().name;
            document.getElementById("leagueName").innerHTML = leagueName;
        });
}

getLeagueName(leagueDocID);

/* function displayLeagueInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    // spelling matters
    Account.fs.collection("leagues")
        .doc(ID)
        .get()
        .then(doc => {
            thisLeague = doc.data();
            leagueCode = thisLeague.code;
            leagueName = doc.data().name;

            // only populate title, and image
            document.getElementById("leagueName").innerHTML = leagueName;
        });
}
displayLeagueInfo();
 */
