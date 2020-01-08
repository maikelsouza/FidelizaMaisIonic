import { Component, OnInit } from '@angular/core';

import { CartaoFidelidadeService } from './../shared/services/cartao-fidelidade.service';
import { CartaoFidelidade } from './../shared/models/cartao-fidelidade';

@Component({
  selector: 'app-cartao-fidelidade-lista-estabelecimento',
  templateUrl: './cartao-fidelidade-lista-estabelecimento.component.html',
  styleUrls: ['./cartao-fidelidade-lista-estabelecimento.component.scss'],
})
export class CartaoFidelidadeListaEstabelecimentoComponent implements OnInit {

  private cartoesFidelidade: Array<CartaoFidelidade> = new Array<CartaoFidelidade>(); 

  constructor(private cartaoFidelidadeService : CartaoFidelidadeService) { }

  ngOnInit() {
    this.carregarListaPorEstabelecimento();
  }

  async carregarListaPorEstabelecimento(): Promise<void> {
    try {       
      let resultado = await this.cartaoFidelidadeService.buscarPorIdEstabelecimento(31);
      if (resultado.success) {
        this.cartoesFidelidade = <Array<CartaoFidelidade>>resultado.data;        
      }
    } catch (error) {
      console.log('Erro ao carregar os cartões fidelidade', error);
    }
  }

}
