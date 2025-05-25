require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Create the env.js file with environment variables
const envFileContent = `// Environment configuration
window._env_ = {
    // These values are injected during build time
    FIREBASE_API_KEY: '${process.env.FIREBASE_API_KEY || ''}',
    OPENROUTER_API_KEY: '${process.env.OPENROUTER_API_KEY || ''}'
};`;

// Ensure the file is written with proper encoding
fs.writeFileSync(path.join(__dirname, '..', 'env.js'), envFileContent, 'utf8');
console.log('Environment variables have been injected into env.js');
