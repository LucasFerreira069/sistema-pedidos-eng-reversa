/* ============================================================
   inicio.js — lógica da página inicial
   Depende de: cart.js (carregado antes no HTML)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCart();
  bindAddButtons();
});

/* Conecta todos os botões "+ Adicionar" da página inicial */
function bindAddButtons() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const btn = card.querySelector('.btn-add');
    if (!btn) return;

    const name  = card.querySelector('h3')?.textContent.trim();
    const img   = card.querySelector('img')?.src;
    const priceText = card.querySelector('.price')?.textContent || '';
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());

    btn.addEventListener('click', () => {
      addToCart(name, price, img);

      /* feedback visual no botão */
      btn.textContent = '✓ Adicionado';
      btn.style.background = '#2ecc71';
      setTimeout(() => {
        btn.textContent = '+ Adicionar';
        btn.style.background = '';
      }, 1200);
    });
  });
}