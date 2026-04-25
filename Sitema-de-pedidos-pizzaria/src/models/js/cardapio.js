/* ============================================================
   cardapio.js — lógica da página de cardápio
   Depende de: cart.js (carregado antes no HTML)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCart();
});

/* Chamado pelo cardapio.html após renderizar os cards */
function bindCardapioButtons() {
  const cards = document.querySelectorAll('.menu-card');

  cards.forEach(card => {
    const btn = card.querySelector('.btn-add');
    if (!btn || btn._bound) return;
    btn._bound = true;

    const name  = card.querySelector('h3')?.textContent.trim();
    const img   = card.querySelector('.menu-card__img img')?.src;
    const priceText = card.querySelector('.menu-card__price')?.textContent || '';
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