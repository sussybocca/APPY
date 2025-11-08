const vscode = require('vscode');

module.exports = function appyGuide() {
    vscode.window.showInformationMessage(
        'Appy Guide:\n' +
        '1. Install apps using "appy install <app>"\n' +
        '2. Run apps using "appy run <app>"\n' +
        '3. Convert apps to web builds using "appy convert <app>"\n' +
        '4. Use Home Screen and Appy Store for GUI interaction'
    );
};
