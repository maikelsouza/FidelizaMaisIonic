import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/services/login.service';

@NgModule({  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    ReactiveFormsModule,
    LoginRoutingModule
  ],

  providers: [    
    LoginService
  ],
  declarations: [    
    LoginComponent
  ]
})
export class LoginModule { }
