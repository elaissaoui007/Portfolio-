// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Check for saved theme in localStorage or respect system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️'; // Sun icon for dark mode
  } else {
    body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙'; // Moon icon for light mode
  }

  // Toggle theme on button click
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      darkModeToggle.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'light');
      darkModeToggle.textContent = '🌙';
    }
  });
});
// Smooth scroll + active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
// Contact form validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent actual submit

    // Get values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Reset message
    formMessage.textContent = '';
    formMessage.style.color = '';

    // Validation
    let isValid = true;

    if (name === '') {
      isValid = false;
    }
    if (email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
    }
    if (message === '') {
      isValid = false;
    }

    if (!isValid) {
      formMessage.textContent = 'Veuillez remplir tous les champs correctement.';
      formMessage.style.color = '#ef4444'; // Red
      return;
    }

    // If valid: show success message
    formMessage.textContent = 'Merci ! Votre message a été envoyé.';
    formMessage.style.color = '#10b981'; // Green

    // Optional: reset form after 2 seconds
    setTimeout(() => {
      contactForm.reset();
      formMessage.textContent = '';
    }, 2000);
  });
}