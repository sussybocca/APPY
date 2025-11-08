#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const open = require('open');

const args = process.argv.slice(2);
const cwd = process.cwd();
const workspaceDir = cwd;

function log(msg) {
    console.log(msg);
}

// Helpers
function runFile(filePath, additionalArgs = []) {
    if (!fs.existsSync(filePath)) return log(`No file found: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf-8');
    log(`Running file: ${filePath}`);
    log(content);
}

function createProject(projectName) {
    const projectPath = path.join(workspaceDir, projectName);
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
        log(`Project created: ${projectPath}`);
    } else {
        log(`Project already exists: ${projectPath}`);
    }
}

function checkWorkspace() {
    if (!fs.existsSync(workspaceDir)) {
        log("No workspace detected, please open a workspace.");
        return false;
    }
    return true;
}

// All your commands
const commands = {
    "excute scripts": () => log("Executing all scripts..."),
    "%findfilename%": () => log("Finding filename..."),
    "%1 excute progress": () => log("Executing first argument with progress..."),
    "%additonal arguments%": () => log("Processing additional arguments..."),
    "excute $%workingdirectory%": () => log(`Executing in working directory: ${cwd}`),
    "%file% %additional arguments%": () => runFile(args[1], args.slice(2)),
    "%file% %additional arguments% --cwd %workingdirectory%": () => runFile(args[1], args.slice(2)),
    "percentage available via progress bar space": () => log("Checking progress bar percentage..."),
    "check perchantagesge $ctrl+appy": () => log("Checking percentages..."),
    "run selected file with workspace": () => log("Running selected file in workspace..."),
    "file detected via workspace": () => fs.existsSync(args[1]) ? log("File detected!") : log("No file detected."),
    "create new directory for appy project": () => createProject(args[1] || "NewAppyProject"),
    "aoioy deploy": () => log("Deploying via aoioy..."),
    "deploy to web build": () => log("Deploying to web build..."),
    "excute my files $%^#$": () => log("Executing files..."),
    "files detected via workspace directory": () => {
        if (!checkWorkspace()) return;
        const files = fs.readdirSync(workspaceDir);
        log(`Files in workspace: ${files.join(", ")}`);
    },
    "open app store": () => open("https://appy.store"),
    "open web build preview": () => open("http://localhost:3000/webbuild"),
    "open home screen": () => log("Home screen opened..."),
    "help": () => log("All Appy commands executed through CLI"),
    "guide": () => log("Opening Guide..."),
    "make template": () => log("Making Template..."),
    "run": () => runFile(args[1] || "main.appy"),
    "install": () => log("Installing App..."),
    "convert": () => log("Converting App to Web Build..."),
    "openAppStore": () => open("https://appy.store"),
    "openWebBuildPreview": () => open("http://localhost:3000/webbuild"),
    "openHomeScreen": () => log("Home screen opened..."),
    "makeTemplate": () => log("Making Template..."),
    "deploy": () => log("Deploying..."),
    "deployWebBuild": () => log("Deploying Web Build..."),
    "createProject": () => createProject(args[1] || "NewAppyProject"),
    "createNewProject": () => createProject(args[1] || "NewAppyProject"),
    "runFileInworkspace": () => runFile(args[1], args.slice(2)),
    "executeWithArguments": () => runFile(args[1], args.slice(2)),
    "excuted successfully": () => log("Execution successful!"),
    "execution failed please try again": () => log("Execution failed, please try again."),
    "checking percentages": () => log("Checking percentages..."),
    "no file detected in workspace": () => log("No file detected in workspace."),
    "no workspace detected please open a workspace to continue": () => log("No workspace detected."),
    "creating new project directory": () => createProject(args[1] || "NewAppyProject"),
    "deploying to web build": () => log("Deploying to Web Build..."),
    "opening app store": () => open("https://appy.store"),
    "opening web build preview": () => open("http://localhost:3000/webbuild"),
    "opening home screen": () => log("Home screen opened..."),
    "opening help": () => log("Showing Appy Help..."),
    "opening guide": () => log("Opening Guide..."),
    "making template": () => log("Making Template..."),
    "running app": () => runFile(args[1] || "main.appy"),
    "installing app": () => log("Installing App..."),
    "converting app to web build": () => log("Converting App to Web Build..."),
    "deployment successful": () => log("Deployment successful!"),
    "deployment failed please try again later": () => log("Deployment failed, please try again later."),
    "project created successfully": () => log("Project created successfully."),
    "create hulk project": () => createProject("HulkProject"),
    "create titan project": () => createProject("TitanProject"),
    "create avenger project": () => createProject("AvengerProject"),
    "create guardian project": () => createProject("GuardianProject"),
    "create new hulk project": () => createProject("NewHulkProject"),
    "create new titan project": () => createProject("NewTitanProject"),
    "create new avenger project": () => createProject("NewAvengerProject"),
    "new hulk project created successfully": () => log("New Hulk project created successfully!"),
    "new titan project created successfully": () => log("New Titan project created successfully!"),
    "new avenger project created successfully": () => log("New Avenger project created successfully!"),
    "failed to create new project please try again": () => log("Failed to create new project, please try again."),
    "run file in workspace": () => runFile(args[1], args.slice(2)),
    "excute files with additional arguments": () => runFile(args[1], args.slice(2)),
    "file excuted successfully": () => log("File executed successfully!"),
};

// Main execution
if (args.length === 0) {
    log("No command provided. Type 'appy help' for list of commands.");
    process.exit(1);
}

const inputCommand = args.join(" ");

if (commands[inputCommand]) {
    commands[inputCommand]();
} else {
    log(`Unknown Appy command: "${inputCommand}"`);
}
