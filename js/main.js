document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Search Toggle
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.querySelector('.search-input').focus();
    });
    
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Load More Button
    const loadMoreBtn = document.querySelector('.load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading more posts
            loadMoreBtn.textContent = 'Loading...';
            loadMoreBtn.disabled = true;
            
            setTimeout(() => {
                // In a real app, you would fetch more posts from an API
                const postsGrid = document.querySelector('.posts-grid');
                const newPosts = [
                    {
                        image: 'https://source.unsplash.com/random/400x300/?fashion',
                        category: 'Fashion',
                        title: 'Spring Fashion Trends 2023',
                        excerpt: 'The must-have pieces for your wardrobe this season.',
                        author: 'Sophia Lee',
                        date: 'May 8, 2023'
                    },
                    {
                        image: 'https://source.unsplash.com/random/400x300/?music',
                        category: 'Music',
                        title: 'Best Albums of the Year So Far',
                        excerpt: 'Our picks for the most compelling releases this year.',
                        author: 'Marcus Johnson',
                        date: 'May 6, 2023'
                    },
                    {
                        image: 'https://source.unsplash.com/random/400x300/?business',
                        category: 'Business',
                        title: 'Remote Work Productivity Tips',
                        excerpt: 'How to stay focused and efficient when working from home.',
                        author: 'Jennifer Smith',
                        date: 'May 4, 2023'
                    }
                ];

                newPosts.forEach(post => {
                    const postElement = document.createElement('article');
                    postElement.className = 'post-card';
                    postElement.innerHTML = `
                        <div class="card-image">
                            <img src="${post.image}" alt="Post image" loading="lazy">
                            <span class="category-tag">${post.category}</span>
                        </div>
                        <div class="card-content">
                            <h3><a href="#">${post.title}</a></h3>
                            <p class="card-excerpt">${post.excerpt}</p>
                            <div class="card-meta">
                                <span class="author">By ${post.author}</span>
                                <span class="date">${post.date}</span>
                            </div>
                        </div>
                    `;
                    postsGrid.appendChild(postElement);
                });

                loadMoreBtn.textContent = 'Load More';
                loadMoreBtn.disabled = false;
                
                // Scroll to the newly added posts
                const newPostElements = postsGrid.querySelectorAll('.post-card');
                newPostElements[newPostElements.length - 3].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 1000);
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Newsletter Form Submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple validation
            if (emailInput.value && emailInput.value.includes('@')) {
                // In a real app, you would send this to your backend
                alert('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    });

    // Mobile Dropdown Toggle
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Mobile dropdown toggle clicked!');
            const dropdown = toggle.parentElement;
            dropdown.classList.toggle('active');
        });
    });
});