import { Users } from './../Entities/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import {tap,catchError,of, Observable} from "rxjs";

@Injectable(
  {providedIn:"root"}
)
export class UserService{
  constructor(private http:HttpClient){}
  private url = "api/users";

  getAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.url).pipe(
      tap((response)=>{console.log("The Response Coming From User Service:",response)}),
      catchError((error,caught)=>caught)
    )
  }

}
