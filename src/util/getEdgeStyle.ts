import { EdgeStyle, PredefinedEdgeStyles } from 'src/types/types';
import { predefinedEdgeStyles } from './predefinedEdgeStyles';

// Function to get the appropriate edge styles for the table border
export const getEdgeStyles = (style: string | EdgeStyle): EdgeStyle => {
  if (typeof style === 'string') {
    // If edgeStyles is a string, return the corresponding predefined style
    return (
      predefinedEdgeStyles[style as keyof PredefinedEdgeStyles] ||
      predefinedEdgeStyles.rounded
    );
  }

  // If edgeStyles is already an object, return it directly
  return style;
};
