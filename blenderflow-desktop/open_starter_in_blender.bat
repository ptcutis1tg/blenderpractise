@echo off
title BlenderFlow 5.3 Bridge Launcher
echo ====================================================
echo  Launching Blender 5.3 with Starter Challenge Asset
echo ====================================================
echo.
set BLENDER_EXE=C:\Program Files\Blender Foundation\Blender 5.3\blender.exe
set STARTER_BLEND=%~dp0starter_assets\challenge_04_chair_starter.blend

if exist "%BLENDER_EXE%" (
    echo Found Blender 5.3 at: %BLENDER_EXE%
    echo Loading Project: %STARTER_BLEND%
    start "" "%BLENDER_EXE%" "%STARTER_BLEND%"
) else (
    echo [ERROR] Blender 5.3 not found at %BLENDER_EXE%
    pause
)
