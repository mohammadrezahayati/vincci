import { ConsoleClassConstructorType } from "./types/consoleClassType";

const { Console } = console;
export class ConsoleClass extends Console {
    #message;
    constructor(data: ConsoleClassConstructorType) {
        super(data.message);
        this.#message = data.message;
    }
}