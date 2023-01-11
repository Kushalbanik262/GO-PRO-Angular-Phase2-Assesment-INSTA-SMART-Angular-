import { Products } from "./products";

export interface Allignment{
    products:Products,
    discount:number
}


export interface Offers{
    id:number,
    coupon_code:string,
    name:string,
    valid_till:string,
    alignment:Allignment[]
}