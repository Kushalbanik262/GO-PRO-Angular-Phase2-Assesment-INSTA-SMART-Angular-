import { RouterModule } from '@angular/router';
import { MaterialModuleModule } from './../material-module/material-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from 'src/app/Components/stars/star.component';
import { HelperNavComponent } from '../../Components/helper-nav/helper-nav.component';



@NgModule({
  declarations: [
    StarComponent,
    HelperNavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModuleModule,
    RouterModule
  ],
  exports:[
    StarComponent,
    HelperNavComponent
  ]
})
export class AppSharedModule { }
