import { TableTypeConstructor } from 'src/types/types';
import truncate from './truncate';


const Table = <T, Y>({ head, body }: TableTypeConstructor<T, Y>) => {
    // TODO : create table
    // TODO : create header for table
    // TODO : create body for table
    truncate(head)
    console.log(body);
}

Table({ head: [1, 2, 3], body: ["inja", "onja", "hameja"] })

export default Table;
