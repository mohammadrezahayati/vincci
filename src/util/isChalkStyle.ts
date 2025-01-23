import chalk, { ChalkInstance } from 'chalk';

// Type guard to ensure styleName corresponds to a valid style function in ChalkInstance
export const isChalkStyle = (
  styleName: string,
): styleName is keyof ChalkInstance => {
  return (
    styleName in chalk &&
    typeof chalk[styleName as keyof ChalkInstance] === 'function'
  );
};
