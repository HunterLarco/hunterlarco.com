export function rgbToHex({ r, g, b }) {
  const hexR = Math.round(r).toString(16).padStart(2, 0);
  const hexG = Math.round(g).toString(16).padStart(2, 0);
  const hexB = Math.round(b).toString(16).padStart(2, 0);
  return `#${hexR}${hexG}${hexB}`;
}

export function hexToRgb(hex) {
  if (hex[0] == '#') hex = hex.substring(1);

  if (hex.length == 6) {
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };
  } else if (hex.length == 3) {
    return {
      r: (parseInt(hex[0], 16) << 4) + parseInt(hex[0], 16),
      g: (parseInt(hex[1], 16) << 4) + parseInt(hex[1], 16),
      b: (parseInt(hex[2], 16) << 4) + parseInt(hex[2], 16),
    };
  }

  throw `Invalid hex color: ${hex}`;
}

export function getHue(rgbColor) {
  let { r, g, b } = rgbColor;

  const lowerBound = Math.min(r, g, b);
  const upperBound = Math.max(r, g, b);

  if (lowerBound == upperBound) {
    return 0;
  }

  if (r > g && r > b) {
    const hue = ((g - b) / 6) * (upperBound - lowerBound);
    return hue > 0 ? hue : 1 - hue;
  } else if (g > r && g > b) {
    return 2 + ((b - r) / 6) * (upperBound - lowerBound);
  } else {
    return 4 + ((b - r) / 6) * (upperBound - lowerBound);
  }
}
