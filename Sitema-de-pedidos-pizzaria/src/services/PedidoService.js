/* ============================================================
   PedidoService.js — regras de negócio do pedido
   ============================================================ */

class PedidoService {

  /* Valida se o pedido tem pelo menos 1 item antes de finalizar */
  static validarPedido(pedido) {
    if (pedido.itens.length === 0) {
      throw new Error('O pedido deve ter pelo menos um item.');
    }
    return true;
  }

  /* Aplica 10% de desconto se o total for acima de R$100 */
  static aplicarDesconto(pedido) {
    const total = pedido.getTotal();
    if (total >= 100) {
      return total * 0.9;
    }
    return total;
  }

  /* Frete grátis acima de R$80, senão R$5,90 */
  static calcularFrete(pedido) {
    const total = pedido.getTotal();
    if (total >= 80) return 0;
    return 5.90;
  }

  /* Retorna o total já com frete e desconto aplicados */
  static calcularTotalFinal(pedido) {
    const totalComDesconto = this.aplicarDesconto(pedido);
    const frete = this.calcularFrete(pedido);
    return totalComDesconto + frete;
  }

  /* Finaliza o pedido mudando o status */
  static finalizarPedido(pedido) {
    this.validarPedido(pedido);
    pedido.status = 'confirmado';
    pedido.salvar();
    return pedido;
  }
}