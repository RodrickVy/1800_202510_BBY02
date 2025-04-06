// Function to write predefined league data to Firestore
function writeLeagues() {
    const leaguesRef = Account.fs.collection("leagues");

    const leagues = [
        {
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWOh5WDA2m2XU5Fhj613moPQyzGRLMgAtyfg&s",
            name: "Urban Rec",
            city: ["Burnaby", "Quitclaim", "Delta", "Langley", "Richmond", "Surrey", "UBC", "Vancouver"],
            level: ["recreational", "intermediate", "intermediate plus"],
            details: "Indoor volleyball Co-Ed leagues held across the lower mainland",
            url: "https://vancouver.urbanrec.ca/leagues/indoor-volleyball",
            last_updated: firebase.firestore.FieldValue.serverTimestamp()   //current system time
        }, {
            logo: "https://recsportsteam.com/wp-content/uploads/2024/03/tfc-logo.png",
            name: "TFC Volleyball",
            city: "Burnaby",
            level: ["B", "A", "A+", "AA"],
            details: "Creators of the reverse Co-ED 4's format",
            url: "https://tfcvolleyball.com/indoor-leagues/",
            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }, {
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYOhzLmigj2V6qH7RHQ5AE7C_OiXVMLx9LYg&s",
            name: "Volleyball BC",
            city: ["Burnaby", "Vancouver", "Richmond"],
            level: ["recreational", "intermediate", "advanced"],
            details: "Indoor leagues with Men's, Women's, Co-Ed and Co-Ed 4's",
            url: "https://volleyballbc.org/play/adult/indoor/leagues/",
            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }, {
            logo: "https://i.ytimg.com/vi/J6ge8DJsSWc/hqdefault.jpg",
            name: "Neighbours & Friends Volleyball League",
            city: "Vancouver",
            level: ["recreational", "recreational plus", "intermediate", "intermediate plus", "advanced"],
            details: "Formerly known as No Frills Volleyball League",
            url: "https://www.nfvl.ca/leagues/custom_page.cfm?clientID=2768&leagueID=6972&pageID=15869",
            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }, {
            logo: "https://vancouvervolleyball.com/images/logos/cambie.jpg",
            name: "Cambie Sports Volleyball League",
            city: "Vancouver",
            level: ["recreational", "intermediate", "advanced"],
            details: "Outdoor and indoor volleyball league at Cambie Community Centre",
            url: "https://www.cambiesports.com/leagues/",
            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }, {
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIQODNqGcsx_hyqLUgPW2jM_VyUJG9mnFq9w&s",
            name: "Surrey Volleyball League",
            city: "Surrey",
            level: ["recreational", "intermediate", "upper-intermediate", "competitive"],
            details: "Platform for indoor volleyball only in Surrey",
            url: "https://www.surreyvolleyball.ca/",
            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        }];

    for (const league of leagues) {
        const leagueId = generateUniqueId();

        leaguesRef.doc(leagueId).set({
            ...league,
            leagueId: leagueId,
        });
    }
}

writeLeagues();