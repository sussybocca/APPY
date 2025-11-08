/**
 * Real-time battery display for panels using the Battery Status API
 * Shows actual battery percentage and charging status
 */
(function() {
    const batteryLabel = document.createElement('div');
    batteryLabel.id = 'battery-label';
    batteryLabel.style.textAlign = 'center';
    batteryLabel.style.marginBottom = '10px';
    document.body.prepend(batteryLabel);

    async function updateBatteryStatus() {
        if (!navigator.getBattery) {
            batteryLabel.textContent = 'Battery info not available';
            return;
        }

        try {
            const battery = await navigator.getBattery();

            function refresh() {
                const percent = Math.round(battery.level * 100);
                const charging = battery.charging ? '⚡ Charging' : '';
                batteryLabel.textContent = `Battery: ${percent}% ${charging}`;
            }

            // Initial update
            refresh();

            // Update when battery level or charging changes
            battery.addEventListener('levelchange', refresh);
            battery.addEventListener('chargingchange', refresh);

            // Optional: update every minute as a fallback
            setInterval(refresh, 60000);

        } catch (err) {
            batteryLabel.textContent = 'Battery info not available';
            console.error(err);
        }
    }

    updateBatteryStatus();

    // Optional manual setter
    window.setBattery = function(value) {
        batteryLabel.textContent = `Battery: ${value}% (manual)`;
    };
})();
