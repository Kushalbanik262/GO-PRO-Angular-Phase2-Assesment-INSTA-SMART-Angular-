import { RouterModule } from '@angular/router';
import { MaterialModuleModule } from './../material-module/material-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from 'src/app/Components/stars/star.component';
import { HelperNavComponent } from '../../Components/helper-nav/helper-nav.component';

/**
 * This is Common Shared Module
 */

@NgModule({
  declarations: [
    StarComponent,//The Star Component For Rating
    HelperNavComponent//Helper Nav Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModuleModule,
    RouterModule
  ],
  //To Use those in Other Modules which Import These we are exporting these
  exports:[
    StarComponent,
    HelperNavComponent
  ]
})
export class AppSharedModule { }
