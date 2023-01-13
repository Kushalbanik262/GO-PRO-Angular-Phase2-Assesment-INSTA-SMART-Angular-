import { Products } from "./products";

export interface DebitCard{
    id:number,
    name:string,
    cvv:string
}

export enum UserPriviledges{
  ADMIN = "ADMIN",
  USER = "USER"
}


export interface Users{
    id:number,
    name:string,
    address:string,
    contact:string,
    buy:Products[],
    card:DebitCard[],
    locked:boolean,
    username:string,
    password:string,
    priviledge:UserPriviledges
}
