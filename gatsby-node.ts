import type { GatsbyNode } from "gatsby"

export const onCreateDevServer: GatsbyNode["onCreateDevServer"] = ({ app }) => {
  app.use((req, res, next) => {
    // Security Headers
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "same-origin");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("X-Download-Options", "noopen");
    res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
    
    // Feature-Policy/Permissions-Policy
    res.setHeader("Permissions-Policy", 
      "accelerometer=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), microphone=(), payment=(), picture-in-picture=(), screen-wake-lock=(), usb=()"
    );
    
    next();
  });
}
