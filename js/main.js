/**
 * Main JavaScript File
 * Handles core functionality: navigation, loader, smooth scrolling, etc.
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initThemeToggle();
    initActiveSection();
    initMobileMenu();
    initContactForm();
    initCounters();
});

/**
 * Loader
 */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 800);
    });
}

/**
 * Navigation
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuBtn || !navMenu) return;
    
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Theme Toggle (Dark/Light Mode)
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Save preference
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

/**
 * Active Section Highlight
 */
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Contact Form Handler with Formspree
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        const formData = new FormData(form);
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success!
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                // Error from Formspree
                const data = await response.json();
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            showNotification('Failed to send message. Please try again or email me directly.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

 

/**
 * Animated Counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        // Store target value
        const target = parseInt(counter.textContent);
        counter.setAttribute('data-target', target);
        counter.textContent = '0';
        observer.observe(counter);
    });
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => observer.observe(img));
}

/**
 * Parallax Effect
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/**
 * Initialize AOS (Animate on Scroll)
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

/**
 * Initialize Typed.js
 */
function initTyped() {
    if (typeof Typed !== 'undefined') {
        const typedElement = document.querySelector('.typed-text');
        if (typedElement) {
            new Typed('.typed-text', {
                strings: [
                    'Electronic Engineering Student',
                    'Embedded Systems Developer',
                    'IoT Solutions Architect',
                    'Signal Processing Enthusiast'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        }
    }
}
// ===== PROJECT FILTER FUNCTIONALITY =====
// Add this entire block right here

/**
 * Project Filter Functionality
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
            
            // Re-trigger AOS if available
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
}

// Initialize all on window load
window.addEventListener('load', () => {
    initLazyLoading();
    initParallax();
    initAOS();
    initTyped();
    
    // Add this line to initialize the filter on load
    initProjectFilter();
    initContactForm();
});

