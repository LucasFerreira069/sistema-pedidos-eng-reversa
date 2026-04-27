/* ============================================================
   cart.js — Model + UI do carrinho
   Chama: PedidoController
   ============================================================ */

/* ── CLASSE PRODUTO ── */
class Produto {
  constructor(nome, preco, imagem) {
    this.nome   = nome;
    this.preco  = preco;
    this.imagem = imagem;
  }
}

/* ── CLASSE ITEM PEDIDO ── */
class ItemPedido {
  constructor(produto) {
    this.produto    = produto;
    this.quantidade = 1;
  }

  incrementar() { this.quantidade++; }
  decrementar() { this.quantidade--; }

  getSubtotal() {
    return this.produto.preco * this.quantidade;
  }
}

/* ── CLASSE PEDIDO ── */
class Pedido {
  constructor() {
    this.itens  = [];
    this.status = 'aberto';
  }

  adicionarItem(produto) {
    const existente = this.itens.find(i => i.produto.nome === produto.nome);
    if (existente) {
      existente.incrementar();
    } else {
      this.itens.push(new ItemPedido(produto));
    }
  }

  removerItem(nome) {
    const index = this.itens.findIndex(i => i.produto.nome === nome);
    if (index === -1) return;
    this.itens[index].decrementar();
    if (this.itens[index].quantidade <= 0) this.itens.splice(index, 1);
  }

  removerItemCompleto(nome) {
    this.itens = this.itens.filter(i => i.produto.nome !== nome);
  }

  getTotal() {
    return this.itens.reduce((soma, item) => soma + item.getSubtotal(), 0);
  }

  getQuantidadeTotal() {
    return this.itens.reduce((soma, item) => soma + item.quantidade, 0);
  }

  salvar() {
  const repo = new PedidoRepository();
  repo.salvar(this);
}

static carregar() {
  const repo = new PedidoRepository();
  return repo.carregar();
}

}
let pedido = PedidoSingleton.getInstance();
let pedidoController;

/* ── FUNÇÕES DELEGADAS AO CONTROLLER ── */
function addToCart(nome, preco, imagem) {
  pedidoController.adicionarAoCarrinho(nome, preco, imagem);
}

function removeFromCart(nome) {
  pedidoController.removerDoCarrinho(nome);
}

function removeItemFully(nome) {
  pedidoController.removerItemCompleto(nome);
}

/* ── UI DO CARRINHO ── */
function updateCartUI() {
  const badge = document.querySelector('.cart-badge');
  const qty   = pedido.getQuantidadeTotal();
  if (badge) {
    badge.textContent   = qty;
    badge.style.display = qty > 0 ? 'flex' : 'none';
  }
}

function showCartFeedback() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  badge.style.transform = 'scale(1.4)';
  setTimeout(() => badge.style.transform = 'scale(1)', 200);
}

function renderCartItems() {
  const list     = document.getElementById('cart-list');
  const emptyMsg = document.getElementById('cart-empty');
  const totalEl  = document.getElementById('cart-total');
  if (!list) return;

  list.innerHTML = '';

  if (pedido.itens.length === 0) {
    if (emptyMsg) emptyMsg.style.display = 'block';
    if (totalEl)  totalEl.textContent    = 'R$ 0,00';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';

  pedido.itens.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.produto.imagem}" alt="${item.produto.nome}" class="cart-item__img" />
      <div class="cart-item__info">
        <span class="cart-item__name">${item.produto.nome}</span>
        <span class="cart-item__price">R$ ${item.getSubtotal().toFixed(2).replace('.', ',')}</span>
      </div>
      <div class="cart-item__controls">
        <button class="cart-qty-btn" onclick="removeFromCart('${item.produto.nome}')">−</button>
        <span class="cart-qty">${item.quantidade}</span>
        <button class="cart-qty-btn" onclick="addToCart('${item.produto.nome}', ${item.produto.preco}, '${item.produto.imagem}')">+</button>
        <button class="cart-remove-btn" onclick="removeItemFully('${item.produto.nome}')">🗑</button>
      </div>`;
    list.appendChild(div);
  });

  if (totalEl) totalEl.textContent = `R$ ${pedido.getTotal().toFixed(2).replace('.', ',')}`;
}

function buildCartModal() {
  if (document.getElementById('cart-modal')) return;

  const modal     = document.createElement('div');
  modal.id        = 'cart-modal';
  modal.className = 'cart-modal';
  modal.innerHTML = `
    <div class="cart-modal__overlay" onclick="closeCart()"></div>
    <div class="cart-modal__panel">
      <div class="cart-modal__header">
        <h2>Meu Carrinho</h2>
        <button class="cart-modal__close" onclick="closeCart()">✕</button>
      </div>
      <div class="cart-modal__body">
        <p id="cart-empty" class="cart-modal__empty">Seu carrinho está vazio.</p>
        <div id="cart-list"></div>
      </div>
      <div class="cart-modal__footer">
        <span>Total:</span>
        <strong id="cart-total">R$ 0,00</strong>
      </div>
      <button class="cart-modal__checkout" onclick="window.location.href='checkout.html'">Finalizar Pedido</button>
    </div>`;
  document.body.appendChild(modal);

  if (!document.getElementById('cart-styles')) {
    const style       = document.createElement('style');
    style.id          = 'cart-styles';
    style.textContent = `
      .cart-modal { position: fixed; inset: 0; z-index: 999; display: none; }
      .cart-modal.open { display: flex; }
      .cart-modal__overlay { position: absolute; inset: 0; background: rgba(0,0,0,.6); }
      .cart-modal__panel { position: absolute; right: 0; top: 0; bottom: 0; width: 400px; max-width: 100vw; background: #1A1A1A; border-left: 1px solid #333; display: flex; flex-direction: column; padding: 1.5rem; gap: 1rem; overflow-y: auto; }
      .cart-modal__header { display: flex; align-items: center; justify-content: space-between; }
      .cart-modal__header h2 { font-size: 1.4rem; font-weight: 700; }
      .cart-modal__close { background: none; border: none; color: #fff; font-size: 1.3rem; cursor: pointer; }
      .cart-modal__body { flex: 1; display: flex; flex-direction: column; gap: .75rem; }
      .cart-modal__empty { color: #9CA3AF; text-align: center; padding: 2rem 0; }
      .cart-item { display: flex; align-items: center; gap: .75rem; background: #242424; border-radius: .75rem; padding: .75rem; }
      .cart-item__img { width: 56px; height: 56px; object-fit: cover; border-radius: .5rem; flex-shrink: 0; }
      .cart-item__info { flex: 1; display: flex; flex-direction: column; gap: .2rem; }
      .cart-item__name { font-size: .9rem; font-weight: 600; }
      .cart-item__price { font-size: .85rem; color: #E8593C; font-weight: 700; }
      .cart-item__controls { display: flex; align-items: center; gap: .4rem; }
      .cart-qty-btn { background: #333; border: none; color: #fff; width: 28px; height: 28px; border-radius: .4rem; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; }
      .cart-qty-btn:hover { background: #E8593C; }
      .cart-qty { min-width: 20px; text-align: center; font-weight: 700; }
      .cart-remove-btn { background: none; border: none; cursor: pointer; font-size: 1rem; margin-left: .25rem; opacity: .6; transition: opacity .2s; }
      .cart-remove-btn:hover { opacity: 1; }
      .cart-modal__footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #333; padding-top: 1rem; font-size: 1.1rem; }
      .cart-modal__footer strong { color: #E8593C; font-size: 1.3rem; }
      .cart-modal__checkout { width: 100%; background: #E8593C; color: #fff; border: none; border-radius: .75rem; padding: .85rem; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background .2s; }
      .cart-modal__checkout:hover { background: #d14d31; }
      .cart-badge { transition: transform .2s; }
    `;
    document.head.appendChild(style);
  }
}

function openCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) { modal.classList.add('open'); renderCartItems(); }
}

function closeCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.remove('open');
}

function initCart() {
  buildCartModal();
  updateCartUI();
  pedidoController = new PedidoController();
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);
}