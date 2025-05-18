document.addEventListener('DOMContentLoaded', () => {
    // --- Universe Background Animation ---
    const canvas = document.getElementById('universe-bg');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const numParticles = 180; // Slightly more particles

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        // Re-initialize particles on resize to ensure they are within new bounds
        if (particles.length > 0) initParticles();
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.8 + 0.3; // Slightly adjusted size
            this.speedX = (Math.random() * 0.3 - 0.15) * 0.4; // Slower, more ambient
            this.speedY = (Math.random() * 0.3 - 0.15) * 0.4;
            
            const randColor = Math.random();
            if (randColor < 0.4) { // More chance for Emerald
                this.color = `rgba(0, 194, 146, ${Math.random() * 0.4 + 0.2})`; // Emerald Green
            } else if (randColor < 0.7) { // Cyan next
                this.color = `rgba(0, 224, 255, ${Math.random() * 0.4 + 0.2})`;  // Cyan Accent
            } else { // White/light grey
                this.color = `rgba(200, 220, 220, ${Math.random() * 0.5 + 0.3})`; // Lighter, slightly cyan-tinted white
            }
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width) this.speedX *= -1; // Bounce off sides
            if (this.y < 0 || this.y > height) this.speedY *= -1; // Bounce off top/bottom
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    initParticles(); // Initial call

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- Scroll Animations for Sections ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.section-futuristic, .futuristic-card, .plan-card, .features-list li, .service-block');
    elementsToAnimate.forEach(el => scrollObserver.observe(el));
    
    // --- Glitch text setup for hero H1 (and logo) ---
    // This is mostly CSS driven now, but if you need dynamic text for glitch:
    document.querySelectorAll('.glitch-hero, .glitch').forEach(glitchElement => {
        const text = glitchElement.dataset.text;
        // For the CSS driven animation, ensure the data-text attribute is present
        // If you were to use a JS-based glitch, you'd manipulate spans here.
        // The current CSS handles it well with :before and :after pseudo-elements.
        // This script part is now more of a placeholder if more complex JS glitch needed.
    });

    // --- Hamburger Menu Toggle ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Optional: Change hamburger icon
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked (for SPA-like navigation)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a:not(.dropdown-content a)'); // Exclude dropdown items for main section highlighting

    function changeNavActiveState() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // 100 is offset for navbar height
        
        navLinks.forEach((link) => link.classList.remove('active'));
        
        // Ensure the link exists before trying to add 'active' class
        if (sections[index]) {
            const activeLink = document.querySelector(`.nav-menu a[href*="${sections[index].id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');

                // Handle dropdown parent highlighting
                const parentDropdown = activeLink.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelector('.dropbtn').classList.add('active');
                } else {
                    // If not in a dropdown, remove active from any dropbtn
                    document.querySelectorAll('.nav-menu .dropbtn.active').forEach(db => db.classList.remove('active'));
                }
            }
        }
    }

    // Initial call for page load
    changeNavActiveState();
    window.addEventListener('scroll', changeNavActiveState);

});