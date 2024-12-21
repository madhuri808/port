// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-certificate');
    const closeModal = document.querySelector('.close-modal');
    
    // Certificate Buttons
    document.querySelectorAll('.certificate-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const certId = this.getAttribute('data-certificate');
            // In a real application, you would use actual certificate images
            // For now, using placeholder images
            modalImg.src = `https://placehold.co/800x600?text=${certId}`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Adjust scroll position to account for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & not at top
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or at top
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.project-card, .certificate-card, .skill-card, .contact, .footer-section');
    animatedElements.forEach(element => {
        observer.observe(element);
        element.classList.add('fade-in');
    });

    // Project cards click handling
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Add click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-10px)';
            }, 100);
        });
    });

    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
        } else {
            img.classList.add('loaded');
        }
    });

    // Handle resume download button click
    const resumeButton = document.querySelector('a[download]');
    if (resumeButton) {
        resumeButton.addEventListener('click', (e) => {
            const icon = resumeButton.querySelector('i');
            icon.classList.add('fa-bounce');
            setTimeout(() => {
                icon.classList.remove('fa-bounce');
            }, 1000);
        });
    }

    // Add scroll-based parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            const parallaxValue = scrolled * 0.4;
            heroContent.style.transform = `translateY(${parallaxValue}px)`;
            heroImage.style.transform = `translateY(${parallaxValue * 0.5}px)`;
        }
    });
});

// Add CSS class for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .loading {
        opacity: 0;
        transform: scale(0.9);
    }

    .loaded {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.3s ease-in, transform 0.3s ease-in;
    }
`;
document.head.appendChild(style);