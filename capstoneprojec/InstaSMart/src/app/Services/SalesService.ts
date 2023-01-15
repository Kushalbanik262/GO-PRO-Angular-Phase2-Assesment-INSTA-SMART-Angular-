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
export class SalesService{
  constructor(private http:HttpClient){}
  url:string = "api/sales";

  getAllSales():Observable<sales[]>{
    console.log("Loading All Sales");
    return this.http.get<sales[]>(this.url)
    .pipe(
      tap(data=>{console.log("Loading All datas from sales",data);}),
      catchError(error=>{console.error(error);return of()})
    );
  }
}
