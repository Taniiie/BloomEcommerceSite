/* Bloom Botanical Atelier - Main Logic */

document.addEventListener('DOMContentLoaded', () => {
    initCart();
    initNavigation();
    initAnimations();
});

/**
 * Cart Logic
 */
function initCart() {
    let cart = JSON.parse(localStorage.getItem('bloom_cart')) || [];
    updateCartIcon(cart.length);

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = {
                id: e.target.dataset.id || Math.random().toString(36).substr(2, 9),
                name: e.target.dataset.name || 'Botanical Treasure',
                price: e.target.dataset.price || '0',
                image: e.target.dataset.image || ''
            };
            addToCart(product);
        });
    });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('bloom_cart')) || [];
    cart.push(product);
    localStorage.setItem('bloom_cart', JSON.stringify(cart));
    updateCartIcon(cart.length);
    
    // Simple feedback
    toast(`Added ${product.name} to cart`);
}

function updateCartIcon(count) {
    const cartIcons = document.querySelectorAll('[data-icon="shopping_cart"], [data-icon="shopping_bag"]');
    cartIcons.forEach(icon => {
        // If we want a badge, we could add it here
        if (count > 0) {
            icon.style.fontVariationSettings = "'FILL' 1";
        } else {
            icon.style.fontVariationSettings = "'FILL' 0";
        }
    });
}

/**
 * Navigation & UI
 */
function initNavigation() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-sm');
        } else {
            nav.classList.remove('shadow-sm');
        }
    });

    // Resolve template links if any are left
    document.querySelectorAll('a[href^="{{"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('SCREEN_10')) link.href = 'index.html';
        else if (href.includes('SCREEN_4')) link.href = 'catalog.html';
        else if (href.includes('SCREEN_5')) link.href = 'product.html';
        else if (href.includes('SCREEN_2')) link.href = 'cart.html';
        else if (href.includes('SCREEN_8')) link.href = 'about.html';
        else if (href.includes('SCREEN_6')) link.href = 'journal.html';
        else if (href.includes('SCREEN_9')) link.href = 'sustainability.html';
    });
}

/**
 * Animations
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        // observer.observe(section);
    });
}

/**
 * Utils
 */
function toast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 right-8 bg-on-surface text-surface px-6 py-3 rounded-full text-sm font-label z-[100] shadow-2xl animate-bounce-short';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Add some CSS for the toast and animations programmatically if not in style.css
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce-short {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    .animate-bounce-short {
        animation: bounce-short 0.5s ease-in-out 1;
    }
`;
document.head.appendChild(style);
