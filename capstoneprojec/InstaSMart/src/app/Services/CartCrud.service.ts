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
/**
 * The cart Crud Service For ALl the Cart DB operations Through HTTP Calls
 */
export class CartCrudService{
  /**
   *
   * @param http The Http Client For Http Calls
   */
  constructor(private http:HttpClient){}
  //////// The Variables For url and All the carts ///////////////
  url:string = "api/cart";
  carts:Cart[] = []; //Initially Empty
 /////////////////////////////////////////////////////////////////



  /**
   *
   * @param cart the cart which need to be saved
   * @returns the Observable which has the carts as a response from HTTP Call
   */
  saveCart(cart:Cart):Observable<Cart>{
    const headers = new HttpHeaders({'content-type':'application-json'});
    const newCart = {...cart};
    console.info(`The Object: ${JSON.stringify(newCart)}`);

    return this.http.post<Cart>(this.url,newCart,{headers})
    .pipe(
        tap(data=>{
            console.warn("Saved Data successfully From Cart Service",data);
            this.carts.push(data); //Pusing To Cart If New Data is Present
        }),
        catchError(err => {
            throw 'error Details: Coming From Cart Service While saving' + err; //Throwing Error if There is any Error
        }));
  }

/**
 *
 * @returns The Observale Of type Cart Array For Returing All The Carts as a response from HTTP Call
 */
  getCart():Observable<Cart[]>{ //Getting The Current Cart
    return this.http.get<Cart[]>(this.url).pipe(
      tap(data=>{console.log("Coming From Cart Service",data);
                this.carts = data; //Assigning All Datas When Getting All The Datas
      }),
      catchError(error=>{console.log(error);return of();})
    );
  }

  /**
   *
   * @param cart The Cart Which is needed to be updated
   * @returns The Observable which has the updated cart as a response from HTTP Call
   */
   updateCart(cart:Cart):Observable<Cart>{ //To Update The Cart
    const headers = new HttpHeaders({'content-type':'application-json'});
    const url = `${this.url}/${cart.id}`;
    const newCart = {...cart};
    console.warn(`The Updation Cart: ${JSON.stringify(newCart)}`);

    return this.http.put<any>(url,newCart,{headers})
    .pipe(
        tap(data=>{
            console.warn("Updated Cart successfully From Cart Service",data);
            this.carts = this.carts.map(c=>c.id == cart.id ? c : cart); //Mapping For Updation In The Cart
        }),
        map(()=>cart),
        catchError(err => {
            throw 'error Details: Coming From Cart Service While Updating' + err;
        }));
   }

   /**
    *
    * @param cid The Cart Id Which is Need to be deleted
    * @returns Observable Of Type Null
    */
   deleteCart(cid:number):Observable<{}>{
    const headers = new HttpHeaders({'content-type':'application-json'});
    console.log("Deleting Cart With Id:",cid);
    let durl = `${this.url}/${cid}`;
    return this.http.delete(durl,{headers}).pipe(
      tap((data)=>{
        console.info(`Deleting Data: ${data}`);
        this.carts = this.carts.filter(c=>c.id != cid); //Filtering The Deleted Data from the cart
    }),
     catchError(err => {
        throw 'error Details: ' + err;
    })
    )
   }
   /**
    *
    * @returns The Current Cart Array
    */
   getCarts(){
    return this.carts;
   }
}
