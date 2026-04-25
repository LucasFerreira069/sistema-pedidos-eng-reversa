/* ============================================================
   ProdutoService.js — regras de negócio dos produtos
   ============================================================ */

class ProdutoService {

  /* Filtra produtos por categoria */
  static filtrarPorCategoria(produtos, categoria) {
    return produtos.filter(p => p.categoria === categoria);
  }

  /* Ordena produtos por preço crescente ou decrescente */
  static ordenarPorPreco(produtos, ordem = 'asc') {
    return [...produtos].sort((a, b) =>
      ordem === 'asc' ? a.preco - b.preco : b.preco - a.preco
    );
  }

  /* Ordena produtos por avaliação */
  static ordenarPorAvaliacao(produtos) {
    return [...produtos].sort((a, b) => b.avaliacao - a.avaliacao);
  }

  /* Busca produtos pelo nome */
  static buscar(produtos, termo) {
    return produtos.filter(p =>
      p.nome.toLowerCase().includes(termo.toLowerCase())
    );
  }

  /* Valida se o produto tem os campos obrigatórios */
  static validarProduto(produto) {
    if (!produto.nome || produto.nome.trim() === '') {
      throw new Error('O produto deve ter um nome.');
    }
    if (!produto.preco || produto.preco <= 0) {
      throw new Error('O produto deve ter um preço válido.');
    }
    return true;
  }
}
