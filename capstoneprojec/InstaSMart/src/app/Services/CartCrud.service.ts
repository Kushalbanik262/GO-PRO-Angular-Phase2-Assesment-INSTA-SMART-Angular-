import { map, of } from 'rxjs';
import { catchError } from 'rxjs';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';
import { Cart } from './../Entities/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable(
  {
    providedIn:"root"
  }
)
export class CartCrudService{
  constructor(private http:HttpClient){}
  url:string = "api/cart";



  saveCart(cart:Cart):Observable<Cart>{
    const headers = new HttpHeaders({'content-type':'application-json'});
    const newCart = {...cart};
    console.info(`The Object: ${JSON.stringify(newCart)}`);

    return this.http.post<Cart>(this.url,newCart,{headers})
    .pipe(
        tap(data=>{
            console.warn("Saved Data successfully From Cart Service",data);
        }),
        catchError(err => {
            throw 'error Details: Coming From Cart Service While saving' + err;
        }));
  }


  getCart():Observable<Cart[]>{ //Getting The Current Cart
    return this.http.get<Cart[]>(this.url).pipe(
      tap(data=>{console.log("Coming From Cart Service",data);}),
      catchError(error=>{console.log(error);return of();})
    );
  }

   updateCart(cart:Cart):Observable<Cart>{ //To Update The Cart
    const headers = new HttpHeaders({'content-type':'application-json'});
    const url = `${this.url}/${cart.id}`;
    const newCart = {...cart};
    console.warn(`The Updation Cart: ${JSON.stringify(newCart)}`);

    return this.http.put<any>(url,newCart,{headers})
    .pipe(
        tap(data=>{
            console.warn("Updated Cart successfully From Cart Service",data);
        }),
        map(()=>cart),
        catchError(err => {
            throw 'error Details: Coming From Cart Service While Updating' + err;
        }));
   }

   deleteCart(cid:number):Observable<{}>{
    let durl = `${this.url}/${cid}`;
    return this.http.delete(durl).pipe(
      tap((data)=>{
        console.info(`Deleting Data: ${data}`);
    }),
     catchError(err => {
        throw 'error Details: ' + err;
    })
    )
   }

}
