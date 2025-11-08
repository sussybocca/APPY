// launcher.js
const fs = require('fs');
const path = require('path');

const appFile = process.argv[2];

if (!appFile) {
    console.error("No .appy file provided.");
    process.exit(1);
}

if (!fs.existsSync(appFile)) {
    console.error(`File not found: ${appFile}`);
    process.exit(1);
}

// Here you can implement what running a .appy file actually does
console.log(`Running .appy file: ${appFile}`);

// Example: read JSON or script inside .appy
const data = fs.readFileSync(appFile, 'utf8');
console.log("File content:");
console.log(data);

// TODO: integrate with your VS Code extension logic if needed
