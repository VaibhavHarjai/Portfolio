document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Active Navigation Links
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Certificate Slider
    const slider = document.querySelector('.certificate-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.certificate-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (slider && slides.length > 0) {
        // Initialize slider configuration
        const slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        let currentIndex = 0;
        
        // Create dots based on the number of slides to show
        const dotsCount = Math.ceil(slides.length / slidesToShow);
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i * slidesToShow);
            });
            dotsContainer.appendChild(dot);
        }
        
        // Function to update dots active state
        function updateDots() {
            const activeDotIndex = Math.floor(currentIndex / slidesToShow);
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        }
        
        // Function to scroll to specific slide
        function goToSlide(index) {
            if (index < 0) {
                index = slides.length - slidesToShow;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            currentIndex = index;
            const slideWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
            slider.scrollLeft = slideWidth * currentIndex;
            updateDots();
        }
        
        // Event listeners for navigation buttons
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + slidesToShow);
        });
        
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - slidesToShow);
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const newSlidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
            
            if (newSlidesToShow !== slidesToShow) {
                location.reload(); // Reload to adjust the slider configuration
            }
        });
        
        // Optional: Auto scroll for the slider
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                goToSlide(currentIndex + slidesToShow);
            }, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        // Start auto scroll
        startAutoScroll();
        
        // Pause auto scroll on hover
        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to your backend
            // For demonstration, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, subject, message });
            
            // Reset the form
            contactForm.reset();
            
            // Show success message (you can create a better UI for this)
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
    
    // Animation on Scroll (Simple implementation)
    function animateOnScroll() {
        const elements = document.querySelectorAll('.project-card, .about-image, .about-text, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    document.querySelectorAll('.project-card, .about-image, .about-text, .contact-info, .contact-form').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});