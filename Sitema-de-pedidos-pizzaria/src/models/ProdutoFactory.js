/* ============================================================
   ProdutoFactory.js — padrão Factory
   Centraliza a criação de objetos Produto
   Camada: Models
   ============================================================ */

class ProdutoFactory {

  static criar(nome, preco, imagem, categoria = '') {
    if (!nome || nome.trim() === '') {
      throw new Error('Produto deve ter um nome.');
    }
    if (!preco || preco <= 0) {
      throw new Error('Produto deve ter um preço válido.');
    }
    if (!imagem || imagem.trim() === '') {
      throw new Error('Produto deve ter uma imagem.');
    }
    return new Produto(nome, preco, imagem, categoria);
  }
}