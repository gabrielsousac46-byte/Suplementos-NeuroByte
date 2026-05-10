// ============================================================
// ⚠️ COLOQUE O SEU NÚMERO DE WHATSAPP AQUI (só números)
// Formato: 55 + DDD + número
// Exemplo: "5511999990000"  →  55 (Brasil) + 11 (DDD) + número
// ============================================================
const WHATSAPP_NUMERO = "5511991414943";

// ============================================================
// LISTA DE PRODUTOS
// ============================================================
const products = [
  { id: 1, name: 'Whey Protein 900g',   cat: 'proteína',   price: 189.90, desc: 'Concentrado 80% proteína. Sabor chocolate.', emoji: '🥛', bg: '#e8f4fd', hot: true  },
  { id: 2, name: 'Whey Isolado 1kg',    cat: 'proteína',   price: 259.90, desc: 'Isolado 90%+ proteína. Zero lactose.',        emoji: '🏋️', bg: '#f0e8fd', hot: false },
  { id: 3, name: 'Creatina Mono 300g',  cat: 'creatina',   price:  89.90, desc: 'Monohidratada pura. Força e recuperação.',    emoji: '⚡', bg: '#fff3e0', hot: true  },
  { id: 4, name: 'Pré-Treino Extreme',  cat: 'pré-treino', price: 129.90, desc: 'Energia e foco máximo. 40 doses.',            emoji: '🔥', bg: '#fce8e8', hot: false },
  { id: 5, name: 'Vitamina C 1000mg',   cat: 'vitamina',   price:  49.90, desc: 'Imunidade reforçada. 60 cápsulas.',           emoji: '🍊', bg: '#fff9e6', hot: false },
  { id: 6, name: 'Multivitamínico',     cat: 'vitamina',   price:  69.90, desc: '19 vitaminas e minerais. 60 comprimidos.',    emoji: '💊', bg: '#e8fdf0', hot: false },
  { id: 7, name: 'BCAA 4:1:1 200g',    cat: 'proteína',   price:  79.90, desc: 'Aminoácidos essenciais. Recuperação.',        emoji: '💪', bg: '#fdf0e8', hot: false },
  { id: 8, name: 'Pré-Treino Pump',     cat: 'pré-treino', price: 109.90, desc: 'Vasodilatação intensa. Sabor frutas.',        emoji: '🎯', bg: '#f5e8fd', hot: false },
];

let cart = [];

// ============================================================
// RENDERIZAR PRODUTOS
// ============================================================
function renderProducts(filter) {
  const grid = document.getElementById('productsGrid');
  const lista = (filter === 'todos') ? products : products.filter(p => p.cat === filter);

  grid.innerHTML = lista.map(p => `
    <div class="product-card">
      <div class="product-img" style="background:${p.bg}">${p.emoji}</div>
      <div class="product-info">
        <div class="product-cat">
          ${p.cat}
          ${p.hot ? '<span class="badge">popular</span>' : ''}
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
          <button class="add-btn" onclick="addToCart(${p.id})">+ Adicionar</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// FILTRAR POR CATEGORIA
// ============================================================
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

// ============================================================
// ADICIONAR AO CARRINHO
// ============================================================
function addToCart(id) {
  const produto = products.find(p => p.id === id);
  cart.push(produto);
  document.getElementById('cartCount').textContent = cart.length;
  showToast('✅ ' + produto.name + ' adicionado!');
  renderCart();
}

// ============================================================
// REMOVER DO CARRINHO
// ============================================================
function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById('cartCount').textContent = cart.length;
  renderCart();
}

// ============================================================
// RENDERIZAR CARRINHO
// ============================================================
function renderCart() {
  const container = document.getElementById('cartItems');
  const summary   = document.getElementById('cartSummary');

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart">Seu carrinho está vazio.</div>';
    summary.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <span class="cart-item-name">${item.emoji} ${item.name}</span>
      <span class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
      <span class="remove-btn" onclick="removeFromCart(${i})">✕</span>
    </div>
  `).join('');

  const total = cart.reduce((soma, item) => soma + item.price, 0);

  summary.innerHTML = `
    <div class="cart-total">Total: R$ ${total.toFixed(2).replace('.', ',')}</div>

    <button class="whatsapp-btn" onclick="finalizarPedido()">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Finalizar pelo WhatsApp
    </button>

    <p class="whatsapp-info">
      Você será redirecionado para o WhatsApp com o seu pedido já preenchido.
      Nossa equipe confirmará o pagamento e o envio.
    </p>
  `;
}

// ============================================================
// FINALIZAR PEDIDO VIA WHATSAPP
// ============================================================
function finalizarPedido() {
  if (cart.length === 0) return;

  // Monta a lista de itens
  const itens = cart.map((item, i) =>
    `${i + 1}. ${item.name} — R$ ${item.price.toFixed(2).replace('.', ',')}`
  ).join('\n');

  const total = cart.reduce((soma, item) => soma + item.price, 0);

  // Monta a mensagem completa
  const mensagem =
    `Olá! Gostaria de fazer um pedido na NeuroByte 💪\n\n` +
    `*Meu pedido:*\n${itens}\n\n` +
    `*Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n` +
    `Por favor, me informe sobre formas de pagamento e prazo de entrega. Obrigado!`;

  // Codifica a mensagem para URL e abre o WhatsApp
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// ============================================================
// ABRIR / FECHAR CARRINHO
// ============================================================
function toggleCart() {
  document.getElementById('cartPanel').classList.toggle('open');
  renderCart();
}

// ============================================================
// NOTIFICAÇÃO (TOAST)
// ============================================================
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// Carrega os produtos ao abrir a página
renderProducts('todos');
