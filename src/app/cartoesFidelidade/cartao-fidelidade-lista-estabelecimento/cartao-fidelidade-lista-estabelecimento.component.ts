import { Component, OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

import { CartaoFidelidadeService } from './../shared/services/cartao-fidelidade.service';
import { CartaoFidelidade } from './../shared/models/cartao-fidelidade';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cartao-fidelidade-lista-estabelecimento',
  templateUrl: './cartao-fidelidade-lista-estabelecimento.component.html',
  styleUrls: ['./cartao-fidelidade-lista-estabelecimento.component.scss'],
})
export class CartaoFidelidadeListaEstabelecimentoComponent implements  OnInit, OnDestroy {
  
  
  cartoesFidelidade: Array<CartaoFidelidade> = new Array<CartaoFidelidade>(); 
  id : number;
  private inscricao : Subscription;

  constructor(
    private cartaoFidelidadeService : CartaoFidelidadeService,
    private route: ActivatedRoute) { 
    }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
      }
    );

    this.cartaoFidelidadeService.emitirCartaoFidelidadeCriado.subscribe(
      () => {
        this.carregarListaPorEstabelecimento();
      }
    );
    this.carregarListaPorEstabelecimento();
  }

  ngOnDestroy() {      
    this.inscricao.unsubscribe;
  }

  async carregarListaPorEstabelecimento(): Promise<void> {
    try {       
      let resultado = await this.cartaoFidelidadeService.buscarPorIdEstabelecimento(this.id);
      if (resultado.success) {
        this.cartoesFidelidade = <Array<CartaoFidelidade>>resultado.data;        
      }
    } catch (error) {
      console.log('Erro ao carregar os cartões fidelidade', error);
    }
  }

}
