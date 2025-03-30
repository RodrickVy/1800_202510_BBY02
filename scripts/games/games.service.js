// Game Model Class
class Game {
    constructor({
                    id = '',
                    captainId = '',
                    teamId = '',
                    gameTime = '',
                    location = '',
                    details = '',
                    subs = [],
                    acceptedSubs = [],
                    played = false,
                    recLeague = '',
                    leagueLevel = '',
                } = {}) {
        this.id = id;
        this.captainId = captainId;
        this.teamId = teamId;
        this.gameTime = gameTime;
        this.location = location;
        this.details = details;
        this.subs = subs;
        this.acceptedSubs = acceptedSubs;
        this.played = played;
        this.recLeague = recLeague;
        this.leagueLevel = leagueLevel;
    }

    static fromJson(json) {
        return new Game({
            id: json['id'],
            captainId: json['captainId'],
            teamId: json['teamId'],
            gameTime: json['gameTime'],
            location: json['location'],
            details: json['details'],
            subs: json['subs'] || [],
            acceptedSubs: json['acceptedSubs'] || [],
            played: json['played'] || false,
            recLeague: json['recLeague'] || '',
            leagueLevel: json['leagueLevel'] || '',
        });
    }

    toJson() {
        return {
            id: this.id,
            captainId: this.captainId,
            teamId: this.teamId,
            gameTime: this.gameTime,
            location: this.location,
            details: this.details,
            subs: this.subs,
            acceptedSubs: this.acceptedSubs,
            played: this.played,
            recLeague: this.recLeague,
            leagueLevel: this.leagueLevel,
        };
    }
}

// GamesService Class
class GamesService {

    static collectionRef = Account.fs.collection('games');

    // Creates a new game
    static async createGame(id, gameData) {

        const gameRef = await this.collectionRef.doc(id).set(gameData);

    }


    // Loads all games
    static async loadAllGames() {
        return (await GamesService.getUpcomingGames()).map(doc => Game.fromJson({id: doc.id, ...doc}));
    }

    // Updates specific game details
    static async updateGame(gameId, updatedFields) {
        if (!gameId || !updatedFields) throw new Error('Game ID and updated fields are required.');

        await this.collectionRef.doc(gameId).update(updatedFields);
        console.log(`Game ${gameId} updated successfully.`);
    }

    // Deletes a game by ID
    static async deleteGame(gameId) {
        if (!gameId) throw new Error('Game ID is required.');

        await this.collectionRef.doc(gameId).delete();
        console.log(`Game ${gameId} deleted successfully.`);
    }

    // Checks whether a game has been played
    static async hasGameBeenPlayed(gameId) {
        const snapshot = await this.collectionRef.doc(gameId).get();

        if (!snapshot.exists) throw new Error('Game does not exist.');

        const game = snapshot.data();
        return game.played === true;
    }

    // Retrieves all games for a specific recLeague
    static async getGamesByRecLeague(recLeague) {
        const snapshot = await this.collectionRef.where('recLeague', '==', recLeague).get();
        return snapshot.docs.map(doc => Game.fromJson({id: doc.id, ...doc.data()}));
    }

    // Retrieves all games created by a specific captainId
    static async getGamesByCaptainId(captainId) {
        const snapshot = await this.collectionRef.where('captainId', '==', captainId).get();
        return snapshot.docs.map(doc => Game.fromJson({id: doc.id, ...doc.data()}));
    }

    // Retrieves all games for a specific teamId
    static async getGamesByTeamId(teamId) {
        const snapshot = await this.collectionRef.where('teamId', '==', teamId).get();
        return snapshot.docs.map(doc => Game.fromJson({id: doc.id, ...doc.data()}));
    }


    static async getUpcomingGames() {
        const currentTime = new Date();
        const oneHourLater = new Date(currentTime.getTime() + 60 * 60 * 1000); // Add 1 hour to current time

        // Reference to the 'games' collection
        const gamesRef = Account.fs.collection('games');

        // Query to filter games that are happening in the future (one hour from now or more)
        const gamesQuery = gamesRef.where('gameTime', '>=', oneHourLater.toISOString());

        try {
            const querySnapshot = await gamesQuery.get();

            if (querySnapshot.empty) {
                console.log('No upcoming games found.');
                return [];
            }

            const upcomingGames = querySnapshot.docs.map(doc => doc.data());
            console.log('Upcoming Games:', upcomingGames);
            return upcomingGames;
        } catch (error) {
            console.error('Error fetching games:', error);
            return [];
        }
    }

    static async getGamesByTeamId(teamId) {
        const snapshot = await Account.fs
            .collection('games')
            .where('teamId', '==', teamId)
            .get();

        return snapshot.docs.map(doc => Game.fromJson(doc.data()));
    }


    static async getGamesByRecLeague(recLeagueId) {
        const snapshot = await Account.fs
            .collection('games')
            .where('recLeague', '==', recLeagueId)
            .get();

        return snapshot.docs.map(doc => doc.data());
    }


    static async getUserSubbedGames(userId) {
        const allGames = await GamesService.loadAllGames();

        const filteredGames = allGames.filter(game =>
            (game.subs || []).includes(userId) ||
            (game.acceptedSubs || []).includes(userId)
        );

        return filteredGames;
    }

    static async getRecommendedGames(userId) {
        const allGames = await GamesService.loadAllGames();
        const userSubbedGames = GamesService.getUserSubbedGames(userId)
        const alreadyRecommended = [];
        const recommendedGames = [];

        // If user is subbed to at least one game
        if (userSubbedGames.length > 0) {
            for (const game of userSubbedGames) {
                // Get all other games in same recLeague
                const leagueGames = await GamesService.getGamesByRecLeague(game.recLeague);
                for (const leagueGame of leagueGames) {
                    if (!alreadyRecommended.includes(leagueGame)) {
                        recommendedGames.push(leagueGame);
                        alreadyRecommended.push(leagueGame.id);
                    }
                }


                // Get all other games with same team

                const teamGames = GamesService.getGamesByTeamId(game.teamId);
                for (const teamGame of teamGames) {
                    if (!alreadyRecommended.includes(teamGame.id)) {
                        recommendedGames.push(teamGame);
                        alreadyRecommended.push(teamGame.id);
                    }
                }
            }

            // Sort by gameTime
            recommendedGames.sort((a, b) => new Date(a.gameTime) - new Date(b.gameTime));
            return recommendedGames.slice(0, 3);
        } else {
            // If user has no subbed games, return 3 earliest games
            const sortedAll = allGames
                .filter(g => !g.played)
                .sort((a, b) => new Date(a.gameTime) - new Date(b.gameTime));
            return sortedAll.slice(0, 3);
        }
    }


    static async getGameById(gameId) {
        return (await GamesService.loadAllGames()).find(game => game.id === gameId);
    }
}
