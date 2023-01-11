import { Products } from "./products";

export interface CartMapping{
    product:Products,
    quantity:number
}


export interface Cart{
    id:number,
    time:string,
    cartmap:CartMapping[]
}