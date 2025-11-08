/**
 * Shared utility to create app icons for Home Screen or App Store
 * Usage: createAppIcon(name, iconUrl, onClick)
 */

function createAppIcon(appName, iconUrl, onClick) {
    const appDiv = document.createElement('div');
    appDiv.className = 'app-icon';

    const img = document.createElement('img');
    img.src = iconUrl || 'https://via.placeholder.com/50';

    const span = document.createElement('span');
    span.textContent = appName;

    appDiv.appendChild(img);
    appDiv.appendChild(span);

    if (onClick) {
        appDiv.addEventListener('click', onClick);
    }

    return appDiv;
}
