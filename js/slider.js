document.addEventListener('DOMContentLoaded', function() {

    // Function to initialize a slider
    function initializeSlider(sliderClass, cardClass, prevBtnClass, nextBtnClass, dotsContainerClass) {
        const slider = document.querySelector(sliderClass);
        const prevBtn = document.querySelector(prevBtnClass);
        const nextBtn = document.querySelector(nextBtnClass);
        const dotsContainer = document.querySelector(dotsContainerClass);
        const cards = document.querySelectorAll(`${sliderClass} ${cardClass}`);
        
        if (!slider || cards.length === 0) return; // Exit if elements not found

        let currentIndex = 0;
        let cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(slider).gap); // card width + gap
        
        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = ''; // Clear any existing dots
            cards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
        
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            if (index < 0) index = 0;
            if (index >= cards.length) index = cards.length - 1;
            currentIndex = index;
            slider.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            updateDots();
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Handle scroll events
        slider.addEventListener('scroll', () => {
            const scrollPosition = slider.scrollLeft;
            // Calculate the current index based on scroll position
            currentIndex = Math.round(scrollPosition / cardWidth);
            updateDots();
        });

        // Auto-play functionality (optional)
        let autoplayInterval;
        
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Start autoplay
        startAutoplay(); // Uncomment to enable autoplay
        
        // Pause autoplay on hover
        slider.addEventListener('mouseenter', stopAutoplay); // Uncomment for autoplay pause on hover
        slider.addEventListener('mouseleave', startAutoplay); // Uncomment for autoplay resume on hover

        // Handle window resize
        window.addEventListener('resize', () => {
            // Recalculate card width on resize
            const newCardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
            if (newCardWidth !== cardWidth) {
                cardWidth = newCardWidth;
                goToSlide(currentIndex); // Adjust scroll position
            }
        });

        // Initial state update
        updateDots();
    }

    // Initialize Featured Articles slider
    initializeSlider('.featured-slider', '.featured-card', '.slider-prev', '.slider-next', '.slider-dots');

    // Initialize Latest Articles slider
    initializeSlider('.posts-grid', '.post-card', '.latest-articles-prev', '.latest-articles-next', '.latest-articles-dots');

}); 