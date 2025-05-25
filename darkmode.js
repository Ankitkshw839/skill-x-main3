// Check for saved dark mode preference or use system preference
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && 
                       localStorage.getItem('darkMode') === null);
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeToggle(true);
    }
}

// Toggle dark mode on/off
function toggleDarkMode() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
        updateDarkModeToggle(false);
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
        updateDarkModeToggle(true);
    }
}

// Update toggle button icon
function updateDarkModeToggle(isDarkMode) {
    const toggleButton = document.querySelector('.dark-mode-toggle i');
    
    if (toggleButton) {
        if (isDarkMode) {
            toggleButton.classList.remove('fa-moon');
            toggleButton.classList.add('fa-sun');
        } else {
            toggleButton.classList.remove('fa-sun');
            toggleButton.classList.add('fa-moon');
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDarkMode);
