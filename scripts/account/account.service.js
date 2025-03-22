//   Models


/**
 * User model that holds user-related properties.
 *
 * Properties:
 * - id: User identifier.
 * - name: User's full name.
 * - email: User's email address.
 * - bio: Short biography.
 * - profileUrl: URL to the user's profile image.
 * - role: One of 'player', 'sub', or 'creator'.
 * - friends: Array of friend IDs (or objects).
 * - sport: The sport the user is interested in.
 * - league: The league the user follows or plays in.
 * - preferences: An object to hold various user preferences.
 * - teamsCreated: Array of team IDs or team objects created by the user.
 * - teamsJoined: Array of team IDs or team objects the user has joined.
 * - gamesSubbed: Array of game IDs or game objects the user is subscribed to.
 * - skillLevel: an int representing skill level.
 * - badges: Array of badge Ids.
 * - phoneNumber: User's phone number.
 */
class RecreateUser {
    constructor({
                    id = '',
                    name = '',
                    email = '',
                    bio = '',
                    profileUrl = '',
                    role = 'player', // Default role is 'player'
                    friends = [],
                    sport = '',
                    league = '',
                    preferences = {},
                    teamsCreated = [],
                    teamsJoined = [],
                    gamesSubbed = [],
                    skillLevel = [],
                    badges = [],
                    phoneNumber = '',
                    gender = '',
                    city = '',
                    age = '',
                    lastLogin = '',
                    createdOn = '',
                } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.profileUrl = profileUrl;
        this.role = role;
        this.friends = friends;
        this.sport = sport;
        this.league = league;
        this.preferences = preferences;
        this.teamsCreated = teamsCreated;
        this.teamsJoined = teamsJoined;
        this.gamesSubbed = gamesSubbed;
        this.skillLevel = skillLevel;
        this.badges = badges;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.city = city;
        this.age = age;
        this.lastLogin = lastLogin;
        this.createdOn = createdOn;
    }

    /**
     * Creates a new User instance from a JSON object.
     * Explicitly extracts each property from the JSON.
     *
     * @param {Object|string} json - The JSON object (or string) with user properties.
     * @returns {RecreateUser} A new User instance.
     */
    static fromJson(json) {
        // If json is a string, parse it.
        json = JSON.parse(JSON.stringify(json));
        console.log(json['id'])
        return new RecreateUser(
            {
                id: json['id'],
                name: json['name'],
                email: json['email'],
                bio: json['bio'],
                profileUrl: json['profileUrl'] || '',
                role: json['role'] || 'player',
                friends: json['friends'] || [],
                sport: json['sport'] || '',
                league: json['league'] || '',
                preferences: json['preferences'] || {},
                teamsCreated: json['teamsCreated'] || [],
                teamsJoined: json['teamsJoined'] || [],
                gamesSubbed: json['gamesSubbed'] || [],
                skillLevel: json['skillLevel'] || [],
                badges: json['badges'] || [],
                phoneNumber: json['phoneNumber'] || '',
                gender: json['gender'] || '',
                city: json['city'] || '',
                age: json['age'] || '',
                createdOn: json['createdOn'] || [],
                lastLogin: json['lastLogin'] || [],
            }
        );
    }

    /**
     * Serializes the User instance into a plain JavaScript object.
     *
     * @returns {Object} - The plain object representation of the User.
     */
    toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            bio: this.bio,
            profileUrl: this.profileUrl,
            role: this.role,
            friends: this.friends,
            sport: this.sport,
            league: this.league,
            preferences: this.preferences,
            teamsCreated: this.teamsCreated,
            teamsJoined: this.teamsJoined,
            gamesSubbed: this.gamesSubbed,
            skillLevel: this.skillLevel,
            badges: this.badges,
            phoneNumber: this.phoneNumber,
            gender: this.gender,
            city: this.city,
            age: this.age,
            createdOn: this.createdOn,
            lastLogin: this.lastLogin,
        };
    }
}

/**
 * Account
 * Handles all authentication, account management logic and maintains a userAccount object of the current authenticated user (accessible anywhere as Account.userAccount).
 * @author Rodrick
 */
class Account {
    // A modifiable list of listener functions that are invoked when auth state changes only use the Account.addListener() and .removeListener() methods to modify it.
    static __authListeners = new Map();

    // Your web app's Firebase configuration
    static firebaseConfig = {
        apiKey: "AIzaSyDj6KGlCDhyLhn98Ll44fIFhY2hvF0J4Rk",
        authDomain: "bby02-1800.firebaseapp.com",
        projectId: "bby02-1800",
        storageBucket: "bby02-1800.firebasestorage.app",
        messagingSenderId: "309276142152",
        appId: "1:309276142152:web:7b72fd0324b99e8ccc867d",
        measurementId: "G-66W1Q0D33Z"
    };

    // Initialize Firebase
    static app = firebase.initializeApp(Account.firebaseConfig);
    static auth = firebase.auth();
    static fs = firebase.firestore();
    static st = firebase.storage();
    static userAccount = new RecreateUser();

    /**
     * Initializes the Firebase Auth state listener.
     * This function listens for changes in the current authentication state.
     * For example, it runs whenever a user signs in or signs out.
     */
    static initializeAuthStateListener = async () => {
        // Replace 'firebase.auth()' with your auth instance if needed
        Account.auth.onAuthStateChanged(async (user) => {
            console.log("Auth state change!!! ")
            if (user) {
                const docExists = (await Account.documentExists('users', user.uid) === true);
                if (docExists === false) {
                    const timestamp = new Date().toISOString().split('T')[0];
                    Account.createUserInFirestore(user, {
                        lastLogin: timestamp,
                        createdOn: timestamp,
                        phoneNumber:'',
                    });
                }
                let ___accountData = (await Account.loadUserData(user.uid));
                checkGuardedRoutes(true, ___PAGES.signin, ___PAGES.main);
                Account.userAccount = ___accountData;
                Account.__authListeners.forEach((callBack, _) => {
                    callBack(Account.userAccount);
                });
            } else {
                checkGuardedRoutes(false, ___PAGES.signin, ___PAGES.main);
            }
        });
    }

    /**
     * signUp
     * This static method handles creating a new user account.
     *
     * @returns {Object} - Return value could be a success message or a user object, etc.
     * @param name
     * @param email
     * @param password
     * @param customData
     * @param onSuccess
     * @param onError
     */
    static async signUp(name, email, password, customData, onSuccess, onError) {
        Account.auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {

                // User created, now update the profile with the name
                userCredential.user.updateProfile({
                    displayName: name
                }).then(() => {
                    const timestamp = new Date().toISOString().split('T')[0];
                    console.log("Id" + userCredential.user.uid + "Last login : " + timestamp)

                    Account.createUserInFirestore(user, {
                        ...customData,
                        lastLogin: timestamp,
                        createdOn: timestamp,
                    });
                })
            })
            .then((userCredential) => {
                onSuccess(userCredential.user)
            })
            .catch((error) => {
                onError(error.message);
            });
    }

    /**
     * signIn
     * This static method handles authenticating an existing user.
     *
     * @returns {Object} - Return value could be a token, session info, or a simple success message.
     * @param email
     * @param password
     * @param onSuccess
     * @param onError
     */
    static async signIn(email, password, onSuccess, onError) {
        Account.auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {


                const timestamp = new Date().toISOString().split('T')[0];
                console.log("Id" + userCredential.user.uid + "Last login : " + timestamp)
                Account.updateUser(userCredential.user.uid, (user) => {
                    return {
                        lastLogin: timestamp,
                        createdOn: timestamp,
                    }

                }).then(() => {
                    onSuccess(userCredential.user);
                })


            })
            .catch((error) => {
                onError(error.message);
            });
    }

    /**
     * Adds a given callback function to the __listeners object under the specified key.
     * These stored functions can be invoked later (e.g., upon user state changes).
     *
     * @param {string} key - The key under which to store the listener.
     * @param {Function} fn - The callback function to store.
     */
    static addListener(key, fn) {
        Account.__authListeners.set(key, fn);
    }

    /**
     * Removes the given callback function from the __listeners object under the specified key.
     *
     * @param {string} key - The key from which to remove the listener.

     */
    static removeListener(key) {
        // If there's no array of listeners under this key, nothing to remove
        if (!Account.__authListeners[key]) return;

        // Find the index of the specified function in the array
        Account.__authListeners.delete(key);
    }

    /**
     * Creates a user object in Firebase Firestore firebase auth userCredential
     * Generates a unique user ID and uses it as the document ID.
     *
     * @param {UserCredential.user} user - The user data containing properties like name, email, bio, etc.
     * @param {Object} customData - Data gotten from user signup process that can't be kept in firestore auth object.
     * @returns {Promise<string>} The unique user ID if creation is successful.
     */
    static async createUserInFirestore(user, customData) {
        const db = Account.fs;
        const userId = user.uid;
        const userDocRef = Account.fs.collection("users").doc(userId);
        const ____userData = {
            id: userId,
            name: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            bio: "",
            profileUrl: customData.profileUrl ?? '',
            role: customData.role || 'player',
            friends: [],
            sport: 'volleyball',
            league: '',
            preferances: {},
            teamsCreated: [],
            teamsJoined: [],
            gamesSubbed: [],
            skillLevel: [],
            badges: [],
            lastLogin: customData.lastLogin,
            createdOn: customData.createdOn,
        };
        console.log(____userData);
        try {
            await userDocRef.set(____userData);
            console.log(`User created successfully with id: ${userId}`);
            return userId;
        } catch (error) {
            console.error("Error creating user in Firestore:", error);
            throw error;
        }
    }

    /**
     * Updates a Firestore user document based on a callback that modifies the current user data.
     *
     * @param {string} userId - The unique identifier for the user (Firestore document ID).
     * @param {Function} updateCallback - A function that receives the current user data and returns
     *                                    an object with the fields to update.
     * @returns {Promise<Object>} - A promise that resolves with the updated data object.
     *
     * @example
     * // Suppose current user data is: { name: "Alice", bio: "Hello" }
     * // The callback can update the bio as follows:
     * updateUser("user123", (currentData) => {
     *   return { bio: currentData.bio + " Updated!" };
     * });
     */
    static async updateUser(userId, updateCallback) {
        // if (!Account.fs || typeof Account.fs.collection !== "function") {
        //     throw new Error("Firestore instance not properly initialized in Account.fs");
        //   }
        const db = Account.fs;
        console.log(userId);
        const userDocRef = db.collection("users").doc(userId);
        // Pass the current data to the callback to obtain the update object.
        const updatedData = updateCallback(Account.userAccount);
        // Update the Firestore user document with the returned object.
        await userDocRef.update(updatedData);
        return updatedData;
    }

    /**
     * Logs out the current user using Firebase Authentication.
     */
    static logout() {
        firebase.auth().signOut()
            .then(() => {
                console.log("User logged out successfully.");
                // Optionally, redirect the user to a login page or homepage:
                // window.location.href = '/login.html';
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    }

    /**
     * Loads user data from Firestore, converts it to a User instance, and returns it.
     *
     * @param {string} userId - The unique identifier for the user.
     * @returns {Promise<User>} A promise that resolves to a User instance.
     */
    static async loadUserData(userId, doesntExistCallBack = (() => {
    })) {
        // Reference the user document in the "users" collection
        const userDocRef = Account.fs.collection("users").doc(userId);
        // Retrieve the document snapshot
        const userSnapshot = await userDocRef.get();
        // If the document doesn't exist, throw an error
        if (!userSnapshot.exists) {
            doesntExistCallBack();
        }
        // Get the plain user data from the snapshot
        const userData = userSnapshot.data();
        // Convert the plain object to a User instance using your model
        return new RecreateUser(userData);
    }

    /**
     * Checks if a document with the given id exists in the specified Firestore collection.
     *
     * @param {string} collectionName - The name of the Firestore collection.
     * @param {string} docId - The id of the document to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the document exists, false otherwise.
     */
    static async documentExists(collectionName, docId) {
        const docRef = Account.fs.collection(collectionName).doc(docId);
        const docSnapshot = await docRef.get();
        console.log("I think doc exists : " + docSnapshot.exists)
        return docSnapshot.exists;
    }

    /**
     * Sends a password reset email to the user.
     *
     * @param {string} email - The user's email address.
     * @param onSuccess
     * @param onError
     * @returns {Promise<void>} - Resolves if the email is sent successfully, rejects on error.
     */
    static sendPasswordResetEmail(email, onSuccess, onError) {
        return Account.auth.sendPasswordResetEmail(email)
            .then(() => {
                console.log("Password reset email sent successfully.");
                onSuccess(email);
            })
            .catch(error => {
                console.error("Error sending password reset email:", error);
                onError("Error sending password reset email: " + error);
            });
    }

    /**
     * Deletes a user from Firebase Authentication.
     *
     * @param {string} userId - The user's unique ID.
     * */
    static deleteUser(userId) {
        return Account.auth.currentUser.delete()
            .then(() => {
                console.log("User deleted successfully.");
                Account.fs.collection("users").doc(userId).delete()
            })
            .catch(error => {
                console.error("Error deleting user:", error);
            });
    }
}

Account.initializeAuthStateListener();

//checkGuardedRoutes(!Account.userAccount.isAuthenticated(),___PAGES.signin,___PAGES.main);