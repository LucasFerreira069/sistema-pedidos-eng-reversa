/* ============================================================
   tests/pedido.test.js — testes simples do carrinho
   Testa: cálculo do total e aplicação do desconto
   ============================================================ */

/* ── MINI FRAMEWORK DE TESTES ── */
let passou = 0;
let falhou = 0;

function teste(descricao, fn) {
  try {
    fn();
    console.log(`✅ ${descricao}`);
    passou++;
  } catch (erro) {
    console.error(`❌ ${descricao}`);
    console.error(`   → ${erro.message}`);
    falhou++;
  }
}

function esperar(valor, esperado, descricao) {
  if (valor !== esperado) {
    throw new Error(`Esperado: ${esperado}, Recebido: ${valor} (${descricao})`);
  }
}

/* ── SETUP ── */
/* Simulação das classes sem precisar do browser */

class Produto {
  constructor(nome, preco, imagem) {
    this.nome   = nome;
    this.preco  = preco;
    this.imagem = imagem;
  }
}

class ItemPedido {
  constructor(produto) {
    this.produto    = produto;
    this.quantidade = 1;
  }
  incrementar() { this.quantidade++; }
  decrementar() { this.quantidade--; }
  getSubtotal() { return this.produto.preco * this.quantidade; }
}

class Pedido {
  constructor() {
    this.itens  = [];
    this.status = 'aberto';
  }
  adicionarItem(produto) {
    const existente = this.itens.find(i => i.produto.nome === produto.nome);
    if (existente) { existente.incrementar(); }
    else { this.itens.push(new ItemPedido(produto)); }
  }
  removerItem(nome) {
    const index = this.itens.findIndex(i => i.produto.nome === nome);
    if (index === -1) return;
    this.itens[index].decrementar();
    if (this.itens[index].quantidade <= 0) this.itens.splice(index, 1);
  }
  getTotal() {
    return this.itens.reduce((soma, item) => soma + item.getSubtotal(), 0);
  }
  getQuantidadeTotal() {
    return this.itens.reduce((soma, item) => soma + item.quantidade, 0);
  }
}

class SemDesconto {
  calcular(pedido) { return 0; }
}

class DescontoPorTotal {
  calcular(pedido) {
    const total = pedido.getTotal();
    if (total >= 100) return total * 0.10;
    return 0;
  }
}

class FretePorTotal {
  calcular(pedido) {
    return pedido.getTotal() >= 80 ? 0 : 8.00;
  }
}

class PedidoService {
  constructor(
    estrategiaFrete    = new FretePorTotal(),
    estrategiaDesconto = new DescontoPorTotal()
  ) {
    this.estrategiaFrete    = estrategiaFrete;
    this.estrategiaDesconto = estrategiaDesconto;
  }
  calcularFrete(pedido)    { return this.estrategiaFrete.calcular(pedido); }
  calcularDesconto(pedido) { return this.estrategiaDesconto.calcular(pedido); }
  calcularTotalFinal(pedido) {
    return pedido.getTotal() - this.calcularDesconto(pedido) + this.calcularFrete(pedido);
  }
}

/* ══════════════════════════════════════════
   TESTES
══════════════════════════════════════════ */

console.log('\n📦 TESTES — Cálculo do Total e Desconto\n');

/* ── BLOCO 1: CÁLCULO DO TOTAL ── */
console.log('--- Cálculo do Total ---');

teste('Pedido vazio tem total zero', () => {
  const pedido = new Pedido();
  esperar(pedido.getTotal(), 0, 'total do pedido vazio');
});

teste('Adicionar 1 pizza de R$49,90 resulta em total R$49,90', () => {
  const pedido = new Pedido();
  pedido.adicionarItem(new Produto('Pizza Margherita', 49.90, ''));
  esperar(pedido.getTotal(), 49.90, 'total com 1 pizza');
});

teste('Adicionar 2 pizzas iguais dobra o total', () => {
  const pedido = new Pedido();
  pedido.adicionarItem(new Produto('Pizza Pepperoni', 54.90, ''));
  pedido.adicionarItem(new Produto('Pizza Pepperoni', 54.90, ''));
  esperar(pedido.getTotal(), 109.80, 'total com 2 pizzas iguais');
});

teste('Adicionar produtos diferentes soma os preços', () => {
  const pedido = new Pedido();
  pedido.adicionarItem(new Produto('Pizza Margherita', 49.90, ''));
  pedido.adicionarItem(new Produto('Coca-Cola 2L',     12.90, ''));
  pedido.adicionarItem(new Produto('Brownie',          18.90, ''));
  const total = Math.round(pedido.getTotal() * 100) / 100;
  esperar(total, 81.70, 'total com 3 produtos diferentes');
});

teste('Remover item diminui o total', () => {
  const pedido = new Pedido();
  pedido.adicionarItem(new Produto('Pizza Portuguesa', 52.90, ''));
  pedido.adicionarItem(new Produto('Coca-Cola 2L',     12.90, ''));
  pedido.removerItem('Coca-Cola 2L');
  esperar(pedido.getTotal(), 52.90, 'total após remover item');
});

teste('Quantidade total de itens é calculada corretamente', () => {
  const pedido = new Pedido();
  pedido.adicionarItem(new Produto('Pizza Margherita', 49.90, ''));
  pedido.adicionarItem(new Produto('Pizza Margherita', 49.90, ''));
  pedido.adicionarItem(new Produto('Coca-Cola 2L',     12.90, ''));
  esperar(pedido.getQuantidadeTotal(), 3, 'quantidade total de itens');
});

/* ── BLOCO 2: APLICAÇÃO DO DESCONTO ── */
console.log('\n--- Aplicação do Desconto ---');

teste('Pedido abaixo de R$100 não recebe desconto', () => {
  const pedido  = new Pedido();
  const service = new PedidoService();
  pedido.adicionarItem(new Produto('Pizza Margherita', 49.90, ''));
  esperar(service.calcularDesconto(pedido), 0, 'sem desconto abaixo de R$100');
});

teste('Pedido acima de R$100 recebe 10% de desconto', () => {
  const pedido  = new Pedido();
  const service = new PedidoService();
  pedido.adicionarItem(new Produto('Pizza Pepperoni',   54.90, ''));
  pedido.adicionarItem(new Produto('Pizza Quatro Queijos', 56.90, ''));
  // total = 111.80 → desconto = 11.18
  const desconto = Math.round(service.calcularDesconto(pedido) * 100) / 100;
  esperar(desconto, 11.18, 'desconto de 10% acima de R$100');
});

teste('SemDesconto sempre retorna zero independente do total', () => {
  const pedido  = new Pedido();
  const service = new PedidoService(new FretePorTotal(), new SemDesconto());
  pedido.adicionarItem(new Produto('Pizza Margherita',  49.90, ''));
  pedido.adicionarItem(new Produto('Pizza Pepperoni',   54.90, ''));
  esperar(service.calcularDesconto(pedido), 0, 'SemDesconto retorna zero');
});

/* ── BLOCO 3: FRETE ── */
console.log('\n--- Frete ---');

teste('Frete é R$8,00 para pedidos abaixo de R$80', () => {
  const pedido  = new Pedido();
  const service = new PedidoService();
  pedido.adicionarItem(new Produto('Coca-Cola 2L', 12.90, ''));
  esperar(service.calcularFrete(pedido), 8.00, 'frete R$8 abaixo de R$80');
});

teste('Frete é grátis para pedidos acima de R$80', () => {
  const pedido  = new Pedido();
  const service = new PedidoService();
  pedido.adicionarItem(new Produto('Pizza Margherita', 49.90, ''));
  pedido.adicionarItem(new Produto('Pizza Pepperoni',  54.90, ''));
  esperar(service.calcularFrete(pedido), 0, 'frete grátis acima de R$80');
});

/* ── BLOCO 4: TOTAL FINAL ── */
console.log('\n--- Total Final ---');

teste('Total final = subtotal - desconto + frete (sem desconto, com frete)', () => {
  const pedido  = new Pedido();
  const service = new PedidoService();
  pedido.adicionarItem(new Produto('Brownie', 18.90, ''));
  // total=18.90, desconto=0, frete=8.00 → totalFinal=26.90
  const total = Math.round(service.calcularTotalFinal(pedido) * 100) / 100;
  esperar(total, 26.90, 'total final com frete sem desconto');
});

teste('Total final = subtotal - desconto + frete (com desconto, sem frete)', () => {
  const pedido  = new Pedido();
  const service = new PedidoService();
  pedido.adicionarItem(new Produto('Pizza Pepperoni',      54.90, ''));
  pedido.adicionarItem(new Produto('Pizza Quatro Queijos', 56.90, ''));
  // total=111.80, desconto=11.18, frete=0 → totalFinal=100.62
  const total = Math.round(service.calcularTotalFinal(pedido) * 100) / 100;
  esperar(total, 100.62, 'total final com desconto sem frete');
});

/* ── RESULTADO ── */
console.log(`\n════════════════════════════════`);
console.log(`✅ Passou: ${passou}`);
console.log(`❌ Falhou: ${falhou}`);
console.log(`Total:     ${passou + falhou} testes`);
console.log(`════════════════════════════════\n`);