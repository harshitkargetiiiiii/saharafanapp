import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import firebaseConfig from '../../firebase.config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export { auth, firestore, storage };
export default app; 