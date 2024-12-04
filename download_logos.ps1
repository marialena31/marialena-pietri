$logos = @{
    "nextjs" = "https://cdn.iconscout.com/icon/free/png-256/free-nextjs-2752140-2284957.png"
    "nodejs" = "https://cdn.iconscout.com/icon/free/png-256/free-nodejs-2-226035.png"
    "graphql" = "https://cdn.iconscout.com/icon/free/png-256/free-graphql-3521468-2944912.png"
    "newrelic" = "https://cdn.iconscout.com/icon/free/png-256/free-new-relic-3628869-3030133.png"
    "datadog" = "https://cdn.iconscout.com/icon/free/png-256/free-datadog-3521412-2944856.png"
    "typescript" = "https://cdn.iconscout.com/icon/free/png-256/free-typescript-1174965.png"
    "knockoutjs" = "https://cdn.iconscout.com/icon/free/png-256/free-knockout-1175193.png"
    "redis" = "https://cdn.iconscout.com/icon/free/png-256/free-redis-3-1175053.png"
    "elasticsearch" = "https://cdn.iconscout.com/icon/free/png-256/free-elasticsearch-226094.png"
    "scss" = "https://cdn.iconscout.com/icon/free/png-256/free-sass-226054.png"
    "varnish-cache" = "https://cdn.iconscout.com/icon/free/png-256/free-varnish-3-1175069.png"
    # Generic icons for missing skills
    "api-rest" = "https://cdn.iconscout.com/icon/free/png-256/free-api-14-1175185.png"
    "responsive-design" = "https://cdn.iconscout.com/icon/free/png-256/free-responsive-design-1956653-1650526.png"
    "accessibility" = "https://cdn.iconscout.com/icon/free/png-256/free-accessibility-1956637-1650510.png"
    "payment-gateway" = "https://cdn.iconscout.com/icon/free/png-256/free-payment-gateway-2-555438.png"
    "erp" = "https://cdn.iconscout.com/icon/free/png-256/free-erp-2-570648.png"
    "pim" = "https://cdn.iconscout.com/icon/free/png-256/free-product-management-1-599113.png"
    "marketplace" = "https://cdn.iconscout.com/icon/free/png-256/free-marketplace-1956674-1650547.png"
    "b2b" = "https://cdn.iconscout.com/icon/free/png-256/free-b2b-1-599098.png"
    "security" = "https://cdn.iconscout.com/icon/free/png-256/free-security-protection-1956640-1650513.png"
    "performance" = "https://cdn.iconscout.com/icon/free/png-256/free-performance-1956631-1650504.png"
}

$outputDir = "static/images/skills"

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

foreach ($logo in $logos.GetEnumerator()) {
    $outputPath = Join-Path $outputDir "$($logo.Key).png"
    Write-Host "Downloading $($logo.Key) to $outputPath"
    Invoke-WebRequest -Uri $logo.Value -OutFile $outputPath
}
