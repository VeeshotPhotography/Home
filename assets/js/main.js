// This file contains the JavaScript for the Veeshot Photography website. 
// It includes functionality for interactive elements such as the slideshow, 
// navigation, and other dynamic features. The code is optimized for performance 
// and maintainability.

document.addEventListener('DOMContentLoaded', () => {
    // --- Slideshow logic with animation and arrows ---
    const slides = document.querySelectorAll('.slide');
    const slideTexts = [
        { h2: "Wedding", p: "Moments sealed forever" },
        { h2: "Engagement", p: "Promise of forever" },
        { h2: "Outdoor", p: "Nature's embrace" }
    ];
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 6000;
    let slideTimer;
    

    function showSlide(index, animate = true) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
        // Animate text
        const slideText = document.getElementById('slide-text');
        slideText.querySelector('h2').textContent = slideTexts[index].h2;
        slideText.querySelector('p').textContent = slideTexts[index].p;
        if (animate) {
            slideText.style.opacity = 0;
            setTimeout(() => { slideText.style.opacity = 1; }, 200);
        }
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }
    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startSlideTimer() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }
    function stopSlideTimer() {
        clearInterval(slideTimer);
    }

    // Dots click
    dots.forEach(dot =>
        dot.addEventListener('click', () => {
            stopSlideTimer();
            showSlide(parseInt(dot.dataset.index));
            startSlideTimer();
        })
    );

    // Arrow buttons
    document.getElementById('slide-next').onclick = () => {
        stopSlideTimer();
        nextSlide();
        startSlideTimer();
    };
    document.getElementById('slide-prev').onclick = () => {
        stopSlideTimer();
        prevSlide();
        startSlideTimer();
    };

    // Start slideshow
    showSlide(0, false);
    startSlideTimer();

    // --- EVENTS AUTO SCROLL & ZOOM ANIMATION ---
    const eventsScroll = document.getElementById('events-scroll');
    const eventsPrev = document.getElementById('events-prev');
    const eventsNext = document.getElementById('events-next');
    const eventCards = eventsScroll.querySelectorAll('.card');
    let eventsAutoScrollDir = 1;
    let eventsAutoScrollTimer = null;

    function scrollEvents(dir = 1) {
        eventsScroll.scrollBy({ left: dir * 270, behavior: 'smooth' });
    }
    eventsPrev.onclick = () => scrollEvents(-1);
    eventsNext.onclick = () => scrollEvents(1);

    // Auto-move cards every 3.5s
    function startEventsAutoScroll() {
        if (eventsAutoScrollTimer) clearInterval(eventsAutoScrollTimer);
        eventsAutoScrollTimer = setInterval(() => {
            // If at end, reverse direction
            if (eventsScroll.scrollLeft + eventsScroll.offsetWidth >= eventsScroll.scrollWidth - 10) {
                eventsAutoScrollDir = -1;
            } else if (eventsScroll.scrollLeft <= 10) {
                eventsAutoScrollDir = 1;
            }
            scrollEvents(eventsAutoScrollDir);
        }, 3500);
    }
    startEventsAutoScroll();
    eventsScroll.addEventListener('mouseenter', () => clearInterval(eventsAutoScrollTimer));
    eventsScroll.addEventListener('mouseleave', startEventsAutoScroll);

    // --- Dark/Light toggle (navbar icon) ---
    const toggleBtn = document.querySelector('.navbar .toggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleBtn.textContent =
            document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // --- Dark/Bright mode toggle button (after nav) ---
    const modeToggleBtn = document.getElementById('mode-toggle-btn');
    modeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            modeToggleBtn.textContent = '☀️ Bright Mode';
        } else {
            modeToggleBtn.textContent = '🌙 Dark Mode';
        }
    });

    // --- Floating button toggle ---
    function toggleFAB() {
        document.getElementById('fab').classList.toggle('show');
    }

    // --- Mobile nav toggle ---
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // --- Smooth scrolling for navbar links ---
    document.querySelectorAll('.navbar nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile nav if open
                document.getElementById('nav-menu').classList.remove('active');
            }
        });
    });

    // --- Smooth scroll for logo to top ---
    document.getElementById('logo').addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById('nav-menu').classList.remove('active');
    });

    // --- Gallery scroll buttons ---
    document.getElementById('gallery-prev').onclick = function() {
        document.getElementById('gallery-scroll').scrollBy({ left: -300, behavior: 'smooth' });
    };
    document.getElementById('gallery-next').onclick = function() {
        document.getElementById('gallery-scroll').scrollBy({ left: 300, behavior: 'smooth' });
    };
});