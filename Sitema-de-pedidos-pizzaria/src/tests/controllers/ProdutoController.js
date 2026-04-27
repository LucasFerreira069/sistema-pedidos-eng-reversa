/* ============================================================
   ProdutoController.js — recebe ações do usuário sobre produtos
   Camada: Controller
   ============================================================ */

class ProdutoController {

  /* Chamado pelo cardapio.js ao trocar de categoria */
  filtrarPorCategoria(produtos, categoria) {
    return ProdutoService.filtrarPorCategoria(produtos, categoria);
  }

  /* Chamado pelo inicio.js ao digitar na busca */
  buscar(produtos, termo) {
    return ProdutoService.buscar(produtos, termo);
  }

  /* Chamado pelo cardapio.js ao ordenar produtos */
  ordenarPorPreco(produtos, ordem) {
    return ProdutoService.ordenarPorPreco(produtos, ordem);
  }

  /* Chamado pelo cardapio.js ao ordenar por avaliação */
  ordenarPorAvaliacao(produtos) {
    return ProdutoService.ordenarPorAvaliacao(produtos);
  }
}