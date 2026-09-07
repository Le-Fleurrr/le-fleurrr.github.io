import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBAP7NHq7NhnL0zhTj1B9ZPqPSwHXuZ7Ko",
  authDomain: "backrooms-az.firebaseapp.com",
  projectId: "backrooms-az",
  storageBucket: "backrooms-az.firebasestorage.app",
  messagingSenderId: "75981169148",
  appId: "1:75981169148:web:6722a2d269ae1607cbd279",
  measurementId: "G-S8J20FZ6W5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const functions = getFunctions(app);

isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export default app;