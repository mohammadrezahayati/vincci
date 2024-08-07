import styles from 'ansi-styles';

console.log(`${styles.green.open}Hello world!${styles.green.close}`);

// Color conversion between 256/truecolor
// NOTE: When converting from truecolor to 256 colors, the original color
//       may be degraded to fit the new color palette. This means terminals
//       that do not support 16 million colors will best-match the
//       original color.
console.log(
    `${styles.color.ansi(styles.rgbToAnsi(199, 20, 250))}Hello World${styles.color.close}`
);
console.log(
    `${styles.color.ansi256(styles.rgbToAnsi256(199, 20, 250))}Hello World${styles.color.close}`
);
console.log(
    `${styles.color.ansi16m(...styles.hexToRgb('#abcdef'))}Hello World${styles.color.close}`
);
