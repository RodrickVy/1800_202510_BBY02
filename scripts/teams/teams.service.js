/**
 * Team model that holds team-related properties.
 *
 * Properties:
 * - id: Unique identifier for the team.
 * - name: Name of the team.
 * - description: Brief description of the team.
 * - skillLevel: The skill level of the team.
 * - creatorId: The ID of the user who created the team.
 * - games: An array of game IDs the team is associated with.
 * - teamBoard: An array of messages or updates related to the team.
 * - teamBanner: URL of the team’s banner image.
 * - teamTrophies: List of team trophies or achievements.
 * - teamBanner: List of images representing the team.
 */
class RecreateTeam {
    constructor({
                    id = '',
                    name = '',
                    description = '',
                    leagueLevel = 0,
                    creatorId = '',
                    games = [],
                    teamBoard = [],
                    recLeague = '',
                    teamTrophies = [],
                    teamBanner = []
                } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.leagueLevel = leagueLevel;
        this.creatorId = creatorId;
        this.games = games;
        this.teamBoard = teamBoard;
        this.recLeague = recLeague;
        this.teamTrophies = teamTrophies;
        this.teamBanner = teamBanner;
    }

    static fromJson(json) {
        json = JSON.parse(JSON.stringify(json));
        return new RecreateTeam(json);
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            leagueLevel: this.leagueLevel,
            creatorId: this.creatorId,
            games: this.games,
            teamBoard: this.teamBoard,
            recLeague: this.recLeague,
            teamTrophies: this.teamTrophies,
            teamBanner: this.teamBanner,
        };
    }
}

/**
 * TeamsService
 * Handles team-related functionalities including creation and retrieval of teams.
 */
class TeamsService {
    static teamsCollection = Account.fs.collection("teams");
    static teams = [];
    static userOwnedTeams = [];


    /**
     * Creates a new team and adds it to the teams collection.
     * @param {Object} teamData - The data for the new team.
     * @returns {Promise<string>} - The ID of the newly created team.
     */
    static async createTeam(teamData) {

        const newTeamRef = TeamsService.teamsCollection.doc(teamData.id);
        const team = new RecreateTeam({
            id: newTeamRef.id,
            ...teamData,
            creatorId: Account.userAccount.id
        });
        await newTeamRef.set(team.toJson());
        await Account.updateUser(Account.userAccount.id, (user) => ({
            teamsCreated: [...user.teamsCreated, newTeamRef.id]
        }));

        await TeamsService.getAllTeams();
    }

    /**
     * Retrieves all teams as an array of RecreateTeam objects.
     * @returns {Promise<RecreateTeam[]>} - A list of teams.
     */
    static async getAllTeams() {
        const teamsSnapshot = await TeamsService.teamsCollection.get();
        const _teamsList =  teamsSnapshot.docs.map(doc => RecreateTeam.fromJson(doc.data()));
        TeamsService.teams = _teamsList;
        TeamsService.userOwnedTeams = _teamsList.filter((team)=>team.creatorId === Account.userAccount.id);


    }

    /**
     * Updates an existing team in Firestore.
     * @param {string} teamId - The ID of the team to update.
     * @param {Object} updateData - The updated team fields.
     * @returns {Promise<void>} - Resolves when the update is complete.
     */
    static async updateTeam(teamId, updateData) {
        const teamRef = TeamsService.teamsCollection.doc(teamId);
        await teamRef.update(updateData).then(  ()=>{
            console.log('Updated team');
             this.getAllTeams();
        }).catch((err)=>{

        })

    }

    static async getTeamById(teamId) {
        return TeamsService.teams.find((team)=> team.id === teamId);
    }
}
