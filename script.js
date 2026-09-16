// ===============================
// MENÚ / SECCIONES
// ===============================

const links = [...document.querySelectorAll('nav a')];

const sections = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => {
        a.classList.toggle(
          'active',
          a.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, {
  rootMargin: '-35% 0px -55% 0px'
});

sections.forEach(s => observer.observe(s));


// ===============================
// FIREBASE
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "discohikorybrs-portafolio.firebaseapp.com",
  projectId: "discohikorybrs-portafolio",
  storageBucket: "discohikorybrs-portafolio.firebasestorage.app",
  messagingSenderId: "979145424107",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const reviewsRef = collection(db, "reviews");


// ===============================
// PUBLICAR RESEÑA
// ===============================

async function publicarResena(nombre, puntuacion, mensaje) {

  try {

    await addDoc(reviewsRef, {
      name: nombre,
      rating: Number(puntuacion),
      message: mensaje,
      createdAt: serverTimestamp()
    });

    console.log("Reseña guardada correctamente en Firestore");

  } catch (error) {

    console.error("Error guardando reseña:", error);

  }

}


// ===============================
// ESCUCHAR RESEÑAS
// ===============================

onSnapshot(reviewsRef, snapshot => {

  console.log(
    "Reseñas recibidas desde Firestore:",
    snapshot.size
  );

});
