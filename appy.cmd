@echo off
:: Appy command launcher
:: %1 is the file, %* is all arguments

SET file=%1
SET ext=%~x1

:: Check file extension
IF /I "%ext%"==".appy" (
    :: Run Appy Interpreter
    node "%~dp0\AppyInterpreter.js" %*
) ELSE (
    :: Run Appy Backend
    node "%~dp0\AppyBackend.js" %*
)
