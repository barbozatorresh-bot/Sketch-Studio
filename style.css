/* script.js - Sketch Studio
    Compatible con el index.html corregido.
*/

document.addEventListener('DOMContentLoaded', ()=>{

	/* ========== REFERENCIA DE ELEMENTOS ========== */
	const themeBtn = document.getElementById('themeToggle'); // Usamos el botón del HTML
	const chatInput = document.getElementById('chatInput');
	const chatWindow = document.getElementById('chatWindow');
	const chatBody = document.getElementById('chatBody');
	const cartOverlay = document.getElementById('cartOverlay');
	const cartItemsBox = document.getElementById('cartItems');
	const cartTotalEl = document.getElementById('cartTotal');
	const imgs = Array.from(document.querySelectorAll('.carousel-img'));
	const dots = Array.from(document.querySelectorAll('.dot'));
	const prevBtn = document.getElementById('prevBtn');
	const nextBtn = document.getElementById('nextBtn');
	let idx = imgs.findIndex(i => i.classList.contains('active'));
	if(idx < 0) idx = 0;


	/* ========== UTIL: show first section on load ========== */
	// Esto asegura que la primera sección ('about') siempre se muestre correctamente al cargar.
	const first = document.querySelector('.section');
	if(first){
		first.classList.add('show');
		first.style.display = 'block';
	}


	/* ========== TOGGLE SECTIONS (used by menu onclick="toggle('id')") ========== */
	// Usamos 'toggle' para que coincida con el onclick en el HTML.
	window.toggle = function(id){
		document.querySelectorAll('.section').forEach(s=>{
			s.classList.remove('show');
			s.style.display = 'none';
		});
		const sec = document.getElementById(id);
		if(!sec) return;
		sec.style.display = 'block';
		// slight delay so animation triggers
		requestAnimationFrame(()=> sec.classList.add('show'));
		// center scroll
		sec.scrollIntoView({behavior:'smooth', block:'center'});
	}


	/* ========== THEME BUTTON FUNCIONALIDAD ========== */

	function updateThemeText(){
		if(!themeBtn) return;
		if(document.body.classList.contains('dark')) themeBtn.textContent = '☀️ Modo Claro';
		else themeBtn.textContent = '🌙 Modo Oscuro';
	}

	if(themeBtn) {
		themeBtn.addEventListener('click', ()=>{
			document.body.classList.toggle('dark');
			updateThemeText();
			// optional: persist choice
			try{ localStorage.setItem('sketch-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); }catch(e){}
		});
	}

	// load persisted theme
	try{
		const t = localStorage.getItem('sketch-theme');
		if(t === 'dark') document.body.classList.add('dark');
	}catch(e){}
	updateThemeText();

	/* ========== CAROUSEL ========== */

	function show(i){
		imgs.forEach(img => img.classList.remove('active'));
		dots.forEach(d => d.classList.remove('active'));
		idx = (i + imgs.length) % imgs.length;
		imgs[idx].classList.add('active');
		if(dots[idx]) dots[idx].classList.add('active');
	}

	if(nextBtn) nextBtn.addEventListener('click', ()=> show(idx+1));
	if(prevBtn) prevBtn.addEventListener('click', ()=> show(idx-1));
	dots.forEach((d, i)=> d.addEventListener('click', ()=> show(i)));

	let auto = setInterval(()=> show(idx+1), 4200);
	const wrapper = document.querySelector('.carousel-wrapper');
	if(wrapper){
		wrapper.addEventListener('mouseenter', ()=> clearInterval(auto));
		wrapper.addEventListener('mouseleave', ()=> auto = setInterval(()=> show(idx+1), 4200));
	}

	/* ========== CART (simple in-memory) ========== */
	let cart = {}; // {id: {qty, price, title, img}}

	window.addToCart = function(id){
		const card = document.querySelector(`.product-card[data-id="${id}"]`);
		if(!card) return;
		const price = parseFloat(card.dataset.price) || 0;
		const title = card.querySelector('.product-title')?.innerText || id;
		const img = card.querySelector('img')?.getAttribute('src') || '';
		if(!cart[id]) cart[id] = { qty: 0, price, title, img };
		cart[id].qty++;
		renderCart();
		// open overlay
		if(cartOverlay) cartOverlay.style.display = 'flex';
	}

	function renderCart(){
		if(!cartItemsBox || !cartTotalEl) return;
		cartItemsBox.innerHTML = '';
		let total = 0;
		const keys = Object.keys(cart);
		if(keys.length === 0){
			cartItemsBox.innerHTML = '<div style="text-align:center;color:#777">Tu carrito está vacío</div>';
		} else {
			keys.forEach(k=>{
				const it = cart[k];
				total += it.qty * it.price;
				const node = document.createElement('div');
				node.className = 'cart-item';
				node.innerHTML = `
					<img src="${it.img}" alt="${it.title}">
					<div style="flex:1">
						<div style="font-weight:700;color:var(--primary)">${it.title}</div>
						<div style="color:#666;font-size:.92rem">S/ ${it.price.toFixed(2)} x ${it.qty}</div>
					</div>
					<div style="display:flex;flex-direction:column;gap:6px;align-items:center">
						<button class="qty-btn" data-action="inc" data-id="${k}">＋</button>
						<button class="qty-btn" data-action="dec" data-id="${k}">−</button>
					</div>
				`;
				cartItemsBox.appendChild(node);
			});
		}
		cartTotalEl.innerText = `Total: S/ ${total.toFixed(2)}`;
	}

	if(cartItemsBox){
		cartItemsBox.addEventListener('click', (e)=>{
			const btn = e.target.closest('.qty-btn');
			if(!btn) return;
			const id = btn.dataset.id;
			if(btn.dataset.action === 'inc') { cart[id].qty++; renderCart(); }
			if(btn.dataset.action === 'dec') { cart[id].qty--; if(cart[id].qty<=0) delete cart[id]; renderCart(); }
		});
	}

	window.toggleCart = function(){
		if(!cartOverlay) return;
		if(cartOverlay.style.display === 'flex') cartOverlay.style.display = 'none';
		else cartOverlay.style.display = 'flex';
	}
	window.clearCart = function(){ cart = {}; renderCart(); }
	window.checkout = function(){
		if(!cartOverlay) return;
		const keys = Object.keys(cart);
		if(keys.length === 0){ alert('Tu carrito está vacío.'); return; }
		let summary = 'Resumen de compra:\n\n';
		let total = 0;
		keys.forEach(k=>{
			const it = cart[k];
			summary += `${it.title} x ${it.qty} — S/ ${(it.price * it.qty).toFixed(2)}\n`;
			total += it.price * it.qty;
		});
		summary += `\nTotal: S/ ${total.toFixed(2)}\n\nGracias — Esto es una simulación.`;
		alert(summary);
		cart = {}; renderCart(); cartOverlay.style.display = 'none';
	}

	renderCart(); // initial

	/* ========== CHATBOT (FAQ simple) ========== */

	window.toggleChat = function(){
		if(!chatWindow) return;
		chatWindow.style.display = (chatWindow.style.display === 'flex') ? 'none' : 'flex';
	}

	window.appendMessage = function(text, who='bot'){
		if(!chatBody) return;
		const d = document.createElement('div');
		d.className = 'chat-msg ' + (who === 'bot' ? 'bot' : 'user');
		d.innerText = text;
		chatBody.appendChild(d);
		chatBody.scrollTop = chatBody.scrollHeight;
	}

	window.sendMessage = function(){
		if(!chatInput) return;
		const txt = (chatInput.value || '').trim();
		if(!txt) return;
		appendMessage(txt, 'user');
		chatInput.value = '';
		const t = txt.toLowerCase();
		setTimeout(()=>{
			if(t.includes('precio') || t.includes('cost') ) appendMessage('Nuestros precios: Sticker Pack S/5 (15 stickers), Keychain S/8.');
			else if(t.includes('envio') || t.includes('shipping')) appendMessage('Envíos locales por cobrar o recojo en persona. Tiempo: 2–5 días hábiles.');
			else if(t.includes('pago') || t.includes('paypal') || t.includes('metodo')) appendMessage('Aceptamos transferencia bancaria o pago en efectivo al recojo. (Simulación).');
			else if(t.includes('stock') || t.includes('disponible')) appendMessage('Generalmente tenemos stock. Si está agotado, avisamos y ofrecemos reposición.');
			else if(t.includes('hola') || t.includes('buenas')) appendMessage('¡Hola! Pregunta por "precio", "envio", "pago" o "stock".');
			else appendMessage('Lo siento, soy un bot simple. Intenta con palabras: precio, envio, pago, stock.');
		}, 600);
	}

	// send when press Enter
	if(chatInput){
		chatInput.addEventListener('keydown', (e)=>{
			if(e.key === 'Enter') sendMessage();
		});
	}

	/* ========== keyboard shortcuts (optional) ========== */
	document.addEventListener('keydown', (e)=>{
		if(e.key === 'm' && (e.ctrlKey || e.metaKey)){ // Ctrl/Cmd + M toggles theme
			document.body.classList.toggle('dark');
			updateThemeText();
		}
	});

	// set ARIA roles for accessibility
	const dotsEls = document.querySelectorAll('.dot');
	dotsEls.forEach((d,i)=>{
		d.setAttribute('role','button');
		d.setAttribute('aria-label', 'Imagen ' + (i+1));
		d.tabIndex = 0;
		d.addEventListener('keydown', (ev)=>{ if(ev.key === 'Enter') show(i); });
	});

}); // DOMContentLoaded end
