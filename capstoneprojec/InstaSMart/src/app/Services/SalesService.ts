import { of } from 'rxjs';
import { catchError } from 'rxjs';
import { tap } from 'rxjs';
import { sales } from './../Entities/sales';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable(
  {
    providedIn:"root"
  }
)
/**
 * This Is the Sales Service For Loading All The Sales
 */
export class SalesService{
  /**
   *
   * @param http The Client For All The HTTP Related Operations
   */
  constructor(private http:HttpClient){}
  url:string = "api/sales"; //The Url TO Load All the datas


  /**
   *
   * @returns The Observable Containing All The sales
   */
  getAllSales():Observable<sales[]>{
    console.log("Loading All Sales");
    return this.http.get<sales[]>(this.url)
    .pipe(
      tap(data=>{console.log("Loading All datas from sales",data);}),
      catchError(error=>{console.error(error);return of()}) //Throwing Error if The response has any error
    );
  }
}
