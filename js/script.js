// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
});

// Close menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Simple scroll animation observer
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Update copyright year automatically
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Handle form submission and show success message
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the form data
    var formData = new FormData(this);

    // Submit the form using fetch
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Hide the form and show success message
            document.getElementById('contact-form').style.display = 'none';
            document.getElementById('success-message').classList.remove('hidden');

            // Reset form after 5 seconds
            setTimeout(function() {
                document.getElementById('contact-form').reset();
                document.getElementById('contact-form').style.display = 'block';
                document.getElementById('success-message').classList.add('hidden');
            }, 5000);
        } else {
            // Handle error
            alert('Oops! There was a problem submitting your form');
        }
    })
    .catch(error => {
        // Handle network error
        alert('Oops! There was a problem submitting your form');
    });
});