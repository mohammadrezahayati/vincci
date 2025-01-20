import chalk from "chalk"; // Ensure chalk is imported
import { predefinedEdgeStyles } from "./util/predefinedEdgeStyles";

type ChalkColorFunction = (text: string) => string;

interface TableOptions {
    headerColors?: Record<string, string>; // Map column names to color/style functions (color or style names)
    rowStyles?: Record<string | number, Record<string, string> | string>; // Map specific values to style names
    rowStyleKey?: string; // Column name to determine the cell to style
    rowBackgrounds?: { odd: string; even: string }; // Allow user to specify background for odd/even rows
    edgeStyles?: string | { // Allow customization of the table's edge styles
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
    highlightColumn?: string; // Column name to highlight (simulate hover effect)
    columnAlignments?: Record<string, "left" | "center" | "right">; // New option for column alignment
}

/**
 * Display data as a custom table in the console.
 * @param columns - Array of column names.
 * @param rows - Array of row data. Each row should be an array corresponding to the columns.
 * @param options - Optional object for table customization (e.g., header colors and styles).
 */
export const displayCustomTable = (
    columns: string[],
    rows: unknown[][],
    options: TableOptions = {}
): void => {
    // Validate inputs
    if (!Array.isArray(columns) || !Array.isArray(rows)) {
        console.error(chalk.red("Columns and rows must be arrays."));
        return;
    }

    // Step 1: Ensure all rows have the same length as the longest row
    const longestRowLength = Math.max(columns.length, ...rows.map((row) => row.length));
    const paddedRows = rows.map((row) => {
        const newRow = [...row]; // Clone the row to avoid modifying the original
        while (newRow.length < longestRowLength) {
            newRow.push(""); // Pad with empty strings
        }
        return newRow;
    });

    // Ensure columns array also matches the longest length
    while (columns.length < longestRowLength) {
        columns.push(""); // Add empty strings to columns if necessary
    }

    // Step 2: Calculate column widths
    const colWidths = columns.map((col, colIndex) =>
        Math.max(
            col.length, // Header length
            ...paddedRows.map((row) => String(row?.[colIndex] ?? "").length) // Max length of data in the column
        ) + 2 // Add padding
    );

    // Step 3: Build the table with customizable edge styles
    const getEdgeStyles = (style: string | { topLeft: string; topRight: string; bottomLeft: string; bottomRight: string; horizontal: string; vertical: string }) => {
        if (typeof style === "string") {
            // If edgeStyles is a string, apply the same style to all edges
            return predefinedEdgeStyles[style as keyof typeof predefinedEdgeStyles] || predefinedEdgeStyles.simple;
        }

        // If edgeStyles is an object, return the individual parts
        return style;
    };

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
    } = getEdgeStyles(options.edgeStyles || predefinedEdgeStyles.simple);

    // Step 4: Horizontal Line for Rows
    const createHorizontalLine = (
        leftEdge: string,
        centerEdge: string,
        rightEdge: string
    ) => {
        return `${leftEdge}${colWidths
            .map((width) => `${horizontalSeparator || "-"}`.repeat(width))
            .join(centerEdge)}${rightEdge}`;
    };

    const headerTopLine = createHorizontalLine(topLeftCorner, topCenter, topRightCorner);
    const headerBottomLine = createHorizontalLine(verticalRowLeft, verticalSeparator, verticalRowRight);
    const footerLine = createHorizontalLine(bottomLeftCorner, bottomCenter, bottomRightCorner);

    // Step 5: Format a row with fixed widths
    const formatRow = (row: unknown[], rowIndex: number): string => {
        const formattedRow = row
            .map((cell, colIndex) => {
                const cellStr = String(cell ?? ""); // Convert undefined/null to an empty string
                let formattedCell = cellStr;

                // Check if columnAlignments has a specified alignment for the current column
                const alignment = options.columnAlignments?.[columns[colIndex]] || "left"; // Default to left alignment

                // Align text based on the specified alignment
                if (alignment === "left") {
                    formattedCell = cellStr.padEnd(colWidths[colIndex]); // Left-align with padding
                } else if (alignment === "center") {
                    const padLeft = Math.floor((colWidths[colIndex] - cellStr.length) / 2);
                    const padRight = colWidths[colIndex] - cellStr.length - padLeft;
                    formattedCell = " ".repeat(padLeft) + cellStr + " ".repeat(padRight); // Center-align
                } else if (alignment === "right") {
                    formattedCell = cellStr.padStart(colWidths[colIndex]); // Right-align with padding
                }

                // Apply styles for the row using rowStyleKey
                if (options.rowStyleKey) {
                    const keyValue = String(row[columns.indexOf(options.rowStyleKey)]); // Get the rowStyleKey value
                    const rowStyle = options.rowStyles?.[keyValue]; // Match style based on the key's value

                    if (rowStyle) {
                        if (typeof rowStyle === "string") {
                            // Apply styles to the entire row
                            const styleNames = rowStyle.split("."); // Split for color and style
                            let colorFn: ChalkColorFunction = chalk; // Default to no color

                            styleNames.forEach((styleName) => {
                                if (chalk[styleName] && typeof chalk[styleName] === "function") {
                                    colorFn = colorFn[styleName as keyof ChalkInstance]; // Apply style (e.g., 'bold', 'italic')
                                }
                            });

                            formattedCell = colorFn(formattedCell);
                        } else if (typeof rowStyle === "object") {
                            // Apply styles to specific columns
                            const columnStyle = rowStyle[columns[colIndex]]; // Style for the current column
                            if (columnStyle) {
                                const styleNames = columnStyle.split(".");
                                let colorFn: ChalkColorFunction = chalk; // Default to no color

                                styleNames.forEach((styleName) => {
                                    if (chalk[styleName] && typeof chalk[styleName] === "function") {
                                        colorFn = colorFn[styleName as keyof ChalkInstance]; // Apply style
                                    }
                                });

                                formattedCell = colorFn(formattedCell);
                            }
                        }
                    }
                }

                // Highlight the selected column
                if (options.highlightColumn && columns[colIndex] === options.highlightColumn) {
                    formattedCell = chalk.bgYellow.black(formattedCell); // Highlight background color (simulated hover)
                }

                return formattedCell;
            })
            .join(vertical || "|");

        return `${vertical}${formattedRow}${vertical}`;
    };


    // Print the table
    console.log(headerTopLine); // Top border
    console.log(
        `${vertical}${columns
            .map((col, i) => {
                const styleNames = options.headerColors?.[col]?.split("."); // Split for color and style
                let colorFn: ChalkColorFunction = chalk.blue; // Default to blue color

                styleNames?.forEach((styleName) => {
                    if (chalk[styleName] && typeof chalk[styleName] === "function") {
                        colorFn = colorFn[styleName as keyof ChalkInstance]; // Apply style (e.g., 'bold', 'italic')
                    }
                });

                return colorFn(col.padEnd(colWidths[i])); // Apply the color and style
            })
            .join(vertical)}${vertical}`
    ); // Header row
    console.log(headerBottomLine); // Separator after header

    paddedRows.forEach((row, rowIndex) => {
        // Format and print the row
        let formattedRow = formatRow(row, rowIndex);

        if (options.rowBackgrounds) {
            const backgroundColor = rowIndex % 2 === 0 ? options.rowBackgrounds.even : options.rowBackgrounds.odd;

            // Apply the background color only, keeping cell style intact
            if (chalk[backgroundColor]) {
                formattedRow = chalk[backgroundColor](formattedRow);
            }
        }

        console.log(formattedRow); // Row output with dynamic vertical separators

        // Print a horizontal separator after each row
        if (rowIndex < paddedRows.length - 1) {
            console.log(
                createHorizontalLine(verticalRowLeft, verticalSeparator, verticalRowRight)
            );
        }
    });

    console.log(footerLine); // Footer border
};
