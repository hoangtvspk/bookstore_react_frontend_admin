import { CartItem } from "./cartItem"
import { Voucher } from "./voucher"

export interface Cart{
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
    }

}
export interface GetOrder{
    id: number,
    address: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    date: string,
    totalPrice: number,
    status: string,
    orderItems:[CartItem]
    coupon: Voucher
}