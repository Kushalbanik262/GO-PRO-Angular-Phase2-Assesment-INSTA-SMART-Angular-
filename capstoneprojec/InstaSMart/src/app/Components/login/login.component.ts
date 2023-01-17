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

  loginFlag:boolean = false; //Loader For Login Flag
  /**
   *
   * @param service For Loginservice it is used
   */
  constructor(private service:LoginService) { }

  ngOnInit(): void {}

  ngOnChanges(){ //For Detecting The Changes
    console.log("View Changed");
    if(this.loginFlag){this.loginFlag = false;}
  }
  tryLogin(data:credentials){ //Trying to Login With User entered credentials
    console.log("Trying With Credentials:",data);
    this.loginFlag = true;
    setTimeout(()=>{this.loginFlag = false},4000);//Making Login flag True for 4 secs after trying to login
    this.service.login(data.username,data.password);//Calling Login Service with login method
  }

}
