// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const selectedPackage = document.getElementById('package').value;
            const message = document.getElementById('message').value;
            
            // Create mailto link
            const mailtoLink = `mailto:webreachconnect@gmail.com?subject=Website Inquiry: ${selectedPackage}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0APackage: ${selectedPackage}%0D%0A%0D%0AMessage: ${message}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Clear form
            contactForm.reset();
        });
    }

    // Package button click handlers
    const packageButtons = document.querySelectorAll('.package-btn');
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const packageType = this.closest('.package').querySelector('h3').textContent;
            const packageSelect = document.getElementById('package');
            if (packageSelect) {
                // Find and select the matching option
                for (let option of packageSelect.options) {
                    if (option.text.includes(packageType)) {
                        packageSelect.value = option.value;
                        break;
                    }
                }
            }
            // Smooth scroll to contact form
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to nav items on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', highlightNavOnScroll);
});
