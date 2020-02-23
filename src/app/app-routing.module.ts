import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { CartaoFidelidadeListaUsuarioComponent } from './cartoesFidelidade/cartao-fidelidade-lista-usuario/cartao-fidelidade-lista-usuario.component';
import { CartaoFidelidadeListaEstabelecimentoComponent } from './cartoesFidelidade/cartao-fidelidade-lista-estabelecimento/cartao-fidelidade-lista-estabelecimento.component';
import { CartaoFidelidadeCadastroComponent } from './cartoesFidelidade/cartao-fidelidade-cadastro/cartao-fidelidade-cadastro.component';
import { CartaoFidelidadeEditarComponent } from './cartoesFidelidade/cartao-fidelidade-editar/cartao-fidelidade-editar.component';


const routes: Routes = [
  { path: 'estabelecimentos', loadChildren: './estabelecimentos/estabelecimentos.module#EstabelecimentosModule'},  
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule'},    
  { path: 'login', component: LoginComponent},    
  // Cartão Fidelidade
  { path: 'cartaoFidelidade/listaUsuario', component: CartaoFidelidadeListaUsuarioComponent },   
  { path: 'cartaoFidelidade/listaEstabelecimento/:id', component: CartaoFidelidadeListaEstabelecimentoComponent },     
  { path: 'cartaoFidelidade/novo/:estabelecimentoId', component: CartaoFidelidadeCadastroComponent },   
  { path: 'cartaoFidelidade/:id', component: CartaoFidelidadeEditarComponent },
  { path: 'programaFidelidade', loadChildren: './programasFidelidade/programasFidelidade.module#ProgramasFidelidadeModule'},    
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
