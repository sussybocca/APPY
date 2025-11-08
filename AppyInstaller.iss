; Script generated for Appy Installer
[Setup]
AppName=Appy
AppVersion=1.0
DefaultDirName={pf}\Appy
DefaultGroupName=Appy
OutputBaseFilename=AppyInstaller
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin

[Files]
; Add your files here
Source: "AppyBackend.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "AppyInterpreter.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "appyLauncher.bat"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
; Desktop shortcut to launcher
Name: "{commondesktop}\Appy"; Filename: "{app}\appyLauncher.bat"

[Registry]
; Associate .appy files with Appy
Root: HKCR; Subkey: ".appy"; ValueType: string; ValueName: ""; ValueData: "AppyFile"; Flags: uninsdeletevalue
Root: HKCR; Subkey: "AppyFile\shell\open\command"; ValueType: string; ValueName: ""; ValueData: """{app}\appyLauncher.bat"" ""%1"""; Flags: uninsdeletekey
