import { Component, OnInit } from '@angular/core';

import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import { Estabelecimento } from '../shared/models/estabelecimento';

@Component({
  selector: 'app-lista-estabelecimento',
  templateUrl: './lista-estabelecimento.page.html',
  styleUrls: ['./lista-estabelecimento.page.scss'],
})
export class ListaEstabelecimentoPage implements OnInit {

  estabelecimentos: Array<Estabelecimento> = new Array<Estabelecimento>(); 

  constructor(private estabelecimentoSrv: EstabelecimentoService) { 
    
  }

  ngOnInit() {
    this.carregarListaEstabelecimento();
  }

  async carregarListaEstabelecimento(): Promise<void> {
    try {       
      let estabelecimentoResultado = await this.estabelecimentoSrv.buscarTodos();
      if (estabelecimentoResultado.success) {
        this.estabelecimentos = <Array<Estabelecimento>>estabelecimentoResultado.data;        
      }
    } catch (error) {
      console.log('Erro ao carregar os estabelecimentos', error);
    }
  }

}
