// IMPROVED Mobile Menu with Accessibility
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
const overlay = document.getElementById('overlay');
const body = document.body;

// Add ARIA labels for accessibility
menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
menuToggle.setAttribute('aria-expanded', 'false');
nav.setAttribute('aria-hidden', 'true');

function toggleMenu() {
  const isOpen = nav.classList.toggle('active');
  
  // Update accessibility attributes
  menuToggle.setAttribute('aria-expanded', isOpen.toString());
  nav.setAttribute('aria-hidden', (!isOpen).toString());
  
  // Toggle classes
  menuToggle.classList.toggle('active');
  overlay.classList.toggle('active');
  body.classList.toggle('no-scroll');

  // Hamburger animation
  const spans = menuToggle.querySelectorAll('span');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none';

  // Focus management for accessibility
  if (isOpen) {
    // Focus on first menu item when opening
    const firstMenuItem = nav.querySelector('.menu-item');
    if (firstMenuItem) firstMenuItem.focus();
  } else {
    // Return focus to menu toggle when closing
    menuToggle.focus();
  }
}

// Event listeners
menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// Close menu when clicking menu items
document.querySelectorAll('.menu-item').forEach(link => {
  link.addEventListener('click', closeMenu);
  link.setAttribute('tabindex', '0'); // Make focusable
});

// Close menu with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && nav.classList.contains('active')) {
    closeMenu();
  }
});

// Improved close function
function closeMenu() {
  menuToggle.classList.remove('active');
  nav.classList.remove('active');
  overlay.classList.remove('active');
  body.classList.remove('no-scroll');

  // Reset accessibility
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.setAttribute('aria-hidden', 'true');

  // Reset hamburger animation
  const spans = menuToggle.querySelectorAll('span');
  spans[0].style.transform = 'none';
  spans[1].style.opacity = '1';
  spans[2].style.transform = 'none';

  // Return focus
  menuToggle.focus();
}

// Close menu when clicking overlay
overlay.addEventListener('click', closeMenu);

// Close menu when clicking any menu item
document.querySelectorAll('.menu-item').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close function
function closeMenu() {
  menuToggle.classList.remove('active');
  nav.classList.remove('active');
  overlay.classList.remove('active');
  body.classList.remove('no-scroll');

  const spans = menuToggle.querySelectorAll('span');
  spans[0].style.transform = 'none';
  spans[1].style.opacity = '1';
  spans[2].style.transform = 'none';
}
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
// Scroll Spy using IntersectionObserver
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.menu-item[data-section="${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.5
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Basic Testimonial Slider
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".testimonial-prev");
const nextBtn = document.querySelector(".testimonial-next");
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

prevBtn.addEventListener("click", () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

nextBtn.addEventListener("click", () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

// Auto-rotate every 7 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 7000);

// Dark Mode Toggle
const toggleBtn = document.getElementById('darkToggle');

// Check saved preference
if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Toggle dark mode and save preference
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});

// Owl Carousel Init
$(document).ready(function(){
  $(".destination-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 2 }
    }
  });
});

// FIXED Preloader - Single load event
window.addEventListener('load', function () {
  const preloader = document.querySelector('.preloader');
  const descBox = document.querySelector('.hero-description-box');

  // Hide preloader after 2 seconds max
  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        
        // Show description box after preloader hides
        if (descBox) {
          descBox.classList.add('visible');
          descBox.style.opacity = '1';
          descBox.style.transform = 'translateY(0)';
        }
      }, 500);
    }
  }, 2000);
});

// Scroll: hide description box
window.addEventListener('scroll', function () {
  const descBox = document.querySelector('.hero-description-box');
  if (descBox) {
    if (window.scrollY > 200) {
      descBox.style.opacity = '0';
      descBox.style.transform = 'translateY(20px)';
      descBox.style.pointerEvents = 'none';
    } else {
      descBox.style.opacity = '1';
      descBox.style.transform = 'translateY(0)';
      descBox.style.pointerEvents = 'auto';
    }
  }
});

// IMPROVED Hotel Search with Better UX
document.getElementById('searchBtn').addEventListener('click', function () {
  const cityInput = document.getElementById('searchCity');
  const city = cityInput.value.trim();
  const searchBtn = this;

  // Remove any existing error messages
  const existingError = document.querySelector('.search-error');
  if (existingError) {
    existingError.remove();
  }

  if (!city) {
    // Show error message below input (better than alert)
    const errorElement = document.createElement('div');
    errorElement.className = 'search-error';
    errorElement.innerHTML = '✗ Please enter a city name to search';
    errorElement.style.color = '#ff4444';
    errorElement.style.marginTop = '10px';
    errorElement.style.fontSize = '14px';
    
    cityInput.parentNode.appendChild(errorElement);
    
    // Add red border to input
    cityInput.style.border = '2px solid #ff4444';
    
    // Remove error after 3 seconds
    setTimeout(() => {
      errorElement.remove();
      cityInput.style.border = '';
    }, 3000);
    
    return;
  }

  // Show loading state
  searchBtn.innerHTML = 'Searching...';
  searchBtn.disabled = true;

  // Small delay to show loading state
  setTimeout(() => {
    const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}`;
    window.open(bookingUrl, '_blank');
    
    // Reset button after 1 second
    setTimeout(() => {
      searchBtn.innerHTML = 'Search Hotels';
      searchBtn.disabled = false;
    }, 1000);
  }, 500);
});

