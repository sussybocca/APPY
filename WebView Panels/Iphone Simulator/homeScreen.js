const vscode = acquireVsCodeApi();
const fs = require('fs');
const path = require('path');

// Folder where installed apps live
const installedAppsFolder = path.join(__dirname, '..', '..', 'File System', 'Storage', 'installedApps');

const appGrid = document.getElementById('app-grid');
const batteryLabel = document.getElementById('battery');

// Load installed apps
function loadApps() {
    appGrid.innerHTML = ''; // clear current apps
    if (!fs.existsSync(installedAppsFolder)) {
        fs.mkdirSync(installedAppsFolder, { recursive: true });
    }

    const files = fs.readdirSync(installedAppsFolder).filter(file => file.endsWith('.appy'));
    files.forEach(file => {
        const appDiv = document.createElement('div');
        appDiv.className = 'app-icon';

        // Placeholder icon
        const img = document.createElement('img');
        img.src = 'https://via.placeholder.com/50'; 

        const span = document.createElement('span');
        span.textContent = path.parse(file).name;

        appDiv.appendChild(img);
        appDiv.appendChild(span);

        // Click to run the app
        appDiv.addEventListener('click', () => {
            vscode.postMessage({ command: 'runApp', appName: file });
        });

        appGrid.appendChild(appDiv);
    });
}

// Simulate battery drain
let battery = 100;
setInterval(() => {
    battery = Math.max(0, battery - 1);
    batteryLabel.textContent = `Battery: ${battery}%`;
}, 60000); // 1% per minute

// Initial load
loadApps();

// Listen for messages from extension
window.addEventListener('message', event => {
    const message = event.data;
    if (message.command === 'refreshApps') {
        loadApps();
    }
});
