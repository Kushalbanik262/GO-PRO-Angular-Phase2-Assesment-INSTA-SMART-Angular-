import { Users } from './../Entities/users';
import { Router } from '@angular/router';
import { UserService } from './User.service';
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { flip } from '@popperjs/core';
import { MatSnackBar, _SnackBarContainer } from '@angular/material/snack-bar';

@Injectable(
  {providedIn:"root"}
)
export class LoginService{
  constructor(private service:UserService,private router:Router,private _snackBar:MatSnackBar){}
  url = "api/users";
  currentUser!:Users;
  isLoggedIn:boolean = false;

  login(username:string,password:string){
    this.service.getAllUsers().subscribe(
      {
        next:(response)=>{
          response.forEach(
            (user)=>{
              if(user.username == username){
                console.log("Coming From User Service",user);
                if(user.password == password){
                    this.currentUser = user;
                    console.info(`${user.name} Logged in Successfully`);
                    this.isLoggedIn = true;
                    this._snackBar.open(`${user.name} Logged In SuccessFully`,"Start Shopping").afterDismissed().subscribe(
                      {
                        next:(res)=>{console.log("SnackBar Response",res); this.router.navigate(['']);}
                      }
                    );
                }
              }
            }
          );
        }
      }
    );
  }

}

