// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    
    // Simulate form submission
    alert('메시지가 전송되었습니다! 감사합니다.');
    this.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Simple initialization
window.addEventListener('load', () => {
    // Page is fully loaded
    console.log('Page loaded successfully');
});

// Add floating animation to hero avatar
const heroAvatar = document.querySelector('.hero-avatar');
if (heroAvatar) {
    setInterval(() => {
        heroAvatar.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            heroAvatar.style.transform = 'translateY(0)';
        }, 1000);
    }, 2000);
}

// Add parallax effect to hero section (disabled to prevent overlap)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.3}px)`;
//     }
// });

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add active navigation highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: #3498db !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeStyle);

// Back to Top Button functionality
const backToTopBtn = document.getElementById('backToTop');

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation
window.addEventListener('load', () => {
    const pageLoader = document.getElementById('pageLoader');
    
    // Hide loader with animation
    setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add('hidden');
        }
        document.body.classList.add('loaded');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            if (pageLoader && pageLoader.parentNode) {
                pageLoader.parentNode.removeChild(pageLoader);
            }
        }, 500);
    }, 800); // Show loader for minimum 800ms
});



// CV Download functionality
document.getElementById('downloadCV').addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
        // Fetch the PDF file
        const response = await fetch('Dongwook_Kwon_Resume.pdf');
        
        if (!response.ok) {
            throw new Error('Failed to fetch PDF file');
        }
        
        // Convert to blob
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Dongwook_Kwon_Resume.pdf';
        
        // Append to body, click, and remove
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up
        window.URL.revokeObjectURL(url);
        
        // Show notification
        showNotification('CV downloaded successfully!');
        
    } catch (error) {
        console.error('Error downloading CV:', error);
        
        // Fallback: try direct link
        const a = document.createElement('a');
        a.href = 'Dongwook_Kwon_Resume.pdf';
        a.download = 'Dongwook_Kwon_Resume.pdf';
        a.target = '_blank';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showNotification('CV download initiated!');
    }
});

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth + '%';
    });
}

// Intersection Observer for skill bars
const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });



// Enhanced Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat .number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        // Add a small delay for staggered effect
        const delay = [...counters].indexOf(counter) * 200;
        setTimeout(() => {
            updateCounter();
        }, delay);
    });
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced scroll animations
const scrollAnimationOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollAnimationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, scrollAnimationOptions);

// Add scroll animations to various elements
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .education-item, .publication-item, .award-item, .contact-item, .leadership-simple, .role-item, .overview-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        scrollAnimationObserver.observe(el);
    });
    
    // Add staggered animation delays
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add staggered animation delays for leadership items
    const leadershipItems = document.querySelectorAll('.role-item');
    leadershipItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delays for overview cards
    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Add typewriter effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});

// Award Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('awardModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');
    const clickableAwards = document.querySelectorAll('.clickable-award');
    const clickableExperiences = document.querySelectorAll('.clickable-experience');

    // Open modal when award item is clicked
    clickableAwards.forEach(award => {
        award.addEventListener('click', function() {
            const imagePath = this.getAttribute('data-award-image');
            const imageTitle = this.getAttribute('data-award-title');
            
            // Check if image exists, if not show placeholder
            const img = new Image();
            img.onload = function() {
                modalImage.src = imagePath;
                modalCaption.textContent = imageTitle;
                modal.style.display = 'block';
                setTimeout(() => modal.classList.add('show'), 10);
            };
            
            img.onerror = function() {
                // Show placeholder or error message if image doesn't exist
                modalImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjlmOWY5Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+7IiY7IOB7IKs7KeE7J2EIOykgOu5hO2VmOqzoCDsnojsirXri4jri6Q8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+YXdhcmRzL+2PtOuNlOyXkCDsmIjlp4nsnYQg7Yq567OE7Juc7ISc7JqULjwvdGV4dD4KPC9zdmc+';
                modalCaption.textContent = imageTitle + ' (수상 사진을 awards/ 폴더에 추가해주세요)';
                modal.style.display = 'block';
                setTimeout(() => modal.classList.add('show'), 10);
            };
            
            img.src = imagePath;
        });
    });

    // Open modal when experience item is clicked
    clickableExperiences.forEach(experience => {
        experience.addEventListener('click', function() {
            const imagePath = this.getAttribute('data-exp-image');
            const imageTitle = this.getAttribute('data-exp-title');
            
            // Check if image exists, if not show placeholder
            const img = new Image();
            img.onload = function() {
                modalImage.src = imagePath;
                modalCaption.textContent = imageTitle;
                modal.style.display = 'block';
                setTimeout(() => modal.classList.add('show'), 10);
            };
            
            img.onerror = function() {
                // Show placeholder or error message if image doesn't exist
                modalImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjlmOWY5Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+7JeF66y07IKs7KeE7J2EIOykgOu5hO2VmOqzoCDsirXri4jri6QuPC90ZXh0Pgo8L3N2Zz4=';
                modalCaption.textContent = imageTitle + ' (업무 사진을 experiences/ 폴더에 추가해주세요)';
                modal.style.display = 'block';
                setTimeout(() => modal.classList.add('show'), 10);
            };
            
            img.src = imagePath;
        });
    });

    // Close modal when X button is clicked
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    });
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            const btnText = this.querySelector('.btn-text');
            const btnLoading = this.querySelector('.btn-loading');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;
            
            // Create mailto link with form data
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:dongwook.kwon@mail.utoronto.ca?subject=${subject}&body=${body}`;
            
            // Simulate processing time
            setTimeout(() => {
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Email client opened! Thank you for reaching out.', 'success');
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
            }, 1500);
        });
    }
});

// Service Worker Registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content is available, show update notification
                            showNotification('New version available! Refresh to update.');
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Enhanced notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 350px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
} 

// Accordion functionality for mobile experience section
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const toggleButton = item.querySelector('.accordion-toggle');
        const experienceInfo = item.querySelector('.experience-info');
        const companyLogo = item.querySelector('.company-logo');
        
        if (toggleButton) {
            toggleButton.addEventListener('click', (e) => {
                // Prevent event bubbling to avoid triggering image modal
                e.stopPropagation();
                
                // Only enable accordion on mobile
                if (window.innerWidth <= 768) {
                    toggleAccordion(item, accordionItems);
                }
            });
        }
        
        // On mobile: experience info area should toggle accordion
        if (experienceInfo) {
            experienceInfo.addEventListener('click', (e) => {
                // Only on mobile, make experience info toggle accordion
                if (window.innerWidth <= 768) {
                    e.stopPropagation();
                    toggleAccordion(item, accordionItems);
                }
            });
        }
        
        // On mobile: company logo should still trigger image modal (remove stopPropagation)
        if (companyLogo) {
            companyLogo.addEventListener('click', (e) => {
                // On mobile, allow logo to trigger modal (don't stop propagation)
                if (window.innerWidth <= 768) {
                    // Let the event bubble up to trigger the modal
                    return;
                } else {
                    // On desktop, prevent any accordion behavior
                    e.stopPropagation();
                }
            });
        }
    });
}

function toggleAccordion(currentItem, allItems) {
    // Close all other accordion items
    allItems.forEach(otherItem => {
        if (otherItem !== currentItem) {
            otherItem.classList.remove('active');
        }
    });
    
    // Toggle current item
    currentItem.classList.toggle('active');
}

// Initialize accordion when DOM is loaded
document.addEventListener('DOMContentLoaded', initAccordion);

// Re-initialize on window resize to handle desktop/mobile transition
window.addEventListener('resize', () => {
    // Remove active class on desktop
    if (window.innerWidth > 768) {
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
    }
}); 