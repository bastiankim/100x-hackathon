/* ============================================
   MATRIX VISUAL EFFECTS - effects.js
   THE Hackathon Visual Effects Controller

   Each effect can be toggled on/off individually
   Usage: MatrixEffects.init({ effectName: true/false })
   ============================================ */

const MatrixEffects = (function() {
    'use strict';

    // Default configuration
    const defaultConfig = {
        matrixRain: true,
        glitch: true,
        typing: true,
        scanlines: true,
        buttonGlow: true,
        decode: true,
        mouseTrail: false  // Optional, off by default
    };

    let config = { ...defaultConfig };
    let isInitialized = false;
    let isMobile = window.innerWidth <= 768;

    // ============================================
    // 1. ENHANCED MATRIX RAIN
    // ============================================
    const MatrixRain = {
        canvas: null,
        ctx: null,
        columns: [],
        chars: '01アイウエオカキクケコサシスセソTHE해커톤빌더'.split(''),
        fontSize: 14,
        animationId: null,

        init(canvasId = 'matrixCanvas') {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) {
                console.warn('Matrix canvas not found');
                return;
            }

            this.ctx = this.canvas.getContext('2d');
            this.resize();
            this.animate();

            window.addEventListener('resize', () => this.resize());
        },

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            const columnCount = Math.floor(this.canvas.width / this.fontSize);
            this.columns = [];

            for (let i = 0; i < columnCount; i++) {
                this.columns.push({
                    y: Math.random() * this.canvas.height,
                    speed: 0.3 + Math.random() * 1.2,
                    opacity: 0.1 + Math.random() * 0.3
                });
            }
        },

        animate() {
            const isLightMode = document.body.classList.contains('light-mode');

            // Trail effect
            this.ctx.fillStyle = isLightMode
                ? 'rgba(248, 248, 248, 0.04)'
                : 'rgba(5, 5, 5, 0.04)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.font = `${this.fontSize}px JetBrains Mono, monospace`;

            this.columns.forEach((col, i) => {
                const x = i * this.fontSize;
                const char = this.chars[Math.floor(Math.random() * this.chars.length)];

                // Leading character (brightest)
                const green = isLightMode ? '0, 180, 100' : '0, 255, 136';
                this.ctx.fillStyle = `rgba(${green}, ${col.opacity})`;
                this.ctx.fillText(char, x, col.y);

                col.y += col.speed * this.fontSize * 0.4;

                if (col.y > this.canvas.height && Math.random() > 0.975) {
                    col.y = 0;
                    col.speed = 0.3 + Math.random() * 1.2;
                    col.opacity = 0.1 + Math.random() * 0.3;
                }
            });

            this.animationId = requestAnimationFrame(() => this.animate());
        },

        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        }
    };

    // ============================================
    // 2. THE LOGO GLITCH EFFECT
    // ============================================
    const GlitchEffect = {
        element: null,
        intervalId: null,
        autoGlitchInterval: 5000,

        init() {
            this.element = document.querySelector('.the-text');
            if (!this.element) {
                console.warn('THE text element not found');
                return;
            }

            // Add data attribute for pseudo-element content
            this.element.setAttribute('data-text', this.element.textContent);

            // Enable glitch class on body
            document.body.classList.add('glitch-enabled');

            // Auto glitch every 5 seconds
            this.startAutoGlitch();
        },

        startAutoGlitch() {
            this.intervalId = setInterval(() => {
                if (!isMobile) {
                    this.triggerGlitch();
                }
            }, this.autoGlitchInterval);
        },

        triggerGlitch() {
            if (!this.element) return;

            this.element.classList.add('auto-glitch');
            setTimeout(() => {
                this.element.classList.remove('auto-glitch');
            }, 400);
        },

        destroy() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            document.body.classList.remove('glitch-enabled');
        }
    };

    // ============================================
    // 3. TYPING ANIMATION
    // ============================================
    const TypingEffect = {
        element: null,
        originalText: '',
        typingSpeed: 60,
        startDelay: 500,
        cursor: null,

        init() {
            // Find the subtitle text
            const subtitleEl = document.querySelector('.hero-subtitle');
            if (!subtitleEl) {
                console.warn('Hero subtitle not found');
                return;
            }

            // Get the text content (excluding the arrow)
            const textNode = Array.from(subtitleEl.childNodes)
                .find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());

            if (!textNode) {
                // Try getting from the full text
                this.originalText = 'A Historic Turning Point for Builders';
            } else {
                this.originalText = textNode.textContent.trim();
            }

            // Create typing container
            this.setupTypingElement(subtitleEl);
        },

        setupTypingElement(parent) {
            // Find or create the typing target
            const existingText = parent.innerHTML;
            const arrowSpan = parent.querySelector('.code-prompt');

            // Clear and rebuild
            parent.innerHTML = '';
            if (arrowSpan) {
                parent.appendChild(arrowSpan.cloneNode(true));
                parent.appendChild(document.createTextNode(' '));
            }

            // Create span for typed text
            this.element = document.createElement('span');
            this.element.className = 'typed-text';
            this.element.textContent = '';
            parent.appendChild(this.element);

            // Create cursor
            this.cursor = document.createElement('span');
            this.cursor.className = 'typing-cursor';
            parent.appendChild(this.cursor);

            // Start typing after delay
            setTimeout(() => this.type(), this.startDelay);
        },

        async type() {
            for (let i = 0; i <= this.originalText.length; i++) {
                this.element.textContent = this.originalText.slice(0, i);
                await this.sleep(this.typingSpeed + Math.random() * 30);
            }

            // Keep cursor blinking after complete
            this.element.classList.add('typing-complete');
        },

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        destroy() {
            // Restore original text if needed
        }
    };

    // ============================================
    // 4. SCANLINES OVERLAY
    // ============================================
    const Scanlines = {
        init() {
            document.body.classList.add('scanlines-enabled');
        },

        setStrength(strong = false) {
            if (strong) {
                document.body.classList.add('scanlines-strong');
            } else {
                document.body.classList.remove('scanlines-strong');
            }
        },

        destroy() {
            document.body.classList.remove('scanlines-enabled', 'scanlines-strong');
        }
    };

    // ============================================
    // 5. BUTTON GLOW PULSE
    // ============================================
    const ButtonGlow = {
        init() {
            document.body.classList.add('glow-enabled');
        },

        destroy() {
            document.body.classList.remove('glow-enabled');
        }
    };

    // ============================================
    // 6. TEXT DECODE EFFECT
    // ============================================
    const DecodeEffect = {
        observer: null,
        chars: 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890!@#$%'.split(''),
        decodeDuration: 1000,

        init() {
            // Find elements to decode
            const targets = document.querySelectorAll('[data-decode]');

            if (targets.length === 0) {
                // Auto-add decode to section titles
                this.autoAddTargets();
            }

            this.setupObserver();
        },

        autoAddTargets() {
            // Add decode effect to main headings
            const headings = document.querySelectorAll('.section-label, .chapter-title, .metric-number');
            headings.forEach(el => {
                if (!el.hasAttribute('data-decode')) {
                    el.setAttribute('data-decode', 'true');
                    el.setAttribute('data-original', el.textContent);
                }
            });
        },

        setupObserver() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('decoded')) {
                        this.decode(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            document.querySelectorAll('[data-decode]').forEach(el => {
                this.observer.observe(el);
            });
        },

        async decode(element) {
            const originalText = element.getAttribute('data-original') || element.textContent;
            const length = originalText.length;
            const iterations = 10;
            const stepDuration = this.decodeDuration / iterations;

            element.classList.add('decoding');

            for (let i = 0; i <= iterations; i++) {
                const progress = i / iterations;
                let displayText = '';

                for (let j = 0; j < length; j++) {
                    if (j < length * progress) {
                        displayText += originalText[j];
                    } else {
                        displayText += this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                }

                element.textContent = displayText;
                await new Promise(r => setTimeout(r, stepDuration));
            }

            element.textContent = originalText;
            element.classList.remove('decoding');
            element.classList.add('decoded');
        },

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    };

    // ============================================
    // 7. MOUSE TRAIL EFFECT
    // ============================================
    const MouseTrail = {
        particles: [],
        particleCount: 8,
        mouseX: 0,
        mouseY: 0,
        animationId: null,

        init() {
            if (isMobile) return;

            // Create particles
            for (let i = 0; i < this.particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'mouse-trail-particle';
                particle.style.opacity = 1 - (i / this.particleCount) * 0.8;
                particle.style.transform = `scale(${1 - (i / this.particleCount) * 0.6})`;
                document.body.appendChild(particle);
                this.particles.push({
                    el: particle,
                    x: 0,
                    y: 0
                });
            }

            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            this.animate();
        },

        handleMouseMove(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        },

        animate() {
            let prevX = this.mouseX;
            let prevY = this.mouseY;

            this.particles.forEach((particle, i) => {
                const ease = 0.3 - (i * 0.02);

                particle.x += (prevX - particle.x) * ease;
                particle.y += (prevY - particle.y) * ease;

                particle.el.style.left = `${particle.x}px`;
                particle.el.style.top = `${particle.y}px`;

                prevX = particle.x;
                prevY = particle.y;
            });

            this.animationId = requestAnimationFrame(() => this.animate());
        },

        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            this.particles.forEach(p => p.el.remove());
            this.particles = [];
        }
    };

    // ============================================
    // MAIN CONTROLLER
    // ============================================
    function init(userConfig = {}) {
        if (isInitialized) {
            console.warn('MatrixEffects already initialized');
            return;
        }

        config = { ...defaultConfig, ...userConfig };
        isMobile = window.innerWidth <= 768;

        // Initialize each enabled effect
        if (config.matrixRain && !isMobile) {
            // Matrix rain is handled by existing code, add enhancement class
            document.body.classList.add('matrix-enhanced');
        }

        if (config.glitch) {
            GlitchEffect.init();
        }

        if (config.typing) {
            TypingEffect.init();
        }

        if (config.scanlines && !isMobile) {
            Scanlines.init();
        }

        if (config.buttonGlow) {
            ButtonGlow.init();
        }

        if (config.decode) {
            DecodeEffect.init();
        }

        if (config.mouseTrail && !isMobile) {
            MouseTrail.init();
        }

        isInitialized = true;
        console.log('MatrixEffects initialized', config);
    }

    function destroy() {
        GlitchEffect.destroy();
        Scanlines.destroy();
        ButtonGlow.destroy();
        DecodeEffect.destroy();
        MouseTrail.destroy();
        document.body.classList.remove('matrix-enhanced');
        isInitialized = false;
    }

    // Toggle individual effects
    function toggle(effectName, enabled) {
        switch(effectName) {
            case 'glitch':
                enabled ? GlitchEffect.init() : GlitchEffect.destroy();
                break;
            case 'scanlines':
                enabled ? Scanlines.init() : Scanlines.destroy();
                break;
            case 'buttonGlow':
                enabled ? ButtonGlow.init() : ButtonGlow.destroy();
                break;
            case 'mouseTrail':
                enabled ? MouseTrail.init() : MouseTrail.destroy();
                break;
        }
        config[effectName] = enabled;
    }

    // Trigger glitch manually
    function triggerGlitch() {
        GlitchEffect.triggerGlitch();
    }

    // Public API
    return {
        init,
        destroy,
        toggle,
        triggerGlitch,
        Scanlines,
        GlitchEffect,
        DecodeEffect,
        MouseTrail
    };
})();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with default settings
    MatrixEffects.init({
        matrixRain: true,
        glitch: true,
        typing: true,
        scanlines: true,
        buttonGlow: true,
        decode: true,
        mouseTrail: false  // Enable if you want mouse trail
    });
});
