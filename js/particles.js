/**
 * Particles.js Configuration
 * Creates interactive particle background
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof particlesJS !== 'undefined') {
        initParticles();
    }
});

function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00d4ff', '#0066ff', '#ff0080']
            },
            shape: {
                type: ['circle', 'triangle', 'edge'],
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00d4ff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: ['grab', 'bubble']
                },
                onclick: {
                    enable: true,
                    mode: ['push', 'remove']
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                bubble: {
                    distance: 200,
                    size: 6,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 3
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

/**
 * Particle Color Based on Theme
 */
function updateParticleColors() {
    const isLightMode = document.body.classList.contains('light-mode');
    const colors = isLightMode 
        ? ['#0066ff', '#00d4ff', '#ff0080']
        : ['#00d4ff', '#0066ff', '#ff0080'];
    
    if (window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS.particles;
        particles.color.value = colors;
        particles.line_linked.color = colors[0];
    }
}

// Listen for theme changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            updateParticleColors();
        }
    });
});

observer.observe(document.body, { attributes: true });