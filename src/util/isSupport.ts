import supportsColor from 'supports-color';

/**
 * The function `isSupport` checks the terminal's color support and logs corresponding messages based
 * on the capabilities.
 * @returns The function `isSupport` returns either `true`, `false`, or `undefined` (void) based on the
 * conditions checked within the function. It logs messages to the console based on the color support
 * detected in the terminal, but the actual return value is either `true`, `false`, or `undefined`
 * depending on the conditions met.
 */
export const isSupport = (): boolean => {
    if (supportsColor.stdout && supportsColor.stdout.has256) {
        console.log('Terminal stdout supports 256 colors');
        return true;
    }

    if (supportsColor.stdout) {
        console.log('Terminal stdout supports color');
        return true;
    }

    if (supportsColor.stderr && supportsColor.stderr.has16m) {
        console.log('Terminal stderr supports 16 million colors (truecolor)');
        return true;
    }
    console.log('Terminal does not support');
    return false;
};
