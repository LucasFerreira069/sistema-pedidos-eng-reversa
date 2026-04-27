/* ============================================================
   PedidoRepository.js — salva e recupera o pedido no localStorage
   Camada: Repository
   ============================================================ */

class PedidoRepository {

  constructor() {
    this.chave = 'pizzaCart';
  }

  /* Salva o pedido no localStorage */
  salvar(pedido) {
    const dados = pedido.itens.map(item => ({
      nome:       item.produto.nome,
      preco:      item.produto.preco,
      imagem:     item.produto.imagem,
      quantidade: item.quantidade
    }));
    localStorage.setItem(this.chave, JSON.stringify(dados));
  }

  /* Carrega o pedido do localStorage */
  carregar() {
    const pedido = new Pedido();
    const dados  = JSON.parse(localStorage.getItem(this.chave)) || [];
    dados.forEach(d => {
      const produto   = new Produto(d.nome, d.preco, d.imagem);
      const item      = new ItemPedido(produto);
      item.quantidade = d.quantidade;
      pedido.itens.push(item);
    });
    return pedido;
  }

  /* Limpa o pedido do localStorage */
  limpar() {
    localStorage.removeItem(this.chave);
  }
}