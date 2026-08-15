/* =====================================================
   TRAVEL GEMS WEBSITE
   script.js
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            menuBtn.innerHTML = navLinks.classList.contains("active")
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            });

        });

    }

    /* ==========================================
       STICKY NAVBAR
    ========================================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";

        } else {

            header.style.boxShadow = "none";

        }

    });

    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /* ==========================================
       FAQ
    ========================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(i => {

                if (i !== item) {

                    i.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

    /* ==========================================
       BOOKING MODAL
    ========================================== */

    const modal = document.getElementById("bookingModal");

    const closeModal = document.querySelector(".close-booking");

    const bookingButtons = document.querySelectorAll(".service-btn");

    const selectedService = document.getElementById("selectedService");

    bookingButtons.forEach(button => {

        button.addEventListener("click", () => {

            modal.classList.add("active");

            selectedService.value = button.dataset.service;

            document.body.style.overflow = "hidden";

        });

    });

    if (closeModal) {

        closeModal.addEventListener("click", () => {

            modal.classList.remove("active");

            document.body.style.overflow = "auto";

        });

    }

    window.addEventListener("click", e => {

        if (e.target === modal) {

            modal.classList.remove("active");

            document.body.style.overflow = "auto";

        }

    });

    /* ==========================================
       BOOKING FORM
    ========================================== */

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", e => {

            e.preventDefault();

            alert("Thank you! Your booking request has been submitted successfully.");

            bookingForm.reset();

            modal.classList.remove("active");

            document.body.style.overflow = "auto";

        });

    }

    /* ==========================================
       CONTACT FORM
    ========================================== */

    const contactForm = document.querySelector(".contact-form form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            alert("Thank you for contacting Travel Gems. We will contact you shortly.");

            contactForm.reset();

        });

    }

    /* ==========================================
       SCROLL TO TOP
    ========================================== */

    const scrollBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            scrollBtn.style.display = "flex";

        } else {

            scrollBtn.style.display = "none";

        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* ==========================================
       ACTIVE NAVIGATION
    ========================================== */

    const sections = document.querySelectorAll("section");

    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* ==========================================
       COUNTER ANIMATION
    ========================================== */

    const counters = document.querySelectorAll(".stat-box h2");

    let counterStarted = false;

    function startCounters() {

        if (counterStarted) return;

        const stats = document.querySelector(".stats");

        const position = stats.getBoundingClientRect().top;

        if (position < window.innerHeight - 100) {

            counterStarted = true;

            counters.forEach(counter => {

                const original = counter.innerText;

                const numeric = parseInt(original.replace(/\D/g, ""));

                const suffix = original.replace(/[0-9]/g, "");

                let count = 0;

                const speed = numeric / 80;

                const update = () => {

                    if (count < numeric) {

                        count += speed;

                        counter.innerText = Math.ceil(count) + suffix;

                        requestAnimationFrame(update);

                    } else {

                        counter.innerText = original;

                    }

                };

                update();

            });

        }

    }

    window.addEventListener("scroll", startCounters);

    startCounters();

    /* ==========================================
       REVEAL ON SCROLL
    ========================================== */

    const revealElements = document.querySelectorAll(

        ".service-card,.about-card,.why-card,.gallery-item,.testimonial-card,.destination-card,.contact-info,.contact-form"

    );

    function reveal() {

        revealElements.forEach(el => {

            const top = el.getBoundingClientRect().top;

            if (top < window.innerHeight - 100) {

                el.style.opacity = "1";

                el.style.transform = "translateY(0)";

            }

        });

    }

    revealElements.forEach(el => {

        el.style.opacity = "0";

        el.style.transform = "translateY(40px)";

        el.style.transition = "all .8s ease";

    });

    window.addEventListener("scroll", reveal);

    reveal();

    /* ==========================================
       HERO BUTTON RIPPLE EFFECT
    ========================================== */

    document.querySelectorAll(".btn-primary").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left = e.clientX - rect.left + "px";

            ripple.style.top = e.clientY - rect.top + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /* ==========================================
       IMAGE PARALLAX
    ========================================== */

    window.addEventListener("scroll", () => {

        const heroImage = document.querySelector(".hero-image img");

        if (heroImage) {

            heroImage.style.transform =
                `translateY(${window.scrollY * 0.08}px)`;

        }

    });

    /* ==========================================
       LOADER
    ========================================== */

    window.addEventListener("load", () => {

        const loader = document.querySelector(".loader");

        if (loader) {

            loader.style.opacity = "0";

            loader.style.pointerEvents = "none";

            setTimeout(() => {

                loader.remove();

            }, 500);

        }

    });

});
const menuBtn=document.querySelector(".menu-btn");

const nav=document.querySelector(".nav-links");

menuBtn.onclick=function(){

nav.classList.toggle("active");

if(nav.classList.contains("active")){

menuBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';

}else{

menuBtn.innerHTML='<i class="fa-solid fa-bars"></i>';

}

};
const topBtn=document.getElementById("scrollTopBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};