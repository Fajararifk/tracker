const DB_NAME = "ibadah-db";
const STORE = "records";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, { keyPath: "date" });
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveToday(data) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(data);
}

async function getAll() {
  const db = await openDB();
  return new Promise(res => {
    const req = db.transaction(STORE).objectStore(STORE).getAll();
    req.onsuccess = () => res(req.result);
  });
}
