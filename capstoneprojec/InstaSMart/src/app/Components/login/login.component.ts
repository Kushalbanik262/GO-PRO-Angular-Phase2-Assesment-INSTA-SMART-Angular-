import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/Login.service';
import { UserService } from 'src/app/Services/User.service';


interface credentials{
  username:string,
  password:string
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFlag:boolean = false;
  constructor(private service:LoginService) { }

  ngOnInit(): void {}


  tryLogin(data:credentials){
    this.loginFlag = true;
    this.service.login(data.username,data.password);
  }

}
