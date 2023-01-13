import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/Login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {




  constructor(private service:LoginService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.service.isLoggedIn;
  }


  getName(){
    return this.service.getName();
  }

  logout(){
    alert("You Want to Logout?");
    this.service.logout();
  }

}
