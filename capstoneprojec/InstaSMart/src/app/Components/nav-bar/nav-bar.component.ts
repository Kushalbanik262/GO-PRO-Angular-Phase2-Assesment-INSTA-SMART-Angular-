import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/Login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  /**
   *
   * @param service Using Login Service to Get Currenty Login User Details
   */

  constructor(private service:LoginService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){ //Is Any user is Logged in or not
    return this.service.IsLoggedIn();
  }


  getName(){//Getting The Name
    return this.service.getName();
  }

  logout(){//Trying to Logout
    alert("You Want to Logout?");//Alert Asking For Logout
    this.service.logout();
  }

}
