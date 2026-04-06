$root = Split-Path -Parent $MyInvocation.MyCommand.Path

# Obtener todos los archivos HTML
$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter *.html

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw

    # Unificar stylesheet al archivo actual consolidado
    $content = [regex]::Replace($content, '<link\s+rel="stylesheet"\s+href="[^"]*"\s*>', '')
    $relative = $file.FullName.Substring($root.Length).TrimStart('\')
    $depth = ($relative -split '\\').Length - 1
    $prefix = ('../' * $depth)
    $content = $content -replace '</head>', "    <link rel=`"stylesheet`" href=`"$prefix" + "css/site-unified.css`">`n</head>"

    # Reemplazar .js por .min.js en scripts específicos
    $jsFiles = @('script.js', 'car-comparison.js', 'comments.js')
    foreach ($js in $jsFiles) {
        $minJs = $js -replace '\.js', '.min.js'
        $content = $content -replace "($js)", $minJs
    }

    # Agregar loading="lazy" a img sin loading
    $content = $content -replace '(<img\s+[^>]*)(?!(?:[^>]*\sloading\s*=))([^>]*>)', '$1 loading="lazy"$2'

    Set-Content -Path $file.FullName -Value $content
}

Write-Output "Assets optimizados y CSS unificado en todos los HTML."
