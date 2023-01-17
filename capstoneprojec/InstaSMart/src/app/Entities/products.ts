/**
 * All The Product Categories
 */
export enum productCat{
    Daily,
    LifeStyle,
    Medicinal,
    HouseHold,
    Toys,
    Electronics,
    HomeAppliences
}

/**
 * Review Interface FOr The Reviews
 */
export interface Reviews{
    image:string,
    content:string
}


/**
 * The Main Product Interface
 */
export interface Products{
    id:number,
    name:string,
    category:productCat,
    details:string,
    price:number,
    ratings:number,
    image:string[],
    feedback:string,
    reviews:Reviews[]
}
