// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animation for elements
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .service-card').forEach((el) => {
    observer.observe(el);
});

// Add hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate stats when in view
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50; // Adjust speed of counting

    function updateCount() {
        if (current < target) {
            current += increment;
            stat.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCount);
        } else {
            stat.textContent = target + '+';
        }
    }

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCount();
            statsObserver.unobserve(entries[0].target);
        }
    });

    statsObserver.observe(stat);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Add sending animation
    submitBtn.classList.add('sending');
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

    // Simulate form submission (replace with actual form submission)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    submitBtn.classList.remove('sending');
    submitBtn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
    submitBtn.style.background = '#4CAF50';

    // Reset form
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        submitBtn.style.background = '';
    }, 3000);
});

// Animate contact cards on scroll
const contactCards = document.querySelectorAll('.contact-card');
const socialLinks = document.querySelector('.social-links-container');

const contactObserverOptions = {
    threshold: 0.2
};

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, contactObserverOptions);

// Initial setup for animations
[...contactCards, contactForm, socialLinks].forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    contactObserver.observe(element);
});

// Hover effects for contact icons
const contactIcons = document.querySelectorAll('.contact-item i');

contactIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'scale(1.2) rotate(360deg)';
    });

    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Social buttons hover effect
const socialBtns = document.querySelectorAll('.social-btn');

socialBtns.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        btn.style.transform = 'translateY(-5px)';
    });

    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// Add ripple effect to submit button
submitBtn.addEventListener('click', function(e) {
    let ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}); 