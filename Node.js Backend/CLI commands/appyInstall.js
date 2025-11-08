const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

module.exports = function appyInstall(appFileName) {
    const srcPath = path.join(__dirname, '..', '..', 'Templates & Assets', 'sampleApps', appFileName);
    const destFolder = path.join(__dirname, '..', '..', 'File System', 'Storage', 'installedApps');

    if (!fs.existsSync(srcPath)) {
        vscode.window.showErrorMessage(`${appFileName} not found in sample apps.`);
        return;
    }

    if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });

    const destPath = path.join(destFolder, appFileName);
    fs.copyFileSync(srcPath, destPath);
    vscode.window.showInformationMessage(`${appFileName} installed successfully!`);
};
