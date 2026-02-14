export interface FontSizes {
  title: number;
  to: number;
  message: number;
  date: number;
  from: number;
}

export interface CardData {
  title: string;    // max 30 chars, default "Thanks Card"
  to: string;       // recipient
  message: string;  // max 200 chars, max 5 lines
  date: string;     // mm/dd format
  from: string;     // sender
  image: string | null;  // Base64 encoded image or null
  backgroundColor: string;  // hex color for card background
  fontFamily: string;
  titleFontFamily: string;
  fontSizes: FontSizes;
}

export interface FontConfig {
  family: string;
  size: number;
  weight: string;
  color: string;
  lineHeight?: number;
}

export interface LayoutPosition {
  x: number;
  y: number;
  align: 'left' | 'center' | 'right';
}

export interface ImageBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
