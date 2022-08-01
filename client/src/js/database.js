// from the idb docs:
// 'idb' is a tiny library that mostly mirrors the IndexedDB API, but with small improvements that make a big difference to usability.
// "The 'openDB' method opens a database, and returns a promise for an enhanced IDBDatabase."
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Added logic for a method that accepts some content and adds it to the database
//export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (content) => {
  console.log('PUT from the database');

  // this creates a connection to the database database and version we want to use
  const jateDb = await openDB('jate', 1);

  // this creates a new transaction and specifies the database and data privileges 
  // 'readwrite' is for PUT, POST, and DELETE
  const tx = jateDb.transaction('jate', 'readwrite');

  // this opens up the specific object store
  const store = tx.objectStore('jate');

  // here uses the 'put()' method to update a piece of data from the database based on the id
  const request = store.put({ id: 1, value: content });

  // her gets confirmation of the request and print confirmation to console
  const result = await request;
  console.log('the data was saved to database id', result);
};

// Added logic for a 'GET' method that gets all the content from the database
//export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  console.log('GET from the database');

  // this creates a connection to the database database and version we want to use
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get() method to get data from the database
  const request = store.get(1);

  // Get confirmation of the request and print confirmation to console.
  const result = await request;
  console.log('the data was retrieved from the database', result)
  console.log(result.value)
  return result?.value;
};

// initializes and starts the database here
initdb();
