const vscode = acquireVsCodeApi();

const buildSelector = document.getElementById('build-selector');
const refreshBtn = document.getElementById('refresh-btn');
const buildIframe = document.getElementById('build-iframe');

// Request the list of converted builds from extension
function loadBuilds() {
    vscode.postMessage({ command: 'getConvertedBuilds' });
}

// Listen for messages from extension
window.addEventListener('message', event => {
    const message = event.data;

    if (message.command === 'sendConvertedBuilds') {
        populateBuildSelector(message.builds);
    }

    if (message.command === 'previewBuild') {
        buildIframe.src = message.path;
    }
});

// Populate dropdown with builds
function populateBuildSelector(builds) {
    buildSelector.innerHTML = '<option value="">Select App Build</option>';
    builds.forEach(build => {
        const option = document.createElement('option');
        option.value = build.path;
        option.textContent = build.name;
        buildSelector.appendChild(option);
    });
}

// Handle selection
buildSelector.addEventListener('change', () => {
    const path = buildSelector.value;
    if (path) {
        buildIframe.src = path;
    }
});

// Refresh builds button
refreshBtn.addEventListener('click', loadBuilds);

// Initial load
loadBuilds();
