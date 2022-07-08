export interface CartItem{
    id: {
        orderId:number,
        bookId:number,
    },
    quantity: number,
    book:{
        id:number,
        category:{
            id:number,
            nameCategory: string,
        },
        nameBook: string,
        author: string,
        discount: number,
        quantity: number,
        price: number,
        detail: string,
        bookImages:[
            {
                id: number,
                image: string,
            }
        ],
        reviews: string,
        rating: number
    },
    total: number
}