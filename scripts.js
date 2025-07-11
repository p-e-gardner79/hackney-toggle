
        document.addEventListener('DOMContentLoaded', function() {
            
            const countdownElement = document.getElementById('countdown-timer');
            const heroCtaButton = document.getElementById('hero-cta-button');
            const preregistrationSection = document.getElementById('preregistration-area');
            const finalRegistrationSection = document.getElementById('final-registration-form');
            const launchToggle = document.getElementById('launch-toggle');

            // --- IMPORTANT: SET YOUR LAUNCH DATE HERE ---
            // Format: YYYY, Month (0-11), Day
            const launchDate = new Date(2025, 6, 12); // July 11, 2025

            function setPageState(isPostLaunch) {
                if (isPostLaunch) {
                    // --- POST-LAUNCH STATE ---
                    countdownElement.classList.add('hidden');
                    preregistrationSection.classList.add('hidden');
                    finalRegistrationSection.classList.remove('hidden');
                    heroCtaButton.href = "#final-registration-form";
                } else {
                    // --- PRE-LAUNCH STATE ---
                    const today = new Date();
                    today.setHours(0,0,0,0); 
                    const timeDiff = launchDate.getTime() - today.getTime();
                    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    if (daysLeft > 0) {
                        countdownElement.textContent = `${daysLeft} days to go until launch on ${launchDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
                        countdownElement.classList.remove('hidden');
                    } else {
                        countdownElement.textContent = `Launching today!`;
                    }
                    
                    preregistrationSection.classList.remove('hidden');
                    finalRegistrationSection.classList.add('hidden');
                    heroCtaButton.href = "#preregistration-area";
                }
            }

            // --- Dev Toggle Logic ---
            if (launchToggle) {
                launchToggle.addEventListener('change', function() {
                    setPageState(this.checked);
                });
                // Set initial state based on toggle (default to pre-launch)
                setPageState(launchToggle.checked);
            }

            /* // --- Automatic Date-Based Logic (Commented out for dev toggle) ---
            const today = new Date();
            today.setHours(0,0,0,0);
            if (today >= launchDate) {
                setPageState(true); // Post-launch
            } else {
                setPageState(false); // Pre-launch
            }
            */


            // --- FAQ Accordion Logic ---
            const faqList = document.querySelector('.faq-list');
            if (faqList) {
                faqList.addEventListener('click', function(e) {
                    const question = e.target.closest('.faq-question');
                    if (question) {
                        const allItems = faqList.querySelectorAll('.faq-item');
                        const currentItem = question.parentElement;
                        allItems.forEach(item => {
                            if (item !== currentItem && item.classList.contains('active')) {
                                item.classList.remove('active');
                            }
                        });
                        currentItem.classList.toggle('active');
                    }
                });
            }

            // --- Smooth Scrolling for Anchor Links ---
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // --- Expressive Scroll Animations ---
            const animatedSections = document.querySelectorAll('.animated-section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            animatedSections.forEach(section => {
                observer.observe(section);
            });

        });
