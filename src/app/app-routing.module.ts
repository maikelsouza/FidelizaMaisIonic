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
import { PontosClientePontuarComponent } from './pontosClientes/pontos-cliente-pontuar/pontos-cliente-pontuar.component';
import { PontosClienteResgatarComponent } from './pontosClientes/pontos-cliente-resgatar/pontos-cliente-resgatar.component';
import { EsqueciMinhaSenhaCadastroComponent } from './esqueciMinhaSenha/esqueci-minha-senha-cadastro/esqueci-minha-senha-cadastro.component';
import { ListaEstabelecimentoPage } from './estabelecimentos/lista-estabelecimento/lista-estabelecimento.page';
import { FormEstabelecimentoPage } from './estabelecimentos/form-estabelecimento/form-estabelecimento.page';
import { EstabelecimentoDetalhePage } from './estabelecimentos/estabelecimento-detalhe/estabelecimento-detalhe.page';
import { LogoffComponent } from './login/logoff/logoff.component';




const routes: Routes = [
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule'},    
  { path: 'login', component: LoginComponent},    
  { path: 'esqueciMinhaSenha', component: EsqueciMinhaSenhaCadastroComponent},     
  // estabelecimentos  
  { path: 'estabelecimento/lista',component: ListaEstabelecimentoPage},  
  { path: 'estabelecimento/novo',component: FormEstabelecimentoPage},  
  { path: 'estabelecimento/:id',component: EstabelecimentoDetalhePage},  
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
  // Pontos Clientes    
  { path: 'pontosClientePontuar', component: PontosClientePontuarComponent }, 
  { path: 'pontosClienteResgatar', component: PontosClienteResgatarComponent },      
  
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},  
  { path: 'sair', component: LogoffComponent },      
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [    
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
