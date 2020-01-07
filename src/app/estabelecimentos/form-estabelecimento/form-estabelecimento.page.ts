import { TipoEstabelecimentoService } from './../../tipoEstabelecimento/shared/tipo-estabelecimento.service';
import { Estabelecimento } from './../shared/estabelecimento';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { EstabelecimentoService } from './../shared/estabelecimento.service';
import { TipoEstabelecimento } from 'src/app/tipoEstabelecimento/shared/tipo-estabelecimento';



@Component({
  selector: 'app-form-estabelecimento',
  templateUrl: './form-estabelecimento.page.html',
  styleUrls: ['./form-estabelecimento.page.scss'],
  providers:  [ EstabelecimentoService]
})



export class FormEstabelecimentoPage implements OnInit {

  estabelecimento: Estabelecimento = new Estabelecimento();
  tipoEstabelecimentos: Array<TipoEstabelecimento> = new Array<TipoEstabelecimento>();

  constructor(public navCtrl: NavController,
    private estabelecimentoSrv: EstabelecimentoService,
    private tipoEstabelecimentoSrv: TipoEstabelecimentoService
              
              
   ) {
    this.loadData();
  }

  async cadastrar(): Promise<void>{
    let resultado = await this.estabelecimentoSrv.salvar(this.estabelecimento);
    if (resultado.success){
      console.log("Sucesso");
      console.log(resultado.data);
    }else{
      console.log("ERRO");
    }
  }

  async loadData(): Promise<void> {
    try {
       console.log('Erro ao carregar os tipos de estabelecimentos');
      let tipoEstabelecimentoResulta = await this.tipoEstabelecimentoSrv.buscarTodosAtivos();
      if (tipoEstabelecimentoResulta.success) {
        this.tipoEstabelecimentos = <Array<TipoEstabelecimento>>tipoEstabelecimentoResulta.data;
      }
    } catch (error) {
      console.log('Erro ao carregar os tipos de estabelecimentos', error);
    }
  }

  ngOnInit() {
  }


}
