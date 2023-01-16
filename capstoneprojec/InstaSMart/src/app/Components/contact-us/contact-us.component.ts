import { Component, OnInit,AfterViewChecked,ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {


  frm = new FormGroup({
    firstname:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    lastName:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    phn:new FormControl('',[Validators.required,Validators.pattern("[789][0-9]{9}")]),
    store:new FormControl('Fresh Mart',[Validators.required]),
    address:new FormControl('',[]),
    comments:new FormControl('',[])
  });

  timerFlag:boolean = true;

  constructor(private router:Router) {this.timerFlag = false; }
  ngOnInit(): void {
     setInterval(()=>{this.timerFlag = true;},1000);
  }
  // ngAfterViewChecked(): void {
  //   console.log(this.frm);
  // }


  // ngOnInit(): void {
  //   this.timerFlag = true;//Setting Initially False In loading Mode
  //   console.log("Inited The Component");
  //  //setInterval(()=>{this.timerFlag = true},1200); //creating custom loader
  // }

  submit(){ //The Contact Us Submitted Data
    console.log("The Contact Us submitted data is:",this.frm.value);
  }

  mdlClose(){
    console.log("Closing Modal");
    this.router.navigateByUrl("");
  }

  getForm(){
    return this.frm?.value;
  }
}
