@echo off
title SkillBridge - Evidence-Backed Placement Platform
echo ========================================================
echo   SkillBridge - PromptWars x KickToTech 2026
echo   "Don't just list what you know. Show what you can do."
echo ========================================================
echo.
echo Launching local development server on http://localhost:3000 ...

python serve.py
if errorlevel 1 (
    echo.
    echo Notice: Python server exited. Opening index.html directly...
    start index.html
)
pause
