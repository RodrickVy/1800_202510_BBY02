class LeaguesService {
    static leaguesCollection = Account.fs.collection("leagues");

    /**
     * Retrieves all leagues from Firestore.
     * @returns {Promise<Object[]>} - A list of league objects.
     */
    static async getAllLeagues() {
        const leaguesSnapshot = await LeaguesService.leaguesCollection.get();
        return leaguesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    /**
     * Retrieves a specific league by ID.
     * @param {string} leagueId - The ID of the league to retrieve.
     * @returns {Promise<Object|null>} - The league object or null if not found.
     */
    static async getLeagueById(leagueId) {
        const leagueDoc = await LeaguesService.leaguesCollection.doc(leagueId).get();
        return leagueDoc.exists ? { id: leagueDoc.id, ...leagueDoc.data() } : null;
    }

    /**
     * Adds predefined leagues to the Firestore collection.
     */
    static async _writeLeagues() {
        const leagues = [
            {
                code: "LEAGUE1",
                name: "Urban Rec",
                city: ["Burnaby", "Coquitlam", "Delta", "Langley", "Richmond", "Surrey", "UBC", "Vancouver"],
                level: ["recreational", "intermediate", "intermediate plus"],
                details: "Indoor volleyball Co-Ed leagues held across the lower mainland",
                url: "https://vancouver.urbanrec.ca/leagues/indoor-volleyball",
                last_updated: Account.fs.FieldValue.serverTimestamp()
            },
            {
                code: "LEAGUE2",
                name: "TFC Volleyball",
                city: ["Burnaby"],
                level: ["B", "A", "A+", "AA"],
                details: "Creators of the reverse Co-ED 4's format",
                url: "https://tfcvolleyball.com/indoor-leagues/",
                last_updated: Account.fs.FieldValue.serverTimestamp()
            },
            {
                code: "LEAGUE3",
                name: "Volleyball BC",
                city: ["Burnaby", "Vancouver", "Richmond"],
                level: ["recreational", "intermediate", "advanced"],
                details: "Indoor leagues with Men's, Women's, Co-Ed and Co-Ed 4's",
                url: "https://volleyballbc.org/play/adult/indoor/leagues/",
                last_updated: Account.fs.FieldValue.serverTimestamp()
            },
            {
                code: "LEAGUE4",
                name: "Neighbours & Friends Volleyball League",
                city: ["Vancouver"],
                level: ["recreational", "recreational plus", "intermediate", "intermediate plus", "advanced"],
                details: "Formerly known as No Frills Volleyball League",
                url: "https://www.nfvl.ca/leagues/custom_page.cfm?clientID=2768&leagueID=6972&pageID=15869",
                last_updated: Account.fs.FieldValue.serverTimestamp()
            },
            {
                code: "LEAGUE5",
                name: "Cambie Sports Volleyball League",
                city: ["Vancouver"],
                level: ["recreational", "intermediate", "advanced"],
                details: "Outdoor and indoor volleyball league at Cambie Community Centre",
                url: "https://www.cambiesports.com/leagues/",
                last_updated: Account.fs.FieldValue.serverTimestamp()
            },
            {
                code: "LEAGUE6",
                name: "Surrey Volleyball League",
                city: ["Surrey"],
                level: ["recreational", "intermediate", "upper-intermediate", "competitive"],
                details: "Platform for indoor volleyball only in Surrey",
                url: "https://www.surreyvolleyball.ca/",
                last_updated: Account.fs.FieldValue.serverTimestamp()
            }
        ];

        for (const league of leagues) {
            await LeaguesService.leaguesCollection.add(league);
        }
    }

    /**
     * Dynamically displays league cards on the UI.
     * @param {string} collection - The Firestore collection name.
     */
    static async displayCardsDynamically(collection) {
        let cardTemplate = document.getElementById("leaguesCardTemplate");
        const allLeagues = await LeaguesService.getAllLeagues();

        allLeagues.forEach(doc => {
            const data = doc.data();
            let newCard = cardTemplate.content.cloneNode(true);

            newCard.querySelector('.card-title').innerHTML = data.name;
            newCard.querySelector('.card-url').innerHTML = `<a href="${data.url}" target="_blank">Visit Website</a>`;
            newCard.querySelector('.card-text').innerHTML = data.details;
            newCard.querySelector('.card-image').src = `${data.logo}`;
            newCard.querySelector(".card").classList.add("league-card");
            newCard.querySelector('a').href = `league.html?docID=${doc.id}`;

            document.getElementById(`${collection}-go-here`).appendChild(newCard);
        });
    }

    /**
     * Saves the league document ID and redirects the user.
     */
    static _saveLeagueDocumentIDAndRedirect() {
        let params = new URL(window.location.href);
        let ID = params.searchParams.get("docID");
        localStorage.setItem('leagueDocID', ID);
        window.location.href = 'eachLeague.html';
    }
}
