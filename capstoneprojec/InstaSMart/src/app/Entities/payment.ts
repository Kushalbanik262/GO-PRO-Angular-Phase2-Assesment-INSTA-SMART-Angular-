export enum PaymentGateway{
    RAZORPAY,
    JUSTPAY,
    EASYPAY
}


export enum Banks{
    SBI,
    AXIS,
    CANARA,
    ALLHABAD,
    HSBC,
    IDFC
}

export interface Payment{
    id:string,
    details:string,
    gateway:PaymentGateway,
    bank:Banks
}