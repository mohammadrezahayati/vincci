import { ConsoleClassConstructorType } from './types/consoleClassType';

const { Console } = console;
export class ConsoleClass extends Console {

    constructor(data: ConsoleClassConstructorType) {
        super(data.message);

    }
}
