// Simple icon generator for PWA
// This creates basic PNG icons from a simple graphic

function generateIcon(size) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = size;
  canvas.height = size;
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#1db954');
  gradient.addColorStop(0.5, '#1ed760');
  gradient.addColorStop(1, '#17a144');
  
  // Draw background circle
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, (size / 2) - 8, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw border
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.stroke();
  
  // Draw music note (simplified)
  const noteSize = size * 0.6;
  const x = size / 2 - noteSize / 4;
  const y = size / 2 - noteSize / 4;
  
  ctx.fillStyle = 'white';
  ctx.font = `${noteSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('♪', size / 2, size / 2);
  
  return canvas.toDataURL('image/png');
}

// Generate and save icons
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
  const iconData = generateIcon(size);
  
  // Create download link
  const link = document.createElement('a');
  link.download = `icon-${size}x${size}.png`;
  link.href = iconData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  console.log(`Generated icon-${size}x${size}.png`);
});
