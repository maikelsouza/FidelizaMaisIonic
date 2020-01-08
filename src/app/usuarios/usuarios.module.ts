import { UsuarioMeuPerfilComponent } from './usuario-meu-perfil/usuario-meu-perfil.component';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UsuarioService } from './shared/services/usuario.service';
import { UsuariosRoutesModule } from './usuarios-routing.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    IonicModule,    
    UsuariosRoutesModule   
  ],
  providers: [
    UsuarioService,        
  ],
    
  declarations: [
    UsuarioCadastroComponent,
    UsuarioListaComponent,
    UsuarioDetalheComponent,
    UsuarioMeuPerfilComponent 
  ]
})


export class UsuariosModule {}
