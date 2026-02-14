import type { FontConfig, LayoutPosition } from '../types/CardData';

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  if (!text.trim()) return [];

  const lines: string[] = [];

  for (const paragraph of text.split('\n')) {
    if (lines.length >= maxLines) break;

    if (!paragraph) {
      lines.push('');
      continue;
    }

    const words = paragraph.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
        if (lines.length >= maxLines) break;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine && lines.length < maxLines) {
      lines.push(currentLine);
    }
  }

  return lines;
}

export function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  position: LayoutPosition,
  font: FontConfig,
  maxWidth: number,
  maxLines: number
): void {
  if (!text.trim()) return;

  ctx.font = `${font.weight} ${font.size}px ${font.family}`;
  ctx.fillStyle = font.color;
  ctx.textAlign = position.align as CanvasTextAlign;
  ctx.textBaseline = 'middle';

  const lines = wrapText(ctx, text, maxWidth, maxLines);
  const lineHeight = font.size * (font.lineHeight || 1.5);

  // Center vertically based on total lines
  const totalHeight = lines.length * lineHeight;
  const startY = position.y - (totalHeight / 2) + (lineHeight / 2);

  lines.forEach((line, index) => {
    ctx.fillText(line, position.x, startY + index * lineHeight);
  });
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  position: LayoutPosition,
  font: FontConfig
): void {
  if (!text.trim()) return;

  ctx.font = `${font.weight} ${font.size}px ${font.family}`;
  ctx.fillStyle = font.color;
  ctx.textAlign = position.align as CanvasTextAlign;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, position.x, position.y);
}

export function drawLabeledText(
  ctx: CanvasRenderingContext2D,
  label: string,
  text: string,
  position: LayoutPosition,
  labelFont: FontConfig,
  contentFont: FontConfig
): void {
  if (!text.trim()) return;

  ctx.textBaseline = 'middle';

  if (position.align === 'right') {
    // Draw content right-aligned at position.x
    ctx.font = `${contentFont.weight} ${contentFont.size}px ${contentFont.family}`;
    ctx.fillStyle = contentFont.color;
    ctx.textAlign = 'right';
    ctx.fillText(text, position.x, position.y);

    // Draw label just to the left of content
    const contentWidth = ctx.measureText(text).width;
    ctx.font = `${labelFont.weight} ${labelFont.size}px ${labelFont.family}`;
    ctx.fillStyle = labelFont.color;
    ctx.fillText(label, position.x - contentWidth - 6, position.y);
  } else {
    // Draw label left-aligned at position.x
    ctx.font = `${labelFont.weight} ${labelFont.size}px ${labelFont.family}`;
    ctx.fillStyle = labelFont.color;
    ctx.textAlign = 'left';
    const labelWidth = ctx.measureText(label).width;
    ctx.fillText(label, position.x, position.y);

    // Draw content just to the right of label
    ctx.font = `${contentFont.weight} ${contentFont.size}px ${contentFont.family}`;
    ctx.fillStyle = contentFont.color;
    ctx.fillText(text, position.x + labelWidth + 6, position.y);
  }
}
