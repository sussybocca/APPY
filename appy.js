#!/usr/bin/env node

// === Appy CLI (Build Mode) ===
// Converts a .appy file into an executable .exe file using local pkg

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Appy CLI - Build Tool
Usage:
  node appy.js build <file.appy>   Build .appy into .exe
  node appy.js run <file.appy>     Run .appy (interpreted)
`);
  process.exit(0);
}

const command = args[0].toLowerCase();
const target = args[1];

if (!target) {
  console.error("❌ Please specify a .appy file.");
  process.exit(1);
}

const inputPath = path.resolve(target);
if (!fs.existsSync(inputPath)) {
  console.error(`❌ File not found: ${inputPath}`);
  process.exit(1);
}

switch (command) {
  case "run": {
    console.log(`▶ Running ${target}...`);
    const interpreterPath = path.join(__dirname, "AppyInterpreter.js");
    if (!fs.existsSync(interpreterPath)) {
      console.error("❌ AppyInterpreter.js missing!");
      process.exit(1);
    }
    cp.execSync(`node "${interpreterPath}" "${inputPath}"`, { stdio: "inherit" });
    break;
  }

  case "build": {
    console.log(`🧱 Building executable from ${target}...`);

    const buildFolder = path.join(__dirname, "build");
    if (!fs.existsSync(buildFolder)) fs.mkdirSync(buildFolder);

    const launcherCode = `
      const fs = require('fs');
      const path = require('path');
      const cp = require('child_process');
      const appFile = path.join(__dirname, '${path.basename(inputPath)}');
      const interpreter = path.join(__dirname, 'AppyInterpreter.js');
      cp.execSync(\`node "\${interpreter}" "\${appFile}"\`, { stdio: 'inherit' });
    `;
    const launcherPath = path.join(buildFolder, "launcher.js");
    fs.writeFileSync(launcherPath, launcherCode);

    fs.copyFileSync(inputPath, path.join(buildFolder, path.basename(inputPath)));
    fs.copyFileSync(
      path.join(__dirname, "AppyInterpreter.js"),
      path.join(buildFolder, "AppyInterpreter.js")
    );

    // Use local pkg
    const localPkgPath = path.join(__dirname, "node_modules", ".bin", "pkg.cmd"); // Windows
    if (!fs.existsSync(localPkgPath)) {
      console.error("❌ Local pkg not found. Run 'npm install pkg' first.");
      process.exit(1);
    }

    // Force Node 18 for pkg
    const pkgTarget = "node18-win-x64";

    try {
      cp.execSync(`"${localPkgPath}" "${launcherPath}" --targets ${pkgTarget} --output "${path.join(__dirname, path.basename(target, ".appy") + ".exe")}"`, {
        stdio: "inherit",
      });
      console.log(`✅ Successfully built ${path.basename(target, ".appy")}.exe`);
    } catch (err) {
      console.error("❌ Build failed:", err.message);
    }
    break;
  }

  default:
    console.log("❌ Unknown command. Use 'build' or 'run'.");
}
