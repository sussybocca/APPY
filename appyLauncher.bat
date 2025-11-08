@echo off
REM Windows launcher for .appy files
SET APP_FILE=%1

REM Call Node.js launcher
node "D:\appy\launcher.js" "%APP_FILE%"
pause
