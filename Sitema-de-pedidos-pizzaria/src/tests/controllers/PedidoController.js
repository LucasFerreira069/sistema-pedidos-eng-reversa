/* ============================================================
   PedidoController.js — recebe ações do usuário e chama os serviços
   Camada: Controller
   ============================================================ */

class PedidoController {

  constructor() {
    this.service = new PedidoService();
  }

  adicionarAoCarrinho(nome, preco, imagem) {
  const produto = ProdutoFactory.criar(nome, preco, imagem);
  pedido.adicionarItem(produto);
  pedido.salvar();
  updateCartUI();
  showCartFeedback();
}

  /* Chamado pelo cart.js ao clicar em "−" */
  removerDoCarrinho(nome) {
    pedido.removerItem(nome);
    pedido.salvar();
    updateCartUI();
    renderCartItems();
  }

  /* Chamado pelo cart.js ao clicar em "🗑" */
  removerItemCompleto(nome) {
    pedido.removerItemCompleto(nome);
    pedido.salvar();
    updateCartUI();
    renderCartItems();
  }

  /* Chamado pelo checkout.js ao clicar em "Confirmar Pedido" */
  confirmarPedido(dadosFormulario) {
    const { nome, telefone, cep, rua, numero,
            bairro, complemento, referencia,
            obs, metodoPagamento, troco } = dadosFormulario;

    if (!nome || !telefone || !cep || !rua || !numero || !bairro) {
      throw new Error('Preencha todos os campos obrigatórios.');
    }

    if (pedido.itens.length === 0) {
      throw new Error('O carrinho está vazio.');
    }

    if (metodoPagamento === 'dinheiro') {
      this.service.setEstrategiaPagamento(new PagamentoDinheiro());
    } else if (metodoPagamento === 'cartao') {
      this.service.setEstrategiaPagamento(new PagamentoCartao());
    } else {
      this.service.setEstrategiaPagamento(new PagamentoPix());
    }

    const pagamento = this.service.processarPagamento(pedido, troco);
    this.service.finalizarPedido(pedido);

    return {
      pagamento,
      total:    this.service.calcularTotalFinal(pedido),
      desconto: this.service.calcularDesconto(pedido),
      frete:    this.service.calcularFrete(pedido)
    };
  }

  /* Chamado pelo checkout.js para exibir os totais */
  calcularTotais() {
    return {
      subtotal: pedido.getTotal(),
      desconto: this.service.calcularDesconto(pedido),
      frete:    this.service.calcularFrete(pedido),
      total:    this.service.calcularTotalFinal(pedido)
    };
  }

  /* Chamado pelo checkout.js ao trocar forma de pagamento */
  selecionarPagamento(metodo) {
    if (metodo === 'dinheiro') {
      this.service.setEstrategiaPagamento(new PagamentoDinheiro());
    } else if (metodo === 'cartao') {
      this.service.setEstrategiaPagamento(new PagamentoCartao());
    } else {
      this.service.setEstrategiaPagamento(new PagamentoPix());
    }
  }
}