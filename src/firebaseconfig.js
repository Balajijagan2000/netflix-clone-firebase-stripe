import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "<API_KEY_OF_YOUR_FIREBASE_PROJECT>",
    authDomain: "<AUTH_DOMAIN>",
    projectId: "<PROJECT_ID>",
    storageBucket: "<STORAGE_BUCKET>",
    messagingSenderId: "<messagingSenderId>",
    appId: "<appId>"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)
  export {auth}
  export default db