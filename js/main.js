/* ===================================
   FrqBit AI — Main JavaScript
   ================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Preloader ==========
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 600);
    });
    // Fallback: hide after 3 seconds
    setTimeout(() => preloader.classList.add('loaded'), 3000);

    // ========== Particles ==========
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        const hue = [250, 320, 180, 30][Math.floor(Math.random() * 4)];
        particle.style.background = `hsl(${hue}, 70%, 60%)`;
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }

    // ========== Navbar Scroll ==========
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 50);
        backToTop.classList.toggle('visible', scrollY > 500);
    });

    // ========== Mobile Menu ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========== Active Nav Link on Scroll ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);

    // ========== Back to Top ==========
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== Stats Counter ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    function animateCounters() {
        if (statsCounted) return;
        const heroSection = document.getElementById('home');
        const rect = heroSection.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
            statsCounted = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-count'));
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    num.textContent = Math.floor(current).toLocaleString();
                }, 30);
            });
        }
    }
    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ========== AOS (Animate on Scroll - Lightweight) ==========
    const aosElements = document.querySelectorAll('[data-aos]');

    function handleAOS() {
        aosElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const delay = parseInt(el.getAttribute('data-delay')) || 0;
            if (rect.top < window.innerHeight - 80) {
                setTimeout(() => el.classList.add('aos-animate'), delay);
            }
        });
    }
    window.addEventListener('scroll', handleAOS);
    handleAOS();

    // ========== Product Filters ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ========== Shopping Cart ==========
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const startShopping = document.getElementById('startShopping');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let cart = JSON.parse(localStorage.getItem('frqbit_cart')) || [];

    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    if (startShopping) {
        startShopping.addEventListener('click', (e) => {
            e.preventDefault();
            closeCart();
        });
    }

    function saveCart() {
        localStorage.setItem('frqbit_cart', JSON.stringify(cart));
    }

    function renderCart() {
        cartCount.textContent = cart.length;
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                    <a href="#products" class="btn btn-primary btn-sm" onclick="document.getElementById('cartSidebar').classList.remove('active');document.getElementById('cartOverlay').classList.remove('active');document.body.style.overflow='';">Start Shopping</a>
                </div>`;
            cartFooter.style.display = 'none';
        } else {
            const icons = ['fa-palette', 'fa-book-open', 'fa-robot', 'fa-graduation-cap', 'fa-mobile-alt', 'fa-chart-line'];
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-icon">
                        <i class="fas ${icons[item.id - 1] || 'fa-box'}"></i>
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <span>$${item.price}</span>
                    </div>
                    <button class="cart-item-remove" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `).join('');
            cartFooter.style.display = 'block';
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            cartTotal.textContent = '$' + total;

            // Attach remove event listeners
            cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.getAttribute('data-index'));
                    const removed = cart.splice(index, 1)[0];
                    saveCart();
                    renderCart();
                    showToast(`Removed "${removed.name}" from cart`, 'info');
                });
            });
        }
    }

    // Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));

            // Check if already in cart
            if (cart.find(item => item.id === id)) {
                showToast(`"${name}" is already in your cart!`, 'info');
                openCart();
                return;
            }

            cart.push({ id, name, price });
            saveCart();
            renderCart();
            showToast(`"${name}" added to cart!`, 'success');

            // Animate button
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            btn.style.background = 'var(--success)';
            btn.style.color = '#fff';
            btn.style.borderColor = 'var(--success)';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add';
                btn.style.background = '';
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 1500);
        });
    });

    // Checkout
    checkoutBtn.addEventListener('click', () => {
        showToast('Checkout coming soon! Stay tuned 🚀', 'info');
    });

    renderCart();

    // ========== Toast Notifications ==========
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.classList.add('toast', `toast-${type}`);
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        toast.innerHTML = `
            <span class="toast-icon"><i class="fas ${icons[type]}"></i></span>
            <span class="toast-message">${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ========== Countdown Timer ==========
    function updateTimer() {
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + 7); // 7-day promo
        endDate.setHours(23, 59, 59, 999);

        // Save end date in localStorage for consistency
        let savedEnd = localStorage.getItem('frqbit_promo_end');
        let end;
        if (savedEnd) {
            end = new Date(savedEnd);
            if (end < now) {
                // Reset if expired
                end = endDate;
                localStorage.setItem('frqbit_promo_end', end.toISOString());
            }
        } else {
            end = endDate;
            localStorage.setItem('frqbit_promo_end', end.toISOString());
        }

        function tick() {
            const now = new Date();
            const diff = end - now;
            if (diff <= 0) {
                document.getElementById('timerDays').textContent = '00';
                document.getElementById('timerHours').textContent = '00';
                document.getElementById('timerMins').textContent = '00';
                document.getElementById('timerSecs').textContent = '00';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            const secs = Math.floor((diff / 1000) % 60);

            document.getElementById('timerDays').textContent = String(days).padStart(2, '0');
            document.getElementById('timerHours').textContent = String(hours).padStart(2, '0');
            document.getElementById('timerMins').textContent = String(mins).padStart(2, '0');
            document.getElementById('timerSecs').textContent = String(secs).padStart(2, '0');
        }

        tick();
        setInterval(tick, 1000);
    }
    updateTimer();

    // ========== Newsletter Form ==========
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            showToast('Thanks for subscribing! 🎉', 'success');
            newsletterForm.reset();
        }
    });

    // ========== Smooth Scroll for all anchor links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== Quick View (Simple Modal) ==========
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const name = card.querySelector('.product-name').textContent;
            showToast(`Quick view for "${name}" coming soon!`, 'info');
        });
    });

});
