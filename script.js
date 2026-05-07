document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Transparent Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scroll Animations (Reveal on scroll)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Offset before revealing

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial check and scroll event listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // 3. Accordion / FAQ Section Logic
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close all other items
            const currActive = document.querySelector('.accordion-item.active');
            if (currActive && currActive !== item) {
                currActive.classList.remove('active');
                currActive.querySelector('.accordion-content').style.maxHeight = null;
            }

            // Toggle current item
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            
            if (item.classList.contains('active')) {
                // Expand
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // Collapse
                content.style.maxHeight = null;
            }
        });
    });
});