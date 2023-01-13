import { Component, OnInit,OnChanges } from '@angular/core';
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
export class LoginComponent implements OnInit,OnChanges {

  loginFlag:boolean = false;
  constructor(private service:LoginService) { }

  ngOnInit(): void {}

  ngOnChanges(){
    console.log("View Changed");
    if(this.loginFlag){this.loginFlag = false;}
  }
  tryLogin(data:credentials){
    console.log("Trying With Credentials:",data);
    this.loginFlag = true;
    setTimeout(()=>{this.loginFlag = false},4000);
    this.service.login(data.username,data.password);
  }

}
