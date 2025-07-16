import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Aquí debes colocar la configuración que te da Firebase
  // Cuando crees tu proyecto en la consola de Firebase
apiKey: "AIzaSyAk0VRM4T5KDtZNbii-GraJUJ4opcFUpBs",
  authDomain: "web-institutcional.firebaseapp.com",
  projectId: "web-institutcional",
  storageBucket: "web-institutcional.firebasestorage.app",
  messagingSenderId: "501319468923",
  appId: "1:501319468923:web:d7ad160af69bb83f615fde",
  measurementId: "G-JXEC8TJ7KY"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta las instancias que necesitaremos
export const auth = getAuth(app);
export const db = getFirestore(app);