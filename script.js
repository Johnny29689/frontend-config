// 🔐 Chiavi Supabase
const SUPABASE_URL = 'https://nczmzwyxckpnnjkicbau.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jem16d3l4Y2twbm5qa2ljYmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMjAwMjYsImV4cCI6MjA2ODU5NjAyNn0.Bs95Ri_oXXxZBplBRSGrQpze1IOy-dTGG33L3JzhznU';

// 📤 Funzione corretta di upload
async function uploadToSupabase(file, fileName) {
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/modelli/${fileName}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': file.type,
      'x-upsert': 'true'
    },
    body: file
  });

  if (!response.ok) {
    console.error('Errore upload:', await response.text());
    return null;
  }

  return `${SUPABASE_URL}/storage/v1/object/public/modelli/${fileName}`;
}

// 📁 Input e preview
const frontInput = document.getElementById("input-front");
const sideInput = document.getElementById("input-side");
const generateButton = document.getElementById("generate-btn");
const loadingIndicator = document.getElementById("loading-indicator");

function checkInputs() {
  generateButton.disabled = !(frontInput.files.length && sideInput.files.length);
}

frontInput.addEventListener("change", () => {
  const preview = document.getElementById("preview-front");
  const file = frontInput.files[0];
  if (file) preview.src = URL.createObjectURL(file);
  checkInputs();
});

sideInput.addEventListener("change", () => {
  const preview = document.getElementById("preview-side");
  const file = sideInput.files[0];
  if (file) preview.src = URL.createObjectURL(file);
  checkInputs();
});

// 🧠 GENERA MODELLO (simulato + upload immagini)
generateButton.addEventListener("click", async () => {
  const frontFile = frontInput.files[0];
  const sideFile = sideInput.files[0];

  if (!frontFile || !sideFile) {
    alert("Carica entrambe le immagini!");
    return;
  }

  loadingIndicator.style.display = "block";

  // 📤 Upload immagini
  const frontName = `fronte-${Date.now()}.jpg`;
  const sideName = `laterale-${Date.now()}.jpg`;

  const fronteUrl = await uploadToSupabase(frontFile, frontName);
  const lateraleUrl = await uploadToSupabase(sideFile, sideName);

  if (!fronteUrl || !lateraleUrl) {
    alert("Errore durante il caricamento delle immagini!");
    loadingIndicator.style.display = "none";
    return;
  }

  // ✅ Simulazione STL
  const preview = document.getElementById("preview-3d");
  setTimeout(() => {
    loadingIndicator.style.display = "none";
    preview.innerHTML = `
      <p>🧱 Anteprima modello 3D generato (simulato)</p>
      <a href="#" class="btn">Download STL</a>
      <p><small>Fronte caricato: <a href="${fronteUrl}" target="_blank">vedi</a></small></p>
      <p><small>Laterale caricato: <a href="${lateraleUrl}" target="_blank">vedi</a></small></p>
    `;
  }, 2000);
});
