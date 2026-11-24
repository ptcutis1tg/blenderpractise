@echo off
title BlenderFlow Desktop
echo ==========================================================
echo        Starting BlenderFlow Desktop (Phase 5 Standalone)
echo ==========================================================
echo.

set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"

echo [1/3] Checking environment & production build...
if not exist "dist\index.html" (
    echo Building production package...
    call npm.cmd run build
)

echo [2/3] Starting BlenderFlow Desktop Engine on port 5173...
start /b "" npm.cmd run dev > nul 2>&1

timeout /t 2 /nobreak > nul

echo [3/3] Opening BlenderFlow Desktop Window...
where msedge >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start msedge.exe --app="http://localhost:5173" --window-size=1280,820
) else (
    start http://localhost:5173
)

echo.
echo ==========================================================
echo  BlenderFlow Desktop is active!
echo.
echo  📱 TRUY CẬP TRÊN MOBILE (CÙNG WI-FI):
echo     http://192.168.1.6:5173
echo.
echo  💻 TRÊN MÁY TÍNH:
echo     http://localhost:5173
echo ==========================================================
