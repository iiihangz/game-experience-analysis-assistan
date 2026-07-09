$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectSlug = "game-experience-analysis-assistant"
$packageRoot = Join-Path $projectRoot "portfolio-package"
$dropRoot = Join-Path $packageRoot "netlify-drop"
$siteDir = Join-Path $dropRoot $projectSlug
$zipPath = Join-Path $packageRoot "$projectSlug.zip"

if (Test-Path $packageRoot) {
    Remove-Item -LiteralPath $packageRoot -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $siteDir | Out-Null

$files = @(
    "index.html",
    "styles.css",
    "app.js",
    "README.md",
    "LICENSE",
    "package.json"
)

foreach ($file in $files) {
    $source = Join-Path $projectRoot $file
    if (Test-Path $source) {
        Copy-Item -LiteralPath $source -Destination $siteDir -Force
    }
}

$assets = Join-Path $projectRoot "assets"
if (Test-Path $assets) {
    Copy-Item -LiteralPath $assets -Destination (Join-Path $siteDir "assets") -Recurse -Force
}

Compress-Archive -Path (Join-Path $siteDir "*") -DestinationPath $zipPath -Force

Write-Host ""
Write-Host "Showcase package created:" -ForegroundColor Green
Write-Host "1. Netlify Drop folder: $siteDir"
Write-Host "2. Backup zip: $zipPath"
Write-Host ""
Write-Host "Quick publish:" -ForegroundColor Cyan
Write-Host "Open https://app.netlify.com/drop and drag the Netlify Drop folder above into the page."
