import { LoginService } from 'src/app/Services/Login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPriviledges } from '../Entities/users';

/**
 * This is Admin Authentication Guard Used For giving restrited use for Admins Only
 */

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate { //Implementing the CanActivate interface
  constructor(private service:LoginService,private router:Router){}//Dependency Injecting The LoginService and Router
  canActivate(//Overriding the canActivate Method
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.service.isLoggedIn && this.service.getPriviledge() == UserPriviledges.ADMIN){return true;} //Returning True If the User
    //Is logged In And the type is admin
    this.router.navigate(['denied']); //Else Redirecting to the page 'denied' which is access denied page
    return false;
  }

}
