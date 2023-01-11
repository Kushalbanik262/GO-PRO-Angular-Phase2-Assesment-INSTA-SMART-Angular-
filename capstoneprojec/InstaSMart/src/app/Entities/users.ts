import { Products } from "./products";

export interface DebitCard{
    id:number,
    name:string,
    cvv:string
}


export interface Users{
    id:number,
    name:string,
    address:string,
    contact:string,
    buy:Products[],
    card:DebitCard[],
    locked:boolean
}