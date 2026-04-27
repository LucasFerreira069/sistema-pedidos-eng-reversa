1- QUAIS PROBLEMAS FORAM RESOLVIDOS?

Duplicação de responsabilidade — a função salvarTotal() e finalizar() faziam a mesma coisa de formas diferentes. No seu sistema isso foi resolvido com o PedidoRepository, que é o único responsável por salvar e recuperar dados do localStorage.

Lógica misturada — o cálculo do desconto, da taxa e a exibição na tela estavam todos na mesma função finalizar(). No seu sistema cada responsabilidade foi separada: PedidoService calcula desconto e frete, PedidoController coordena as ações e a View só exibe os dados.

Função duplicada — calcularTotal() e atualizarLista() faziam o mesmo cálculo. No seu sistema o cálculo do total está em um único lugar: pedido.getTotal().

Sem orientação a objetos — o código original usava arrays e funções soltas. No seu sistema foi aplicado OOP com as classes Produto, ItemPedido e Pedido.


2- COMO A ARQUITETURA EM CAMADAS MELHOROU O SISTEMA?

A arquitetura em camadas organizou o sistema de forma que cada parte tem uma responsabilidade clara.

3- ONDE OS PADRÕES FORAM APLICADOS?

STRATEGY-
Frete — FreteGratis, FretePorTotal, FretePorDistancia podem ser trocados em tempo de execução sem mudar o PedidoService.
Pagamento — PagamentoDinheiro, PagamentoCartao, PagamentoPix são trocados no checkout.js quando o usuário seleciona a forma de pagamento.
Desconto — SemDesconto, DescontoPorTotal definem como o desconto é calculado. O DescontoPorTotal aplica 10% automaticamente para pedidos acima de R$100.

SINGLETON-
aplicado no PedidoSingleton.js. Garante que existe apenas uma instância do pedido durante toda a sessão do usuário. Usado no cart.js.

FACTORY-
aplicado no ProdutoFactory.js. Centraliza e valida a criação de objetos Produto. Usado no PedidoController.

REPOSITORY-
aplicado em PedidoRepository.js e ProdutoRepository.js. O PedidoRepository isola o acesso ao localStorage e o ProdutoRepository centraliza todos os dados dos produtos. Usado no PedidoSingleton para carregar o pedido e na classe Pedido para salvar.