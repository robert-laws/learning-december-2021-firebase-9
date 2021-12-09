import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDTFMUfudESfnMMSw9uwvju097kdMR8eRs',
  authDomain: 'learning-dec-2021-firebase-9.firebaseapp.com',
  projectId: 'learning-dec-2021-firebase-9',
  storageBucket: 'learning-dec-2021-firebase-9.appspot.com',
  messagingSenderId: '773211796491',
  appId: '1:773211796491:web:ffa63135f914b7856e830e',
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, 'books');

// queries
const myQuery = query(colRef, orderBy('createdAt'));

// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((book) => {
//       books.push({
//         id: book.id,
//         ...book.data(),
//       });
//     });
//     console.log(books);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// real time collection data
onSnapshot(myQuery, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((book) => {
    books.push({
      id: book.id,
      ...book.data(),
    });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// get a single document
const docRef = doc(db, 'books', 'DlSKKCuzxmyTtgOYG7LD');

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', updateForm.id.value);

  updateDoc(docRef, {
    title: 'My New Title',
  }).then(() => {
    updateForm.reset();
  });
});

// signup users
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      console.log('user created: ', credential.user);
      signupForm.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// login users
const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out');
    })
    .catch((error) => {
      console.log(error.message);
    });
});
