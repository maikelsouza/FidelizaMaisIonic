
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramaFidelidadeCadastroComponent } from './programa-fidelidade-cadastro/programa-fidelidade-cadastro.component';
import { ProgramaFidelidadeListaEstabelecimentoComponent } from './programa-fidelidade-lista-estabelecimento/programa-fidelidade-lista-estabelecimento.component';
import { ProgramaFidelidadeListaUsuarioComponent } from './programa-fidelidade-lista-usuario/programa-fidelidade-lista-usuario.component';


const programasFidelidadeRoutes: Routes = [
    { path: 'listaUsuario', component: ProgramaFidelidadeListaUsuarioComponent },   
    { path: 'listaEstabelecimento', component: ProgramaFidelidadeListaEstabelecimentoComponent },   
    { path: 'novo', component: ProgramaFidelidadeCadastroComponent }, 
    { path: 'editar/:id', component: ProgramaFidelidadeCadastroComponent }
];

@NgModule({
    imports: [RouterModule.forChild(programasFidelidadeRoutes)],
    exports: [RouterModule]
})

export class programasFidelidadeRoutesModule {}