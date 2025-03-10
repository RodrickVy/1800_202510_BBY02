function writeLeagues() {
    var leaguesRef = db.collection("leagues");

    leaguesRef.add({
        code: "LEAGUE1",
        name: "Urban Rec",
        city: ["Burnaby", "Coquitlam", "Delta", "Langley", "Richmond", "Surrey", "UBC", "Vancouver"],
        level: ["recreational", "intermediate", "intermediate plus"],
        details: "Indoor volleyball Co-Ed leagues held across the lower mainland",
        url: "https://vancouver.urbanrec.ca/leagues/indoor-volleyball",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    leaguesRef.add({
        code: "LEAGUE2",
        name: "TFC Volleyball",
        city: "Burnaby",
        level: ["B", "A", "A+", "AA"],
        details: "Creators of the reverse Co-ED 4's format",
        url: "https://tfcvolleyball.com/indoor-leagues/",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    leaguesRef.add({
        code: "LEAGUE3",
        name: "Volleyball BC",
        city: ["Burnaby", "Vancouver", "Richmond"],
        level: ["recreational", "intermediate", "advanced"],
        details: "Indoor leagues with Men's, Women's, Co-Ed and Co-Ed 4's",
        url: "https://volleyballbc.org/play/adult/indoor/leagues/",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    leaguesRef.add({
        code: "LEAGUE4",
        name: "Neighbours & Friends Volleyball League",
        city: "Vancouver",
        level: ["recreational", "recreational plus", "intermediate", "intermediate plus", "advanced"],
        details: "Formerly known as No Frills Volleyball League",
        url: "https://www.nfvl.ca/leagues/custom_page.cfm?clientID=2768&leagueID=6972&pageID=15869",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    leaguesRef.add({
        code: "LEAGUE5",
        name: "Cambie Sports Volleyball League",
        city: "Vancouver",
        level: ["recreational", "intermediate", "advanced"],
        details: "Outdoor and indoor volleyball league at Cambie Community Centre",
        url: "https://www.cambiesports.com/leagues/",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    leaguesRef.add({
        code: "LEAGUE6",
        name: "Surrey Volleyball League",
        city: "Surrey",
        level: ["recreational", "intermediate", "upper-intermediate", "competitive"],
        details: "Platform for indoor volleyball only in Surrey",
        url: "https://www.surreyvolleyball.ca/",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("leaguesCardTemplate");
    Account.fs.collection(collection).get()
        .then(allLeagues => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allLeagues.forEach(doc => {
                var title = doc.data().name;
                var details = doc.data().details;
                var leagueCode = doc.data().code;
                var leagueCity = doc.data().city;
                var leagueLevel = doc.data().level;
                var website = doc.data().url;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-url').innerHTML = `<a href="${website}" target="_blank">Visit Website</a>`;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${leagueCode}.jpg`;
                newcard.querySelector(".card").classList.add("league-card");

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("leagues");  //input param is the name of the collection