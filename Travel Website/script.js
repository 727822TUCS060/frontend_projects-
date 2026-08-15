/* ==========================================
   WANDERNEST TRAVELS - OPTIMIZED SCRIPT
   CONVERSION & ENGAGEMENT FOCUSED
========================================== */

// ==========================
// MOBILE MENU
// ==========================

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if(menuBtn && navbar){
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    document.querySelectorAll("#navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
        });
    });
}

// ==========================
// STICKY HEADER EFFECT
// ==========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if(window.scrollY > 80){
        header.style.background = "#0a0a0a";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.4)";
    }
    else{
        header.style.background = "rgba(13,13,13,0.9)";
        header.style.boxShadow = "none";
    }
});

// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});

// ==========================
// CONTACT FORM VALIDATION
// ==========================

const contactForm = document.querySelector("form:not(#travelForm)");

if(contactForm){
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        const inputs = contactForm.querySelectorAll("input, textarea, select");
        let valid = true;

        inputs.forEach(input => {
            if(input.value.trim() === "" && input.hasAttribute("required")){
                valid = false;
            }
        });

        if(!valid){
            alert("Please fill all required fields.");
            return;
        }

        // Track conversion
        trackEvent('contact_form_submitted', {
            form_type: 'contact_inquiry'
        });

        alert("Thank you! We'll contact you within 1 hour with personalized recommendations.");
        contactForm.reset();
    });
}

// ==========================
// WHATSAPP LEAD GENERATION
// ==========================

const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

whatsappButtons.forEach(button => {
    button.addEventListener("click", () => {
        trackEvent('whatsapp_click', {
            button_location: button.closest('section')?.id || 'unknown'
        });
    });
});

// ==========================
// FAQ ACCORDION - ENHANCED
// ==========================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item, index) => {
    const title = item.querySelector("h3");

    if(title){
        title.style.cursor = "pointer";
        const paragraph = item.querySelector("p");

        if(paragraph){
            title.addEventListener("click", () => {
                const isOpen = paragraph.style.display === "block";
                
                // Close all other FAQs
                document.querySelectorAll(".faq-item p").forEach(p => {
                    p.style.display = "none";
                });

                // Toggle current
                paragraph.style.display = isOpen ? "none" : "block";

                // Track FAQ interaction
                if(!isOpen){
                    trackEvent('faq_opened', {
                        faq_index: index
                    });
                }
            });
        }
    }
});

// ==========================
// SCROLL REVEAL ANIMATION
// ==========================

const revealElements = document.querySelectorAll(
    ".service-card, .package-card, .faq-item, .contact-container, .testimonial-card, .video-card"
);

function revealOnScroll(){
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(elementTop < windowHeight - 100){
            element.style.opacity = "1";
            element.style.transform = "translateY(0px)";
        }
    });
}

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ==========================
// ACTIVE NAVIGATION HIGHLIGHT
// ==========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight){
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active-nav");
        if(link.getAttribute("href") === "#" + currentSection){
            link.classList.add("active-nav");
        }
    });
});

// ==========================
// BACK TO TOP BUTTON
// ==========================

const backToTop = document.createElement("button");
backToTop.innerHTML = "↑";
backToTop.classList.add("back-to-top");
document.body.appendChild(backToTop);

backToTop.style.position = "fixed";
backToTop.style.bottom = "170px";
backToTop.style.right = "20px";
backToTop.style.width = "50px";
backToTop.style.height = "50px";
backToTop.style.borderRadius = "50%";
backToTop.style.border = "none";
backToTop.style.cursor = "pointer";
backToTop.style.background = "#d4af37";
backToTop.style.color = "#111";
backToTop.style.fontSize = "22px";
backToTop.style.display = "none";
backToTop.style.zIndex = "999";
backToTop.style.fontWeight = "bold";
backToTop.style.transition = "0.3s";
backToTop.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";

window.addEventListener("scroll", () => {
    if(window.scrollY > 400){
        backToTop.style.display = "flex";
        backToTop.style.alignItems = "center";
        backToTop.style.justifyContent = "center";
    }
    else{
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
    trackEvent('back_to_top_click');
});

backToTop.addEventListener("mouseenter", () => {
    backToTop.style.transform = "scale(1.1)";
});

backToTop.addEventListener("mouseleave", () => {
    backToTop.style.transform = "scale(1)";
});

// ==========================
// PACKAGE CARD HOVER EFFECT
// ==========================

document.querySelectorAll(".package-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-12px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px)";
    });
});

// ==========================
// FLOATING BUTTON TOOLTIPS
// ==========================

const whatsappFloat = document.querySelector(".floating-whatsapp");
const callFloat = document.querySelector(".floating-call");

if(whatsappFloat){
    whatsappFloat.addEventListener("mouseenter", () => {
        whatsappFloat.title = "Chat with us on WhatsApp - Get instant response!";
    });
}

if(callFloat){
    callFloat.addEventListener("mouseenter", () => {
        callFloat.title = "Call us now for immediate assistance";
    });
}

// ==========================
// PAGE LOAD ANIMATION
// ==========================

window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = "1";
    }, 100);

    trackEvent('page_load', {
        timestamp: new Date().toISOString()
    });
});

// ==========================
// ANALYTICS & CONVERSION TRACKING
// ==========================

function trackEvent(eventName, eventData = {}) {
    // Log to console for development
    console.log(`📊 Event: ${eventName}`, eventData);

    // Send to Google Analytics (if available)
    if(typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Send to custom endpoint (optional)
    // fetch('/track', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({event: eventName, data: eventData})
    // });
}

// ==========================
// PACKAGE BUTTON HANDLER
// ==========================

document.querySelectorAll(".package-btn").forEach(button => {
    button.addEventListener("click", () => {
        const packageName = button.dataset.package;

        trackEvent('package_selected', {
            package_name: packageName
        });

        const modal = document.getElementById("bookingModal");
        if(modal){
            modal.style.display = "flex";
            document.getElementById("selectedPackage").value = packageName;
            document.getElementById("customerName").focus();
        }
    });
});

// ==========================
// BOOKING MODAL + GOOGLE SHEETS
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("bookingModal");
    const closeModal = document.querySelector(".close-modal");
    const packageButtons = document.querySelectorAll(".package-btn");
    const selectedPackage = document.getElementById("selectedPackage");
    const travelForm = document.getElementById("travelForm");

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbx6vLK_9Xo8aQy9XM5JeLDweqhzf6U8-5P5s5RfZFZWxD4a6jZfeHzfJnDxVPyqObMhCg/exec";

    // OPEN MODAL
    packageButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = "flex";
            selectedPackage.value = button.dataset.package;

            trackEvent('booking_modal_opened', {
                package: button.dataset.package
            });
        });
    });

    // CLOSE MODAL
    if(closeModal){
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // CLOSE OUTSIDE
    window.addEventListener("click", (e) => {
        if(e.target === modal){
            modal.style.display = "none";
        }
    });

    // FORM SUBMIT WITH IMPROVED VALIDATION
    travelForm.addEventListener("submit", async function(e){
        e.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const email = document.getElementById("customerEmail").value.trim();

        // Validate phone number (basic)
        if(phone.length < 10){
            alert("Please enter a valid phone number (minimum 10 digits).");
            return;
        }

        // Validate email if provided
        if(email && !isValidEmail(email)){
            alert("Please enter a valid email address.");
            return;
        }

        const leadData = {
            name: name,
            phone: phone,
            email: email || "Not provided",
            packageName: document.getElementById("selectedPackage").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
            adults: document.getElementById("adults").value,
            children: document.getElementById("children").value,
            hotelType: document.getElementById("hotelType").value,
            pickupCity: document.getElementById("pickupCity").value,
            budgetRange: document.getElementById("budgetRange").value,
            submittedAt: new Date().toISOString()
        };

        // Show loading state
        const submitButton = travelForm.querySelector("button[type='submit']");
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = "<i class='fa-solid fa-spinner'></i> Processing...";
        submitButton.disabled = true;

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode:"no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(leadData)
            });

            // Track successful booking
            trackEvent('booking_submitted', {
                package_name: leadData.packageName,
                budget_range: leadData.budgetRange,
                trip_type: leadData.adults > 0 ? 'family' : 'individual'
            });

            // Success message
            showSuccessMessage(name, leadData.packageName);

            travelForm.reset();
            modal.style.display = "none";

        } catch(error){
            console.error("Booking error:", error);

            trackEvent('booking_error', {
                error_message: error.message
            });

            alert("Error submitting booking. Please try again or contact us on WhatsApp.");

        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
});

// ==========================
// EMAIL VALIDATION
// ==========================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================
// SUCCESS MESSAGE
// ==========================

function showSuccessMessage(name, packageName) {
    // Remove existing popup if any
    const existing = document.getElementById('successPopup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.id = 'successPopup';
    popup.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1f3a, #252d48);
            border: 2px solid #d4af37;
            border-radius: 16px;
            padding: 40px 50px;
            text-align: center;
            z-index: 99999;
            box-shadow: 0 20px 60px rgba(212,175,55,0.3);
            max-width: 420px;
            width: 90%;
        ">
            <div style="font-size: 56px; margin-bottom: 15px;">✅</div>
            <h3 style="color: #d4af37; font-size: 22px; margin-bottom: 10px;">Booking Confirmed!</h3>
            <p style="color: #ddd; font-size: 15px; line-height: 1.6; margin-bottom: 8px;">
                Thank you <strong style="color:#d4af37">${name}</strong>!
            </p>
            <p style="color: #bbb; font-size: 13px; margin-bottom: 20px;">
                📦 Package: <strong style="color:#d4af37">${packageName || 'Your Selected Package'}</strong><br>
                Our expert will contact you within <strong style="color:#d4af37">1 hour</strong>.
            </p>
            <button onclick="document.getElementById('successPopup').remove()" style="
                background: #d4af37;
                color: #0a0e27;
                border: none;
                padding: 12px 35px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 15px;
                cursor: pointer;
            ">Got it! 🎉</button>
        </div>
        <div onclick="document.getElementById('successPopup').remove()" style="
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            z-index: 99998;
        "></div>
    `;
    document.body.appendChild(popup);
}

// ==========================
// CONSOLE BRANDING
// ==========================

console.log(
    "%cWanderNest Travels",
    "color:#d4af37;font-size:18px;font-weight:bold;"
);

console.log(
    "%cOptimized for Conversions & SEO",
    "color:#25D366;font-size:14px;font-weight:bold;"
);

console.log(
    "5000+ Happy Travelers | Award-Winning Agency | 24/7 Support"
);

// ==========================
// CTA PULSE EFFECT - OPTIMIZED
// ==========================

const ctaButtons = document.querySelectorAll(".btn-primary");

if(ctaButtons.length > 0){
    setInterval(() => {
        ctaButtons.forEach((button, index) => {
            setTimeout(() => {
                button.style.transform = "scale(1.02)";

                setTimeout(() => {
                    button.style.transform = "scale(1)";
                }, 200);
            }, index * 300);
        });
    }, 4000);
}

// ==========================
// RATING STARS ANIMATION
// ==========================

const ratingElements = document.querySelectorAll(".rating");

ratingElements.forEach(rating => {
    const stars = rating.querySelectorAll("i");
    
    stars.forEach((star, index) => {
        star.style.transition = "all 0.3s ease";
        
        rating.addEventListener("mouseenter", () => {
            stars.forEach((s, i) => {
                if(i <= index){
                    s.style.transform = "scale(1.2)";
                    s.style.color = "#f0c64f";
                }
            });
        });
    });

    rating.addEventListener("mouseleave", () => {
        stars.forEach(star => {
            star.style.transform = "scale(1)";
            star.style.color = "#d4af37";
        });
    });
});

// ==========================
// PERFORMANCE MONITORING
// ==========================

window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`⏱️ Page Load Time: ${pageLoadTime}ms`);

        trackEvent('page_performance', {
            load_time_ms: pageLoadTime
        });
    }
});

// ==========================
// SCROLL DEPTH TRACKING
// ==========================

let maxScroll = 0;

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if(scrollPercent > maxScroll){
        maxScroll = scrollPercent;
        
        // Track at milestones
        if(scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100){
            trackEvent('scroll_depth', {
                depth_percent: Math.round(scrollPercent)
            });
        }
    }
});

// ==========================
// FORM FIELD TRACKING
// ==========================

const formInputs = document.querySelectorAll("input, textarea, select");

formInputs.forEach(input => {
    input.addEventListener("focus", () => {
        trackEvent('form_field_focused', {
            field_name: input.id || input.name || 'unknown'
        });
    });

    input.addEventListener("change", () => {
        trackEvent('form_field_changed', {
            field_name: input.id || input.name || 'unknown'
        });
    });
});

// ==========================
// MOBILE FRIENDLY - AUTO CALL
// ==========================

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // Mobile device detected
    const phoneLinks = document.querySelectorAll("a[href^='tel:']");
    
    phoneLinks.forEach(link => {
        link.addEventListener("click", () => {
            trackEvent('mobile_phone_click', {
                phone_number: link.href
            });
        });
    });
}

// ==========================
// EXIT INTENT MODAL (OPTIONAL)
// ==========================

let exitModalShown = false;

document.addEventListener('mouseleave', (e) => {
    if(e.clientY <= 0 && !exitModalShown) {
        exitModalShown = true;
        
        // Could show a special offer modal here
        trackEvent('exit_intent_triggered');
    }
});

// ==========================
// KEYBOARD SHORTCUTS
// ==========================

document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.key === 'k'){
        e.preventDefault();
        const modal = document.getElementById("bookingModal");
        if(modal){
            modal.style.display = "flex";
        }
        trackEvent('keyboard_shortcut_used', {
            shortcut: 'Ctrl+K'
        });
    }
});

console.log("✅ WanderNest Travels - All systems optimized for conversions!");
// Function to set minimum date to today (present & future dates only)
function initializeDateRestriction() {
    const today = new Date();
    
    // Format date as YYYY-MM-DD for the min attribute
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    
    // Set minimum date for both start and end date inputs
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    startDateInput.min = minDate;
    endDateInput.min = minDate;
    
    // Optional: Set end date minimum to be at least start date
    startDateInput.addEventListener('change', function() {
        if (this.value) {
            endDateInput.min = this.value;
            // Reset end date if it's before start date
            if (endDateInput.value && endDateInput.value < this.value) {
                endDateInput.value = '';
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeDateRestriction);