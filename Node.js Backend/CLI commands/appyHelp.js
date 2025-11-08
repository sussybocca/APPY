const vscode = require('vscode');

module.exports = function appyHelp() {
    vscode.window.showInformationMessage(
        'Appy Help:\n' +
        'openHomeScreen - Open iPhone Home Screen\n' +
        'openAppStore - Open Appy Store\n' +
        'openWebBuildPreview - Preview converted Web Builds\n' +
        'run <app> - Run a .appy app\n' +
        'install <app> - Install a .appy app\n' +
        'convert <app> - Convert a .appy to web build\n' +
        'guide - Show guide\n' +
        'make-template - Create new Appy template'
    );
};
