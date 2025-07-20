document.getElementById('genera').addEventListener('click', function () {
  const loader = document.querySelector('.loader');
  loader.classList.remove('hidden');

  setTimeout(() => {
    loader.classList.add('hidden');
    const anteprima = document.getElementById('anteprima');
    anteprima.style.display = 'block';

    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a40';
    ctx.fillRect(20, 20, 260, 260);
    ctx.fillStyle = '#d4af37';
    ctx.font = '20px Arial';
    ctx.fillText('Preview 3D', 90, 150);

    // Simulazione URL STL generato
    const stlUrl = "https://example.com/modello-utente.stl";

    // Inserisci input hidden nel form Shopify esistente
    const shopifyForm = window.parent.document.querySelector('form[action^="/cart/add"]');
    if (shopifyForm) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "properties[Modello 3D personalizzato]";
      input.value = stlUrl;
      shopifyForm.appendChild(input);
    }
  }, 3000);
});