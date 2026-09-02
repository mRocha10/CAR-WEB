$root = "c:\Users\marcr\Desktop\AdSense\WEB (CARS)\CAR-WEB"
$baseUrl = "https://enginestarters.org"
$defaultOgImage = "$baseUrl/images/logo/web_logo.jpeg"
$currentYear = (Get-Date).Year

function Get-CanonicalUrl {
    param([string]$filePath)

    $relPath = $filePath.Substring($root.Length).Replace('\', '/')
    if ($relPath.StartsWith('/')) { $relPath = $relPath.Substring(1) }

    if ($relPath -eq "index.html") {
        return "$baseUrl/"
    }

    return "$baseUrl/$relPath"
}

function Set-Or-InsertTag {
    param(
        [string]$content,
        [string]$matchPattern,
        [string]$replacePattern,
        [string]$replacement,
        [string]$insertMarkup
    )

    if ([regex]::IsMatch($content, $matchPattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
        return [regex]::Replace(
            $content,
            $replacePattern,
            $replacement,
            [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
        )
    }

    return [regex]::Replace($content, '(?i)</head>', "$insertMarkup`r`n</head>")
}

$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter *.html | Where-Object {
    $_.FullName -notmatch '\\node_modules\\'
}

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '`r`n', ""
    $content = $content -replace 'http://localhost:3000', $baseUrl
    $content = $content -replace '&copy;\s+(2024|2025)\s+Engine Starters', "&copy; $currentYear Engine Starters"
    $content = [regex]::Replace($content, '(?im)^\s*<meta\s+name="keywords"[^>]*>\s*', "")

    $htmlClose = [regex]::Match($content, '(?is)</html>')
    if ($htmlClose.Success) {
        $content = $content.Substring(0, $htmlClose.Index + $htmlClose.Length) + "`r`n"
    }

    $canonical = Get-CanonicalUrl -filePath $file.FullName

    $descriptionMatches = [regex]::Matches($content, '(?i)<meta\s+name="description"\s+content="[^"]*"\s*/?>')
    if ($descriptionMatches.Count -gt 1) {
        $firstDescription = $descriptionMatches[0].Value.Trim()
        $content = [regex]::Replace($content, '(?i)<meta\s+name="description"\s+content="[^"]*"\s*/?>\s*', "")
        if ($content -match '(?i)</title>') {
            $content = [regex]::Replace($content, '(?i)</title>', "</title>`r`n    $firstDescription", 1)
        } else {
            $content = [regex]::Replace($content, '(?i)<meta\s+name="viewport"[^>]*>', "`$0`r`n    $firstDescription", 1)
        }
    }

    $content = Set-Or-InsertTag `
        -content $content `
        -matchPattern '<link rel="canonical"' `
        -replacePattern '<link rel="canonical" href="[^"]+"[^>]*>' `
        -replacement "<link rel=`"canonical`" href=`"$canonical`">" `
        -insertMarkup "    <link rel=`"canonical`" href=`"$canonical`">"

    $content = Set-Or-InsertTag `
        -content $content `
        -matchPattern '<meta name="robots"' `
        -replacePattern '<meta name="robots" content="[^"]+"[^>]*>' `
        -replacement '<meta name="robots" content="index, follow, max-image-preview:large">' `
        -insertMarkup '    <meta name="robots" content="index, follow, max-image-preview:large">'

    $content = Set-Or-InsertTag `
        -content $content `
        -matchPattern 'property="og:url"' `
        -replacePattern 'property="og:url" content="[^"]+"[^>]*>' `
        -replacement "property=`"og:url`" content=`"$canonical`">" `
        -insertMarkup "    <meta property=`"og:url`" content=`"$canonical`">"

    $content = Set-Or-InsertTag `
        -content $content `
        -matchPattern 'name="twitter:card"' `
        -replacePattern 'name="twitter:card" content="[^"]+"[^>]*>' `
        -replacement 'name="twitter:card" content="summary_large_image">' `
        -insertMarkup '    <meta name="twitter:card" content="summary_large_image">'

    $content = Set-Or-InsertTag `
        -content $content `
        -matchPattern '<link rel="icon"' `
        -replacePattern '<link rel="icon"[^>]*href="[^"]+"[^>]*>' `
        -replacement "<link rel=`"icon`" href=`"$baseUrl/images/logo/web_logo.jpeg`" type=`"image/jpeg`">" `
        -insertMarkup "    <link rel=`"icon`" href=`"$baseUrl/images/logo/web_logo.jpeg`" type=`"image/jpeg`">"

    $ogImageMatch = [regex]::Match($content, '(?i)<meta\s+property="og:image"\s+content="([^"]+)"')
    if ($ogImageMatch.Success) {
        $ogImage = $ogImageMatch.Groups[1].Value
        if ($ogImage -match 'default\.webp$') {
            $ogImage = $defaultOgImage
        } elseif ($ogImage.StartsWith('/')) {
            $ogImage = "$baseUrl$ogImage"
        } elseif ($ogImage -match '^https?://localhost') {
            $ogImage = $ogImage -replace '^https?://localhost(:\d+)?', $baseUrl
        }

        $content = [regex]::Replace(
            $content,
            '(?i)<meta\s+property="og:image"\s+content="[^"]+"[^>]*>',
            "<meta property=`"og:image`" content=`"$ogImage`">"
        )
    } else {
        $content = [regex]::Replace(
            $content,
            '(?i)</head>',
            "    <meta property=`"og:image`" content=`"$defaultOgImage`">`r`n</head>"
        )
    }

    Set-Content $file.FullName $content -Encoding UTF8
}

Write-Host "Metadata, canonical tags, and malformed legacy HTML were normalized for enginestarters.org."
