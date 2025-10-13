$root = "c:\Users\marcr\Desktop\AdSense\WEB (CARS)\CAR-WEB"

# Obtener todos los archivos HTML
$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter *.html

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw

    # Reemplazar global.css por global.min.css en links de stylesheet
    $content = $content -replace '(<link[^>]*rel="stylesheet"[^>]*href="[^"]*)global\.css(")', '$1global.min.css$2'

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

Write-Output "Assets optimizados en todos los HTML."