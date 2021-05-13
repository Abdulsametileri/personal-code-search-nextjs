import firebase from "firebase/app";

let cached = global.firebaseApp
if (!cached) {
  cached = global.firebaseApp = connectFirebase()
}

function connectFirebase() {
  return firebase.initializeApp({
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`
  });
}
