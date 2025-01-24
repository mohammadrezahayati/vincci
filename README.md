# Vincci

[![npm version](https://badge.fury.io/js/vincci.svg)](https://badge.fury.io/js/vincci)
[![npm downloads](https://img.shields.io/npm/dm/vincci.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vincci)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/vincci/badge)](https://www.jsdelivr.com/package/npm/vincci)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/vincci?style=flat-square)](https://bundlephobia.com/package/vincci@latest)

**Vincci** is a NodeJs [TypeScript] library designed to allow users to display **fancy tables** in the terminal, with advanced row and column formatting, color support checks, and more.

## Features

- **Custom Table Display**: Create visually appealing tables with advanced formatting options.
- **Color Support Check**: Detect if the terminal supports colors.[See Table Options](#table-options)
- **TypeScript Support**: Full TypeScript support with strict linting rules.
- **Extendable Utilities**: Add and customize various utilities for your Node.js projects.[Contributing](Contributing)

## Installation

To install **Vincci** via npm or yarn:

```bash
npm install vincci
```

```bash
yarn add vincci
```

## Usage

Here’s how you can use **Vincci** to create a custom table in your terminal.

### Example

```typescript
import { vincci } from 'vincci';

const columns = ['Name', 'Age', 'City'];
const rows = [
  ['John Doe', 30, 'New York'],
  ['Jane Smith', 25, 'San Francisco'],
  ['Sam Brown', 35, 'Chicago'],
];

vincci(columns, rows);
```

```sql
╔══════════╦═════╦═════════════════╗
║ Name     ║ Age ║ Location        ║
╠══════════╬═════╬═════════════════╣
║ Alice    ║ 30  ║ New York        ║
╠══════════╬═════╬═════════════════╣
║ Bob      ║ 25  ║ San Francisco   ║
╠══════════╬═════╬═════════════════╣
║ Charlie  ║ 35  ║ Chicago         ║
╚══════════╩═════╩═════════════════╝
```

## Color Support Check

You can check whether your terminal supports colors using **Vincci**:

```typescript
import { isSupport } from 'vincci';

if (isSupport()) {
  console.log('Your terminal supports colors!');
} else {
  console.log("Your terminal doesn't support colors.");
}
```

## Full Example with custom option

```typescript
const columns = ['ID', 'Name', 'Age', 'City', 'Status'];
const rows = [
  ['asd', 'Alice', 25, 'New York', 'Active'],
  [2, 'Bob', 30, 'San Francisco', 'Inactive'],
  [3, 'Charlie', 35, 'Los Angeles', 'Inactive'],
  ['asdasd', 'David', 40, '', 'Active'],
  ['sg', 'Bob', 30, 'San Francisco', 'Inactive'],
  [6, 'Chris', 35, 'Los Angeles', 'Active'],
  [7, 'David', 40],
];
const options = {
  columnAlignments: {
    ID: 'right',
    Name: 'left',
    Age: 'center',
    City: 'left',
    Flag: 'center',
  },
  headerColors: {
    ID: 'green.bold',
    Name: 'yellow.underline',
    Age: 'red',
    City: 'cyan.italic',
  },
  rowStyleKey: 'Name',
  rowStyles: {
    Charlie: {
      ID: 'green.bold',
    },
    David: 'red.italic',
  },
  edgeStyles: 'rounded',
  highlightColumn: 'Name',
  rowBackgrounds: {
    odd: 'bgWhite',
    even: 'bgCyan',
  },
};
vincci(columns, rows, options);
```

## Table Options

| Option Name        | Type                                                                                                                                                                                                                                                                                                                                                    | Example                                                                                                   | Description                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `headerColors`     | `string`                                                                                                                                                                                                                                                                                                                                                | `headerColors: {Column1: "green.bold",Column2: "yellow.underline",Column3: "red",Column4: "cyan.italic"}` | Map of column names to color/style functions for headers.                           |
| `rowStyles`        | `string`                                                                                                                                                                                                                                                                                                                                                | `rowStyles: {"Charlie": {Column name: "green.bold"},"David": "red.italic"}`                               | Map of specific row values to style names or a record of styles.                    |
| `rowStyleKey`      | `string`                                                                                                                                                                                                                                                                                                                                                | `rowStyleKey: "Column2"`                                                                                  | The column name that determines the cell to style for row-based styling.            |
| `rowBackgrounds`   | `{ odd: "Chalk background"; even: "Chalk background" }`                                                                                                                                                                                                                                                                                                 | `{odd: "bgWhite", even: "bgCyan" }`                                                                       | Background colors for odd/even rows.                                                |
| `edgeStyles`       | `single, bold, rounded, dotted, thick, minimal, heavyDashed, double` or `{ topLeftCorner: string; topRightCorner: string; bottomLeftCorner: string; bottomRightCorner: string; horizontalSeparator: string; verticalSeparator: string; topCenter: string; vertical: string; bottomCenter: string; verticalRowLeft: string; verticalRowRight: string; }` | `edgeStyles: "rounded"`                                                                                   | Customize table border styles using either predefined styles or custom definitions. |
| `highlightColumn`  | `string` `it's an chalk color`                                                                                                                                                                                                                                                                                                                          | `highlightColumn: "column name"`                                                                          | Column to highlight (simulate hover effect).                                        |
| `columnAlignments` | `left,center,right`                                                                                                                                                                                                                                                                                                                                     | `{column1: "right",column2: "left", column3: "center",.. }`                                               | Column alignment options (left, center, or right).                                  |

## Contributing

We welcome contributions to Vincci! Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on how to get involved.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
