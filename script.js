// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

    // --- Floating Nature & Ozone Particles Array ---
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        
        // 1. Create Drifting Nature Leaves
        for (let i = 0; i < 15; i++) {
            let leaf = document.createElement('div');
            leaf.classList.add('leaf-particle');
            
            let size = Math.random() * 15 + 10;
            let left = Math.random() * 100;
            let duration = Math.random() * 15 + 15; // Slow drift
            let delay = Math.random() * 20;
            
            leaf.style.width = `${size}px`;
            leaf.style.height = `${size}px`;
            leaf.style.left = `${left}vw`;
            leaf.style.animationDuration = `${duration}s`;
            leaf.style.animationDelay = `-${delay}s`;
            
            particlesContainer.appendChild(leaf);
        }

        // 2. Create Rising Ozone Bubbles
        for (let j = 0; j < 15; j++) {
            let ozone = document.createElement('div');
            ozone.classList.add('ozone-particle');
            
            let size = Math.random() * 10 + 5;
            let left = Math.random() * 100;
            let duration = Math.random() * 20 + 20; // Very slow rise
            let delay = Math.random() * 20;
            
            ozone.style.width = `${size}px`;
            ozone.style.height = `${size}px`;
            ozone.style.left = `${left}vw`;
            ozone.style.animationDuration = `${duration}s`;
            ozone.style.animationDelay = `-${delay}s`;
            
            particlesContainer.appendChild(ozone);
        }
    }

    // --- Button Ripple Effects ---
    document.querySelectorAll('.scroll-btn, .submit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('btn-ripple');
            this.appendChild(ripples);
            
            setTimeout(() => ripples.remove(), 600);
        });
    });

    // --- Typing Effect for Subtitle ---
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.innerText;
    subtitle.innerText = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        }
    }
    setTimeout(typeWriter, 500); // Start slightly after page load

    // --- Parallax Effect ---
    document.addEventListener('mousemove', parallax);
    function parallax(e) {
        document.querySelectorAll('.parallax').forEach(move => {
            const moving_value = move.getAttribute('data-speed');
            const x = (e.clientX * moving_value) / 250;
            const y = (e.clientY * moving_value) / 250;
            move.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // --- 3D Tilt Effect on Cards ---
    document.querySelectorAll('.card, .waste-item, .about-text').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // --- Sticky Navbar & Scroll Styling ---
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetContent = document.querySelector(targetId);
            
            if (targetContent) {
                // Scroll to target with an offset for the navbar
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetContent.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Fade-In Tracking ---
    // Stagger elements slightly based on their internal DOM order or manual classes 
    const sectionsToObserve = document.querySelectorAll('.hidden');
    let staggerCounter = 1;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Dynamically add a stagger class
                entry.target.classList.add(`stagger-${(staggerCounter % 4) + 1}`);
                staggerCounter++;
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    sectionsToObserve.forEach((el) => observer.observe(el));

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if current item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // =========================================
    // AI Waste Sorting Simulation Logic
    // =========================================

    const wasteItems = document.querySelectorAll('.waste-item');
    const statusText = document.getElementById('ai-status');
    const binPlatform = document.getElementById('bin-platform');
    const binGate = document.getElementById('bin-gate');
    const simulatedObject = document.getElementById('simulated-object');
    const simDisplay = document.querySelector('.sim-display');
    const aiScanner = document.getElementById('ai-scanner');
    
    let isSimulating = false;

    // Compartment rotation angles (in degrees)
    const rotationMap = {
        'Plastic': 0,        // Faces front originally
        'Metal': -120,       // Rotate opposite to 120deg setup to bring it front
        'Paper': -240        // Rotate opposite to 240deg setup
    };

    // Attach click event to each waste object image card
    wasteItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isSimulating) return; // Prevent clicking while a simulation is active
            
            const wasteType = item.getAttribute('data-type');
            const wasteImgSrc = item.querySelector('img').src;
            
            // Smoothly scroll the simulation display into view
            simDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add a brief glow effect
            simDisplay.classList.remove('active-glow');
            void simDisplay.offsetWidth; // Trigger reflow to restart animation
            simDisplay.classList.add('active-glow');
            
            // Delay simulation sequence briefly to let scroll happen
            setTimeout(() => {
                startSimulation(wasteType, wasteImgSrc);
            }, 600);
        });
    });

    /**
     * Main Simulation Sequence Function
     * @param {string} type - The type of waste detected ('Plastic', 'Metal', 'Paper')
     * @param {string} imgSrc - The source URL of the clicked image
     */
    function startSimulation(type, imgSrc) {
        isSimulating = true;
        
        // Dynamically place the selected image in the simulation object
        simulatedObject.innerHTML = `<img src="${imgSrc}" alt="${type}" class="sim-dynamic-img">`;
        simulatedObject.style.opacity = 0; // Prepare for appearance
        simulatedObject.classList.remove('drop-animation');
        
        // Let it fade slightly into view at the top before dropping
        setTimeout(() => {
            simulatedObject.style.opacity = 1;
            simulatedObject.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            simulatedObject.style.transform = 'translateY(65px)'; // Lower the scanning threshold significantly to sit directly above the gate
        }, 100);

        // Step 1: Object placed - waiting for detection
        statusText.innerText = `Scanning Object for Artificial Classification...`;
        statusText.classList.add('loading-pulse');
        
        // Fire laser scanner beam animation
        aiScanner.classList.remove('hidden-element');
        aiScanner.classList.add('scanner-animate');

        // Step 2: Simulate AI processing delay (~2 seconds)
        setTimeout(() => {
            statusText.innerText = `Target Identified as: ${type}\nCalculating sort angle...`;
            statusText.classList.remove('loading-pulse');
            
            // Remove laser
            aiScanner.classList.remove('scanner-animate');
            aiScanner.classList.add('hidden-element');
            
            // Step 3: Trigger stepper motor visual rotation sequence
            setTimeout(() => {
                rotateBin(type);
            }, 800);

        }, 2000);
    }

    /**
     * Animates the internal platform to the correct bin compartment
     */
    function rotateBin(type) {
        statusText.innerText = `Rotating Bin to ${type} compartment...`;
        
        // Apply smooth CSS rotation to platform
        const angle = rotationMap[type];
        // Rotate X preserves the tilt making it look 3D, rotate Y aligns the compartment
        binPlatform.style.transform = `rotateX(15deg) rotateY(${angle}deg)`;

        // Step 4: Open servo gate and drop trash
        setTimeout(() => {
            dropWaste();
        }, 1500); // 1.5s to allow rotation to finish
    }

    /**
     * Animates the gate opening and the object falling
     */
    function dropWaste() {
        statusText.innerText = "Opening Gate...";
        
        // CSS transform to simulate opening gate (slide out of the way)
        binGate.style.transform = "translateX(-110%)";

        setTimeout(() => {
            // Visualize trash moving down
            simulatedObject.style.transition = 'none'; // hand over to keyframes
            simulatedObject.classList.add('drop-animation');

            setTimeout(() => {
                // Step 5: Wrap up simulation
                statusText.innerText = "Sorting Complete. Green environmental points awarded!";
                
                // Add a small success flash to the container to show it registered internally
                const container = document.querySelector('.bin-platform-container');
                container.classList.add('success-flash');
                setTimeout(() => container.classList.remove('success-flash'), 1000);
                
                // Close gate back
                binGate.style.transform = "translateX(0)";
                
                setTimeout(() => {
                    resetSimulation();
                }, 3000); // Leave success message for 3s
                
            }, 1000); // Length before drop finishes into bin

        }, 500); // 0.5s pause after gate opens before dropping
    }

    /**
     * Resets visual elements to be ready for the next click
     */
    function resetSimulation() {
        simulatedObject.classList.remove('drop-animation');
        simulatedObject.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Reset to original icon just in case
        simulatedObject.style.opacity = 0;
        simulatedObject.style.transform = 'translateY(0)';
        statusText.innerText = "System Ready. Awaiting object...";
        
        // Wait 1.5 seconds then scroll back to selection area
        setTimeout(() => {
            const wasteSelector = document.querySelector('.waste-selector');
            wasteSelector.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add subtle pulse highlight
            wasteSelector.classList.remove('selector-glow');
            void wasteSelector.offsetWidth; // trigger reflow
            wasteSelector.classList.add('selector-glow');
            
            isSimulating = false; // Simulation fully ready for next click
        }, 1500);
    }

    // =========================================
    // Contact Form Logic (EmailJS)
    // =========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload

        // Show loading state
        submitBtn.disabled = true;
        btnText.innerText = 'Sending...';
        loader.classList.remove('hidden-element');
        formMessage.classList.add('hidden-element');
        formMessage.className = 'form-message'; // Reset classes

        // EmailJS Configuration required step: 
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual EmailJS IDs
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                // Success State
                submitBtn.disabled = false;
                btnText.innerText = 'Send Message';
                loader.classList.add('hidden-element');
                
                formMessage.innerText = "Message sent successfully!";
                formMessage.classList.add('success');
                formMessage.classList.remove('hidden-element');
                
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden-element');
                }, 5000);
                
            }, (error) => {
                // Error State
                submitBtn.disabled = false;
                btnText.innerText = 'Send Message';
                loader.classList.add('hidden-element');
                
                formMessage.innerText = "Failed to send message. Please try again later.";
                formMessage.classList.add('error');
                formMessage.classList.remove('hidden-element');
                console.error("EmailJS Error:", error);
            });
    });
});