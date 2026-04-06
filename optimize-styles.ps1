$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter *.html

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $relative = $file.FullName.Substring($root.Length).TrimStart('\')
    $depth = ($relative -split '\\').Length - 1
    $prefix = ('../' * $depth)

    $content = [regex]::Replace($content, '<link\s+rel="stylesheet"\s+href="[^"]*"\s*>', '')
    $content = $content -replace '</head>', "    <link rel=`"stylesheet`" href=`"$prefix" + "css/site-unified.css`">`n</head>"
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Output "Styles unificados a site-unified.css en todos los HTML."
