import { Category } from "./categoryBooks";

export interface AddBookForm {
    book : {
        nameBook: string,
        author: string,
        discount: number,
        quantity: number,
        price: number,
        detail: string,
        idCate: number,
    }
    file1: string,
    file2: string,
    file3: string,
}
