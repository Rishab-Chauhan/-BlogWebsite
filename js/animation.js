// Animation on Scroll
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer for animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Add animation classes to elements
    const addAnimationClasses = function() {
        const sections = document.querySelectorAll('section');
        const cards = document.querySelectorAll('.featured-card, .post-card, .category-card');
        
        sections.forEach((section, index) => {
            section.classList.add('animate');
            section.style.setProperty('--animation-order', index);
        });
        
        cards.forEach((card, index) => {
            card.classList.add('animate');
            card.style.setProperty('--animation-order', index);
        });
    };

    // Preloader
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        // Simulate loading (in a real app, you'd wait for assets to load)
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            setTimeout(() => {
                preloader.remove();
                addAnimationClasses();
                animateOnScroll();
            }, 500);
        }, 1500);
    } else {
        addAnimationClasses();
        animateOnScroll();
    }

    // Hero scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-line');
    
    if (scrollIndicator) {
        setInterval(() => {
            const dot = document.createElement('div');
            dot.className = 'scroll-dot';
            scrollIndicator.appendChild(dot);
            
            setTimeout(() => {
                dot.remove();
            }, 2000);
        }, 1800);
    }
});