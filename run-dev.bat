@echo off
echo Starting ServiceHub Development Server...
set NODE_ENV=development
npx tsx server/index.ts
echo.
echo Server stopped. Press any key to exit.
pause > nul