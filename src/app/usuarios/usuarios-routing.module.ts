import { UsuarioMeuPerfilComponent } from './usuario-meu-perfil/usuario-meu-perfil.component';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';




const usuariosRoutes: Routes = [
    { path: '', component: UsuarioListaComponent },   
    { path: 'novo', component: UsuarioCadastroComponent },
    { path: 'meuPerfil', component: UsuarioMeuPerfilComponent },
    { path: ':id', component: UsuarioDetalheComponent }
];

@NgModule({
    imports: [RouterModule.forChild(usuariosRoutes)],
    exports: [RouterModule]
})

export class UsuariosRoutesModule {}