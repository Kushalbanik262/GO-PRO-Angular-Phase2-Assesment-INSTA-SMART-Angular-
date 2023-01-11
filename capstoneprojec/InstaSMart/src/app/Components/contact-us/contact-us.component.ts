import { Component, OnInit,AfterViewChecked,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  timerFlag:boolean = false;
  @ViewChild('frm', { read: NgForm })frm!:NgForm;
  constructor(private router:Router) { }


  ngOnInit(): void {
    this.timerFlag = false;//Setting Initially False In loading Mode
    console.log("Inited The Component");
    setInterval(()=>{this.timerFlag = true},1200); //creating custom loader
  }

  submit(data:any){ //The Contact Us Submitted Data
    console.log("The Contact Us submitted data is:",data);
  }

  mdlClose(){
    console.log("Closing Modal");
    this.router.navigateByUrl("");
  }

  getForm(){
    return this.frm?.value;
  }
}
