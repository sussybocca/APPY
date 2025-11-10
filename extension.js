const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

// Import CLI command modules
const appyHelpCmd = require('./Node.js Backend/CLI commands/appyHelp');
const appyRunCmd = require('./Node.js Backend/CLI commands/appyRun');
const appyInstallCmd = require('./Node.js Backend/CLI commands/appyInstall');
const appyConvertCmd = require('./Node.js Backend/CLI commands/appyConvert');
const appyGuideCmd = require('./Node.js Backend/CLI commands/appyGuide');
const appyMakeTemplateCmd = require('./Node.js Backend/CLI commands/appyMakeTemplate');

function activate(context) {
    console.log('Appy extension is now active!');

    // Paths
    const homeScreenPath = path.join(__dirname, 'WebView Panels', 'iPhone Simulator', 'homeScreen.html');
    const appStorePath = path.join(__dirname, 'WebView Panels', 'iPhone Simulator', 'appyStoreUI.html');
    const webBuildPreviewPath = path.join(__dirname, 'WebView Panels', 'Web Build Preview Panel', 'webBuildPreview.html');

    const installedAppsFolder = path.join(__dirname, 'File System', 'Storage', 'installedApps');
    const storeCacheFolder = path.join(__dirname, 'File System', 'Storage', 'appyStoreCache');
    const webBuildsFolder = path.join(__dirname, 'File System', 'Storage', 'webBuilds');

    // --- Open Home Screen ---
    const openHomeScreen = vscode.commands.registerCommand('appy.openHomeScreen', () => {
        const panel = vscode.window.createWebviewPanel(
            'homeScreen',
            'Appy Home Screen',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        panel.webview.html = fs.readFileSync(homeScreenPath, 'utf8');

        // Handle messages from Home Screen
        panel.webview.onDidReceiveMessage(async message => {
            if (message.command === 'getInstalledApps') {
                if (!fs.existsSync(installedAppsFolder)) fs.mkdirSync(installedAppsFolder, { recursive: true });
                const files = fs.readdirSync(installedAppsFolder);
                const apps = files.filter(f => f.endsWith('.appy')).map(f => ({ name: f.replace('.appy',''), file: f, iconUrl: '' }));
                panel.webview.postMessage({ command: 'sendInstalledApps', apps });
            }

            if (message.command === 'selectBackground') {
                const result = await vscode.window.showOpenDialog({
                    canSelectMany: false,
                    openLabel: 'Select Background',
                    filters: { Images: ['png','jpg','jpeg','gif'] }
                });
                if (result && result.length > 0) {
                    const bgPath = panel.webview.asWebviewUri(vscode.Uri.file(result[0].fsPath)).toString();
                    panel.webview.postMessage({ command: 'setBackground', path: bgPath });
                }
            }

            if (message.command === 'runApp') {
                vscode.window.showInformationMessage(`Running ${message.appName}...`);
                appyRunCmd(message.appName); // Hook into CLI run
            }
        });
    });

    // --- Open Appy Store ---
    const openAppStore = vscode.commands.registerCommand('appy.openAppStore', () => {
        const panel = vscode.window.createWebviewPanel(
            'appyStore',
            'Appy Store',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        panel.webview.html = fs.readFileSync(appStorePath, 'utf8');

        panel.webview.onDidReceiveMessage(async message => {
            if (message.command === 'getStoreApps') {
                const storeJsonPath = path.join(storeCacheFolder, 'store.json');
                if (!fs.existsSync(storeCacheFolder)) fs.mkdirSync(storeCacheFolder, { recursive: true });
                if (!fs.existsSync(storeJsonPath)) {
                    fs.writeFileSync(storeJsonPath, JSON.stringify([
                        { name: 'Calculator', file: 'calculator.appy' },
                        { name: 'Notes', file: 'notes.appy' }
                    ], null, 4));
                }
                const apps = JSON.parse(fs.readFileSync(storeJsonPath, 'utf8'));
                panel.webview.postMessage({ command: 'sendStoreApps', apps });
            }

            if (message.command === 'installApp') {
                appyInstallCmd(message.file); // Hook into CLI install
            }
        });
    });

    // --- Open Web Build Preview ---
    const openWebBuildPreview = vscode.commands.registerCommand('appy.openWebBuildPreview', () => {
        const panel = vscode.window.createWebviewPanel(
            'webBuildPreview',
            'Web Build Preview',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        panel.webview.html = fs.readFileSync(webBuildPreviewPath, 'utf8');

        panel.webview.onDidReceiveMessage(message => {
            if (message.command === 'getConvertedBuilds') {
                if (!fs.existsSync(webBuildsFolder)) fs.mkdirSync(webBuildsFolder, { recursive: true });
                const files = fs.readdirSync(webBuildsFolder).filter(f => f.endsWith('.html'));
                const builds = files.map(f => ({
                    name: f.replace('.html',''),
                    path: panel.webview.asWebviewUri(vscode.Uri.file(path.join(webBuildsFolder, f))).toString()
                }));
                panel.webview.postMessage({ command: 'sendConvertedBuilds', builds });
            }

            if (message.command === 'convertApp') {
                appyConvertCmd(message.appName); // Hook into CLI convert
            }
        });
    });

    // --- CLI Commands ---
    const appyHelp = vscode.commands.registerCommand('appy.help', () => appyHelpCmd());
    const appyGuide = vscode.commands.registerCommand('appy.guide', () => appyGuideCmd());
    const appyMakeTemplate = vscode.commands.registerCommand('appy.makeTemplate', (name) => appyMakeTemplateCmd(name));
    const appyRunCLI = vscode.commands.registerCommand('appy.run', (appName) => appyRunCmd(appName));
    const appyInstallCLI = vscode.commands.registerCommand('appy.install', (appName) => appyInstallCmd(appName));
    const appyConvertCLI = vscode.commands.registerCommand('appy.convert', (appName) => appyConvertCmd(appName));

    // --- Run File Command (Backend + Interpreter) ---
    const appyRunFile = vscode.commands.registerCommand('appy.runFile', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active Appy file open!');
            return;
        }

        const filePath = editor.document.fileName;
        const backendPath = path.join(__dirname, '..', '..', 'AppyBackend.js');
        const interpreterPath = path.join(__dirname, '..', '..', 'AppyInterpreter.js');

        // First run backend, then interpreter
        cp.exec(`node "${backendPath}" && node "${interpreterPath}" "${filePath}"`, (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage('Error running Appy: ' + stderr);
            } else {
                vscode.window.showInformationMessage(stdout || 'Appy ran successfully!');
            }
        });
    });

    // --- Package App Command (New) ---
    const appyPackageApp = vscode.commands.registerCommand('appy.packageApp', async () => {
        if (!fs.existsSync(installedAppsFolder)) fs.mkdirSync(installedAppsFolder, { recursive: true });
        const files = fs.readdirSync(installedAppsFolder).filter(f => f.endsWith('.appy'));
        if (files.length === 0) {
            vscode.window.showErrorMessage('No installed .appy files to package!');
            return;
        }

        const pickedApp = await vscode.window.showQuickPick(files, { placeHolder: 'Select a .appy file to package' });
        if (!pickedApp) return;

        const outputFolder = await vscode.window.showOpenDialog({ canSelectFolders: true, openLabel: 'Select Output Folder' });
        if (!outputFolder || outputFolder.length === 0) return;

        const outputPath = path.join(outputFolder[0].fsPath, pickedApp);
        const backendPath = path.join(__dirname, '..', '..', 'AppyBackend.js');
        const interpreterPath = path.join(__dirname, '..', '..', 'AppyInterpreter.js');

        try {
            fs.copyFileSync(path.join(installedAppsFolder, pickedApp), outputPath);
            fs.copyFileSync(backendPath, path.join(outputFolder[0].fsPath, 'AppyBackend.js'));
            fs.copyFileSync(interpreterPath, path.join(outputFolder[0].fsPath, 'AppyInterpreter.js'));

            // Optionally, you could add pkg or another bundler here to convert to real .exe
            // cp.execSync(`pkg "${outputPath}" --output "${path.join(outputFolder[0].fsPath, pickedApp.replace('.appy', '.exe'))}"`);

            vscode.window.showInformationMessage(`Packaged ${pickedApp} successfully!`);
        } catch (err) {
            vscode.window.showErrorMessage('Error packaging App: ' + err.message);
        }
    });

    context.subscriptions.push(
        openHomeScreen,
        openAppStore,
        openWebBuildPreview,
        appyHelp,
        appyGuide,
        appyMakeTemplate,
        appyRunCLI,
        appyInstallCLI,
        appyConvertCLI,
        appyRunFile,
        appyPackageApp
    );
}

function deactivate() {
    console.log('Appy extension deactivated.');
}

module.exports = { activate, deactivate };
