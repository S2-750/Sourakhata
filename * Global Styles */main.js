// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    
    // Enable scrolling after preloader is gone
    setTimeout(() => {
        document.body.style.overflow = 'visible';
    }, 500);
});

// Set body overflow to hidden initially for preloader
document.body.style.overflow = 'hidden';

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Scroll Animation for Elements
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form elements
        const formElements = contactForm.elements;
        let isValid = true;
        
        // Simple validation
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].type !== 'submit' && formElements[i].value.trim() === '') {
                isValid = false;
                formElements[i].classList.add('error');
            } else if (formElements[i].type !== 'submit') {
                formElements[i].classList.remove('error');
            }
        }
        
        if (isValid) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = '<p><i class="fas fa-check-circle"></i> Message envoyé avec succès!</p>';
            
            // Add to DOM
            const container = document.querySelector('.contact .container');
            container.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
            
            // Reset form
            contactForm.reset();
        } else {
            // Error notification
            const notification = document.createElement('div');
            notification.className = 'notification error';
            notification.innerHTML = '<p><i class="fas fa-exclamation-circle"></i> Veuillez remplir tous les champs.</p>';
            
            // Add to DOM
            const container = document.querySelector('.contact .container');
            container.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
        }
    });
}

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add loading animation to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === category) {
                card.classList.remove('hidden');
                
                // Add fade-in animation
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// CV Modal
const openCVBtn = document.getElementById('openCV');
const cvModal = document.getElementById('cvModal');
const closeModal = document.querySelector('.close-modal');

// Open modal when clicking the CV button
if (openCVBtn) {
    openCVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        cvModal.classList.add('show');
    });
}

// Close modal when clicking the X
if (closeModal) {
    closeModal.addEventListener('click', () => {
        cvModal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = 'visible'; // Re-enable scrolling
        }, 300);
    });
}

// Close modal when clicking outside of the modal content
window.addEventListener('click', (e) => {
    if (e.target === cvModal) {
        cvModal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = 'visible'; // Re-enable scrolling
        }, 300);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal.classList.contains('show')) {
        cvModal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = 'visible'; // Re-enable scrolling
        }, 300);
    }
}); 