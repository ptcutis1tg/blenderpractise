@echo off
setlocal
cd /d "%~dp0"

echo ========================================================
echo        BLENDERFLOW - PUSH TO GITHUB ACTION CI/CD
echo ========================================================
echo.

set "GIT_CMD=C:\Users\Admin\AppData\Local\Programs\Git\cmd\git.exe"
if not exist "%GIT_CMD%" (
    where git >nul 2>nul
    if %errorlevel% equ 0 (
        set "GIT_CMD=git"
    ) else (
        echo [ERROR] Git is not found!
        pause
        exit /b 1
    )
)

set /p REPO_URL="Nhap GitHub Repository URL (vi du: https://github.com/username/blenderflow.git): "
if "%REPO_URL%"=="" (
    echo [ERROR] URL khong duoc de trong!
    pause
    exit /b 1
)

echo.
echo [1/3] Dang cau hinh remote origin...
"%GIT_CMD%" remote remove origin 2>nul
"%GIT_CMD%" remote add origin %REPO_URL%

echo [2/3] Chuyen nhanh sang main...
"%GIT_CMD%" branch -M main

echo [3/3] Dang day code len GitHub...
"%GIT_CMD%" push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo [THANH CONG] Code da duoc push len GitHub!
    echo GitHub Actions se tu dong kich hoat quy trinh CI/CD:
    echo   - Chay Node.js 20 & Audit Test (35/35 check)
    echo   - Build Vite & TypeScript
    echo   - Deploy ban web len GitHub Pages
    echo ========================================================
) else (
    echo.
    echo [CANH BAO] Push that bai. Vui long kiem tra lai quyen truy cap / Personal Access Token tren GitHub.
)

pause
