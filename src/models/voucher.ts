export interface Voucher {
    couponCode: number;
    minimumOrderValue: number;
    discountValue: number;
    discountPercentValue: number;
    dayStart: string;
    dayEnd: string;
    isUse: boolean;
   
}