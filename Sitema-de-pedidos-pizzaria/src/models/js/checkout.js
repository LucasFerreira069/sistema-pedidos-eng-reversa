/* ============================================================
   checkout.js — lógica da página de finalizar pedido
   Depende de: cart.js e PedidoService.js
   ============================================================ */

const service = new PedidoService();

document.addEventListener('DOMContentLoaded', () => {
  initCart();
  renderOrderItems();
  calcularTotais();
  maskTelefone();
  maskCep();
});

/* ── RENDERIZA ITENS DO RESUMO ── */
function renderOrderItems() {
  const container = document.getElementById('order-items');
  if (!container) return;
  container.innerHTML = '';

  if (pedido.itens.length === 0) {
    container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:1rem 0">Carrinho vazio.</p>';
    return;
  }

  pedido.itens.forEach(item => {
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
      <div class="order-item__info">
        <div class="order-item__name">${item.produto.nome}</div>
        <div class="order-item__qty">Qtd: ${item.quantidade}</div>
      </div>
      <div class="order-item__price">R$ ${item.getSubtotal().toFixed(2).replace('.', ',')}</div>`;
    container.appendChild(div);
  });
}

/* ── CALCULA E EXIBE TOTAIS ── */
function calcularTotais() {
  const subtotal = pedido.getTotal();
  const desconto = service.calcularDesconto(pedido);
  const frete    = service.calcularFrete(pedido);
  const total    = service.calcularTotalFinal(pedido);

  document.getElementById('subtotal-val').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('desconto-val').textContent = desconto > 0
    ? `- R$ ${desconto.toFixed(2).replace('.', ',')}`
    : 'Sem desconto';
  document.getElementById('frete-val').textContent = frete === 0
    ? 'Grátis'
    : `R$ ${frete.toFixed(2).replace('.', ',')}`;
  document.getElementById('total-val').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

/* ── SELEÇÃO DE PAGAMENTO ── */
function selectPayment(method) {
  document.querySelectorAll('.payment-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.method === method);
  });

  if (method === 'dinheiro') service.setEstrategiaPagamento(new PagamentoDinheiro());
  else if (method === 'cartao') service.setEstrategiaPagamento(new PagamentoCartao());
  else service.setEstrategiaPagamento(new PagamentoPix());

  document.getElementById('troco-wrap').style.display = method === 'dinheiro' ? 'block' : 'none';
}

/* ── BUSCA CEP ── */
async function buscarCep() {
  const cep = document.getElementById('inp-cep').value.replace(/\D/g, '');
  if (cep.length !== 8) { alert('Digite um CEP válido com 8 dígitos.'); return; }
  try {
    const res  = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (data.erro) { alert('CEP não encontrado.'); return; }
    document.getElementById('inp-rua').value    = data.logradouro || '';
    document.getElementById('inp-bairro').value = data.bairro     || '';
    document.getElementById('inp-numero').focus();
  } catch {
    alert('Erro ao buscar CEP. Tente novamente.');
  }
}

/* ── CONFIRMAR PEDIDO ── */
function confirmarPedido() {
  const nome     = document.getElementById('inp-nome').value.trim();
  const telefone = document.getElementById('inp-telefone').value.trim();
  const cep      = document.getElementById('inp-cep').value.trim();
  const rua      = document.getElementById('inp-rua').value.trim();
  const numero   = document.getElementById('inp-numero').value.trim();
  const bairro   = document.getElementById('inp-bairro').value.trim();
  const troco    = document.getElementById('inp-troco')?.value;

  if (!nome || !telefone || !cep || !rua || !numero || !bairro) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  try {
    const pagamento = service.processarPagamento(pedido, troco);
    service.finalizarPedido(pedido);

    const nome        = document.getElementById('inp-nome').value.trim();
    const telefone    = document.getElementById('inp-telefone').value.trim();
    const cep         = document.getElementById('inp-cep').value.trim();
    const rua         = document.getElementById('inp-rua').value.trim();
    const numero      = document.getElementById('inp-numero').value.trim();
    const complemento = document.getElementById('inp-complemento').value.trim();
    const bairro      = document.getElementById('inp-bairro').value.trim();
    const referencia  = document.getElementById('inp-referencia').value.trim();
    const obs         = document.getElementById('inp-obs').value.trim();
    const troco       = document.getElementById('inp-troco')?.value;

    const itens = pedido.itens.map(i =>
      `• ${i.produto.nome} x${i.quantidade} — R$ ${i.getSubtotal().toFixed(2)}`
    ).join('\n');

    const total    = service.calcularTotalFinal(pedido).toFixed(2);
    const desconto = service.calcularDesconto(pedido).toFixed(2);
    const frete    = service.calcularFrete(pedido);

    const mensagem = `
🍕 *Novo Pedido - LukinhaPizzas*

👤 *Cliente:* ${nome}
📱 *WhatsApp:* ${telefone}

📦 *Itens do Pedido:*
${itens}

🏠 *Endereço:*
${rua}, ${numero}
${complemento ? complemento + '\n' : ''}${bairro} — CEP: ${cep}
${referencia ? 'Ref: ' + referencia : ''}

💰 *Pagamento:* ${pagamento.metodo}
${pagamento.troco ? '💵 Troco para: R$ ' + pagamento.troco.toFixed(2) : ''}

🏷️ *Desconto:* R$ ${desconto}
🚚 *Frete:* ${frete === 0 ? 'Grátis' : 'R$ ' + frete.toFixed(2)}
✅ *Total: R$ ${total}*

📝 *Observações:* ${obs || 'Nenhuma'}
    `.trim();

    const numeroPizzaria = '5588996353978'; // troque pelo número real
    const url = `https://wa.me/${numeroPizzaria}?text=${encodeURIComponent(mensagem)}`;

    pedido = new Pedido();
    pedido.salvar();
    window.open(url, '_blank');
    window.location.href = 'inicio.html';

  } catch (erro) {
    alert(erro.message);
  }

/* ── MÁSCARA TELEFONE ── */
function maskTelefone() {
  const input = document.getElementById('inp-telefone');
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    input.value = v;
  });
}

/* ── MÁSCARA CEP ── */
function maskCep() {
  const input = document.getElementById('inp-cep');
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = `${v.slice(0,5)}-${v.slice(5)}`;
    input.value = v;
  });
}