// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDj6KGlCDhyLhn98Ll44fIFhY2hvF0J4Rk",
    authDomain: "bby02-1800.firebaseapp.com",
    projectId: "bby02-1800",
    storageBucket: "bby02-1800.firebasestorage.app",
    messagingSenderId: "309276142152",
    appId: "1:309276142152:web:7b72fd0324b99e8ccc867d",
    measurementId: "G-66W1Q0D33Z"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();