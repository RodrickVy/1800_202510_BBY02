var leagueDocID = localStorage.getItem("leagueDocID");    //visible to all functions on this page

function getLeagueName(id) {
    db.collection("leagues")
        .doc(id)
        .get()
        .then((thisLeague) => {
            var leagueName = thisLeague.data().name;
            document.getElementById("leagueName").innerHTML = leagueName;
        });
}

getLeagueName(leagueDocID);