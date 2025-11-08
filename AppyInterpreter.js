#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const cwd = process.cwd();

// Ensure the safe directory exists
const safeDir = path.join(cwd, "appy/safe");
if (!fs.existsSync(safeDir)) fs.mkdirSync(safeDir, { recursive: true });

function log(msg) { console.log(msg); }
function error(msg) { console.error(msg); }

// Read .appy file
const filePath = args[0];
if (!filePath || !fs.existsSync(filePath)) {
    error("No .appy file found or path incorrect.");
    process.exit(1);
}

const fileContent = fs.readFileSync(filePath, "utf-8");
const codeLines = fileContent.split(/\r?\n/).map(l => l.trim()).filter(l => l);

// Appy runtime state
const AppyState = {
    true: true,
    false: false,
    net: { appy: false },
    allJsFunctional: false,
    importAll: false
};

// Core Appy actions
const AppyActions = {
    "files run": (exts) => {
        exts.forEach(ext => {
            fs.readdirSync(cwd).forEach(file => {
                if (file.endsWith(ext)) {
                    execSync(`node "${path.join(cwd, file)}"`, { stdio: 'inherit' });
                }
            });
        });
        log("Executed files: " + exts.join(", "));
    },
    "import all": () => { AppyState.importAll = true; log("All files import enabled."); },
    "create example": (filename) => {
        fs.writeFileSync(path.join(cwd, filename), `console.log("Example file created by Appy")`);
        log(`Created example file: ${filename}`);
    },
    "flames": () => {
        fs.readdirSync(cwd).forEach(file => {
            const fullPath = path.join(cwd, file);
            if (!fullPath.startsWith(safeDir) && fs.lstatSync(fullPath).isFile()) {
                fs.unlinkSync(fullPath);
            }
        });
        log("🔥 All non-safe files burned!");
    },
    "oil up": () => log("Organizing files..."),
    "npm install": (pkg) => {
        execSync(`npm install ${pkg}`, { stdio: 'inherit' });
        log(`Installed npm package: ${pkg}`);
    }
    // Add more Appy commands here as functions
};

// Minimal Appy parser
codeLines.forEach(line => {
    if (line.startsWith("appy files run")) {
        const exts = line.match(/\.\w+/g).map(e => e.slice(1));
        AppyActions["files run"](exts);
    } else if (line.startsWith("appy import all")) {
        AppyActions["import all"]();
    } else if (line.startsWith("appy create example")) {
        const filename = line.split(" ").pop();
        AppyActions["create example"](filename);
    } else if (line === "appy.flames") {
        AppyActions["flames"]();
    } else if (line === "appy.oil up") {
        AppyActions["oil up"]();
    } else if (line.startsWith("appy npm install")) {
        const pkg = line.split(" ").slice(3).join(" ");
        AppyActions["npm install"](pkg);
    } else {
        log(`Unrecognized Appy code: ${line}`);
    }
});
