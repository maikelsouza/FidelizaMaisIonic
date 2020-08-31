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
import { EstabelecimentoVisualizarComponent } from './estabelecimentos/estabelecimento-visualizar/estabelecimento-visualizar.component';
import { UsuarioListaComponent } from './usuarios/usuario-lista/usuario-lista.component';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { UsuarioAtualizarSenhaComponent } from './usuarios/usuario-atualizar-senha/usuario-atualizar-senha.component';
import { UsuarioMeuPerfilComponent } from './usuarios/usuario-meu-perfil/usuario-meu-perfil.component';
import { UsuarioDetalheComponent } from './usuarios/usuario-detalhe/usuario-detalhe.component';
import { ProgramaFidelidadeVisualizarPage } from './programasFidelidade/programa-fidelidade-visualizar/programa-fidelidade-visualizar.page';

const routes: Routes = [

  // usuários
  { path: 'usuarios', component: UsuarioListaComponent},
  { path: 'usuarios/novo', component: UsuarioCadastroComponent },
  { path: 'usuarios/meuPerfil', component: UsuarioMeuPerfilComponent },
  { path: 'usuarios/atualizarSenha', component: UsuarioAtualizarSenhaComponent },
  { path: 'usuarios/:id', component: UsuarioDetalheComponent },  
  // login
  { path: 'login', component: LoginComponent},    
  { path: 'esqueciMinhaSenha', component: EsqueciMinhaSenhaCadastroComponent},     
  // estabelecimentos  
  { path: 'estabelecimento/lista',component: ListaEstabelecimentoPage},  
  { path: 'estabelecimento/novo',component: FormEstabelecimentoPage},  
  { path: 'estabelecimento/visualizar',component: EstabelecimentoVisualizarComponent},  
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
  { path: 'programaFidelidade/visualizar/:id', component: ProgramaFidelidadeVisualizarPage },  
  // Pontos Clientes    
  { path: 'pontosClientePontuar', component: PontosClientePontuarComponent }, 
  { path: 'pontosClienteResgatar', component: PontosClienteResgatarComponent },      
  
  { path: 'principal', loadChildren: './principal/principal.module#PrincipalPageModule'},  
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  

];

@NgModule({
  imports: [    
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
