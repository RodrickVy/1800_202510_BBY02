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
    static async createGame(id,gameData) {

        const gameRef = await this.collectionRef.doc(id).set(gameData);

    }


    // Loads all games
    static async loadAllGames() {
        const snapshot = await this.collectionRef.get();
        return snapshot.docs.map(doc => Game.fromJson({id: doc.id, ...doc.data()}));
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

    // Retrieves a single game by gameId
    static async getGameById(gameId) {
        const snapshot = await this.collectionRef.doc(gameId).get();

        if (!snapshot.exists) throw new Error('Game does not exist.');

        return Game.fromJson({id: snapshot.id, ...snapshot.data()});
    }
}
