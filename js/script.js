/* =========================================
   Portfolio Script
   - Theme Toggle (Dark/Light)
   - Mobile Menu
   - Intersection Observer (Scroll Animations)
   - Loading Screen
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loading Screen ---
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500); 
            }, 800); // Slight delay for branding
        });
    }

    // --- 2. Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check localStorage or System Preference
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let targetTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            updateThemeIcon(targetTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        // Simple text/icon swap
        themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        themeToggle.title = theme === 'dark' ? 'تفعيل الوضع المضيء' : 'تفعيل الوضع الليلي';
    }

    // --- 3. Scroll Animations (IntersectionObserver) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-el');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-el');
    hiddenElements.forEach(el => observer.observe(el));

    // --- 4. Portfolio Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // --- 5. Mobile Menu ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '☰';
            });
        });
    }
});
