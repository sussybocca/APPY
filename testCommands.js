// testCommands.js
const appyInstall = require('./Node.js Backend/CLI commands/appyInstall');
const appyRun = require('./Node.js Backend/CLI commands/appyRun');

// Test installing an app
appyInstall('calculator.appy');

// Test running an app
appyRun('calculator.appy');
