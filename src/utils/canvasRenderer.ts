import type { CardData } from '../types/CardData';
import { CANVAS_CONFIG } from '../constants/cardConfig';
import { drawText, drawLabeledText, drawWrappedText } from './textUtils';
import { drawContainedImage } from './imageUtils';

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillColor: string
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
}

export async function renderCard(
  ctx: CanvasRenderingContext2D,
  cardData: CardData
): Promise<void> {
  const config = CANVAS_CONFIG;

  // 0. Ensure the selected fonts are loaded before drawing
  await Promise.all([
    document.fonts.load(`16px "${cardData.fontFamily}"`),
    document.fonts.load(`16px "${cardData.titleFontFamily}"`),
  ]).catch((err) => {
    console.warn('Font loading failed, using fallback fonts:', err);
  });

  // 1. Clear canvas
  ctx.clearRect(0, 0, config.width, config.height);

  // 2. Draw background with border radius
  drawRoundedRect(
    ctx,
    0,
    0,
    config.width,
    config.height,
    config.borderRadius,
    cardData.backgroundColor
  );

  const fs = cardData.fontSizes;
  const ff = cardData.fontFamily;

  // 3. Draw title (top center)
  if (cardData.title) {
    drawText(ctx, cardData.title, config.layout.title, { ...config.fonts.title, size: fs.title, family: cardData.titleFontFamily });
  }

  // 4. Draw "To:" label and recipient (top left)
  if (cardData.to) {
    const toLabel = { ...config.fonts.label, size: Math.round(fs.to * 0.75), family: ff };
    const toContent = { ...config.fonts.content, size: fs.to, family: ff };
    drawLabeledText(ctx, 'To:', cardData.to, config.layout.to, toLabel, toContent);
  }

  // 5. Draw message (center, wrapped)
  if (cardData.message) {
    const messageMaxWidth = config.width - 2 * config.padding * 2;
    drawWrappedText(
      ctx,
      cardData.message,
      config.layout.message,
      { ...config.fonts.message, size: fs.message, family: ff },
      messageMaxWidth,
      5 // max 5 lines
    );
  }

  // 6. Draw date (bottom right)
  if (cardData.date) {
    drawText(ctx, cardData.date, config.layout.date, { ...config.fonts.content, size: fs.date, family: ff });
  }

  // 7. Draw "Fm:" label and sender (bottom right)
  if (cardData.from) {
    const fromLabel = { ...config.fonts.label, size: Math.round(fs.from * 0.75), family: ff };
    const fromContent = { ...config.fonts.content, size: fs.from, family: ff };
    drawLabeledText(ctx, 'Fm:', cardData.from, config.layout.from, fromLabel, fromContent);
  }

  // 8. Draw uploaded image (bottom left, contain fit)
  if (cardData.image) {
    await drawContainedImage(ctx, cardData.image, config.layout.image);
  }
}
