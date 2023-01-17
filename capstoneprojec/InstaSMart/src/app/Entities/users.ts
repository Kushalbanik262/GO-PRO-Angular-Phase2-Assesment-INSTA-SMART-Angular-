import { Products } from "./products";

/**
 * The Debit Card Interface to demonstrate the cart
 */
export interface DebitCard{
    id:number,
    name:string,
    cvv:string
}

/**
 * The user Priviledges
 */
export enum UserPriviledges{
  ADMIN = "ADMIN",
  USER = "USER"
}


/**
 * The User Interface For Denoting Any User
 */
export interface Users{
    id:number,
    name:string,
    address:string,
    contact:string,
    buy:Products[],
    card:DebitCard[],//Has Some Specific Debit cards
    locked:boolean,
    username:string,
    password:string,
    priviledge:UserPriviledges// To Denote it's Admin Or not
}
