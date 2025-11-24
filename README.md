Appy - The Unified App Development & Build System

Version: 1.0
Author: [William Isaiah Jones]

⸻

Overview

Appy is a versatile framework and CLI tool designed to create, manage, run, and build applications using the .appy file format. .appy files allow developers to write application logic in a single file format that can be executed or packaged as a Windows executable (.exe) without requiring Node.js or other runtimes at the end-user side.

Appy combines:
	•	A custom interpreted language for .appy files.
	•	A VS Code extension for managing apps and interacting with a virtual iPhone-like simulator.
	•	CLI tools for running, installing, converting, and packaging .appy files.
	•	The ability to build standalone executables from .appy files using pkg.

⸻

Features

VS Code Extension
	•	Home Screen Panel: See installed apps, run apps, and customize the background.
	•	Appy Store Panel: Browse and install apps from a local store cache.
	•	Web Build Preview Panel: Preview .appy files converted to HTML web builds.
	•	Command Palette Integration:
	•	Appy: Open Home Screen
	•	Appy: Open Appy Store
	•	Appy: Open Web Build Preview
	•	Appy: Package App
	•	Appy: Run File
	•	Appy: Help
	•	Appy: Guide

CLI (appy.js)
	•	Run .appy scripts:
node appy.js run myscript.appy
	•	Build .appy files into executables:
node appy.js build myscript.appy
	•	Create a new template:
node appy.js make-template MyTemplate
	•	Show help:
node appy.js help
	•	Open developer guide:
node appy.js guide

⸻

Installation

Clone Repository

git clone https://github.com/sussybocca/appy.git
cd appy

Install Dependencies

npm install

Install Local pkg (for building executables)

npm install pkg

⸻

Build System
	•	Supports building .appy into standalone Windows executables.
	•	Uses a temporary launcher.js to execute .appy scripts.
	•	Detects Node.js version and ensures compatibility with pkg.
	•	Builds are stored in build/ folder before final .exe is created.

⸻

File Structure

Appy/
├─ Node.js Backend/
│  └─ CLI commands/
│     ├─ appyHelp.js
│     ├─ appyRun.js
│     ├─ appyInstall.js
│     ├─ appyConvert.js
│     ├─ appyGuide.js
│     └─ appyMakeTemplate.js
├─ WebView Panels/
│  ├─ iPhone Simulator/
│  └─ Web Build Preview Panel/
├─ appy.js
├─ AppyInterpreter.js
├─ package.json
└─ README.md

⸻

Notes
	•	.appy is a standalone application format.
	•	No Node.js or Python runtime is required to run built .appy executables.
	•	Large projects can split code into multiple .appy files.

⸻

Optional
	•	Customize VS Code extension panels.
	•	Add your own .appy templates for rapid development.

⸻

Build .appy File into Windows Executable
	1.	Ensure you have installed local pkg as above.
	2.	Run:
node appy.js build myscript.appy
	3.	Resulting .exe will appear in the root folder.

⸻

Contributing
	•	Fork repository.
	•	Submit issues or pull requests.
	•	Follow standard Node.js module structure for CLI commands.
