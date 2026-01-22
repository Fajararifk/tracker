const DB = "ibadah-db";
const STORE = "days";

function openDB() {
  return new Promise(res => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE, { keyPath: "date" });
    r.onsuccess = () => res(r.result);
  });
}

async function saveDay(data) {
  const db = await openDB();
  db.transaction(STORE, "readwrite").objectStore(STORE).put(data);
}

async function getAllDays() {
  const db = await openDB();
  return new Promise(res => {
    const r = db.transaction(STORE).objectStore(STORE).getAll();
    r.onsuccess = () => res(r.result);
  });
}
