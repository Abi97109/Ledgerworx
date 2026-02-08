/* ===== MOBILE MENU FUNCTIONALITY ===== */
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(13px)' : '';
      spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-13px)' : '';
    });
  }
  
  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
    });
  });
});

/* ===== SMOOTH SCROLLING FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ===== FORM VALIDATION ===== */
function validateContactForm(form) {
  const name = form.querySelector('input[name="name"]');
  const email = form.querySelector('input[name="email"]');
  const phone = form.querySelector('input[name="phone"]');
  const message = form.querySelector('textarea[name="message"]');
  
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  
  let isValid = true;
  
  if (!name || name.value.trim() === '') {
    showError(name, 'Name is required');
    isValid = false;
  }
  
  if (!email || email.value.trim() === '') {
    showError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email');
    isValid = false;
  }
  
  if (!phone || phone.value.trim() === '') {
    showError(phone, 'Phone is required');
    isValid = false;
  } else if (!isValidPhone(phone.value)) {
    showError(phone, 'Please enter a valid phone number');
    isValid = false;
  }
  
  if (!message || message.value.trim() === '') {
    showError(message, 'Message is required');
    isValid = false;
  }
  
  return isValid;
}

function showError(element, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.cssText = 'color: #dc2626; font-size: 12px; margin-top: 5px;';
  element.parentNode.insertBefore(errorDiv, element.nextSibling);
  element.style.borderColor = '#dc2626';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  return phoneRegex.test(phone);
}

/* ===== CONTACT FORM HANDLING ===== */
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateContactForm(this)) {
        // Collect form data
        const formData = {
          name: this.querySelector('input[name="name"]').value,
          email: this.querySelector('input[name="email"]').value,
          phone: this.querySelector('input[name="phone"]').value,
          service: this.querySelector('select[name="service"]') ? 
            this.querySelector('select[name="service"]').value : 'General',
          message: this.querySelector('textarea[name="message"]').value,
          date: new Date().toISOString()
        };
        
        // Store in localStorage for demonstration
        let inquiries = JSON.parse(localStorage.getItem('ledgerworx_inquiries') || '[]');
        inquiries.push(formData);
        localStorage.setItem('ledgerworx_inquiries', JSON.stringify(inquiries));
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'background: #16a34a; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;';
        successMsg.textContent = 'Thank you for your inquiry! We will contact you soon.';
        this.parentNode.insertBefore(successMsg, this);
        
        // Reset form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => successMsg.remove(), 5000);
      }
    });
  }
});

/* ===== REGISTRATION FORM HANDLING ===== */
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      
      const name = this.querySelector('input[name="name"]');
      const email = this.querySelector('input[name="email"]');
      const password = this.querySelector('input[name="password"]');
      const confirmPassword = this.querySelector('input[name="confirmPassword"]');
      const terms = this.querySelector('input[name="terms"]');
      
      let isValid = true;
      
      if (!name || name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
      }
      
      if (!email || email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }
      
      if (!password || password.value === '') {
        showError(password, 'Password is required');
        isValid = false;
      } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
      }
      
      if (!confirmPassword || confirmPassword.value === '') {
        showError(confirmPassword, 'Please confirm your password');
        isValid = false;
      } else if (password && confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
      }
      
      if (!terms || !terms.checked) {
        showError(terms, 'You must agree to the terms');
        isValid = false;
      }
      
      if (isValid) {
        // Store user data (in real app, send to backend)
        const userData = {
          name: name.value,
          email: email.value,
          registeredAt: new Date().toISOString()
        };
        
        localStorage.setItem('ledgerworx_user', JSON.stringify(userData));
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'background: #16a34a; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;';
        successMsg.textContent = 'Registration successful! Redirecting to login...';
        this.parentNode.insertBefore(successMsg, this);
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }
    });
  }
});

/* ===== LOGIN FORM HANDLING ===== */
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      
      const email = this.querySelector('input[name="email"]');
      const password = this.querySelector('input[name="password"]');
      
      let isValid = true;
      
      if (!email || email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
      }
      
      if (!password || password.value === '') {
        showError(password, 'Password is required');
        isValid = false;
      }
      
      if (isValid) {
        // Check if user exists (simple check against localStorage)
        const user = JSON.parse(localStorage.getItem('ledgerworx_user') || 'null');
        
        if (user && user.email === email.value) {
          // Store login state
          localStorage.setItem('ledgerworx_logged_in', JSON.stringify({
            ...user,
            loginTime: new Date().toISOString()
          }));
          
          // Show success message
          const successMsg = document.createElement('div');
          successMsg.style.cssText = 'background: #16a34a; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;';
          successMsg.textContent = 'Login successful! Redirecting...';
          this.parentNode.insertBefore(successMsg, this);
          
          // Redirect after 2 seconds
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000);
        } else {
          const errorMsg = document.createElement('div');
          errorMsg.style.cssText = 'background: #dc2626; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;';
          errorMsg.textContent = 'Invalid email or password. Please register first.';
          this.parentNode.insertBefore(errorMsg, this);
        }
      }
    });
  }
});

/* ===== CHECK LOGIN STATUS ===== */
function checkLoginStatus() {
  const loggedInUser = JSON.parse(localStorage.getItem('ledgerworx_logged_in') || 'null');
  
  if (loggedInUser) {
    // User is logged in
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    
    if (loginBtn && registerBtn) {
      loginBtn.textContent = 'Profile';
      loginBtn.onclick = function() {
        // Could redirect to profile page
        alert('Welcome, ' + loggedInUser.name + '!');
      };
      registerBtn.textContent = 'Logout';
      registerBtn.style.borderColor = '#dc2626';
      registerBtn.style.color = 'white';
      registerBtn.onclick = function() {
        localStorage.removeItem('ledgerworx_logged_in');
        window.location.href = 'index.html';
      };
    }
  }
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);

/* ===== INTERSECTION OBSERVER FOR ANIMATIONS ===== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.process-card, .service-card, .package-card, .testimonial-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = (index * 0.1) + 's';
    observer.observe(el);
  });
});

/* ===== TESTIMONIAL CAROUSEL (Optional) ===== */
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
  if (testimonials.length > 3) {
    testimonials.forEach((el, index) => {
      el.style.display = index === currentTestimonial ? 'block' : 'none';
    });
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    setTimeout(rotateTestimonials, 5000);
  }
}

// Start carousel if more than 3 testimonials
if (testimonials.length > 3) {
  rotateTestimonials();
}

/* ===== SCROLL TO TOP BUTTON ===== */
function createScrollToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    background: #17a697;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    font-size: 18px;
    z-index: 999;
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(button);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
  
  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  button.addEventListener('mouseover', function() {
    this.style.background = '#15a695';
    this.style.transform = 'scale(1.1)';
  });
  
  button.addEventListener('mouseout', function() {
    this.style.background = '#17a697';
    this.style.transform = 'scale(1)';
  });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

/* ===== COUNTER ANIMATION ===== */
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

/* ===== PAGE LOAD ANIMATIONS ===== */
document.addEventListener('DOMContentLoaded', function() {
  // Add fade in animation to body
  document.body.style.animation = 'fadeIn 0.5s ease-out';
});