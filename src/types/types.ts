import { BackgroundColorName } from 'chalk';

export interface EdgeStyle {
  topLeftCorner: string;
  topRightCorner: string;
  bottomLeftCorner: string;
  bottomRightCorner: string;
  horizontalSeparator: string;
  verticalSeparator: string;
  vertical: string;
  topCenter: string;
  bottomCenter: string;
  verticalRowLeft: string;
  verticalRowRight: string;
}
export interface PredefinedEdgeStyles {
  single: EdgeStyle;
  bold: EdgeStyle;
  rounded: EdgeStyle;
  dotted: EdgeStyle;
  thick: EdgeStyle;
  minimal: EdgeStyle;
  heavyDashed: EdgeStyle;
  double: EdgeStyle;
}

// Interface defining the options available for customizing the table appearance
export interface TableOptions {
  headerColors?: Record<string, string>; // Map of column names to color/style functions
  rowStyles?: Record<string | number, Record<string, string> | string>; // Map of specific row values to style names
  rowStyleKey?: string; // The column name that determines the cell to style
  rowBackgrounds?: { odd: BackgroundColorName; even: BackgroundColorName }; // Background colors for odd/even rows
  edgeStyles?:
    | keyof PredefinedEdgeStyles
    | {
        // Customize table border styles
        topLeftCorner: string;
        topRightCorner: string;
        bottomLeftCorner: string;
        bottomRightCorner: string;
        horizontalSeparator: string;
        verticalSeparator: string;
        topCenter: string;
        vertical: string;
        bottomCenter: string;
        verticalRowLeft: string;
        verticalRowRight: string;
      };
  highlightColumn?: string; // Column to highlight (simulate hover effect)
  columnAlignments?: Record<string, 'left' | 'center' | 'right'>; // Column alignment options
}
