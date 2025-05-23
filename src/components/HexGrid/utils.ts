
// Hexagonal grid utility functions
export interface HexCoordinates {
  q: number; // column
  r: number; // row
}

export interface Point {
  x: number;
  y: number;
}

export interface HexagonProps {
  coordinates: HexCoordinates;
  size: number;
  value?: number;
  label?: string;
  color?: string;
  onClick?: (coordinates: HexCoordinates) => void;
  onHover?: (coordinates: HexCoordinates) => void;
}

// Convert hex coordinates to pixel coordinates
export const hexToPixel = (hex: HexCoordinates, size: number): Point => {
  const x = size * (3/2 * hex.q);
  const y = size * (Math.sqrt(3)/2 * hex.q + Math.sqrt(3) * hex.r);
  return { x, y };
};

// Generate hexagon path for SVG
export const getHexagonPath = (size: number): string => {
  const points: Point[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    points.push({ x, y });
  }
  
  return points.map(point => `${point.x},${point.y}`).join(' ');
};

// Generate a spiral pattern of hex coordinates
export const generateHexSpiral = (radius: number): HexCoordinates[] => {
  const coordinates: HexCoordinates[] = [{ q: 0, r: 0 }];
  
  for (let ring = 1; ring <= radius; ring++) {
    let q = -ring;
    let r = ring;
    
    // Six directions: right, down-right, down-left, left, up-left, up-right
    const directions = [
      { q: 1, r: 0 },   // right
      { q: 0, r: -1 },  // down-right
      { q: -1, r: -1 }, // down-left
      { q: -1, r: 0 },  // left
      { q: 0, r: 1 },   // up-left
      { q: 1, r: 1 }    // up-right
    ];
    
    for (let direction = 0; direction < 6; direction++) {
      for (let step = 0; step < ring; step++) {
        coordinates.push({ q, r });
        q += directions[direction].q;
        r += directions[direction].r;
      }
    }
  }
  
  return coordinates;
};

// Color interpolation for data visualization
export const interpolateColor = (value: number, min: number, max: number, colorStart: string = '#e3f2fd', colorEnd: string = '#1976d2'): string => {
  const normalizedValue = (value - min) / (max - min);
  const clampedValue = Math.max(0, Math.min(1, normalizedValue));
  
  // Simple linear interpolation between two colors
  const startRgb = hexToRgb(colorStart);
  const endRgb = hexToRgb(colorEnd);
  
  if (!startRgb || !endRgb) return colorStart;
  
  const r = Math.round(startRgb.r + (endRgb.r - startRgb.r) * clampedValue);
  const g = Math.round(startRgb.g + (endRgb.g - startRgb.g) * clampedValue);
  const b = Math.round(startRgb.b + (endRgb.b - startRgb.b) * clampedValue);
  
  return `rgb(${r}, ${g}, ${b})`;
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
