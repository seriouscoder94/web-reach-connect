// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formProps = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formProps),
                });
                
                if (response.ok) {
                    alert('Thank you for your message! We will contact you soon.');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to submit form');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again or email us directly.');
            }
        });
    }

    // Handle package selection
    document.querySelectorAll('.package-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const packageName = e.target.getAttribute('data-package');
            const subjectField = document.querySelector('#subject');
            const messageField = document.querySelector('#message');
            
            // Set subject based on package
            if (subjectField) {
                subjectField.value = `Interested in ${packageName.replace('-', ' ')} Package`;
            }
            
            // Pre-fill message
            if (messageField) {
                messageField.value = `Hi, I'm interested in the ${packageName.replace('-', ' ')} Package. Please contact me with more information.`;
            }
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
