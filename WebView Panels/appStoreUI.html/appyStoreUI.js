const vscode = acquireVsCodeApi();
const storeGrid = document.getElementById('store-grid');

// Request store apps from extension
vscode.postMessage({ command: 'getStoreApps' });

// Listen for extension response
window.addEventListener('message', event => {
    const message = event.data;
    if (message.command === 'sendStoreApps') {
        renderStore(message.apps);
    }
});

function renderStore(apps) {
    storeGrid.innerHTML = '';
    apps.forEach(app => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'store-item';

        const img = document.createElement('img');
        img.src = 'https://via.placeholder.com/60';

        const span = document.createElement('span');
        span.textContent = app.name;

        const installBtn = document.createElement('button');
        installBtn.textContent = 'Install';
        installBtn.addEventListener('click', () => {
            vscode.postMessage({ command: 'installApp', file: app.file });
        });

        itemDiv.appendChild(img);
        itemDiv.appendChild(span);
        itemDiv.appendChild(installBtn);
        storeGrid.appendChild(itemDiv);
    });
}
