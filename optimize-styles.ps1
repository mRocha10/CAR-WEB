$root = "c:\Users\marcr\Desktop\AdSense\WEB (CARS)\CAR-WEB"

# For root level HTML files
$files = Get-ChildItem $root -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Remove all stylesheet links (repeat to ensure all are removed)
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    # Add global.css link
    $content = $content -replace '</head>', '<link rel="stylesheet" href="css/global.css">`r`n</head>'
    Set-Content $file.FullName $content
}

# For subPages direct HTML files
$files = Get-ChildItem "$root\subPages" -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
    $content = $content -replace '</head>', '<link rel="stylesheet" href="../css/global.css">`r`n</head>'
    Set-Content $file.FullName $content
}

# For deeper directories
$dirs = @("subPages\brands", "subPages\types", "subPages\components")
foreach ($dir in $dirs) {
    $files = Get-ChildItem "$root\$dir" -Filter *.html
    foreach ($file in $files) {
        $content = Get-Content $file.FullName -Raw
        # Fix concatenated tags
        $content = $content -replace '(<link rel="icon" type="image/jpeg" href="[^"]*">)<link', '$1`r`n    <link'
        # Remove all stylesheet links
        $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
        $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
        $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
        $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
        $content = $content -replace '<link\s*rel="stylesheet"\s*href="[^"]*"\s*>', ''
        # Add global.css link with indentation
        $content = $content -replace '</head>', '    <link rel="stylesheet" href="../../css/global.css">`r`n    </head>'
        Set-Content $file.FullName $content
    }
}