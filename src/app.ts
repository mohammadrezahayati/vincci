import { displayCustomTable } from './index';
import { TableOptions } from './types/types';

// Test data
const columns = ['ID', 'Name', 'Age', 'City', 'Status']; // Add a new "Flag" column
const rows = [
  ['asd', 'Alice', 25, 'New York', 'Active'], // No flag
  [2, 'Bob', 30, 'San Francisco', 'Inactive'], // Flag this row with a star emoji
  [3, 'Charlie', 35, 'Los Angeles', 'Inactive'], // No flag
  ['asdasd', 'David', 40, '', 'Active'], // Flag with a flag emoji
  ['sg', 'Bob', 30, 'San Francisco', 'Inactive'], // Flag this row with a star emoji
  [6, 'Chris', 35, 'Los Angeles', 'Active'], // No flag
  [7, 'David', 40], // Flag with a flag emoji
];

const options: TableOptions = {
  columnAlignments: {
    ID: 'left', // Align "ID" column to the right
    Name: 'right', // Align "Name" column to the left
    Age: 'center', // Align "Age" column to the center
    City: 'left', // Align "City" column to the left
    Status: 'center', // Align "City" column to the left
  },
  headerColors: {
    ID: 'green.bold', // Green text with bold
    Name: 'yellow.underline', // Yellow text with underline
    Age: 'red', // Red text
    City: 'cyan.italic', // Cyan text with italic
  },
  rowStyleKey: 'Name',
  rowStyles: {
    Charlie: {
      ID: 'green.bold', // Green text with bold
    },
    David: 'blue.italic',
  },
  edgeStyles: 'rounded',
  // highlightColumn: "Name",
  // rowBackgrounds: {
  //     odd: "bgWhite", // Background color for odd rows
  //     even: "bgCyan" // Background color for even rows
  // }
};
// Display the table
displayCustomTable(columns, rows, options);
