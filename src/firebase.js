import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBdmajLUhQQhE0kz5Z0L4T-Exn4PPp8q_8",
    authDomain: "instaclone-yespro.firebaseapp.com",
    databaseURL: "https://instaclone-yespro.firebaseio.com",
    projectId: "instaclone-yespro",
    storageBucket: "instaclone-yespro.appspot.com",
    messagingSenderId: "884939774074",
    appId: "1:884939774074:web:8a177d1be6c02dc6c343c3"
});

const db =  firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };