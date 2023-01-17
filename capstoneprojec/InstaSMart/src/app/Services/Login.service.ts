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
/**
 * The Service for all the login related Operations
 */
export class LoginService{
  /////// Variables For Login Operations //////
  isLoggedIn:boolean;
  currentUser!:Users;
  subscribe!:Subscription;
 ////////////////////////////////////////////////////


 /**
  *
  * @param router For Routing to Another Page
  * @param _snackBar For Generating The Popup
  * @param store The NGRX Store For Redux Operations
  */
  constructor(private router:Router,private _snackBar:MatSnackBar,private store:Store<any>){
    this.isLoggedIn = false; //Setting Login False By Default
  }


  /**
   *
   * @returns Returns The Current User
   */
  getCurrent(){
    return this.currentUser;
  }

/**
 *
 * @returns If anyOne is loggedIn or not
 */
  IsLoggedIn(){
    return this.isLoggedIn;
  }


  /**
   *
   * @returns The Current Id Of Customer
   */
  getId(){
    return this.currentUser.id;
  }



  /**
   *
   * @returns The Current User Name
   */
  getName(){
    return this.currentUser?.name;
  }

  /**
   *
   * @returns The Current User Priviledge
   */
  getPriviledge(){
    return this.currentUser?.priviledge;
  }


  /**
   * For Logging Out
   */
  logout(){
    this.subscribe?.unsubscribe(); //Unsubscribing The user
    this.isLoggedIn = false;
    this.currentUser = {
      ...this.currentUser, //Demolishing the currentUser
      name:"-1",
      id:-1
    };
  }


  /**
   *
   * @param username The UserName of user
   * @param password The Password of user
   */
  login(username:string,password:string){
    this.store.dispatch(UserLoading()); //Loading All The Users

    this.subscribe =  this.store.subscribe(
      {
        next:(response)=>{
          console.log(response.users.users);
          response.users.users.forEach(
            (user:Users)=>{
              if(user.username == username){ //If There is Any User with the Username
                console.log("Coming From User Service",user);
                if(user.password == password){ //If Password matches Then Logging In
                    this.currentUser = user;
                    console.info(`${user.name} Logged in Successfully`);
                    this.isLoggedIn = true;
                    this.subscribe.unsubscribe(); //Unsubscribing The User dispatch Store
                    this._snackBar.open(`${user.name} Logged In SuccessFully`,"Start Shopping").afterDismissed().subscribe(
                      {
                        next:(res)=>{console.log("SnackBar Response",res); this.router.navigate(['']); //After Popping Moving TO The Home Page

                      }

                      }
                    );
                }
                else{//If Entered Password Is Invalid will be given another chance to login
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

