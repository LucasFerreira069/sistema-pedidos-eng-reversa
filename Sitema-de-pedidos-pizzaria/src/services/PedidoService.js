/* ============================================================
   PedidoService.js — regras de negócio do pedido
   Padrão Strategy: Frete, Pagamento e Desconto
   ============================================================ */

/* ── ESTRATÉGIAS DE FRETE ── */

class FreteGratis {
  calcular(pedido) { return 0; }
}

class FretePorTotal {
  calcular(pedido) {
    return pedido.getTotal() >= 80 ? 0 : 8.00;
  }
}

class FretePorDistancia {
  constructor(distanciaKm) { this.distanciaKm = distanciaKm; }
  calcular(pedido) { return this.distanciaKm * 0.50; }
}

/* ── ESTRATÉGIAS DE PAGAMENTO ── */

class PagamentoDinheiro {
  processar(pedido, troco) {
    if (!troco || parseFloat(troco) <= 0) {
      throw new Error('Informe o valor do troco.');
    }
    return { metodo: 'Dinheiro', troco: parseFloat(troco) };
  }
}

class PagamentoCartao {
  processar(pedido) {
    return { metodo: 'Cartão na entrega' };
  }
}

class PagamentoPix {
  processar(pedido) {
    return { metodo: 'PIX', chave: '(00) 00000-0000' };
  }
}

/* ── ESTRATÉGIAS DE DESCONTO ── */

class SemDesconto {
  calcular(pedido) { return 0; }
}

class DescontoPorTotal {
  calcular(pedido) {
    const total = pedido.getTotal();
    if (total >= 100) return total * 0.10; // 10% acima de R$100
    return 0;
  }
}

/* ── SERVIÇO DO PEDIDO (contexto do Strategy) ── */

class PedidoService {
  constructor(
    estrategiaFrete     = new FretePorTotal(),
    estrategiaPagamento = new PagamentoPix(),
    estrategiaDesconto  = new DescontoPorTotal()
  ) {
    this.estrategiaFrete     = estrategiaFrete;
    this.estrategiaPagamento = estrategiaPagamento;
    this.estrategiaDesconto  = estrategiaDesconto;
  }

  /* ── FRETE ── */
  setEstrategiaFrete(estrategia) { this.estrategiaFrete = estrategia; }
  calcularFrete(pedido) { return this.estrategiaFrete.calcular(pedido); }

  /* ── PAGAMENTO ── */
  setEstrategiaPagamento(estrategia) { this.estrategiaPagamento = estrategia; }
  processarPagamento(pedido, troco = null) { return this.estrategiaPagamento.processar(pedido, troco); }

  /* ── DESCONTO ── */
  setEstrategiaDesconto(estrategia) { this.estrategiaDesconto = estrategia; }
  calcularDesconto(pedido) { return this.estrategiaDesconto.calcular(pedido); }

  /* ── TOTAL FINAL ── */
  calcularTotalFinal(pedido) {
    const subtotal = pedido.getTotal();
    const desconto = this.calcularDesconto(pedido);
    const frete    = this.calcularFrete(pedido);
    return subtotal - desconto + frete;
  }

  /* ── VALIDAÇÃO ── */
  validarPedido(pedido) {
    if (pedido.itens.length === 0) {
      throw new Error('O pedido deve ter pelo menos um item.');
    }
    return true;
  }

  /* ── FINALIZAR ── */
  finalizarPedido(pedido) {
    this.validarPedido(pedido);
    pedido.status = 'confirmado';
    pedido.salvar();
    return pedido;
  }
}