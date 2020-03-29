import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { CartaoFidelidadeListaUsuarioComponent } from './cartoesFidelidade/cartao-fidelidade-lista-usuario/cartao-fidelidade-lista-usuario.component';
import { CartaoFidelidadeListaEstabelecimentoComponent } from './cartoesFidelidade/cartao-fidelidade-lista-estabelecimento/cartao-fidelidade-lista-estabelecimento.component';
import { CartaoFidelidadeCadastroComponent } from './cartoesFidelidade/cartao-fidelidade-cadastro/cartao-fidelidade-cadastro.component';
import { CartaoFidelidadeEditarComponent } from './cartoesFidelidade/cartao-fidelidade-editar/cartao-fidelidade-editar.component';
import { ProgramaFidelidadeCadastroComponent } from './programasFidelidade/programa-fidelidade-cadastro/programa-fidelidade-cadastro.component';
import { ProgramaFidelidadeListaEstabelecimentoComponent } from './programasFidelidade/programa-fidelidade-lista-estabelecimento/programa-fidelidade-lista-estabelecimento.component';
import { ProgramaFidelidadeListaUsuarioComponent } from './programasFidelidade/programa-fidelidade-lista-usuario/programa-fidelidade-lista-usuario.component';
import { PontuarClienteCadastroComponent } from './pontuarClientes/pontuar-cliente-cadastro/pontuar-cliente-cadastro.component';
import { ResgatarPontosClienteResgateComponent } from './resgatarPontosClientes/resgatar-pontos-cliente-resgate/resgatar-pontos-cliente-resgate.component';


const routes: Routes = [
  { path: 'estabelecimentos', loadChildren: './estabelecimentos/estabelecimentos.module#EstabelecimentosModule'},  
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule'},    
  { path: 'login', component: LoginComponent},    
  // Cartão Fidelidade
  { path: 'cartaoFidelidade/listaUsuario', component: CartaoFidelidadeListaUsuarioComponent },   
  { path: 'cartaoFidelidade/listaEstabelecimento/:id', component: CartaoFidelidadeListaEstabelecimentoComponent },     
  { path: 'cartaoFidelidade/novo/:estabelecimentoId', component: CartaoFidelidadeCadastroComponent },   
  { path: 'cartaoFidelidade/:id', component: CartaoFidelidadeEditarComponent },
  // Programa Fidelidade
  { path: 'programaFidelidade/listaUsuario', component: ProgramaFidelidadeListaUsuarioComponent },   
  { path: 'programaFidelidade/listaEstabelecimento/:id', component: ProgramaFidelidadeListaEstabelecimentoComponent },   
  { path: 'programaFidelidade/novo/:idEstabelecimento', component: ProgramaFidelidadeCadastroComponent }, 
  { path: 'programaFidelidade/editar/:id', component: ProgramaFidelidadeCadastroComponent },  
  // Pontuar Clientes  
  { path: 'pontuarClienteCadastro', component: PontuarClienteCadastroComponent },   
  // Resgatar Pontos Clientes  
  { path: 'resgatarPontosClienteRestate', component: ResgatarPontosClienteResgateComponent },   
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
