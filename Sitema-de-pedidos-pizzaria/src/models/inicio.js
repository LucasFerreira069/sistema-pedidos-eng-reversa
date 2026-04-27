/* ============================================================
   inicio.js — View da página inicial
   Chama: ProdutoController e PedidoController (via cart.js)
   ============================================================ */

const produtoController = new ProdutoController();

document.addEventListener('DOMContentLoaded', () => {
  initCart();
  bindAddButtons();
  initSearch();
});

/* ── BOTÕES DE ADICIONAR ── */
function bindAddButtons() {
  document.querySelectorAll('.product-card').forEach(card => {
    const btn = card.querySelector('.btn-add');
    if (!btn) return;

    const nome  = card.querySelector('h3')?.textContent.trim();
    const img   = card.querySelector('img')?.src;
    const preco = parseFloat(
      card.querySelector('.price')?.textContent.replace('R$', '').replace(',', '.').trim()
    );

    btn.addEventListener('click', () => {
      /* View chama o Controller */
      pedidoController.adicionarAoCarrinho(nome, preco, img);

      btn.textContent      = '✓ Adicionado';
      btn.style.background = '#2ecc71';
      setTimeout(() => {
        btn.textContent      = '+ Adicionar';
        btn.style.background = '';
      }, 1200);
    });
  });
}

/* ── BUSCA ── */
function initSearch() {
  const searchInput   = document.querySelector('.search-box input');
  const searchResults = document.createElement('div');
  searchResults.className = 'search-results';
  document.querySelector('.search-box').appendChild(searchResults);

  searchInput.addEventListener('input', () => {
    const termo = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = '';

    if (termo.length < 2) {
      searchResults.style.display = 'none';
      return;
    }

    /* View chama o Controller para buscar */
    const encontrados = produtoController.buscar(products, termo);

    if (encontrados.length === 0) {
      searchResults.innerHTML     = '<p class="search-empty">Nenhum produto encontrado.</p>';
      searchResults.style.display = 'block';
      return;
    }

    encontrados.forEach(p => {
      const item = document.createElement('div');
      item.className = 'search-item';
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <div>
          <span class="search-item__name">${p.name}</span>
          <span class="search-item__price">R$ ${p.price.toFixed(2)}</span>
        </div>`;
      item.onclick = () => {
        pedidoController.adicionarAoCarrinho(p.name, p.price, p.image);
        searchResults.style.display = 'none';
        searchInput.value           = '';
      };
      searchResults.appendChild(item);
    });

    searchResults.style.display = 'block';
  });

  document.addEventListener('click', (e) => {
    if (!document.querySelector('.search-box').contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
}