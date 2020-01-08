import { EstabelecimentoDetalhePage } from './estabelecimento-detalhe/estabelecimento-detalhe.page';
import { ListaEstabelecimentoPage } from './lista-estabelecimento/lista-estabelecimento.page';
import { NgModule } from '@angular/core';
import { FormEstabelecimentoPage } from './form-estabelecimento/form-estabelecimento.page';
import { RouterModule, Routes } from '@angular/router';




const estabelecimentosRoutes: Routes = [
    { path: '', component: ListaEstabelecimentoPage },
    { path: 'estabelecimentos', component: ListaEstabelecimentoPage },
    { path: 'novo', component: FormEstabelecimentoPage },
    { path: ':id', component: EstabelecimentoDetalhePage }
];

@NgModule({
    imports: [RouterModule.forChild(estabelecimentosRoutes)],
    exports: [RouterModule]
})

export class EstabelecimentosRoutesModule {}