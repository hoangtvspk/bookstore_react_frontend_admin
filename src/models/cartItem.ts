import { Book } from "./book";

export interface CartItem{
    id: {
        orderId:number,
        bookId:number,
    },
    quantity: number,
    book: Book,
    total: number
}