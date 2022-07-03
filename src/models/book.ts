import { UserInfo } from "./auth";

export interface Category {
    id: number,
    nameCategory: string,
    image: string,
};

export interface BookImage {
    id: number,
    image: string
}

export interface Book{
    id : number,
    category: Category,
    nameBook: string,
    author: string,
    discount: number,
    quantity: number,
    price: number,
    detail: string,
    bookImages:BookImage[],
    rating: number
    reviews:[
        {
            id:number,
            user:UserInfo,
            reviewReps: [
                {
                    id:number,
                    user: UserInfo,
                    message: string,
                    date: string,
                }
            ],
            date: string,
            message: string,
            rating: number,
        },
        
    ],
    bookForEvents:[
        {
            id: {
                eventId: number,
                bookId: number,
            },
            event: Event
            discountValue: number,
            discountPercentValue: number
        }
    ]
}