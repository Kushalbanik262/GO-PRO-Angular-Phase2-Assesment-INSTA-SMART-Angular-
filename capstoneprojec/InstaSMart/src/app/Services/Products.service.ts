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
/**
 * This Is The Main Product Service FOr DB Related Operations with HTTP methods
 */
export class ProductService{


  /////////////// Variable of The products array and URL ///////////////////
  products:Products[] = [];
  url = "api/products"
////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param http For HTTP Related Operations
 */
  constructor(private http:HttpClient){}

  /**
   *
   * @returns For Getting All The Current Products saved in array
   */
  getProducts():Products[]{
    return this.products;
  }

/**
 *
 * @returns All The Products Stored In DB
 */
  loadProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.url).pipe(
      tap(data=>{console.log("Coming Response From Product Service",data);this.products = data;}), //Assigning The response in our products Array
      catchError((error,action)=>action)
    );
  }




  /**
   *
   * @param product All The Products
   * @returns The Observable of the saved product
   */
  saveProduct(product:Products):Observable<Products>{
    const headers = new HttpHeaders({'content-type':'application-json'});
    const newProduct = {...product};
    console.info(`The Object: ${JSON.stringify(newProduct)}`);

    return this.http.post<Products>(this.url,newProduct,{headers})
    .pipe(
        tap(data=>{
            console.warn("Saved Data successfully From product Service",data);
            this.products.push(data); //Pusing The data to our array if saving is successful
        }),
        catchError(err => {
            throw 'error Details: Coming From Product Service While saving' + err; //Throwing Error if there is any error
        }));
  }


  /**
   *
   * @param pid The ProductId which Needs to Be deleted
   * @returns An Empty Observable
   */
  deleteProduct(pid:number):Observable<{}>{
    let dUrl = `${this.url}/${pid}`;
    return this.http.delete(dUrl).pipe(
      tap(response => {console.log("Deletion Response",response)
      this.products = this.products.filter((pd)=>pd.id != pid );
    }),
      catchError(error=>{console.error(error);return of([])})
    );
  }


  /**
   *
   * @param product The Product Which is needed to be updated
   * @returns An Observable Containing The updated Product
   */
  updateProduct(product:Products):Observable<Products>{
    const headers = new HttpHeaders({'content-type':'application-json'});
    const newProduct = {...product};
    let uUrl = `${this.url}/${product.id}`;
    console.info(`The Updation Object: ${JSON.stringify(newProduct)}`);

    return this.http.put<Products>(uUrl,newProduct,{headers})
    .pipe(
        tap(data=>{
            console.warn("Updated Data successfully From product Service",data);
            let idx = this.products.findIndex(prod=>prod.id === product.id); //Updating The Specific Product After Finding The Index Of it
                if(idx > -1){
                    this.products[idx] = product;
                    console.warn("Product Updated:",JSON.stringify(this.products),idx);
                }
        }),
        map(()=>product),
        catchError(err => {
            throw 'error Details: Coming From Product Service While Updating' + err; //Throwing Error If there is any error in response
        }));
  }
}
