
const frontInput = document.getElementById("input-front");
const sideInput = document.getElementById("input-side");
const generateButton = document.getElementById("generate-btn");
const loadingIndicator = document.getElementById("loading-indicator");

function checkInputs() {
  if (frontInput.files.length > 0 && sideInput.files.length > 0) {
    generateButton.disabled = false;
  } else {
    generateButton.disabled = true;
  }
}

frontInput.addEventListener("change", function () {
  const preview = document.getElementById("preview-front");
  const file = this.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
  checkInputs();
});

sideInput.addEventListener("change", function () {
  const preview = document.getElementById("preview-side");
  const file = this.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
  checkInputs();
});

generateButton.addEventListener("click", function () {
  loadingIndicator.style.display = "block";
  const preview = document.getElementById("preview-3d");
  preview.innerHTML = "";

  setTimeout(() => {
    loadingIndicator.style.display = "none";
    preview.innerHTML = "<p>🧱 Anteprima modello 3D generato (simulato)</p>";
  }, 2000);
});
