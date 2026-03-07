
// USER PROFILE DROPDOWN
const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');

userProfile.addEventListener('click', (e) => {
  e.stopPropagation();
  userProfile.classList.toggle('active');
  profileDropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!profileDropdown.contains(e.target) && !userProfile.contains(e.target)) {
    userProfile.classList.remove('active');
    profileDropdown.classList.remove('active');
  }
});

// DARK MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
const toggleSwitch = document.getElementById('toggleSwitch');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleSwitch.classList.add('active');
  themeIcon.className = 'fas fa-sun';
  themeText.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  document.body.classList.toggle('dark-mode');
  toggleSwitch.classList.toggle('active');
  
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.className = 'fas fa-sun';
    themeText.textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.className = 'fas fa-moon';
    themeText.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});

// CONTACT FUNCTIONS
function startLiveChat() {
  // In production, this would open your live chat widget
  alert('Starting live chat...\n\nIn production, this would open your live chat widget (e.g., Intercom, Zendesk, etc.)');
}

function sendEmail() {
  // In production, this would open email client or modal
  window.location.href = 'mailto:support@ledgerworx.com?subject=Support Request';
}

function makeCall() {
  // In production, this could open a dialer or VoIP call
  window.location.href = 'tel:+18001234567';
}

// SUPPORT MESSAGE FORM
function handleSupportMessage(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  // In production, send to server
  console.log('Support message:', Object.fromEntries(formData));
  
  alert('Your message has been sent successfully!\n\nOur support team will get back to you within 24 hours.');
  event.target.reset();
}

// FAQ ACCORDION
function toggleFAQ(element) {
  // Close all other FAQs
  document.querySelectorAll('.faq-item').forEach(item => {
    if (item !== element) {
      item.classList.remove('active');
    }
  });
  
  // Toggle clicked FAQ
  element.classList.toggle('active');
}

// RESOURCES
function openResource(type) {
  const resources = {
    'user-guide': 'https://docs.ledgerworx.com/user-guide',
    'video-tutorials': 'https://docs.ledgerworx.com/tutorials',
    'api-docs': 'https://api.ledgerworx.com/docs',
    'community': 'https://community.ledgerworx.com'
  };
  
  // In production, this would open the actual resource
  alert(`Opening ${type.replace('-', ' ')}...\n\nIn production, this would navigate to: ${resources[type]}`);
}
