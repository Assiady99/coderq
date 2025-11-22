// ================================
// الرحيق المختوم - Main JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function () {

    // ================================
    // Navigation Scroll Effect
    // ================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
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
        mobileMenuBtn.addEventListener('click', function () {
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
            link.addEventListener('click', function () {
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
        link.addEventListener('click', function (e) {
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

    const observer = new IntersectionObserver(function (entries) {
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

    initSwipers();

    // ================================
    // Scroll to Top Button
    // ================================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function () {
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

    scrollToTopBtn.addEventListener('click', function () {
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
        contactForm.addEventListener('submit', function (e) {
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
        button.addEventListener('click', function (e) {
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
    window.addEventListener('scroll', function () {
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
    const counterObserver = new IntersectionObserver(function (entries) {
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

    const imageObserver = new IntersectionObserver(function (entries) {
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

    window.addEventListener('scroll', function () {
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
    window.addEventListener('load', function () {
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
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ================================
    // Particle Mouse Follow Effect
    // ================================
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function (e) {
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
console.log(`
╔═══════════════════════════════╗
║   🚀 Developed by Ali Assiady   ║
║   💻 Portfolio: assiady99.github.io/coderq ║
║   📧 Contact: alialsyadyalsyady@gmail.com ║
╚═══════════════════════════════╝
`);

});

// ================================
// Service Worker Registration (PWA Support)
// ================================


// Global Swiper Instances
let productSwiper;
let testimonialsSwiper;

function initSwipers() {
    // Destroy existing instances if they exist
    if (productSwiper) productSwiper.destroy(true, true);
    if (testimonialsSwiper) testimonialsSwiper.destroy(true, true);

    // Products Swiper
    productSwiper = new Swiper('.productSwiper', {
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

    // Testimonials Swiper
    testimonialsSwiper = new Swiper('.testimonialsSwiper', {
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
}

// ================================
// Language Toggle System
// ================================
const translations = {
    ar: {
        nav: {
            home: 'الرئيسية',
            about: 'عن الشركة',
            products: 'المنتجات',
            why_us: 'لماذا نحن',
            testimonials: 'آراء العملاء',
            contact: 'اتصل بنا',
            order: 'اطلب الآن'
        },
        hero: {
            title: 'الرحيق المختوم',
            subtitle1: 'طعم',
            subtitle2: 'الطبيعة',
            subtitle3: 'في كل قطرة',
            description: 'نقدم لكم أجود أنواع المواد الغذائية والمشروبات المختارة بعناية لتلبي جميع احتياجاتكم اليومية. جودة لا تضاهى وخدمة لا مثيل لها.',
            discover: 'اكتشف منتجاتنا',
            contact: 'تواصل معنا'
        },
        about: {
            title: 'من نحن',
            journey: 'رحلتنا نحو',
            excellence: 'التميز',
            text1: 'الرحيق المختوم للصناعات الغذائية هي شركة رائدة في مجال تصنيع وتوزيع المنتجات الغذائية عالية الجودة. نحن نؤمن بأن الطعام الجيد يبدأ من مكونات طبيعية وممارسات تصنيع متقدمة.',
            text2: 'نسعى لتقديم منتجات غذائية استثنائية تجمع بين الأصالة والابتكار، مع الحفاظ على أعلى معايير الجودة والسلامة الغذائية.',
            years: 'سنة خبرة',
            products: 'منتج متنوع',
            clients: 'عميل سعيد'
        },
        categories: {
            title: 'أصنافنا المميزة',
            subtitle: 'اكتشف مجموعة أصنافنا المتنوعة والمختارة بعناية لتلبي جميع أذواقكم واحتياجاتكم اليومية.',
            water: 'المياه',
            water_desc: 'مياه معبأة نقية من أفضل المصادر الطبيعية، غنية بالمعادن والعناصر الأساسية للصحة.',
            soda: 'المشروبات الغازية',
            soda_desc: 'تشكيلة متنوعة من المشروبات الغازية المنعشة، تلبي جميع الأذواق والاحتياجات.',
            juice: 'العصائر',
            juice_desc: 'عصائر طبيعية 100% من أفضل الفواكه، غنية بالفيتامينات والعناصر الغذائية.',
            dairy: 'الألبان',
            dairy_desc: 'منتجات ألبان طازجة وعالية الجودة، مصدر غني بالكالسيوم والبروتين.',
            legumes: 'البقوليات',
            legumes_desc: 'بقوليات طازجة ومجففة من أفضل المحاصيل، غنية بالألياف والبروتينات.'
        },
        products: {
            title: 'منتجاتنا المميزة',
            subtitle: 'اكتشف مجموعتنا الفاخرة من المنتجات الطبيعية عالية الجودة',
            bestseller: 'الأكثر مبيعاً',
            water_title: 'مياه معدنية طبيعية',
            water_desc: 'مياه نقية من أفضل المصادر الطبيعية، غنية بالمعادن والعناصر الأساسية للصحة والحيوية',
            reviews1: '(320 تقييم)',
            new: 'جديد',
            soda_title: 'مشروب غازي منعش',
            soda_desc: 'مشروب غازي منعش بنكهة الليمون الطبيعية، مثالي للترطيب والانتعاش في الأيام الحارة',
            reviews2: '(220 تقييم)',
            exclusive: 'حصري',
            juice_title: 'عصير برتقال طبيعي',
            juice_desc: 'عصير برتقال طازج 100% طبيعي، غني بفيتامين C والعناصر الغذائية الأساسية للصحة والمناعة',
            reviews3: '(280 تقييم)',
            dairy_title: 'لبن زبادي طبيعي',
            dairy_desc: 'لبن زبادي طازج وطبيعي 100%، غني بالبروتينات والكالسيوم والبكتيريا النافعة للهضم',
            reviews4: '(240 تقييم)',
            special: 'مميز',
            legumes_title: 'فاصولياء حمراء طازجة',
            legumes_desc: 'فاصولياء حمراء طازجة ومختارة بعناية، غنية بالبروتينات والألياف والعناصر الغذائية الأساسية',
            reviews5: '(190 تقييم)'
        },
        common: {
            order_now: 'اطلب الان'
        },
        why_us: {
            title: 'لماذا نحن الأفضل',
            subtitle: 'نتميز بالجودة والنقاء والخبرة الطويلة في صناعة المنتجات الغذائية الفاخرة',
            feature1_title: '100% طبيعي',
            feature1_desc: 'جميع منتجاتنا طبيعية 100% بدون أي إضافات أو مواد حافظة، نقاء تام من الطبيعة',
            feature2_title: 'جودة معتمدة',
            feature2_desc: 'حاصلون على شهادات الجودة العالمية ونلتزم بأعلى معايير الصحة والسلامة',
            feature3_title: 'توصيل سريع',
            feature3_desc: 'نوفر خدمة توصيل سريعة لجميع مناطق المملكة مع تغليف محكم يضمن سلامة المنتج',
            feature4_title: 'دعم متواصل',
            feature4_desc: 'فريق دعم فني متاح على مدار الساعة للإجابة على استفساراتكم وخدمتكم'
        },
        testimonials: {
            title: 'آراء عملائنا',
            subtitle: 'ثقة عملائنا هي أكبر شهادة على جودة منتجاتنا وخدماتنا',
            review1: '"منتجات رائعة وجودة ممتازة! عسل السدر من أفضل ما جربت، طعمه طبيعي ونقي. أنصح الجميع بتجربة منتجات الرحيق المختوم."',
            name1: 'أحمد محمد',
            city1: 'صنعاء',
            review2: '"خدمة توصيل سريعة وتغليف ممتاز. المنتجات طبيعية 100% والفرق واضح في الطعم والجودة. شكراً لفريق الرحيق المختوم."',
            name2: 'فاطمة العلي',
            city2: 'صنعاء',
            review3: '"أثق تماماً بجودة منتجاتهم، عسل المانوكا ممتاز وأستخدمه لعائلتي. التعامل احترافي والأسعار مناسبة للجودة العالية."',
            name3: 'خالد السعيد',
            city3: 'صنعاء'
        },
        contact: {
            title: 'تواصل معنا',
            subtitle: 'نسعد بتواصلكم واستفساراتكم، فريقنا جاهز لخدمتكم',
            form_title: 'أرسل لنا رسالة',
            name: 'الاسم الكامل',
            name_placeholder: 'أدخل اسمك الكامل',
            email: 'البريد الإلكتروني',
            phone: 'رقم الجوال',
            message: 'الرسالة',
            message_placeholder: 'اكتب رسالتك هنا...',
            send: 'إرسال الرسالة',
            call_us: 'اتصل بنا',
            email_us: 'البريد الإلكتروني',
            location: 'موقعنا',
            address: 'صنعاء - اليمن<br>شارع الزبيري - مقابل السوق المركزي',
            hours: 'ساعات العمل',
            work_days: 'السبت - الخميس: 8 صباحاً - 8 مساءً',
            friday: 'الجمعة: مغلق'
        },
        footer: {
            company_name: 'الرحيق المختوم',
            company_desc: 'شركة رائدة في صناعة المواد الغذائية الفاخرة منذ عام 2008',
            quick_links: 'روابط سريعة',
            services: 'خدماتنا',
            service_1: 'التوصيل المجاني',
            service_2: 'الشحن السريع',
            service_3: 'الدفع عند الاستلام',
            service_4: 'ضمان الجودة',
            service_5: 'استرجاع المبالغ',
            newsletter: 'النشرة البريدية',
            newsletter_desc: 'اشترك لتصلك أحدث العروض والمنتجات',
            email_placeholder: 'بريدك الإلكتروني',
            subscribe: 'اشترك الآن',
            follow_us: 'تابعنا على',
            copyright: 'جميع الحقوق محفوظة © 2025',
            designed_by: 'صُمم بكل',
            in_yemen: 'في الجمهورية اليمنية'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About Us',
            products: 'Products',
            why_us: 'Why Us',
            testimonials: 'Testimonials',
            contact: 'Contact Us',
            order: 'Order Now'
        },
        hero: {
            title: 'Al-Rahiq Al-Makhtum',
            subtitle1: 'Taste of',
            subtitle2: 'Nature',
            subtitle3: 'in Every Drop',
            description: 'We offer you the finest quality food and beverages, carefully selected to meet all your daily needs. Unmatched quality and unparalleled service.',
            discover: 'Discover Products',
            contact: 'Contact Us'
        },
        about: {
            title: 'About Us',
            journey: 'Our Journey to',
            excellence: 'Excellence',
            text1: 'Al-Rahiq Al-Makhtum Food Industries is a leading company in the manufacturing and distribution of high-quality food products. We believe that good food starts with natural ingredients and advanced manufacturing practices.',
            text2: 'We strive to provide exceptional food products that combine authenticity and innovation, while maintaining the highest standards of quality and food safety.',
            years: 'Years Experience',
            products: 'Diverse Products',
            clients: 'Happy Clients'
        },
        categories: {
            title: 'Our Categories',
            subtitle: 'Discover our diverse range of carefully selected categories to meet all your tastes and daily needs.',
            water: 'Water',
            water_desc: 'Pure bottled water from the best natural sources, rich in minerals and essential elements for health.',
            soda: 'Soft Drinks',
            soda_desc: 'A variety of refreshing soft drinks, meeting all tastes and needs.',
            juice: 'Juices',
            juice_desc: '100% natural juices from the best fruits, rich in vitamins and nutrients.',
            dairy: 'Dairy',
            dairy_desc: 'Fresh and high-quality dairy products, a rich source of calcium and protein.',
            legumes: 'Legumes',
            legumes_desc: 'Fresh and dried legumes from the best crops, rich in fiber and proteins.'
        },
        products: {
            title: 'Featured Products',
            subtitle: 'Discover our luxury collection of high-quality natural products',
            bestseller: 'Best Seller',
            water_title: 'Natural Mineral Water',
            water_desc: 'Pure water from the best natural sources, rich in minerals and essential elements for health and vitality',
            reviews1: '(320 Reviews)',
            new: 'New',
            soda_title: 'Refreshing Soft Drink',
            soda_desc: 'Refreshing soft drink with natural lemon flavor, perfect for hydration and refreshment on hot days',
            reviews2: '(220 Reviews)',
            exclusive: 'Exclusive',
            juice_title: 'Natural Orange Juice',
            juice_desc: '100% fresh natural orange juice, rich in Vitamin C and essential nutrients for health and immunity',
            reviews3: '(280 Reviews)',
            dairy_title: 'Natural Yogurt',
            dairy_desc: '100% fresh and natural yogurt, rich in proteins, calcium, and beneficial bacteria for digestion',
            reviews4: '(240 Reviews)',
            special: 'Special',
            legumes_title: 'Fresh Red Beans',
            legumes_desc: 'Fresh and carefully selected red beans, rich in proteins, fiber, and essential nutrients',
            reviews5: '(190 Reviews)'
        },
        common: {
            order_now: 'Order Now'
        },
        why_us: {
            title: 'Why Choose Us',
            subtitle: 'We are distinguished by quality, purity, and long experience in the luxury food industry',
            feature1_title: '100% Natural',
            feature1_desc: 'All our products are 100% natural with no additives or preservatives, pure from nature',
            feature2_title: 'Certified Quality',
            feature2_desc: 'We hold international quality certificates and adhere to the highest health and safety standards',
            feature3_title: 'Fast Delivery',
            feature3_desc: 'We provide fast delivery service to all regions of the Kingdom with secure packaging ensuring product safety',
            feature4_title: 'Continuous Support',
            feature4_desc: 'Technical support team available around the clock to answer your inquiries and serve you'
        },
        testimonials: {
            title: 'Client Testimonials',
            subtitle: 'Our clients\' trust is the greatest testimony to the quality of our products and services',
            review1: '"Great products and excellent quality! Sidr honey is one of the best I\'ve tried, tastes natural and pure. I recommend everyone to try Al-Rahiq Al-Makhtum products."',
            name1: 'Ahmed Mohamed',
            city1: 'Sanaa',
            review2: '"Fast delivery service and excellent packaging. Products are 100% natural and the difference is clear in taste and quality. Thanks to Al-Rahiq Al-Makhtum team."',
            name2: 'Fatima Al-Ali',
            city2: 'Sanaa',
            review3: '"I completely trust the quality of their products, Manuka honey is excellent and I use it for my family. Professional dealing and prices are suitable for high quality."',
            name3: 'Khaled Al-Saeed',
            city3: 'Sanaa'
        },
        contact: {
            title: 'Contact Us',
            subtitle: 'We are happy to receive your communications and inquiries, our team is ready to serve you',
            form_title: 'Send us a message',
            name: 'Full Name',
            name_placeholder: 'Enter your full name',
            email: 'Email Address',
            phone: 'Phone Number',
            message: 'Message',
            message_placeholder: 'Write your message here...',
            send: 'Send Message',
            call_us: 'Call Us',
            email_us: 'Email Address',
            location: 'Our Location',
            address: 'Sanaa - Yemen<br>Zubairi Street - Opposite Central Market',
            hours: 'Working Hours',
            work_days: 'Saturday - Thursday: 8 AM - 8 PM',
            friday: 'Friday: Closed'
        },
        footer: {
            company_name: 'Al-Rahiq Al-Makhtum',
            company_desc: 'Leading company in luxury food industry since 2008',
            quick_links: 'Quick Links',
            services: 'Our Services',
            service_1: 'Free Delivery',
            service_2: 'Fast Shipping',
            service_3: 'Cash on Delivery',
            service_4: 'Quality Guarantee',
            service_5: 'Money Back',
            newsletter: 'Newsletter',
            newsletter_desc: 'Subscribe to get latest offers and products',
            email_placeholder: 'Your Email Address',
            subscribe: 'Subscribe Now',
            follow_us: 'Follow Us',
            copyright: 'All Rights Reserved © 2025',
            designed_by: 'Designed with',
            in_yemen: 'in Yemen'
        }
    }
};

function toggleLanguage() {
    const html = document.documentElement;
    const currentLang = html.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';

    changeLanguage(newLang);
}

function changeLanguage(lang) {
    const html = document.documentElement;

    // Update HTML attributes
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update Meta Tags & Title
    if (lang === 'en') {
        document.title = "Alrahiq Almakhtum | Premium Food Industries";
        document.querySelector('meta[name="description"]').setAttribute("content", "Alrahiq Almakhtum - A leading company in the premium food industry, offering the best natural products of honey, juices, and dairy.");
        document.querySelector('meta[name="keywords"]').setAttribute("content", "Alrahiq Almakhtum, food, honey, juices, dairy, natural products, Yemen, food industry");
        document.querySelector('meta[property="og:title"]').setAttribute("content", "Alrahiq Almakhtum | Premium Food Industries");
        document.querySelector('meta[property="og:description"]').setAttribute("content", "Alrahiq Almakhtum - A leading company in the premium food industry.");
        document.querySelector('meta[property="og:locale"]').setAttribute("content", "en_US");
    } else {
        document.title = "الرحيق المختوم | صناعات غذائية فاخرة";
        document.querySelector('meta[name="description"]').setAttribute("content", "الرحيق المختوم - شركة رائدة في صناعة المواد الغذائية الفاخرة، نقدم أفضل المنتجات الطبيعية من العسل، العصائر، والألبان.");
        document.querySelector('meta[name="keywords"]').setAttribute("content", "الرحيق المختوم, مواد غذائية, عسل, عصائر, ألبان, منتجات طبيعية, اليمن, صناعة غذائية");
        document.querySelector('meta[property="og:title"]').setAttribute("content", "الرحيق المختوم | صناعات غذائية فاخرة");
        document.querySelector('meta[property="og:description"]').setAttribute("content", "الرحيق المختوم - شركة رائدة في صناعة المواد الغذائية الفاخرة، نقدم أفضل المنتجات الطبيعية.");
        document.querySelector('meta[property="og:locale"]').setAttribute("content", "ar_SA");
    }

    // Update Text Content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }

        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // For inputs, we might want to update placeholder, but usually labels are enough.
                // If we have placeholders, we can handle them separately or use another attribute.
            } else {
                element.innerHTML = value;
            }
        }
    });

    // Update Placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let value = translations[lang];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }

        if (value) {
            element.placeholder = value;
        }
    });

    // Update Button Text
    const langText = document.getElementById('lang-text');
    const langTextMobiles = document.querySelectorAll('.lang-text-mobile');
    const newLangText = lang === 'ar' ? 'English' : 'العربية';

    if (langText) langText.textContent = newLangText;
    langTextMobiles.forEach(el => el.textContent = newLangText);

    // Save preference
    localStorage.setItem('preferred-language', lang);

    // Update Font Family based on language
    if (lang === 'en') {
        document.body.style.fontFamily = "'Tajawal', sans-serif"; // Tajawal works well for English too, or switch to Inter/Roboto
    } else {
        document.body.style.fontFamily = "'Tajawal', sans-serif";
    }

    // Update Swiper Direction (Re-init to fix loop and direction)
    initSwipers();
}

// Initialize Language
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('preferred-language') || 'ar';
    if (savedLang !== 'ar') {
        changeLanguage(savedLang);
    }
});