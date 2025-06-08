// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
const overlay = document.getElementById('overlay');
const body = document.body;

menuToggle.addEventListener('click', function() {
  this.classList.toggle('active');
  nav.classList.toggle('active');
  overlay.classList.toggle('active');
  body.classList.toggle('no-scroll');

  const spans = this.querySelectorAll('span');
  const isOpen = nav.classList.contains('active');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});

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
window.addEventListener('load', function () {
  const preloader = document.querySelector('.preloader');
  
  // Force-hide the preloader after 3 seconds (even if assets fail)
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 3000); // Adjust timeout as needed
});

window.addEventListener('load', function () {
  const preloader = document.querySelector('.preloader');
  const descBox = document.querySelector('.hero-description-box');

  // Fade out preloader
  setTimeout(() => {
    if (preloader) preloader.style.opacity = '0';

    // Remove preloader from flow
    setTimeout(() => {
      if (preloader) preloader.style.display = 'none';

      // Show description box
      if (descBox) descBox.classList.add('visible');

    }, 500);
  }, 1000);
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

// Booking.com city search
document.getElementById('searchBtn').addEventListener('click', function () {
  const city = document.getElementById('searchCity').value.trim();

  if (city) {
    const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}`;
    window.open(bookingUrl, '_blank'); // Opens in new tab
  } else {
    alert('Please enter a city name!');
  }
});

