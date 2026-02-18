/**
 * Animations JavaScript File
 * Handles scroll animations, hover effects, and interactive animations
 */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initHoverEffects();
    initMagneticButtons();
    initTextSplit();
    initParallaxTilt();
    initGradientFollow();
});

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-fade, .timeline-item, .project-card, .cert-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'visible');
                
                // Add staggered animation to children
                const children = entry.target.querySelectorAll('[data-delay]');
                children.forEach((child, index) => {
                    const delay = child.dataset.delay || index * 100;
                    setTimeout(() => {
                        child.classList.add('active');
                    }, delay);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Hover Effects
 */
function initHoverEffects() {
    // 3D Tilt Effect
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Glow Effect
    const glowElements = document.querySelectorAll('.glow-effect');
    
    glowElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            el.style.setProperty('--glow-x', `${x}px`);
            el.style.setProperty('--glow-y', `${y}px`);
        });
    });
    
    // Ripple Effect
    const rippleElements = document.querySelectorAll('.ripple-effect');
    
    rippleElements.forEach(el => {
        el.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = el.getBoundingClientRect();
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            el.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Magnetic Buttons
 */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn, .social-icon, .project-link');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Text Split Animation
 */
function initTextSplit() {
    const splitElements = document.querySelectorAll('.split-text');
    
    splitElements.forEach(el => {
        const text = el.textContent;
        const chars = text.split('');
        
        el.innerHTML = chars.map((char, index) => {
            if (char === ' ') return ' ';
            return `<span style="animation-delay: ${index * 50}ms">${char}</span>`;
        }).join('');
    });
}

/**
 * Parallax Tilt
 */
function initParallaxTilt() {
    const parallaxElements = document.querySelectorAll('[data-parallax-tilt]');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallaxTilt || 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/**
 * Gradient Follow
 */
function initGradientFollow() {
    const gradientElements = document.querySelectorAll('.gradient-follow');
    
    gradientElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            el.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 212, 255, 0.15), transparent 50%)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.background = '';
        });
    });
}

/**
 * Floating Animation
 */
function initFloatingElements() {
    const floatElements = document.querySelectorAll('.float-animation');
    
    floatElements.forEach((el, index) => {
        const delay = index * 0.2;
        const duration = 3 + Math.random() * 2;
        
        el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

/**
 * Counter Animation on Scroll
 */
function initCounters() {
    const counterElements = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateValue(el, 0, target, 2000);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => observer.observe(el));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

/**
 * Progress Bar Animation
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width || bar.style.width;
                bar.style.width = width;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

/**
 * Shape Morphing Animation
 */
function initShapeMorph() {
    const shapes = document.querySelectorAll('.morph-shape');
    
    shapes.forEach(shape => {
        setInterval(() => {
            const randomPath = generateRandomPath();
            shape.style.clipPath = randomPath;
        }, 3000);
    });
}

function generateRandomPath() {
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 40 + Math.random() * 20;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        points.push(`${x}% ${y}%`);
    }
    return `polygon(${points.join(', ')})`;
}

// Initialize all animations
window.addEventListener('load', () => {
    initFloatingElements();
    initProgressBars();
    initShapeMorph();
});