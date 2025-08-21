# PowerShell script to kill existing server and start new one
Write-Host "Stopping any existing server on port 5000..."
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "Starting ServiceHub Development Server..."
$env:NODE_ENV = "development"
$env:PORT = "3000"
npx tsx server/index.ts