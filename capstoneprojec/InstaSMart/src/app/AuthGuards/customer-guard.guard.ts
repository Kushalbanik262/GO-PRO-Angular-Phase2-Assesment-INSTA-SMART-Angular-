import { UserPriviledges } from './../Entities/users';
import { LoginService } from './../Services/Login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * This Is the Customer Authentication Guard used For the Restricting those nodes which are restriced for Users only
 */

@Injectable({
  providedIn: 'root'
})
export class CustomerGuardGuard implements CanActivate { //Implementing the CanActivate interface
  constructor(private service:LoginService,private router:Router,private snack:MatSnackBar){} //Dependency Injecting The LoginService and Router
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Giving The Permissing to the logged in Users Only
    if(this.service.isLoggedIn && this.service.getPriviledge() == UserPriviledges.USER){return true;} //If He is User returning true
    else if(this.service.isLoggedIn && this.service.getPriviledge() == UserPriviledges.ADMIN){
      this.snack.open("Sorry Cart is for User Only","OK"); //If He is Admin giving popup
      this.router.navigate(['']);//Redirecting to the main page
    }
    this.snack.open("Please Login First","OK");
    this.router.navigate(['/login']);//Else Redirecting to the login page
    return false;
  }

}
