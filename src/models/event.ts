import { EventBooksModel } from "./EventBooks";

export interface Event{
    id: number,
    image: string,
    dayStart: string,
    dayEnd: string,
    detail: string,
    bookForEvents: EventBooksModel
}