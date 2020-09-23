import { CartaoFidelidade } from './../shared/models/cartao-fidelidade';
import { CartaoFidelidadeService } from './../shared/services/cartao-fidelidade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartao-fidelidade-lista-usuario',
  templateUrl: './cartao-fidelidade-lista-usuario.component.html',
  styleUrls: ['./cartao-fidelidade-lista-usuario.component.scss'],
})
export class CartaoFidelidadeListaUsuarioComponent implements OnInit {

  cartoesFidelidade: Array<CartaoFidelidade> = new Array<CartaoFidelidade>(); 

  constructor(private cartaoFidelidadeService : CartaoFidelidadeService) { }

  ngOnInit() {
    this.carregarListaUsuarios();
  }


  async carregarListaUsuarios(): Promise<void> {
    try {       
      let resultado = await this.cartaoFidelidadeService.buscarPorIdUsuario(1);
      if (resultado.success) {
        this.cartoesFidelidade = <Array<CartaoFidelidade>>resultado.data;        
      }
    } catch (error) {
      console.log('Erro ao carregar os cartões fidelidade', error);
    }
  }
}
