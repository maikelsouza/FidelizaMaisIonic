import { CartaoFidelidadeEditarComponent } from './cartao-fidelidade-editar/cartao-fidelidade-editar.component';
import { CartaoFidelidadeListaEstabelecimentoComponent } from './cartao-fidelidade-lista-estabelecimento/cartao-fidelidade-lista-estabelecimento.component';
import { CartaoFidelidadeListaUsuarioComponent } from './cartao-fidelidade-lista-usuario/cartao-fidelidade-lista-usuario.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartaoFidelidadeCadastroComponent } from './cartao-fidelidade-cadastro/cartao-fidelidade-cadastro.component';


const cartoesFidelidadeRoutes: Routes = [
    { path: 'listaUsuario', component: CartaoFidelidadeListaUsuarioComponent },   
    { path: 'listaEstabelecimento', component: CartaoFidelidadeListaEstabelecimentoComponent },   
    { path: 'novo', component: CartaoFidelidadeCadastroComponent }, 
    { path: ':id', component: CartaoFidelidadeEditarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(cartoesFidelidadeRoutes)],
    exports: [RouterModule]
})

export class cartoesFidelidadeRoutesModule {}