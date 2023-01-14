import { UserLoading } from './../ReduxModules/UserRedux/user.actions';
import { Users, UserPriviledges } from './../Entities/users';
import { Router } from '@angular/router';
import { UserService } from './User.service';
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { MatSnackBar} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Injectable(
  {providedIn:"root"}
)
export class LoginService{
  isLoggedIn:boolean;
  currentUser!:Users;
  subscribe!:Subscription;


  constructor(private service:UserService,private router:Router,private _snackBar:MatSnackBar,private store:Store<any>){
    this.isLoggedIn = false;
  }

  getId(){
    return this.currentUser.id;
  }


  getName(){
    return this.currentUser?.name;
  }

  getPriviledge(){
    return this.currentUser?.priviledge;
  }



  logout(){
    this.subscribe.unsubscribe();
    this.isLoggedIn = false;
    this.currentUser = {
      ...this.currentUser,
      name:"-1",
      id:-1
    };
  }


  login(username:string,password:string){
    this.store.dispatch(UserLoading());

    this.subscribe =  this.store.subscribe(
      {
        next:(response)=>{
          console.log(response.users.users);
          response.users.users.forEach(
            (user:Users)=>{
              if(user.username == username){
                console.log("Coming From User Service",user);
                if(user.password == password){
                    this.currentUser = user;
                    console.info(`${user.name} Logged in Successfully`);
                    this.isLoggedIn = true;
                    this.subscribe.unsubscribe();
                    this._snackBar.open(`${user.name} Logged In SuccessFully`,"Start Shopping").afterDismissed().subscribe(
                      {
                        next:(res)=>{console.log("SnackBar Response",res); this.router.navigate(['']);

                      }

                      }
                    );
                }
                else{
                  this._snackBar.open(`${user.name} Associated Password is Invalid`,"Try Again").afterDismissed().subscribe(
                    {
                      next:(res)=>{console.warn("Sorry Invalid Credentials",res);}
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

