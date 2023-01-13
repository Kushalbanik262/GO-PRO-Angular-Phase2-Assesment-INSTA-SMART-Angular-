export enum productCat{
    Daily,
    LifeStyle,
    Medicinal,
    HouseHold,
    Toys,
    Electronics,
    HomeAppliences
}


export interface Reviews{
    image:string,
    content:string
}

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
