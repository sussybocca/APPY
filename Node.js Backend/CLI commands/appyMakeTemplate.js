const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

module.exports = function appyMakeTemplate(templateName) {
    const templatesFolder = path.join(__dirname, '..', '..', 'Templates & Assets', 'appyTemplates');
    if (!fs.existsSync(templatesFolder)) fs.mkdirSync(templatesFolder, { recursive: true });

    const templatePath = path.join(templatesFolder, `${templateName}.appy`);
    if (fs.existsSync(templatePath)) {
        vscode.window.showErrorMessage(`Template ${templateName} already exists.`);
        return;
    }

    const defaultContent = `{
    "name": "${templateName}",
    "version": "1.0.0",
    "main": "index.js"
}`;

    fs.writeFileSync(templatePath, defaultContent, 'utf8');
    vscode.window.showInformationMessage(`Template ${templateName} created successfully!`);
};
