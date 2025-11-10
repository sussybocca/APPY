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

def run_file(file_path, additional_args=[]):
    if not os.path.exists(file_path):
        return log(f"No file found: {file_path}")
    log(f"Running file: {file_path}")
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
    return os.path.exists(workspace_dir)

# Full commands dictionary (all your original commands)
commands = {
    "execute scripts": lambda args: log("Executing all scripts..."),
    "%findfilename%": lambda args: log("Finding filename..."),
    "%1 execute progress": lambda args: log("Executing first argument with progress..."),
    "%additional arguments%": lambda args: log("Processing additional arguments..."),
    "execute $%workingdirectory%": lambda args: log(f"Executing in working directory: {cwd}"),
    "%file% %additional arguments%": lambda args: run_file(args[0], args[1:]) if args else log("No file specified"),
    "%file% %additional arguments% --cwd %workingdirectory%": lambda args: run_file(args[0], args[1:]) if args else log("No file specified"),
    "percentage available via progress bar space": lambda args: log("Checking progress bar percentage..."),
    "check percentages $ctrl+appy": lambda args: log("Checking percentages..."),
    "run selected file with workspace": lambda args: run_file(args[0], args[1:]) if args else log("No file specified"),
    "file detected via workspace": lambda args: log("File detected!") if args and os.path.exists(args[0]) else log("No file detected."),
    "create new directory for appy project": lambda args: create_project(args[0]) if args else create_project("NewAppyProject"),
    "aoioy deploy": lambda args: log("Deploying via aoioy..."),
    "deploy to web build": lambda args: log("Deploying to web build..."),
    "execute my files $%^#$": lambda args: log("Executing files..."),
    "files detected via workspace directory": lambda args: log(f"Files in workspace: {', '.join(os.listdir(workspace_dir))}" if check_workspace() else ""),
    "open app store": lambda args: webbrowser.open("https://appy.store"),
    "open web build preview": lambda args: webbrowser.open("http://localhost:3000/webbuild"),
    "open home screen": lambda args: log("Home screen opened..."),
    "help": lambda args: log("All Appy commands executed through CLI"),
    "guide": lambda args: log("Opening Guide..."),
    "make template": lambda args: log("Making Template..."),
    "run": lambda args: run_file(args[0], args[1:]) if args else run_file("main.appy"),
    "install": lambda args: log("Installing App..."),
    "convert": lambda args: log("Converting App to Web Build..."),
    "deploy": lambda args: log("Deploying..."),
    "deployWebBuild": lambda args: log("Deploying Web Build..."),
    "createProject": lambda args: create_project(args[0]) if args else create_project("NewAppyProject"),
    "createNewProject": lambda args: create_project(args[0]) if args else create_project("NewAppyProject"),
    "runFileInworkspace": lambda args: run_file(args[0], args[1:]) if args else log("No file specified"),
    "executeWithArguments": lambda args: run_file(args[0], args[1:]) if args else log("No file specified"),
    "executed successfully": lambda args: log("Execution successful!"),
    "execution failed please try again": lambda args: log("Execution failed, please try again."),
    "checking percentages": lambda args: log("Checking percentages..."),
    "no file detected in workspace": lambda args: log("No file detected in workspace."),
    "no workspace detected please open a workspace to continue": lambda args: log("No workspace detected."),
    "creating new project directory": lambda args: create_project(args[0]) if args else create_project("NewAppyProject"),
    "deploying to web build": lambda args: log("Deploying to Web Build..."),
    "opening app store": lambda args: webbrowser.open("https://appy.store"),
    "opening web build preview": lambda args: webbrowser.open("http://localhost:3000/webbuild"),
    "opening home screen": lambda args: log("Home screen opened..."),
    "opening help": lambda args: log("Showing Appy Help..."),
    "opening guide": lambda args: log("Opening Guide..."),
    "making template": lambda args: log("Making Template..."),
    "running app": lambda args: run_file(args[0], args[1:]) if args else run_file("main.appy"),
    "installing app": lambda args: log("Installing App..."),
    "converting app to web build": lambda args: log("Converting App to Web Build..."),
    "deployment successful": lambda args: log("Deployment successful!"),
    "deployment failed please try again later": lambda args: log("Deployment failed, please try again later."),
    "project created successfully": lambda args: log("Project created successfully."),
    "create hulk project": lambda args: create_project("HulkProject"),
    "create titan project": lambda args: create_project("TitanProject"),
    "create avenger project": lambda args: create_project("AvengerProject"),
    "create guardian project": lambda args: create_project("GuardianProject"),
    "create new hulk project": lambda args: create_project("NewHulkProject"),
    "create new titan project": lambda args: create_project("NewTitanProject"),
    "create new avenger project": lambda args: create_project("NewAvengerProject"),
    "new hulk project created successfully": lambda args: log("New Hulk project created successfully!"),
    "new titan project created successfully": lambda args: log("New Titan project created successfully!"),
    "new avenger project created successfully": lambda args: log("New Avenger project created successfully!"),
    "failed to create new project please try again": lambda args: log("Failed to create new project, please try again."),
    "run file in workspace": lambda args: run_file(args[0], args[1:]) if args else log("No file specified"),
    "execute files with additional arguments": lambda args: run_file(args[0], args[1:]) if args else log("No file specified"),
    "file executed successfully": lambda args: log("File executed successfully!"),
}

# Main execution
if not args:
    log("No command provided. Type 'appy help' for list of commands.")
    sys.exit(1)

input_command = args[0]
cmd_args = args[1:]

if input_command in commands:
    commands[input_command](cmd_args)
else:
    log(f"Unknown Appy command: '{input_command}'")
