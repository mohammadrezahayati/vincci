import chalk, { ChalkInstance } from 'chalk'; // Importing necessary chalk modules for text styling
import { TableOptions } from './types/types';
import { getEdgeStyles } from './util/getEdgeStyle';
import { isChalkStyle } from './util/isChalkStyle';
import { predefinedEdgeStyles } from './util/predefinedEdgeStyles'; // Import custom edge styles for table borders
import { isSupport } from './util/isSupport';

/**
 * Function to display data in a custom table format in the console.
 * @param columns - Array of column names.
 * @param rows - Array of row data (each row should correspond to columns).
 * @param options - Optional table customization (e.g., header colors, row styles).
 */
export const displayCustomTable = (
  columns: string[],
  rows: unknown[][],
  options: TableOptions = {},
): void => {
  // Validate input to ensure both columns and rows are arrays
  if (!Array.isArray(columns) || !Array.isArray(rows)) {
    console.error(chalk.red('Columns and rows must be arrays.'));
    return;
  }

  // Step 1: Ensure all rows are padded to match the longest row length
  const longestRowLength = Math.max(
    columns.length,
    ...rows.map((row) => row.length),
  );
  const paddedRows = rows.map((row) => {
    const newRow = [...row]; // Clone each row to avoid mutating original data
    while (newRow.length < longestRowLength) {
      newRow.push(''); // Pad with empty strings to ensure consistent row length
    }
    return newRow;
  });

  // Ensure columns match the longest row length by adding empty columns if necessary
  while (columns.length < longestRowLength) {
    columns.push(''); // Add empty columns to ensure the header matches row lengths
  }

  // Step 2: Calculate column widths to accommodate the longest entry in each column
  const colWidths = columns.map(
    (col, colIndex) =>
      Math.max(
        col.length, // Header length
        ...paddedRows.map((row) => String(row?.[colIndex] ?? '').length), // Max length of data in column
      ) + 2, // Add padding for readability
  );

  // Destructure edge styles from options or default to predefined rounded styles
  const {
    topLeftCorner,
    topRightCorner,
    bottomLeftCorner,
    bottomRightCorner,
    horizontalSeparator,
    verticalSeparator,
    topCenter,
    vertical,
    bottomCenter,
    verticalRowLeft,
    verticalRowRight,
  } = getEdgeStyles(options.edgeStyles || predefinedEdgeStyles.rounded);

  // Step 4: Create a horizontal line with specified edge characters
  const createHorizontalLine = (
    leftEdge: string,
    centerEdge: string,
    rightEdge: string,
  ) => {
    return `${leftEdge}${colWidths
      .map((width) => `${horizontalSeparator || '-'}`.repeat(width))
      .join(centerEdge)}${rightEdge}`;
  };

  // Generate the top, bottom, and separator lines for the table
  const headerTopLine = createHorizontalLine(
    topLeftCorner,
    topCenter,
    topRightCorner,
  );
  const headerBottomLine = createHorizontalLine(
    verticalRowLeft,
    verticalSeparator,
    verticalRowRight,
  );
  const footerLine = createHorizontalLine(
    bottomLeftCorner,
    bottomCenter,
    bottomRightCorner,
  );

  // Step 5: Format each row to match column widths and align text
  const formatRow = (row: unknown[]): string => {
    const formattedRow = row
      .map((cell, colIndex) => {
        const cellStr = String(cell ?? ''); // Convert undefined or null to an empty string
        let formattedCell = cellStr;

        // Determine the alignment for the current column (default is 'left')
        const alignment =
          options.columnAlignments?.[columns[colIndex]] || 'left';

        // Apply alignment to the cell content
        if (alignment === 'left') {
          formattedCell = cellStr.padEnd(colWidths[colIndex]); // Left-align text
        } else if (alignment === 'center') {
          const padLeft = Math.floor(
            (colWidths[colIndex] - cellStr.length) / 2,
          );
          const padRight = colWidths[colIndex] - cellStr.length - padLeft;
          formattedCell = ' '.repeat(padLeft) + cellStr + ' '.repeat(padRight); // Center-align text
        } else if (alignment === 'right') {
          formattedCell = cellStr.padStart(colWidths[colIndex]); // Right-align text
        }

        // Apply styles based on rowStyleKey, if specified
        if (options.rowStyleKey && isSupport()) {
          // Check if the terminal supports colors
          const keyValue = String(row[columns.indexOf(options.rowStyleKey)]); // Get the value of the rowStyleKey
          const rowStyle = options.rowStyles?.[keyValue]; // Get the style associated with the value

          if (rowStyle) {
            if (typeof rowStyle === 'string') {
              // Apply styles to the entire row
              const styleNames = rowStyle.split('.'); // Split for color and style
              let colorFn: ChalkInstance = chalk; // Default to no color

              // Loop through each style name and apply the corresponding style
              styleNames.forEach((styleName) => {
                if (isChalkStyle(styleName)) {
                  colorFn = colorFn[
                    styleName as keyof ChalkInstance
                  ] as ChalkInstance;
                }
              });

              formattedCell = colorFn(formattedCell);
            } else if (typeof rowStyle === 'object') {
              // Apply styles to specific columns in the row
              const columnStyle = rowStyle[columns[colIndex]]; // Get style for the current column
              if (columnStyle) {
                const styleNames = columnStyle.split('.');
                let colorFn: ChalkInstance = chalk;

                // Apply each style to the column
                styleNames.forEach((styleName) => {
                  if (isChalkStyle(styleName)) {
                    colorFn = colorFn[
                      styleName as keyof ChalkInstance
                    ] as ChalkInstance;
                  }
                });

                formattedCell = colorFn(formattedCell);
              }
            }
          }
        }

        // Highlight the selected column if specified and terminal supports colors
        if (
          options.highlightColumn &&
          columns[colIndex] === options.highlightColumn &&
          isSupport()
        ) {
          formattedCell = chalk.bgYellow.black(formattedCell); // Apply background highlight
        }

        return formattedCell;
      })
      .join(vertical || '|');

    return `${vertical}${formattedRow}${vertical}`;
  };

  // Step 6: Print the table
  console.log(headerTopLine); // Print top border
  console.log(
    `${vertical}${columns
      .map((col, i) => {
        const styleNames = options.headerColors?.[col]?.split('.'); // Get the styles for the header
        let colorFn: ChalkInstance = chalk.blue; // Default to blue for header

        // Apply the specified styles to the header, only if terminal supports colors
        if (isSupport()) {
          styleNames?.forEach((styleName) => {
            if (isChalkStyle(styleName)) {
              colorFn = colorFn[
                styleName as keyof ChalkInstance
              ] as ChalkInstance;
            }
          });
        }

        return colorFn(col.padEnd(colWidths[i])); // Apply color and padding to the header text
      })
      .join(vertical)}${vertical}`,
  ); // Print header row
  console.log(headerBottomLine); // Print separator after header

  // Step 7: Print each row of the table
  paddedRows.forEach((row, rowIndex) => {
    let formattedRow = formatRow(row);

    // Apply row background color for odd/even rows, only if terminal supports colors
    if (options.rowBackgrounds && isSupport()) {
      const backgroundColor =
        rowIndex % 2 === 0
          ? options.rowBackgrounds.even
          : options.rowBackgrounds.odd;

      if (chalk[backgroundColor]) {
        formattedRow = chalk[backgroundColor](formattedRow);
      }
    }

    console.log(formattedRow); // Print formatted row

    // Print horizontal separator after each row, except the last row
    if (rowIndex < paddedRows.length - 1) {
      console.log(
        createHorizontalLine(
          verticalRowLeft,
          verticalSeparator,
          verticalRowRight,
        ),
      );
    }
  });

  console.log(footerLine); // Print bottom border of the table
};
