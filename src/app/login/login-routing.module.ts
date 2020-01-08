import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';


const loginRoutes: Routes = [
    { path: '', component: LoginComponent }   
    
];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})

export class LoginRoutingModule {}