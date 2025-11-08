const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

module.exports = function appyRun(appFileName) {
    const installedAppsFolder = path.join(__dirname, '..', '..', 'File System', 'Storage', 'installedApps');
    const appPath = path.join(installedAppsFolder, appFileName);

    if (!fs.existsSync(appPath)) {
        vscode.window.showErrorMessage(`${appFileName} not installed.`);
        return;
    }

    // Run app by sending message to Home Screen panel (or sandbox runtime)
    vscode.window.showInformationMessage(`Running ${appFileName}...`);
    // In real implementation, hook into sandboxRuntime.js to execute
};
