import { UserPriviledges } from './../Entities/users';
import { LoginService } from './../Services/Login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuardGuard implements CanActivate {
  constructor(private service:LoginService,private router:Router,private snack:MatSnackBar){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.service.isLoggedIn && this.service.getPriviledge() == UserPriviledges.USER){return true;}
    else if(this.service.getPriviledge() == UserPriviledges.ADMIN){
      this.snack.open("Sorry Cart is for User Only","OK");
      this.router.navigate(['']);
    }
    this.snack.open("Please Login First","OK");
    this.router.navigate(['/login']);
    return false;
  }

}
