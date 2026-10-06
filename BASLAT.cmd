@echo off
setlocal
cd /d "%~dp0"
set "ENSYLMZ_NODE="
where node.exe >nul 2>nul
if not errorlevel 1 set "ENSYLMZ_NODE=node.exe"
if not defined ENSYLMZ_NODE if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "ENSYLMZ_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not defined ENSYLMZ_NODE if exist "%ProgramFiles%\nodejs\node.exe" set "ENSYLMZ_NODE=%ProgramFiles%\nodejs\node.exe"
if not defined ENSYLMZ_NODE goto missing
"%ENSYLMZ_NODE%" scripts\build.mjs
if errorlevel 1 goto failed
if /i "%~1"=="--check" exit /b 0
echo.
echo Portfoy baslatiliyor: http://127.0.0.1:4173
echo Siteyi kullanirken bu pencereyi acik birakin.
echo Durdurmak icin Ctrl+C kullanin.
start "" "http://127.0.0.1:4173"
"%ENSYLMZ_NODE%" scripts\serve.mjs
if errorlevel 1 goto failed
exit /b
:missing
echo Node.js bulunamadi. Baslatma dosyasindaki yerel Node yolu kontrol edilmeli.
pause
exit /b 1
:failed
echo Site baslatilamadi. Yukaridaki hata mesajini kontrol edin.
pause
exit /b 1
