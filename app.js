const today = new Date().toISOString().slice(0,10);
const prayers = ["subuh","dzuhur","ashar","maghrib","isya"];

document.getElementById("saveBtn").onclick = async () => {
  const data = {
    date: today,
    prayers: {},
    jamaahType: jamaahType.value,
    location: location.value,
    takbir: takbir.checked,
    tilawah: +tilawah.value || 0,
    dzikirPagi: dzikirPagi.checked,
    dzikirPetang: dzikirPetang.checked,
    puasa: puasa.checked,
    sedekah: sedekah.checked
  };

  document.querySelectorAll(".prayer").forEach(p => {
    data.prayers[p.dataset.prayer] = p.querySelector("input").checked;
  });

  await saveDay(data);
  loadStats();
};

async function loadStats() {
  const all = await getAllDays();
  if (!all.length) return;

  let html = `<p>Total hari tercatat: <b>${all.length}</b></p>`;

  prayers.forEach(p => {
    const missed = all.filter(d => !d.prayers[p]).length;
    html += `<p>${p.toUpperCase()} terlewat: ${missed} hari</p>`;
  });

  const jamaah = all.filter(d => d.jamaahType === "jamaah").length;
  html += `<p>Sholat berjamaah: ${jamaah} hari</p>`;

  const masjid = all.filter(d => d.location === "masjid").length;
  html += `<p>Ke masjid: ${masjid} hari</p>`;

  const takbir = all.filter(d => d.takbir).length;
  html += `<p>Takbir bareng imam: ${takbir} hari</p>`;

  document.getElementById("stats").innerHTML = html;
}

toggleTheme.onclick = () => {
  document.body.classList.toggle("dark");
};

loadStats();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
