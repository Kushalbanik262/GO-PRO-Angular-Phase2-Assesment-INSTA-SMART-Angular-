import { Users } from './../Entities/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import {tap,catchError,of, Observable} from "rxjs";

@Injectable(
  {providedIn:"root"}
)
/**
 * This Is the user service for loading All The users
 */
export class UserService{
  /**
   *
   * @param http This is The HTTP object For all the http related operations
   */
  constructor(private http:HttpClient){}
  private url = "api/users"; //Url For Invoking The HTTP services

  /**
   *
   * @returns The Observable containing all the users coming from HTTP GET Response
   */
  getAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.url).pipe(
      tap((response)=>{console.log("The Response Coming From User Service:",response)}),
      catchError((error,caught)=>caught)// Throwing error if response has any error
    )
  }

}
