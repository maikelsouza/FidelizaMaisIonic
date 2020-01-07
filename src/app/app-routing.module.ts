import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'form-estabelecimento', pathMatch: 'full'},
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},  
  { path: 'list', loadChildren: './list/list.module#ListPageModule'},
  // tslint:disable-next-line:max-line-length
  { path: 'form-estabelecimento', loadChildren: './estabelecimentos/form-estabelecimento/form-estabelecimento.module#FormEstabelecimentoPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
