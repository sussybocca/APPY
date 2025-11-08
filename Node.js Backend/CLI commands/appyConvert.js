const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

module.exports = function appyConvert(appFileName) {
    const installedAppsFolder = path.join(__dirname, '..', '..', 'File System', 'Storage', 'installedApps');
    const webBuildsFolder = path.join(__dirname, '..', '..', 'File System', 'Storage', 'webBuilds');

    if (!fs.existsSync(webBuildsFolder)) fs.mkdirSync(webBuildsFolder, { recursive: true });

    const appPath = path.join(installedAppsFolder, appFileName);
    if (!fs.existsSync(appPath)) {
        vscode.window.showErrorMessage(`${appFileName} not installed.`);
        return;
    }

    const buildHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${appFileName}</title>
</head>
<body>
    <h1>${appFileName} Web Build Preview</h1>
    <p>This is a converted web build of your .appy file.</p>
    <script>
        // Real logic could execute here
        console.log("Running ${appFileName} in web preview...");
    </script>
</body>
</html>`;

    const buildPath = path.join(webBuildsFolder, `${appFileName.replace('.appy','')}.html`);
    fs.writeFileSync(buildPath, buildHtml, 'utf8');

    vscode.window.showInformationMessage(`${appFileName} converted to Web Build!`);
};
