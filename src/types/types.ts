export interface TableTypeConstructor<T, Y> {
    head: T[];
    body: Y[];
    style: StyleType;
}

export interface StyleType {
    colorize: boolean;
}
