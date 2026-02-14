import type { FontConfig, LayoutPosition, ImageBounds } from '../types/CardData';

export const CANVAS_CONFIG = {
  width: 450,
  height: 340,
  borderRadius: 8,
  padding: 18,

  fonts: {
    title: {
      family: 'system-ui, Arial, sans-serif',
      size: 21,
      weight: 'bold',
      color: '#000000',
    } as FontConfig,
    label: {
      family: 'system-ui, Arial, sans-serif',
      size: 9,
      weight: 'normal',
      color: '#666666',
    } as FontConfig,
    content: {
      family: 'system-ui, Arial, sans-serif',
      size: 12,
      weight: 'normal',
      color: '#000000',
    } as FontConfig,
    message: {
      family: 'system-ui, Arial, sans-serif',
      size: 12,
      weight: 'normal',
      color: '#000000',
      lineHeight: 1.0,
    } as FontConfig,
  },

  layout: {
    title: { x: 225, y: 35, align: 'center' } as LayoutPosition,
    to: { x: 20, y: 90, align: 'left' } as LayoutPosition,
    message: { x: 50, y: 192, align: 'left' } as LayoutPosition,
    date: { x: 250, y: 310, align: 'right' } as LayoutPosition,
    from: { x: 430, y: 310, align: 'right' } as LayoutPosition,
    image: { x: 14, y: 248, width: 90, height: 80 } as ImageBounds,
  },
};

export const DEFAULT_CARD_DATA = {
  title: 'Thanks Card',
  to: '',
  message: '',
  date: '',
  from: '',
  image: null,
  backgroundColor: '#FFFACD',
  fontFamily: 'Arial',
  titleFontFamily: 'Arial',
  fontSizes: {
    title: 45,
    to: 45,
    message: 45,
    date: 40,
    from: 40,
  },
};
