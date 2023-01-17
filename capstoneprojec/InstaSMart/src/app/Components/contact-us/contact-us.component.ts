import { Component, OnInit,AfterViewChecked,ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {


  frm = new FormGroup({ //This is The formcontrol for contact Us Form
    firstname:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]), //Having Firstname
    lastName:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]), //Having LastName
    phn:new FormControl('',[Validators.required,Validators.pattern("[789][0-9]{9}")]), //Having Phone number
    store:new FormControl('Fresh Mart',[Validators.required]), //Having the default store selected as 'Fresh Mart'
    address:new FormControl('',[]),//Having the address a field
    comments:new FormControl('',[])//Having a comment section
  });

  timerFlag:boolean = true; //this is simple loader flag

  constructor(private router:Router) {this.timerFlag = false; } //At Component Creation Time Setting timerFlag false
  ngOnInit(): void {
     setInterval(()=>{this.timerFlag = true;},1000); //Making The loader flag for one second
  }


  submit(){ //The Contact Us Submitted Data
    console.log("The Contact Us submitted data is:",this.frm.value);
  }

  mdlClose(){//The modal closing and redirecting to the home page
    console.log("Closing Modal");
    this.router.navigateByUrl("");
  }

  getForm(){ //Getting the form
    return this.frm?.value;
  }
}
