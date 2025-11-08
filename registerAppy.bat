@echo off
:: Add Appy directory to PATH
setx PATH "%PATH%;C:\Program Files\Appy"

:: Define Appy file type
ftype AppyFile="C:\Program Files\Appy\appyLauncher.bat" "%1" %*

:: Associate .appy with AppyFile
assoc .appy=AppyFile

echo .appy file extension registered successfully!
pause
