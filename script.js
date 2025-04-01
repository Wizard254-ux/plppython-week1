// User preferences object
const defaultPreferences = {
    primaryColor: '#3498db',
    animationSpeed: '0.5',
    animationType: 'none',
    theme: 'blue'
  };
  
  let currentPreferences = {};
  
  // DOM Elements
  const animationBox = document.querySelector('.animation-box');
  const saveButton = document.getElementById('save-button');
  const resetButton = document.getElementById('reset-button');
  const notification = document.getElementById('notification');
  const speedSlider = document.getElementById('animation-speed');
  const animationTypeSelect = document.getElementById('animation-type');
  const themeOptions = document.querySelectorAll('.theme-option');
  
  // Load preferences from localStorage
  function loadPreferences() {
    const savedPreferences = localStorage.getItem('userPreferences');
    
    if (savedPreferences) {
      currentPreferences = JSON.parse(savedPreferences);
    } else {
      currentPreferences = {...defaultPreferences};
    }
    
    // Apply loaded preferences to UI
    applyPreferences();
  }
  
  // Save preferences to localStorage
  function savePreferences() {
    // Get current values
    currentPreferences.animationSpeed = speedSlider.value;
    currentPreferences.animationType = animationTypeSelect.value;
    
    // Save to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(currentPreferences));
    
    // Show notification
    showNotification();
  }
  
  // Apply preferences to the UI
  function applyPreferences() {
    // Set CSS variables
    document.documentElement.style.setProperty('--primary-color', currentPreferences.primaryColor);
    document.documentElement.style.setProperty('--animation-speed', `${currentPreferences.animationSpeed}s`);
    
    // Set form values
    speedSlider.value = currentPreferences.animationSpeed;
    animationTypeSelect.value = currentPreferences.animationType;
    
    // Apply animation class
    animationBox.className = 'animation-box';
    if (currentPreferences.animationType !== 'none') {
      animationBox.classList.add(currentPreferences.animationType);
    }
    
    // Set active theme
    themeOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.theme === currentPreferences.theme) {
        option.classList.add('active');
      }
    });
  }
  
  // Show notification with slide-in animation
  function showNotification() {
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
  
  // Change theme
  function changeTheme(theme, color) {
    currentPreferences.theme = theme;
    currentPreferences.primaryColor = color;
    applyPreferences();
  }
  
  // Event Listeners
  saveButton.addEventListener('click', savePreferences);
  
  resetButton.addEventListener('click', () => {
    currentPreferences = {...defaultPreferences};
    applyPreferences();
    savePreferences();
  });
  
  speedSlider.addEventListener('input', () => {
    document.documentElement.style.setProperty('--animation-speed', `${speedSlider.value}s`);
  });
  
  animationTypeSelect.addEventListener('change', () => {
    // Remove all animation classes
    animationBox.className = 'animation-box';
    
    // Add selected animation class
    const selectedAnimation = animationTypeSelect.value;
    if (selectedAnimation !== 'none') {
      animationBox.classList.add(selectedAnimation);
    }
  });
  
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.dataset.theme;
      const color = getComputedStyle(option).backgroundColor;
      changeTheme(theme, color);
    });
  });
  
  // Initialize app
  loadPreferences();