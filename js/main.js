/* ===================================
   FrqBit AI — Product Platform
   Dynamic product showcase with CRUD
   ================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Default Products ==========
    const DEFAULT_PRODUCTS = [
        {
            id: 'vocab-memory-ai',
            name: 'Vocab Memory AI',
            tagline: 'Master English with 15 AI-powered learning methods',
            description: '15 science-backed learning methods powered by GPT-4o. AI stories, word roots, spaced repetition, visual memory, flashcards, pronunciation & more — all working together to make vocabulary unforgettable.',
            price: 'From $5/mo',
            category: 'learning',
            url: 'https://vocab-memory-ai.vercel.app',
            icon: 'fas fa-brain',
            features: [
                '15 Learning Methods',
                'GPT-4o Powered Content',
                'Spaced Repetition (SM-2)',
                'AI Memory Stories',
                'Word DNA Root Analysis',
                'Visual Memory & Sketching'
            ],
            isDefault: true
        }
    ];

    // ========== Products State ==========
    const STORAGE_KEY = 'frqbit_products';

    function loadProducts() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Ensure default product always exists
                const hasDefault = parsed.some(p => p.id === 'vocab-memory-ai');
                if (!hasDefault) {
                    return [...DEFAULT_PRODUCTS, ...parsed];
                }
                return parsed;
            } catch {
                return [...DEFAULT_PRODUCTS];
            }
        }
        return [...DEFAULT_PRODUCTS];
    }

    function saveProducts(products) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }

    let products = loadProducts();

    // ========== Category config ==========
    const CATEGORIES = {
        ai:           { label: '🧠 AI Tool',       gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' },
        learning:     { label: '📚 Learning',       gradient: 'linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%)' },
        productivity: { label: '🎯 Productivity',   gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)' },
        'dev-tool':   { label: '🛠️ Dev Tool',       gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' },
        other:        { label: '📦 Other',           gradient: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' },
    };

    // ========== Render Products ==========
    const productsGrid = document.getElementById('productsGrid');

    function renderProducts() {
        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="products-empty">
                    <i class="fas fa-box-open"></i>
                    <p>No products yet</p>
                    <span>Click "Add New Product" below to get started</span>
                </div>`;
            return;
        }

        productsGrid.innerHTML = products.map(product => {
            const cat = CATEGORIES[product.category] || CATEGORIES.other;
            const features = (product.features || []).slice(0, 4);

            return `
                <div class="p-card" data-id="${product.id}">
                    <div class="p-card-banner" style="background: ${cat.gradient};">
                        <i class="${product.icon || 'fas fa-box'}"></i>
                        <span class="p-card-category-badge">${cat.label}</span>
                        ${!product.isDefault ? `
                        <div class="p-card-actions-top">
                            <button class="delete-product-btn" data-id="${product.id}" title="Delete product">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>` : ''}
                    </div>
                    <div class="p-card-body">
                        <h3 class="p-card-name">${escapeHtml(product.name)}</h3>
                        <p class="p-card-tagline">${escapeHtml(product.tagline)}</p>
                        ${product.description ? `<p class="p-card-desc">${escapeHtml(product.description)}</p>` : ''}
                        ${features.length > 0 ? `
                        <ul class="p-card-features">
                            ${features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
                        </ul>` : ''}
                        <div class="p-card-footer">
                            <span class="p-card-price">${escapeHtml(product.price || 'Free')}</span>
                            <a href="${escapeHtml(product.url)}" target="_blank" rel="noopener" class="p-card-link">
                                <i class="fas fa-external-link-alt"></i> Visit
                            </a>
                        </div>
                    </div>
                </div>`;
        }).join('');

        // Attach delete handlers
        productsGrid.querySelectorAll('.delete-product-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                const product = products.find(p => p.id === id);
                if (product && confirm(`Delete "${product.name}"?`)) {
                    products = products.filter(p => p.id !== id);
                    saveProducts(products);
                    renderProducts();
                    updateFooterLinks();
                    showToast(`"${product.name}" deleted`, 'info');
                }
            });
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ========== Add Product Modal ==========
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const productModalOverlay = document.getElementById('productModalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const addProductForm = document.getElementById('addProductForm');

    function openModal() {
        productModal.classList.add('active');
        productModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus first input
        setTimeout(() => document.getElementById('prodName').focus(), 300);
    }

    function closeModal() {
        productModal.classList.remove('active');
        productModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        addProductForm.reset();
    }

    addProductBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalCancelBtn.addEventListener('click', closeModal);
    productModalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ========== Form Submit — Add Product ==========
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('prodName').value.trim();
        const tagline = document.getElementById('prodTagline').value.trim();
        const description = document.getElementById('prodDescription').value.trim();
        const price = document.getElementById('prodPrice').value.trim();
        const category = document.getElementById('prodCategory').value;
        const url = document.getElementById('prodUrl').value.trim();
        const icon = document.getElementById('prodIcon').value.trim() || 'fas fa-box';
        const featuresRaw = document.getElementById('prodFeatures').value.trim();
        const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(Boolean) : [];

        if (!name || !tagline || !url) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        // Generate unique ID
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

        const newProduct = {
            id,
            name,
            tagline,
            description,
            price: price || 'Free',
            category,
            url,
            icon,
            features,
            isDefault: false,
            addedAt: new Date().toISOString()
        };

        products.push(newProduct);
        saveProducts(products);
        renderProducts();
        updateFooterLinks();
        closeModal();
        showToast(`"${name}" added successfully! 🎉`, 'success');

        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    // ========== Footer Product Links ==========
    function updateFooterLinks() {
        const footerList = document.getElementById('footerProductLinks');
        if (!footerList) return;
        footerList.innerHTML = products.map(p =>
            `<li><a href="${escapeHtml(p.url)}" target="_blank">${escapeHtml(p.name)}</a></li>`
        ).join('');
    }

    // ========== Preloader ==========
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 600);
    });
    setTimeout(() => preloader.classList.add('loaded'), 3000);

    // ========== Particles ==========
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
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
    }

    // ========== Navbar Scroll ==========
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (navbar) navbar.classList.toggle('scrolled', scrollY > 50);
        if (backToTop) backToTop.classList.toggle('visible', scrollY > 500);
    });

    // ========== Mobile Menu ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
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
    }

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
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== Stats Counter ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    function animateCounters() {
        if (statsCounted) return;
        const heroSection = document.getElementById('home');
        if (!heroSection) return;
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

    // ========== AOS (Animate on Scroll) ==========
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
        if (toastContainer) toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ========== Countdown Timer ==========
    function updateTimer() {
        const timerDays = document.getElementById('timerDays');
        if (!timerDays) return;

        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + 7);
        endDate.setHours(23, 59, 59, 999);

        let savedEnd = localStorage.getItem('frqbit_promo_end');
        let end;
        if (savedEnd) {
            end = new Date(savedEnd);
            if (end < now) {
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
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                showToast('Thanks for subscribing! 🎉', 'success');
                newsletterForm.reset();
            }
        });
    }

    // ========== Smooth Scroll for all anchor links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== Init ==========
    renderProducts();
    updateFooterLinks();

});
