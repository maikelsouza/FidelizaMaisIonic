import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';


const routes: Routes = [
  // { path: 'list', loadChildren: './list/list.module#ListPageModule'},
  // tslint:disable-next-line:max-line-length
  { path: 'estabelecimentos', loadChildren: './estabelecimentos/estabelecimentos.module#EstabelecimentosModule'},  
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule'},    
  { path: 'login', component: LoginComponent},  
  
  { path: 'cartaoFidelidade', loadChildren: './cartoesFidelidade/cartoesFidelidade.module#CartoesFidelidadeModule'},  
  { path: 'programaFidelidade', loadChildren: './programasFidelidade/programasFidelidade.module#ProgramasFidelidadeModule'},  
  //{ path: 'lista-estabelecimento', loadChildren: './estabelecimentos/lista-estabelecimento/lista-estabelecimento.module#ListaEstabelecimentoPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},  
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [    
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
