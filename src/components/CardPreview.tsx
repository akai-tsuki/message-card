import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import type { CardData } from '../types/CardData';
import { CANVAS_CONFIG } from '../constants/cardConfig';
import { renderCard } from '../utils/canvasRenderer';
import './CardPreview.css';

interface CardPreviewProps {
  cardData: CardData;
}

export interface CardPreviewHandle {
  getCanvas: () => HTMLCanvasElement | null;
}

const CardPreview = forwardRef<CardPreviewHandle, CardPreviewProps>(
  ({ cardData }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    // Expose canvas to parent via ref
    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
    }));

    // Calculate scale based on container width
    useEffect(() => {
      const updateScale = () => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = Math.min(1, (containerWidth - 32) / CANVAS_CONFIG.width);
        setScale(newScale);
      };

      updateScale();
      window.addEventListener('resize', updateScale);
      return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Render canvas whenever cardData changes
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      renderCard(ctx, cardData);
    }, [cardData]);

    return (
      <div ref={containerRef} className="card-preview-container">
        <canvas
          ref={canvasRef}
          width={CANVAS_CONFIG.width}
          height={CANVAS_CONFIG.height}
          className="card-preview-canvas"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
          role="img"
          aria-label="Message card preview"
        />
      </div>
    );
  }
);

CardPreview.displayName = 'CardPreview';

export default CardPreview;
