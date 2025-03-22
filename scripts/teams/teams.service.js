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
 * - teamGallery: List of images representing the team.
 */
class RecreateTeam {
    constructor({
                    id = '',
                    name = '',
                    description = '',
                    skillLevel = 0,
                    creatorId = '',
                    games = [],
                    teamBoard = [],
                    recLeague = '',
                    teamTrophies = [],
                    teamGallery = []
                } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.skillLevel = skillLevel;
        this.creatorId = creatorId;
        this.games = games;
        this.teamBoard = teamBoard;
        this.recLeague = recLeague;
        this.teamTrophies = teamTrophies;
        this.teamGallery = teamGallery;
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
            skillLevel: this.skillLevel,
            creatorId: this.creatorId,
            games: this.games,
            teamBoard: this.teamBoard,
            recLeague: this.recLeague,
            teamTrophies: this.teamTrophies,
            teamGallery: this.teamGallery,
        };
    }
}

/**
 * TeamsService
 * Handles team-related functionalities including creation and retrieval of teams.
 */
class TeamsService {
    static teamsCollection = Account.fs.collection("teams");
    /**
     * Verifies if the current user's role is 'captain'. If not, prompts them to change their role.
     * @returns {Promise<boolean>} - Resolves to true if the user is a captain, false otherwise.
     */
    static async verifyCaptainRole() {
        if (Account.userAccount.role !== 'captain') {
            const confirmChange = confirm("You need to be a captain to create a team. Do you want to change your role?");
            if (confirmChange) {
                await Account.updateUser(Account.userAccount.id, (user) => ({ role: 'captain' }));
                Account.userAccount.role = 'captain';
                return true;
            }
            return false;
        }
        return true;
    }

    /**
     * Creates a new team and adds it to the teams collection.
     * @param {Object} teamData - The data for the new team.
     * @returns {Promise<string>} - The ID of the newly created team.
     */
    static async createTeam(teamData) {
        const isCaptain = await TeamsService.verifyCaptainRole();
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
        console.log("Created new team"+ newTeamRef);
        return newTeamRef.id;
    }

    /**
     * Retrieves all teams as an array of RecreateTeam objects.
     * @returns {Promise<RecreateTeam[]>} - A list of teams.
     */
    static async getAllTeams() {
        const teamsSnapshot = await TeamsService.teamsCollection.get();
        return teamsSnapshot.docs.map(doc => RecreateTeam.fromJson(doc.data()));
    }

    /**
     * Updates an existing team in Firestore.
     * @param {string} teamId - The ID of the team to update.
     * @param {Object} updateData - The updated team fields.
     * @returns {Promise<void>} - Resolves when the update is complete.
     */
    static async updateTeam(teamId, updateData) {
        const teamRef = TeamsService.teamsCollection.doc(teamId);
        try {
            await teamRef.update(updateData);
            console.log(`Team ${teamId} updated successfully.`);
        } catch (error) {
            console.error("Error updating team:", error);
        }
    }
}
