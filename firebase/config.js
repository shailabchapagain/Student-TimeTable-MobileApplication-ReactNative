//import * as firebase from 'firebase';
const firebase = require('firebase/app').default
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
    apiKey: "REPLACE_WITH_API_KEY",
    authDomain: "REPLACE_WITH_AUTH_DOMAIN",
    projectId: "REPLACE_WITH_PROJECTID",
    storageBucket: "REPLACE_WITH_STORAGE_BUCKET",
    messagingSenderId: "REPLACE_WITH_MESSAGING_SENDER_ID",
    appId: "REPLACE_WITH_APP_ID",
    measurementId: "REPLACE_WITH_MEASUREMENT_ID"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
