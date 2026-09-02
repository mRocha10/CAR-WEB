$root = "c:\Users\marcr\Desktop\AdSense\WEB (CARS)\CAR-WEB"
$baseUrl = "https://enginestarters.org"
$sitemapPath = Join-Path $root "sitemap.xml"

$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter *.html | Where-Object {
    $_.FullName -notmatch '\\node_modules\\'
} | Sort-Object FullName

$urlEntries = foreach ($file in $htmlFiles) {
    $relPath = $file.FullName.Substring($root.Length).Replace('\', '/')
    if ($relPath.StartsWith('/')) { $relPath = $relPath.Substring(1) }

    $url = if ($relPath -eq "index.html") {
        "$baseUrl/"
    } else {
        "$baseUrl/$relPath"
    }

    [PSCustomObject]@{
        Url = $url
        LastModified = $file.LastWriteTimeUtc.ToString("yyyy-MM-dd")
    }
}

$xmlLines = @(
    '<?xml version="1.0" encoding="UTF-8"?>'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
)

foreach ($entry in $urlEntries) {
    $xmlLines += '  <url>'
    $xmlLines += "    <loc>$($entry.Url)</loc>"
    $xmlLines += "    <lastmod>$($entry.LastModified)</lastmod>"
    $xmlLines += '  </url>'
}

$xmlLines += '</urlset>'

Set-Content -Path $sitemapPath -Value ($xmlLines -join "`r`n") -Encoding UTF8

Write-Host "Sitemap regenerated with $($urlEntries.Count) HTML URLs."
