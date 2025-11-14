// ================================
// الرحيق المختوم - Main JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // Navigation Scroll Effect
    // ================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('shadow-2xl');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.classList.remove('shadow-2xl');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        }
        
        // Hide/Show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ================================
    // Mobile Menu Toggle
    // ================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ================================
    // Smooth Scroll for Navigation Links
    // ================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
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
    
    // ================================
    // Intersection Observer for Animations
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation for children
                const children = entry.target.querySelectorAll('.feature-card, .about-card, .product-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-right, .slide-left, .scale-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ================================
    // Products Swiper Slider
    // ================================
    const productSwiper = new Swiper('.productSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });
    
    // ================================
    // Testimonials Swiper Slider
    // ================================
    const testimonialsSwiper = new Swiper('.testimonialsSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });
    
    // ================================
    // Scroll to Top Button
    // ================================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('hidden');
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollToTopBtn.classList.add('hidden');
                }
            }, 300);
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ================================
    // Contact Form Handler
    // ================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            
            // Show success message
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Add ripple effect to submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.classList.add('ripple');
            setTimeout(() => {
                submitBtn.classList.remove('ripple');
            }, 600);
        });
    }
    
    // ================================
    // Notification System
    // ================================
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-4 z-50 p-6 rounded-2xl shadow-2xl transform transition-all duration-500 max-w-md`;
        
        if (type === 'success') {
            notification.className += ' bg-gradient-to-r from-green-500 to-emerald-600 text-white';
        } else if (type === 'error') {
            notification.className += ' bg-gradient-to-r from-red-500 to-rose-600 text-white';
        }
        
        notification.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="text-3xl">
                    ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>'}
                </div>
                <div class="flex-1">
                    <p class="font-bold text-lg">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-2xl hover:scale-110 transition-transform">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
    
    // ================================
    // Add to Cart Animation
    // ================================
    const addToCartButtons = document.querySelectorAll('.product-card button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product name
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Show notification
            showNotification(`تمت إضافة ${productName} إلى السلة بنجاح!`, 'success');
            
            // Add ripple effect
            this.classList.add('ripple');
            setTimeout(() => {
                this.classList.remove('ripple');
            }, 600);
            
            // Animate button
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // ================================
    // Parallax Effect for Hero Section
    // ================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroShapes = document.querySelectorAll('.hero-shape');
        
        heroShapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ================================
    // Counter Animation
    // ================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
    
    // Observe counter elements
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const targetValue = parseInt(entry.target.textContent);
                animateCounter(entry.target, targetValue);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.text-4xl.font-bold').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ================================
    // Image Lazy Loading Enhancement
    // ================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ================================
    // Active Navigation Link Highlighter
    // ================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-amber-600');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-amber-600');
            }
        });
    });
    
    // ================================
    // Preloader (if needed)
    // ================================
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // ================================
    // Dynamic Year for Footer
    // ================================
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', new Date().getFullYear());
    }
    
    // ================================
    // Enhanced Hover Effects
    // ================================
    const cards = document.querySelectorAll('.product-card, .feature-card, .about-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ================================
    // Particle Mouse Follow Effect
    // ================================
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = 0.01 + (index * 0.002);
            const currentX = parseFloat(particle.style.left) || 0;
            const currentY = parseFloat(particle.style.top) || 0;
            
            const newX = currentX + (mouseX - currentX) * speed;
            const newY = currentY + (mouseY - currentY) * speed;
            
            particle.style.left = `${newX}px`;
            particle.style.top = `${newY}px`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Start particle animation
    // animateParticles(); // Uncomment if you want mouse-follow particles
    
    // ================================
    // Console Welcome Message
    // ================================
    console.log('%c🍯 الرحيق المختوم 🍯', 'font-size: 24px; font-weight: bold; color: #f59e0b;');
    console.log('%cللصناعات الغذائية الفاخرة', 'font-size: 16px; color: #22c55e;');
    console.log('%cطعم الطبيعة في كل قطرة 🌿', 'font-size: 14px; color: #666;');
    
});

// ================================
// Service Worker Registration (PWA Support)
// ================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}