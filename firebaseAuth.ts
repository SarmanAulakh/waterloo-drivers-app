import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC5nyKqKc1VgLxf_0McgfPvytgcIJVxgCs",
  authDomain: "waterloodriversapp.firebaseapp.com",
  projectId: "waterloodriversapp",
  storageBucket: "waterloodriversapp.appspot.com",
  messagingSenderId: "1070517279393",
  appId: "1:1070517279393:web:e9f7d31e35e0316bc6eee0",
  measurementId: "G-8301VLVN4X"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAppAuth = getAuth(firebaseApp);
// export const authProvider = new EmailAuthProvider()
