export enum SalesType{
    SUMMER,
    WINTER,
    FESTIVE,
    NEW_YEAR
}




export interface sales{
    id:number,
    name:string,
    category:SalesType,
    details:string,
    offer:string
}