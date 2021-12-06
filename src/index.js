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
} from 'firebase/firestore';

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
