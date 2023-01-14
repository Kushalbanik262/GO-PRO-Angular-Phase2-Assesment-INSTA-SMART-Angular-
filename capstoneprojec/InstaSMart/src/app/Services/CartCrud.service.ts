import { of } from 'rxjs';
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

  getCart():Observable<Cart[]>{ //Getting The Current Cart
    return this.http.get<Cart[]>(this.url).pipe(
      tap(data=>{console.log("Coming From Cart Service",data);}),
      catchError(error=>{console.log(error);return of();})
    );
  }

   updateCart(cart:Cart):Observable<Cart>{ //To Update The Cart
    const headers = new HttpHeaders({'content-type':'application-json'});
    const newProduct = {...cart};
    console.info(`The Updation Cartt: ${JSON.stringify(newProduct)}`);

    return this.http.put<Cart>(this.url,newProduct,{headers})
    .pipe(
        tap(data=>{
            console.warn("Updated Cart successfully From Cart Service",data);
        }),
        catchError(err => {
            throw 'error Details: Coming From Cart Service While Updating' + err;
        }));
   }

}
