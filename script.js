// Toggle member details
function toggleDetails(card) {
  const details = card.querySelector('.details');
  const isActive = details.classList.contains('active');
  
  // Close all other open details
  document.querySelectorAll('.details.active').forEach(openDetail => {
    if (openDetail !== details) {
      openDetail.classList.remove('active');
    }
  });
  
  // Toggle current details
  details.classList.toggle('active');
}

// Handle image loading errors
function handleImageErrors() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      // If image fails to load, set a placeholder based on gender
      const card = this.closest('.member-card, .parent-card');
      if (card) {
        const roleElement = card.querySelector('.member-role');
        const roleText = roleElement ? roleElement.textContent.toLowerCase() : '';
        
        // Determine gender based on role text
        const isFemale = roleText.includes('ሴት') || 
                         roleText.includes('እናት') ||
                         roleText.includes('female');
        
        if (isFemale) {
          this.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
        } else {
          this.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
        }
      }
    });
  });
}

// Close details when clicking outside
function setupClickOutsideToClose() {
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.member-card') && !event.target.closest('.parent-card')) {
      document.querySelectorAll('.details.active').forEach(detail => {
        detail.classList.remove('active');
      });
    }
  });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up image error handling
  handleImageErrors();
  
  // Set up click outside to close details
  setupClickOutsideToClose();
  
  // Add animation to stats numbers
  animateStats();
  
  // Set current year in footer
  setCurrentYear();
});

// Animate stats numbers
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const finalValue = parseInt(stat.textContent);
    let currentValue = 0;
    
    const increment = finalValue / 50; // Adjust speed here
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        stat.textContent = finalValue;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(currentValue);
      }
    }, 30);
  });
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.querySelector('footer p:nth-child(2)');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
  }
}

// Family tree link functionality
function setupFamilyTreeLink() {
  const treeLink = document.querySelector('.family-tree-link');
  if (treeLink) {
    treeLink.addEventListener('click', function(e) {
      e.preventDefault();
      alert('የቤተሰብ ዛፍ ባህሪይ በቅርቡ ይገኛል! በቅርቡ እንመለከታለን።');
    });
  }
}

// Call the family tree setup
setupFamilyTreeLink();