$root = "c:\Users\marcr\Desktop\AdSense\WEB (CARS)\CAR-WEB"

$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter *.html

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match '<title>(.*?)</title>') {
        $title = $matches[1]
    } else {
        $title = "Car Website"
    }
    $relPath = $file.FullName.Substring($root.Length).Replace('\', '/')
    if ($relPath.StartsWith('/')) { $relPath = $relPath.Substring(1) }
    $url = "http://localhost:3000/$relPath"
    $meta = @"
<meta name=`"description`" content=`"Explore $title - Detailed automotive information on brands, types, and more.`">
<meta name=`"keywords`" content=`"cars, automotive, car brands, car types, car components, car comparison`">
<meta property=`"og:title`" content=`"$title`">
<meta property=`"og:description`" content=`"Discover comprehensive details about $title on our car enthusiast website.`">
<meta property=`"og:image`" content=`"/images/brands/default.webp`">
<meta property=`"og:url`" content=`"$url`">
<meta property=`"og:type`" content=`"website`">
"@
    $content = $content -replace '(</title>)', "`$1`n    $meta"
    Set-Content $file.FullName $content -Encoding UTF8
}

Write-Host "SEO meta tags added to all HTML files."