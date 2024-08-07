import { TableTypeConstructor } from 'src/types/types';

function Table<T, Y>({ head, body }: TableTypeConstructor<T, Y>) {
    // TODO : create table
    // TODO : create header for table
    // TODO : create body for table
    console.log(head);
    console.log(body);
}

export default Table;
