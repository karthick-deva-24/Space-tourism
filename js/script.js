// Page Loader
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.bankio-loader');
    if (loader) {
        // Ensure the loader fades out immediately after DOM parses
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }, 150);
    }
});

// AOS Initialization
AOS.init({
    duration: 800,
    mirror: true,
    once: false,
});

// Scroll Reveal Animation (Intersection Observer) - Keep for non-AOS fallback if any
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
revealElements.forEach(element => revealOnScroll.observe(element));

// Main Nav Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.innerText = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// Login & Email Handling (Logic moved to login.html to match reference)


// Display Email in Dashboard
const emailDisplay = document.getElementById('userEmailDisplay');
if (emailDisplay) {
    const savedEmail = localStorage.getItem('bankio_email');
    if (savedEmail) {
        emailDisplay.innerText = savedEmail;
    }
}

// Dashboard Sidebar Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuToggle.innerText = sidebar.classList.contains('active') ? '✕' : '☰';
    });
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        // Main Nav
        if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.innerText = '☰';
        }
        // Sidebar
        if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            menuToggle.innerText = '☰';
        }
    }
});

// Counter Animation for Stats
const counters = document.querySelectorAll('.counter');
const speed = 200; // The higher the slower

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    const inc = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target;
    }
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});
