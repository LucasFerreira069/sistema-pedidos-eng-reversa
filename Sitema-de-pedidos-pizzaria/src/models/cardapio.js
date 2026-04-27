/* ============================================================
   cardapio.js — View da página de cardápio
   Chama: ProdutoController e PedidoController (via cart.js)
   ============================================================ */

const produtoController = new ProdutoController();

document.addEventListener('DOMContentLoaded', () => {
  initCart();
});

function bindCardapioButtons() {
  document.querySelectorAll('.menu-card').forEach(card => {
    const btn = card.querySelector('.btn-add');
    if (!btn || btn._bound) return;
    btn._bound = true;

    btn.addEventListener('click', () => {
  const nome  = btn.dataset.name;
  const preco = parseFloat(btn.dataset.price);
  const img   = btn.dataset.image;

  const tamanhoBtn     = document.querySelector('#size-bar .filter-btn.active');
  const tamanho        = tamanhoBtn ? tamanhoBtn.textContent.trim() : null;
  const multiplicador  = tamanhoBtn ? parseFloat(tamanhoBtn.dataset.multiplicador) : 1.0;

  /* aplica o multiplicador no preço conforme o tamanho */
  const precoFinal   = Math.round(preco * multiplicador * 100) / 100;
  const nomeCompleto = tamanho ? `${nome} (${tamanho})` : nome;

  pedidoController.adicionarAoCarrinho(nomeCompleto, precoFinal, img);

  btn.textContent      = '✓ Adicionado';
  btn.style.background = '#2ecc71';
  setTimeout(() => {
    btn.textContent      = '+ Adicionar';
    btn.style.background = '';
  }, 1200);
});
});
}