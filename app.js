const today = new Date().toISOString().slice(0,10);

const inputs = document.querySelectorAll("input[type=checkbox]");
const tilawahInput = document.getElementById("tilawah");
const statText = document.getElementById("statText");

document.getElementById("saveBtn").onclick = async () => {
  const data = {
    date: today,
    tilawah: Number(tilawahInput.value || 0)
  };

  inputs.forEach(i => data[i.dataset.key] = i.checked);

  await saveToday(data);
  loadStats();
};

async function loadStats() {
  const all = await getAll();
  if (!all.length) return;

  const missedSubuh = all.filter(d => !d.subuh).length;
  statText.textContent =
    `Total hari tercatat: ${all.length}. Subuh terlewat: ${missedSubuh} hari.`;
}

document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",
    document.body.classList.contains("dark") ? "dark" : "light");
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

loadStats();

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
