import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { tap } from 'rxjs';
import { Products } from './../Entities/products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable(
  {providedIn:"root"}
)
export class ProductService{
  url = "api/products"
  constructor(private http:HttpClient){}

  loadProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.url).pipe(
      tap(data=>{console.log("Coming Response From Product Service",data)}),
      catchError((error,action)=>action)
    );
  }

  saveProduct(product:Products):Observable<Products>{
    const headers = new HttpHeaders({'content-type':'application-json'});
    const newProduct = {...product};
    console.info(`The Object: ${JSON.stringify(newProduct)}`);

    return this.http.post<Products>(this.url,newProduct,{headers})
    .pipe(
        tap(data=>{
            console.warn("Saved Data successfully From product Service",data);
        }),
        catchError(err => {
            throw 'error Details: Coming From Product Service While saving' + err;
        }));
  }

  deleteProduct(pid:number):Observable<{}>{
    let dUrl = `${this.url}/${pid}`;
    return this.http.delete(dUrl).pipe(
      tap(response => console.log("Deletion Response",response)),
      catchError(error=>{console.error(error);return of([])})
    );
  }


  updateProduct(product:Products):Observable<Products>{
    const headers = new HttpHeaders({'content-type':'application-json'});
    const newProduct = {...product};
    console.info(`The Updation Object: ${JSON.stringify(newProduct)}`);

    return this.http.put<Products>(this.url,newProduct,{headers})
    .pipe(
        tap(data=>{
            console.warn("Updated Data successfully From product Service",data);
        }),
        catchError(err => {
            throw 'error Details: Coming From Product Service While Updating' + err;
        }));
  }
}
