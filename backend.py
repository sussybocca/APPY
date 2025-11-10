#!/usr/bin/env python3
import os
import sys
import subprocess
import webbrowser

args = sys.argv[1:]
cwd = os.getcwd()
workspace_dir = cwd

def log(msg):
    print(msg)

# Helpers
def run_file(file_path, additional_args=[]):
    if not os.path.exists(file_path):
        return log(f"No file found: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    log(f"Running file: {file_path}")
    log(content)
    # Actually execute Python files
    if file_path.endswith('.py'):
        try:
            subprocess.run([sys.executable, file_path] + additional_args, check=True)
            log("File executed successfully!")
        except subprocess.CalledProcessError:
            log("Execution failed, please try again.")

def create_project(project_name):
    project_path = os.path.join(workspace_dir, project_name)
    if not os.path.exists(project_path):
        os.makedirs(project_path)
        log(f"Project created: {project_path}")
    else:
        log(f"Project already exists: {project_path}")

def check_workspace():
    if not os.path.exists(workspace_dir):
        log("No workspace detected, please open a workspace.")
        return False
    return True

# Commands dictionary
commands = {
    "execute scripts": lambda: log("Executing all scripts..."),
    "%findfilename%": lambda: log("Finding filename..."),
    "%1 execute progress": lambda: log("Executing first argument with progress..."),
    "%additional arguments%": lambda: log("Processing additional arguments..."),
    "execute $%workingdirectory%": lambda: log(f"Executing in working directory: {cwd}"),
    "%file% %additional arguments%": lambda: run_file(args[1], args[2:]),
    "%file% %additional arguments% --cwd %workingdirectory%": lambda: run_file(args[1], args[2:]),
    "percentage available via progress bar space": lambda: log("Checking progress bar percentage..."),
    "check percentages $ctrl+appy": lambda: log("Checking percentages..."),
    "run selected file with workspace": lambda: run_file(args[1], args[2:]),
    "file detected via workspace": lambda: log("File detected!") if len(args) > 1 and os.path.exists(args[1]) else log("No file detected."),
    "create new directory for appy project": lambda: create_project(args[1] if len(args) > 1 else "NewAppyProject"),
    "aoioy deploy": lambda: log("Deploying via aoioy..."),
    "deploy to web build": lambda: log("Deploying to web build..."),
    "execute my files $%^#$": lambda: log("Executing files..."),
    "files detected via workspace directory": lambda: log(f"Files in workspace: {', '.join(os.listdir(workspace_dir))}" if check_workspace() else ""),
    "open app store": lambda: webbrowser.open("https://appy.store"),
    "open web build preview": lambda: webbrowser.open("http://localhost:3000/webbuild"),
    "open home screen": lambda: log("Home screen opened..."),
    "help": lambda: log("All Appy commands executed through CLI"),
    "guide": lambda: log("Opening Guide..."),
    "make template": lambda: log("Making Template..."),
    "run": lambda: run_file(args[1] if len(args) > 1 else "main.appy"),
    "install": lambda: log("Installing App..."),
    "convert": lambda: log("Converting App to Web Build..."),
    "deploy": lambda: log("Deploying..."),
    "deployWebBuild": lambda: log("Deploying Web Build..."),
    "createProject": lambda: create_project(args[1] if len(args) > 1 else "NewAppyProject"),
    "createNewProject": lambda: create_project(args[1] if len(args) > 1 else "NewAppyProject"),
    "runFileInworkspace": lambda: run_file(args[1], args[2:]),
    "executeWithArguments": lambda: run_file(args[1], args[2:]),
    "executed successfully": lambda: log("Execution successful!"),
    "execution failed please try again": lambda: log("Execution failed, please try again."),
    "checking percentages": lambda: log("Checking percentages..."),
    "no file detected in workspace": lambda: log("No file detected in workspace."),
    "no workspace detected please open a workspace to continue": lambda: log("No workspace detected."),
    "creating new project directory": lambda: create_project(args[1] if len(args) > 1 else "NewAppyProject"),
    "deploying to web build": lambda: log("Deploying to Web Build..."),
    "opening app store": lambda: webbrowser.open("https://appy.store"),
    "opening web build preview": lambda: webbrowser.open("http://localhost:3000/webbuild"),
    "opening home screen": lambda: log("Home screen opened..."),
    "opening help": lambda: log("Showing Appy Help..."),
    "opening guide": lambda: log("Opening Guide..."),
    "making template": lambda: log("Making Template..."),
    "running app": lambda: run_file(args[1] if len(args) > 1 else "main.appy"),
    "installing app": lambda: log("Installing App..."),
    "converting app to web build": lambda: log("Converting App to Web Build..."),
    "deployment successful": lambda: log("Deployment successful!"),
    "deployment failed please try again later": lambda: log("Deployment failed, please try again later."),
    "project created successfully": lambda: log("Project created successfully."),
    "create hulk project": lambda: create_project("HulkProject"),
    "create titan project": lambda: create_project("TitanProject"),
    "create avenger project": lambda: create_project("AvengerProject"),
    "create guardian project": lambda: create_project("GuardianProject"),
    "create new hulk project": lambda: create_project("NewHulkProject"),
    "create new titan project": lambda: create_project("NewTitanProject"),
    "create new avenger project": lambda: create_project("NewAvengerProject"),
    "new hulk project created successfully": lambda: log("New Hulk project created successfully!"),
    "new titan project created successfully": lambda: log("New Titan project created successfully!"),
    "new avenger project created successfully": lambda: log("New Avenger project created successfully!"),
    "failed to create new project please try again": lambda: log("Failed to create new project, please try again."),
    "run file in workspace": lambda: run_file(args[1], args[2:]),
    "execute files with additional arguments": lambda: run_file(args[1], args[2:]),
    "file executed successfully": lambda: log("File executed successfully!"),
}

# Main execution
if not args:
    log("No command provided. Type 'appy help' for list of commands.")
    sys.exit(1)

input_command = ' '.join(args)

if input_command in commands:
    commands[input_command]()
else:
    log(f"Unknown Appy command: '{input_command}'")
