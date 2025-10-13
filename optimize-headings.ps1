$root = "c:\Users\marcr\Desktop\AdSense\WEB (CARS)\CAR-WEB"

# Function to capitalize first letter
function Capitalize-FirstLetter {
    param ($str)
    return $str.Substring(0,1).ToUpper() + $str.Substring(1).ToLower()
}

# For brand pages
$brandsDir = "$root\subPages\brands"
$files = Get-ChildItem $brandsDir -Filter *.html
foreach ($file in $files) {
    $brand = Capitalize-FirstLetter ([System.IO.Path]::GetFileNameWithoutExtension($file.Name))
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '<h1>Engine Starters</h1>', "<h1>$brand Cars - Engine Starters</h1>"
    Set-Content $file.FullName $content -Encoding UTF8
}

# For type pages
$typesDir = "$root\subPages\types"
$files = Get-ChildItem $typesDir -Filter *.html
foreach ($file in $files) {
    $type = Capitalize-FirstLetter ([System.IO.Path]::GetFileNameWithoutExtension($file.Name))
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '<h1>Engine Starters</h1>', "<h1>$type Cars - Engine Starters</h1>"
    Set-Content $file.FullName $content -Encoding UTF8
}

# For components subpages (assuming similar structure)
$componentsDir = "$root\subPages\components"
$files = Get-ChildItem $componentsDir -Filter *.html
foreach ($file in $files) {
    $component = Capitalize-FirstLetter ([System.IO.Path]::GetFileNameWithoutExtension($file.Name))
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '<h1>Engine Starters</h1>', "<h1>$component - Car Components | Engine Starters</h1>"
    Set-Content $file.FullName $content -Encoding UTF8
}

# For main pages
$mainFiles = @("index.html", "subPages/about.html", "subPages/brands.html", "subPages/car-types.html", "subPages/components.html", "subPages/car-comparison.html", "subPages/comments.html")
foreach ($f in $mainFiles) {
    $fullPath = "$root\$f"
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        if ($f -eq "index.html") {
            $content = $content -replace '<h1>Engine Starters</h1>', '<h1>Engine Starters - Your Car Guide</h1>'
        } elseif ($f -eq "subPages/about.html") {
            $content = $content -replace '<h1>Engine Starters</h1>', '<h1>About Engine Starters</h1>'
        } elseif ($f -eq "subPages/brands.html") {
            $content = $content -replace '<h1>Engine Starters</h1>', '<h1>Car Brands Directory - Engine Starters</h1>'
        } # Add more as needed
        Set-Content $fullPath $content -Encoding UTF8
    }
}

Write-Host "Headings optimized for SEO."