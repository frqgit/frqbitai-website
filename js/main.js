/* ===================================
   FrqBit AI — Product Platform
   Dynamic product showcase with CRUD
   Full Category & Sub-Category System
   ================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Category Taxonomy ==========
    const CATEGORY_TREE = {
        'software': {
            label: 'Software & Apps', icon: 'fas fa-laptop-code', emoji: '🖥️',
            gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            subs: {
                'web-apps':           'Web Applications (SaaS)',
                'mobile-apps':        'Mobile Apps',
                'desktop-software':   'Desktop Software',
                'browser-extensions': 'Browser Extensions',
                'plugins-addons':     'Plugins & Add-ons',
                'api-services':       'API & Cloud Services'
            }
        },
        'ai-ml': {
            label: 'AI & Machine Learning', icon: 'fas fa-brain', emoji: '🧠',
            gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            subs: {
                'ai-assistants':  'AI Tools & Assistants',
                'ai-prompts':     'ChatGPT & AI Prompts',
                'ai-models':      'AI Models & Datasets',
                'ai-art':         'AI Art & Image Generation',
                'ai-writing':     'AI Writing & Content',
                'ai-automation':  'AI Automation & Bots'
            }
        },
        'education': {
            label: 'Education & E-Learning', icon: 'fas fa-graduation-cap', emoji: '📚',
            gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            subs: {
                'online-courses':    'Online Courses',
                'tutorials':         'Tutorials & Guides',
                'language-learning': 'Language Learning',
                'ebooks-textbooks':  'eBooks & Textbooks',
                'worksheets':        'Worksheets & Workbooks',
                'test-prep':         'Certification & Test Prep',
                'coaching':          'Coaching & Mentoring'
            }
        },
        'design': {
            label: 'Design & Creative Assets', icon: 'fas fa-palette', emoji: '🎨',
            gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
            subs: {
                'graphic-design': 'Graphics & Illustrations',
                'ui-ux':          'UI/UX Kits & Design Systems',
                'icons':          'Icons & Icon Packs',
                'fonts':          'Fonts & Typography',
                'logos':          'Logos & Branding Kits',
                'mockups':        'Mockups & Wireframes',
                '3d-assets':      '3D Models & Assets'
            }
        },
        'templates': {
            label: 'Templates & Themes', icon: 'fas fa-file-alt', emoji: '📄',
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            subs: {
                'website-templates':  'Website Templates & Themes',
                'notion-templates':   'Notion Templates',
                'spreadsheets':       'Spreadsheet & Excel Templates',
                'resume-cv':          'Resume & CV Templates',
                'presentations':      'Presentation Templates',
                'email-templates':    'Email Templates',
                'social-templates':   'Social Media Templates'
            }
        },
        'photo-video': {
            label: 'Photography & Video', icon: 'fas fa-camera', emoji: '📸',
            gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
            subs: {
                'stock-photos':    'Stock Photos & Images',
                'video-templates': 'Video Templates & Intros',
                'presets':         'Lightroom & Camera Presets',
                'luts':            'LUTs & Color Grading',
                'footage':         'Video Footage & B-Roll',
                'overlays':        'Overlays & Textures'
            }
        },
        'audio': {
            label: 'Audio & Music', icon: 'fas fa-music', emoji: '🎵',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
            subs: {
                'music-beats':   'Music & Beats',
                'sound-effects': 'Sound Effects (SFX)',
                'podcast':       'Podcast Templates & Tools',
                'audio-plugins': 'Audio Plugins (VST/AU)',
                'sample-packs':  'Sample & Loop Packs'
            }
        },
        'ebooks': {
            label: 'eBooks & Written Content', icon: 'fas fa-book', emoji: '📖',
            gradient: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
            subs: {
                'fiction':            'Fiction & Stories',
                'non-fiction':        'Non-Fiction & Self-Help',
                'journals':           'Journals, Planners & Diaries',
                'writing-templates':  'Writing Templates',
                'research':           'Research & White Papers',
                'newsletters':        'Newsletters & Zines'
            }
        },
        'marketing': {
            label: 'Marketing & Business', icon: 'fas fa-chart-line', emoji: '📊',
            gradient: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
            subs: {
                'marketing-kits':   'Marketing Templates & Kits',
                'business-plans':   'Business Plans & Strategy',
                'sales-funnels':    'Sales Funnels & Landing Pages',
                'seo-tools':        'SEO Tools & Guides',
                'social-marketing': 'Social Media Marketing',
                'ad-creatives':     'Ad Templates & Creatives'
            }
        },
        'development': {
            label: 'Development & Code', icon: 'fas fa-code', emoji: '💻',
            gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
            subs: {
                'source-code':   'Source Code & Scripts',
                'wordpress':     'WordPress Themes & Plugins',
                'shopify':       'Shopify Themes & Apps',
                'code-snippets': 'Code Snippets & Libraries',
                'starter-kits':  'Boilerplates & Starter Kits',
                'dev-tools':     'Developer Tools & Utilities',
                'no-code':       'No-Code & Low-Code Tools'
            }
        },
        'gaming': {
            label: 'Gaming & Entertainment', icon: 'fas fa-gamepad', emoji: '🎮',
            gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            subs: {
                'game-assets':    'Game Assets & Sprites',
                'game-templates': 'Game Templates & Engines',
                'mods-skins':     'Mods, Skins & Add-ons',
                'streaming':      'Streaming Overlays & Alerts',
                'tabletop':       'Tabletop & RPG Resources',
                'vr-ar':          'VR & AR Content'
            }
        },
        'health': {
            label: 'Health & Fitness', icon: 'fas fa-heartbeat', emoji: '💪',
            gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
            subs: {
                'workout-plans':    'Workout & Exercise Plans',
                'meal-plans':       'Meal Plans & Recipes',
                'fitness-trackers': 'Fitness Trackers & Logs',
                'meditation':       'Meditation & Mindfulness',
                'health-guides':    'Health & Wellness Guides'
            }
        },
        'finance': {
            label: 'Finance & Investing', icon: 'fas fa-coins', emoji: '💰',
            gradient: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)',
            subs: {
                'trading-tools':  'Trading Tools & Bots',
                'budgeting':      'Budget & Finance Templates',
                'investing':      'Investment Guides & Courses',
                'crypto':         'Crypto Tools & Analysis',
                'tax-accounting': 'Tax & Accounting Templates'
            }
        },
        'productivity': {
            label: 'Productivity & Tools', icon: 'fas fa-bullseye', emoji: '🎯',
            gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
            subs: {
                'productivity-apps':  'Productivity Apps',
                'automation':         'Automation & Workflows',
                'project-management': 'Project Management',
                'scheduling':         'Calendar & Scheduling',
                'habit-trackers':     'Habit & Goal Trackers',
                'checklists':         'Checklists & SOPs'
            }
        },
        'printables': {
            label: 'Printables & Digital Art', icon: 'fas fa-print', emoji: '🖨️',
            gradient: 'linear-gradient(135deg, #d946ef 0%, #ec4899 100%)',
            subs: {
                'wall-art':           'Wall Art & Posters',
                'stickers':           'Stickers, Labels & Tags',
                'invitations':        'Invitations & Greeting Cards',
                'coloring':           'Coloring Pages',
                'planner-printables': 'Planner & Calendar Printables',
                'craft-patterns':     'Craft & Sewing Patterns'
            }
        }
    };

    // ========== Default Products ==========
    const DEFAULT_PRODUCTS = [
        {
            id: 'vocab-memory-ai',
            name: 'Vocab Memory AI',
            tagline: 'Master English with 15 AI-powered learning methods',
            description: '15 science-backed learning methods powered by GPT-4o. AI stories, word roots, spaced repetition, visual memory, flashcards, pronunciation & more — all working together to make vocabulary unforgettable.',
            price: 'From $5/mo',
            category: 'education',
            subcategory: 'language-learning',
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
                const hasDefault = parsed.some(p => p.id === 'vocab-memory-ai');
                if (!hasDefault) {
                    return [...DEFAULT_PRODUCTS, ...parsed];
                }
                // Update default product if schema changed
                return parsed.map(p => {
                    if (p.id === 'vocab-memory-ai') {
                        return { ...DEFAULT_PRODUCTS[0], ...p, category: 'education', subcategory: 'language-learning' };
                    }
                    // Ensure subcategory field exists for older products
                    if (!p.subcategory) p.subcategory = '';
                    return p;
                });
            } catch {
                return [...DEFAULT_PRODUCTS];
            }
        }
        return [...DEFAULT_PRODUCTS];
    }

    function saveProducts(prods) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prods));
    }

    let products = loadProducts();

    // ========== Filter State ==========
    let activeFilter = { category: 'all', subcategory: 'all' };

    // ========== Helpers ==========
    function getBadgeLabel(catKey, subKey) {
        const cat = CATEGORY_TREE[catKey];
        if (!cat) return '📦 Other';
        if (subKey && cat.subs && cat.subs[subKey]) {
            return `${cat.emoji} ${cat.subs[subKey]}`;
        }
        return `${cat.emoji} ${cat.label}`;
    }

    function getCatGradient(catKey) {
        const cat = CATEGORY_TREE[catKey];
        return cat ? cat.gradient : 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)';
    }

    // ========== Render Products ==========
    const productsGrid = document.getElementById('productsGrid');

    function getFilteredProducts() {
        if (activeFilter.category === 'all') return products;
        let filtered = products.filter(p => p.category === activeFilter.category);
        if (activeFilter.subcategory !== 'all') {
            filtered = filtered.filter(p => p.subcategory === activeFilter.subcategory);
        }
        return filtered;
    }

    function renderProducts() {
        const filtered = getFilteredProducts();

        if (filtered.length === 0) {
            const isFiltered = activeFilter.category !== 'all';
            productsGrid.innerHTML = `
                <div class="products-empty">
                    <i class="fas fa-${isFiltered ? 'filter' : 'box-open'}"></i>
                    <p>${isFiltered ? 'No products in this category yet' : 'No products yet'}</p>
                    <span>${isFiltered ? 'Try selecting a different category or add a new product' : 'Click "Add New Product" below to get started'}</span>
                </div>`;
            return;
        }

        productsGrid.innerHTML = filtered.map(product => {
            const gradient = getCatGradient(product.category);
            const badge = getBadgeLabel(product.category, product.subcategory);
            const features = (product.features || []).slice(0, 4);

            return `
                <div class="p-card" data-id="${product.id}">
                    <div class="p-card-banner" style="background: ${gradient};">
                        <i class="${product.icon || 'fas fa-box'}"></i>
                        <span class="p-card-category-badge">${badge}</span>
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

    // ========== Mega Menu (Nav Dropdown) ==========
    function renderMegaMenu() {
        const megaDropdown = document.getElementById('megaDropdown');
        if (!megaDropdown) return;

        const catKeys = Object.keys(CATEGORY_TREE);
        // Distribute categories across 4 columns
        const cols = [[], [], [], []];
        catKeys.forEach((key, i) => cols[i % 4].push(key));

        let totalSubs = 0;
        catKeys.forEach(k => { totalSubs += Object.keys(CATEGORY_TREE[k].subs).length; });

        megaDropdown.innerHTML = `
            <div class="mega-header">
                <span class="mega-title"><i class="fas fa-th-large"></i> All Categories</span>
                <span class="mega-count">${catKeys.length} categories · ${totalSubs} types</span>
            </div>
            <div class="mega-grid">
                ${cols.map(col => `
                    <div class="mega-col">
                        ${col.map(key => {
                            const cat = CATEGORY_TREE[key];
                            return `
                                <div class="mega-cat-group">
                                    <h4>
                                        <a href="#products" class="mega-cat-link" data-cat="${key}">
                                            <i class="${cat.icon}"></i> ${cat.label}
                                        </a>
                                    </h4>
                                    <ul>
                                        ${Object.entries(cat.subs).map(([subKey, subLabel]) => `
                                            <li><a href="#products" class="mega-sub-link" data-cat="${key}" data-sub="${subKey}">${subLabel}</a></li>
                                        `).join('')}
                                    </ul>
                                </div>`;
                        }).join('')}
                    </div>
                `).join('')}
            </div>`;

        // Mega menu click handlers — category
        megaDropdown.querySelectorAll('.mega-cat-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                setFilter(link.dataset.cat, 'all');
                closeMegaMenu();
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Mega menu click handlers — subcategory
        megaDropdown.querySelectorAll('.mega-sub-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                setFilter(link.dataset.cat, link.dataset.sub);
                closeMegaMenu();
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // Mega menu open/close
    const navDropdownItem = document.getElementById('navProductsDropdown');

    function closeMegaMenu() {
        if (navDropdownItem) navDropdownItem.classList.remove('mega-open');
    }

    if (navDropdownItem) {
        const navLinkDropdown = navDropdownItem.querySelector('.nav-link-dropdown');

        navLinkDropdown.addEventListener('click', (e) => {
            e.preventDefault();
            if (navDropdownItem.classList.contains('mega-open')) {
                closeMegaMenu();
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            } else {
                navDropdownItem.classList.add('mega-open');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navDropdownItem.contains(e.target)) {
                closeMegaMenu();
            }
        });
    }

    // ========== Filter Bar ==========
    const categoryFilterBar = document.getElementById('categoryFilterBar');
    const subFilterBar = document.getElementById('subFilterBar');

    function renderFilterBar() {
        if (!categoryFilterBar) return;

        let html = `<button class="cat-filter-chip ${activeFilter.category === 'all' ? 'active' : ''}" data-cat="all">🏪 All Products</button>`;
        Object.entries(CATEGORY_TREE).forEach(([key, cat]) => {
            html += `<button class="cat-filter-chip ${activeFilter.category === key ? 'active' : ''}" data-cat="${key}">${cat.emoji} ${cat.label}</button>`;
        });
        categoryFilterBar.innerHTML = html;

        // Attach click handlers
        categoryFilterBar.querySelectorAll('.cat-filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                setFilter(chip.dataset.cat, 'all');
            });
        });

        renderSubFilterBar();
    }

    function renderSubFilterBar() {
        if (!subFilterBar) return;

        if (activeFilter.category === 'all') {
            subFilterBar.innerHTML = '';
            return;
        }

        const cat = CATEGORY_TREE[activeFilter.category];
        if (!cat || !cat.subs) {
            subFilterBar.innerHTML = '';
            return;
        }

        let html = `<button class="sub-filter-chip ${activeFilter.subcategory === 'all' ? 'active' : ''}" data-sub="all">All ${cat.label}</button>`;
        Object.entries(cat.subs).forEach(([subKey, subLabel]) => {
            html += `<button class="sub-filter-chip ${activeFilter.subcategory === subKey ? 'active' : ''}" data-sub="${subKey}">${subLabel}</button>`;
        });
        subFilterBar.innerHTML = html;

        subFilterBar.querySelectorAll('.sub-filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                activeFilter.subcategory = chip.dataset.sub;
                renderSubFilterBar();
                renderProducts();
            });
        });
    }

    function setFilter(cat, sub) {
        activeFilter.category = cat;
        activeFilter.subcategory = sub || 'all';
        renderFilterBar();
        renderProducts();
    }

    // ========== Populate Modal Category Selects ==========
    const prodCategorySelect = document.getElementById('prodCategory');
    const prodSubcategorySelect = document.getElementById('prodSubcategory');

    function populateCategorySelect() {
        if (!prodCategorySelect) return;
        let html = '<option value="">— Select Category —</option>';
        Object.entries(CATEGORY_TREE).forEach(([key, cat]) => {
            html += `<option value="${key}">${cat.emoji} ${cat.label}</option>`;
        });
        prodCategorySelect.innerHTML = html;
    }

    function onCategoryChange() {
        const catKey = prodCategorySelect.value;
        if (!catKey || !CATEGORY_TREE[catKey]) {
            prodSubcategorySelect.innerHTML = '<option value="">— Select Category First —</option>';
            prodSubcategorySelect.disabled = true;
            return;
        }
        const cat = CATEGORY_TREE[catKey];
        let html = '<option value="">— Select Sub-Category —</option>';
        Object.entries(cat.subs).forEach(([subKey, subLabel]) => {
            html += `<option value="${subKey}">${subLabel}</option>`;
        });
        prodSubcategorySelect.innerHTML = html;
        prodSubcategorySelect.disabled = false;
    }

    if (prodCategorySelect) {
        prodCategorySelect.addEventListener('change', onCategoryChange);
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
        setTimeout(() => document.getElementById('prodName').focus(), 300);
    }

    function closeModal() {
        productModal.classList.remove('active');
        productModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        addProductForm.reset();
        // Reset subcategory select
        if (prodSubcategorySelect) {
            prodSubcategorySelect.innerHTML = '<option value="">— Select Category First —</option>';
            prodSubcategorySelect.disabled = true;
        }
    }

    addProductBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalCancelBtn.addEventListener('click', closeModal);
    productModalOverlay.addEventListener('click', closeModal);

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
        const subcategory = document.getElementById('prodSubcategory').value;
        const url = document.getElementById('prodUrl').value.trim();
        const icon = document.getElementById('prodIcon').value.trim() || 'fas fa-box';
        const featuresRaw = document.getElementById('prodFeatures').value.trim();
        const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(Boolean) : [];

        if (!name || !tagline || !url || !category) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

        const newProduct = {
            id,
            name,
            tagline,
            description,
            price: price || 'Free',
            category,
            subcategory: subcategory || '',
            url,
            icon,
            features,
            isDefault: false,
            addedAt: new Date().toISOString()
        };

        products.push(newProduct);
        saveProducts(products);

        // If a filter is active, switch to the new product's category
        setFilter(category, subcategory || 'all');

        updateFooterLinks();
        closeModal();
        showToast(`"${name}" added successfully! 🎉`, 'success');

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
    renderMegaMenu();
    renderFilterBar();
    populateCategorySelect();
    renderProducts();
    updateFooterLinks();

});
