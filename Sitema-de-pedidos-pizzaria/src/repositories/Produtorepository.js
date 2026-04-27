/* ============================================================
   ProdutoRepository.js — acesso aos dados dos produtos
   Camada: Repository
   ============================================================ */

class ProdutoRepository {

  constructor() {
    this.produtos = [
      /* ── PIZZAS ── */
      { nome: 'Pizza Margherita',    preco: 49.90, imagem: 'https://images.unsplash.com/photo-1671106681075-5a7233268cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY5NDczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Pizzas',     descricao: 'Molho de tomate, mussarela, manjericão fresco e azeite',          avaliacao: 4.8, reviews: 120 },
      { nome: 'Pizza Pepperoni',     preco: 54.90, imagem: 'https://images.unsplash.com/photo-1666040401528-c8066902d8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwaXp6YSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY5NDczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Pizzas',     descricao: 'Molho de tomate, mussarela e pepperoni premium',                  avaliacao: 4.9, reviews: 230 },
      { nome: 'Pizza Portuguesa',    preco: 52.90, imagem: 'https://images.unsplash.com/photo-1597715474989-9ae8683704b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwaXp6YSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY5NDczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Pizzas',     descricao: 'Presunto, ovos, cebola, azeitonas, mussarela e orégano',          avaliacao: 4.7, reviews: 145 },
      { nome: 'Frango com Catupiry', preco: 51.90, imagem: 'https://images.unsplash.com/photo-1642789736356-d7122adfe91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxwaXp6YSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY5NDczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Pizzas',     descricao: 'Frango desfiado, catupiry original, milho e mussarela',           avaliacao: 4.8, reviews: 189 },
      { nome: 'Pizza Calabresa',     preco: 48.90, imagem: 'https://images.unsplash.com/photo-1671106681075-5a7233268cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY5NDczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Pizzas',     descricao: 'Calabresa fatiada, cebola, mussarela e azeitonas',                avaliacao: 4.7, reviews: 156 },
      { nome: 'Pizza Quatro Queijos',preco: 56.90, imagem: 'https://images.unsplash.com/photo-1666040401528-c8066902d8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwaXp6YSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY5NDczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Pizzas',     descricao: 'Mussarela, provolone, parmesão, catupiry e orégano',              avaliacao: 4.9, reviews: 203 },
      /* ── BEBIDAS ── */
      { nome: 'Coca-Cola 2L',        preco: 12.90, imagem: 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=1080&q=80', categoria: 'Bebidas',    descricao: 'Refrigerante Coca-Cola gelado 2 litros',                          avaliacao: 4.6, reviews: 89  },
      { nome: 'Suco de Laranja',     preco: 10.90, imagem: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=1080&q=80', categoria: 'Bebidas',    descricao: 'Suco natural de laranja 500ml',                                   avaliacao: 4.8, reviews: 67  },
      { nome: 'Guaraná Antarctica 2L',preco:11.90, imagem: 'https://cdn.awsli.com.br/2500x2500/1847/1847175/produto/94341736/379fb1048a.jpg', categoria: 'Bebidas',    descricao: 'Refrigerante Guaraná Antarctica gelado 2 litros',                 avaliacao: 4.5, reviews: 74  },
      /* ── PORÇÕES ── */
      { nome: 'Batata Frita Grande', preco: 24.90, imagem: 'https://images.unsplash.com/photo-1682613886162-49f5e074c092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGZvb2R8ZW58MXx8fHwxNzc2OTgxOTU1fDA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Porções',    descricao: 'Porção generosa de batatas fritas crocantes',                     avaliacao: 4.8, reviews: 167 },
      { nome: 'Onion Rings',         preco: 22.90, imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXaBWI6daW-NsaIrJwxzNBNQ-_rMJbNSA3AQ&s', categoria: 'Porções',    descricao: 'Anéis de cebola empanados e fritos (12 unidades)',                avaliacao: 4.7, reviews: 132 },
      { nome: 'Porção de Mussarela', preco: 26.90, imagem: 'https://www.estadao.com.br/resizer/v2/QU7RIKLLKNHN7EPP5Q67QBELDU.jpeg?quality=80&auth=b710dfabe8fa2099317bd37eb71ed12f9cfb378a3d9e5bd4f0d7577dea2a0bf3&width=1075&height=527&focal=2240,1600', categoria: 'Porções',    descricao: 'Palitos de mussarela empanados com molho especial',               avaliacao: 4.6, reviews: 98  },
      /* ── SOBREMESAS ── */
      { nome: 'Brownie de Chocolate',preco: 18.90, imagem: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NzY5NjE0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Sobremesas', descricao: 'Delicioso brownie com calda de chocolate e sorvete',               avaliacao: 4.9, reviews: 201 },
      { nome: 'Petit Gateau',        preco: 22.90, imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRMqZ6vBX-G19WARlJ1LeB_AvXkMQWXXuJtQ&s', categoria: 'Sobremesas', descricao: 'Bolinho de chocolate quente com sorvete de baunilha',               avaliacao: 5.0, reviews: 178 },
      { nome: 'Tiramisu',            preco: 19.90, imagem: 'https://www.bunsenburnerbakery.com/wp-content/uploads/2016/06/easy-tiramisu-square-29-735x735.jpg', categoria: 'Sobremesas', descricao: 'Sobremesa italiana com café e mascarpone',                          avaliacao: 4.8, reviews: 145 },
      /* ── SALADAS ── */
      { nome: 'Salada Caesar',       preco: 28.90, imagem: 'https://receitatodahora.com.br/wp-content/uploads/2023/05/salada-caesar-27-04.jpg', categoria: 'Saladas',    descricao: 'Alface romana, croutons, parmesão e molho caesar',                avaliacao: 4.5, reviews: 87  },
      { nome: 'Salada Caprese',      preco: 26.90, imagem: 'https://guiadacozinha.com.br/wp-content/uploads/2005/01/salada-caprese.webp', categoria: 'Saladas',    descricao: 'Tomate, mussarela de búfala, manjericão e azeite',               avaliacao: 4.7, reviews: 93  },
      /* ── COMBOS ── */
      { nome: 'Combo Família',       preco:119.90, imagem: 'https://images.unsplash.com/photo-1671106681075-5a7233268cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY5NDczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Combos',     descricao: '2 pizzas grandes + 2 refrigerantes 2L + 1 sobremesa',            avaliacao: 4.9, reviews: 234 },
      { nome: 'Combo Casal',         preco: 79.90, imagem: 'https://images.unsplash.com/photo-1666040401528-c8066902d8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwaXp6YSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY5NDczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Combos',     descricao: '1 pizza grande + 1 refrigerante 2L + 1 sobremesa',               avaliacao: 4.8, reviews: 178 },
      { nome: 'Combo Individual',    preco: 45.90, imagem: 'https://images.unsplash.com/photo-1597715474989-9ae8683704b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwaXp6YSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY5NDczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Combos',     descricao: '1 pizza média + 1 refrigerante lata',                            avaliacao: 4.6, reviews: 145 },
      /* ── LANCHES ── */
      { nome: 'X-Burger Especial',   preco: 32.90, imagem: 'https://images.unsplash.com/photo-1623610934157-0fcb6d50e90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmcmVuY2glMjBmcmllcyUyMGZvb2R8ZW58MXx8fHwxNzc2OTgxOTU1fDA&ixlib=rb-4.1.0&q=80&w=1080', categoria: 'Lanches',    descricao: 'Hambúrguer, queijo, alface, tomate e molho especial',             avaliacao: 4.7, reviews: 156 },
      { nome: 'Hot Dog Completo',    preco: 18.90, imagem: 'https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2024/01/31/istock-143175178-1iuy9pef5iz3q.jpg', categoria: 'Lanches',    descricao: 'Salsicha, milho, batata palha, purê e molhos',                   avaliacao: 4.5, reviews: 124 }
    ];
  }

  /* Retorna todos os produtos */
  buscarTodos() {
    return this.produtos;
  }

  /* Retorna produtos de uma categoria */
  buscarPorCategoria(categoria) {
    return this.produtos.filter(p => p.categoria === categoria);
  }

  /* Busca produto pelo nome */
  buscarPorNome(termo) {
    return this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termo.toLowerCase()) ||
      p.descricao.toLowerCase().includes(termo.toLowerCase())
    );
  }

  /* Retorna as categorias disponíveis */
  buscarCategorias() {
    return [...new Set(this.produtos.map(p => p.categoria))];
  }
}