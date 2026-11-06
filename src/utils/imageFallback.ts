/**
 * Generates an attractive, inline SVG data URI placeholder for products
 * when an external network image fails or is loading.
 */
export function getSvgPlaceholder(title: string, category: string = 'HYDOR'): string {
  const cleanTitle = title.replace(/[<>&'"]/g, '');
  const cleanCategory = category.replace(/[<>&'"]/g, '');
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1F1638"/>
        <stop offset="50%" stop-color="#2D1B4E"/>
        <stop offset="100%" stop-color="#140E26"/>
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6FE3E1"/>
        <stop offset="50%" stop-color="#B79CED"/>
        <stop offset="100%" stop-color="#FF8FB1"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#B79CED" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#B79CED" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <circle cx="300" cy="270" r="180" fill="url(#glow)"/>
    <!-- Cup outline -->
    <path d="M220 180 h160 l-24 200 a28 28 0 0 1-28 24 h-56 a28 28 0 0 1-28-24 z" fill="none" stroke="url(#accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M205 180 h190" stroke="url(#accent)" stroke-width="4" stroke-linecap="round"/>
    <!-- Straw -->
    <line x1="320" y1="120" x2="280" y2="280" stroke="#FFB570" stroke-width="6" stroke-linecap="round"/>
    <!-- Floating pearls -->
    <circle cx="270" cy="350" r="14" fill="#0E0B1A" stroke="#B79CED" stroke-width="3"/>
    <circle cx="310" cy="360" r="12" fill="#0E0B1A" stroke="#FF8FB1" stroke-width="3"/>
    <circle cx="285" cy="320" r="10" fill="#0E0B1A" stroke="#6FE3E1" stroke-width="3"/>
    <circle cx="330" cy="335" r="13" fill="#0E0B1A" stroke="#FFB570" stroke-width="3"/>
    <!-- Text -->
    <text x="300" y="470" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="24" fill="#FBF6EF" text-anchor="middle">${cleanTitle}</text>
    <text x="300" y="505" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="14" fill="#B79CED" text-anchor="middle" letter-spacing="3">${cleanCategory.toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>, title: string, category: string = 'HYDOR') {
  const target = event.currentTarget;
  if (!target.dataset.fallbackApplied) {
    target.dataset.fallbackApplied = 'true';
    target.src = getSvgPlaceholder(title, category);
  }
}
