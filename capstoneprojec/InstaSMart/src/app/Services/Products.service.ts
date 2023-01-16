import { MatSnackBar } from '@angular/material/snack-bar';
import { of, map } from 'rxjs';
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
  products:Products[] = [];
  url = "api/products"

  constructor(private http:HttpClient){}

  getProducts():Products[]{
    return this.products;
  }

  loadProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.url).pipe(
      tap(data=>{console.log("Coming Response From Product Service",data);this.products = data;}),
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
            this.products.push(data);
        }),
        catchError(err => {
            throw 'error Details: Coming From Product Service While saving' + err;
        }));
  }

  deleteProduct(pid:number):Observable<{}>{
    let dUrl = `${this.url}/${pid}`;
    return this.http.delete(dUrl).pipe(
      tap(response => {console.log("Deletion Response",response)
      this.products = this.products.filter((pd)=>pd.id != pid );
    }),
      catchError(error=>{console.error(error);return of([])})
    );
  }


  updateProduct(product:Products):Observable<Products>{
    const headers = new HttpHeaders({'content-type':'application-json'});
    const newProduct = {...product};
    let uUrl = `${this.url}/${product.id}`;
    console.info(`The Updation Object: ${JSON.stringify(newProduct)}`);

    return this.http.put<Products>(uUrl,newProduct,{headers})
    .pipe(
        tap(data=>{
            console.warn("Updated Data successfully From product Service",data);
            let idx = this.products.findIndex(prod=>prod.id === product.id);
                if(idx > -1){
                    this.products[idx] = product;
                    console.warn("Product Updated:",JSON.stringify(this.products),idx);
                }
        }),
        map(()=>product),
        catchError(err => {
            throw 'error Details: Coming From Product Service While Updating' + err;
        }));
  }
}
