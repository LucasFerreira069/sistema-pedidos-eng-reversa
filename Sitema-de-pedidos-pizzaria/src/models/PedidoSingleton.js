/* ============================================================
   PedidoSingleton.js — padrão Singleton
   Garante uma única instância do pedido durante a sessão
   Camada: Models
   ============================================================ */

class PedidoSingleton {
  static instancia = null;

  static getInstance() {
    if (!PedidoSingleton.instancia) {
      const repo = new PedidoRepository();
      PedidoSingleton.instancia = repo.carregar();
    }
    return PedidoSingleton.instancia;
  }

  static resetar() {
    PedidoSingleton.instancia = null;
  }
}