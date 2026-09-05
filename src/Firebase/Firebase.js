import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyADBXeZa8CKDYLdh_2JSuogBBmvHrbI2ck",
  authDomain: "backrooms-def23.firebaseapp.com",
  projectId: "backrooms-def23",
  storageBucket: "backrooms-def23.firebasestorage.app",
  messagingSenderId: "356337019960",
  appId: "1:356337019960:web:6b21deb9a41526b3944acd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
 
export default app;