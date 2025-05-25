// Firebase Authentication Module
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCGV8-zgiG0z04OTU-bK7fbOWPLT4X6TFY",
    authDomain: "simplexify.firebaseapp.com",
    projectId: "simplexify",
    storageBucket: "simplexify.appspot.com",
    messagingSenderId: "809236435012",
    appId: "1:809236435012:web:18ade7317dda448c716c11",
    measurementId: "G-H8667PT04T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Protected pages (pages that require authentication)
const protectedPages = [
    'welcome2.html',
    'profile.html',
    'dashboard.html',
    'mycourses.html',
    'onboarding.html',
    'business.html',
    'technology.html',
    'design.html'
];

// Public pages (pages that don't require authentication)
const publicPages = [
    'index.html',
    'login.html',
    'signup.html'
];

// Get current page name
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Check if current page requires authentication
const requiresAuth = protectedPages.includes(currentPage);
const isPublicPage = publicPages.includes(currentPage);

// Authentication state observer
onAuthStateChanged(auth, (user) => {
    if (!user && requiresAuth) {
        // If no user is signed in and page requires auth, redirect to login
        window.location.replace('login.html');
    } else if (user && isPublicPage) {
        // If user is signed in and on a public page, redirect to welcome
        window.location.replace('welcome2.html');
    }
});

// Handle logout
export async function handleLogout() {
    try {
        await signOut(auth);
        window.location.replace('index.html');
        // Prevent going back to protected pages
        window.history.pushState(null, '', 'index.html');
        window.addEventListener('popstate', function() {
            window.location.replace('login.html');
        });
    } catch (error) {
        console.error("Error signing out:", error);
        alert('Error signing out. Please try again.');
    }
}

// Export auth instance for use in other files
export { auth }; 