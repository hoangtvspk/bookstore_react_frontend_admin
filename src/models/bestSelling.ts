export interface BestSelling {
    sumQuantity: number,
    bookResponse: {
        id: number,
        category: {
            id: number,
            nameCategory: string,
        }
        nameBook: string,
        author: string,
        price: number,
    }
}