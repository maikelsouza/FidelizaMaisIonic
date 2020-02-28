import { Component, OnInit, OnDestroy } from '@angular/core';

import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import { Estabelecimento } from '../shared/models/estabelecimento';
import { ActivatedRoute } from '@angular/router';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/shared/services/login.service';
import { ClienteEstabelecimentoService } from '../shared/services/cliente-estabelecimento.service';

@Component({
  selector: 'app-lista-estabelecimento',
  templateUrl: './lista-estabelecimento.page.html',
  styleUrls: ['./lista-estabelecimento.page.scss'],
})
export class ListaEstabelecimentoPage implements OnInit, OnDestroy {

  estabelecimentos: Array<Estabelecimento> = new Array<Estabelecimento>(); 
  tipoUsuario : string;
  inscricao: Subscription;
  usuarioLogado: Usuario;
  
  constructor(
      private estabelecimentoSrv: EstabelecimentoService,
      private clienteEstabelecimentoService: ClienteEstabelecimentoService,
      private route: ActivatedRoute
      ) 
      { }

  ngOnInit() {
    
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.tipoUsuario = queryParams['tipoUsuario'];
      }
    );   
   
    this.carregarListaEstabelecimento();
  }

  ngOnDestroy(){    
    this.inscricao.unsubscribe();
  }

  async carregarListaEstabelecimento(): Promise<void> {
    try {      
      let estabelecimentoResultado = undefined; 
      let usuarioLogado : Usuario =  AutenticadorService.UsuarioLogado;      
      if (this.tipoUsuario == "ESTABELECIMENTOS"){
        estabelecimentoResultado = await this.estabelecimentoSrv.buscarPorIdUsuario(usuarioLogado[0].id);           
      }else if (this.tipoUsuario == "CLIENTES"){
          estabelecimentoResultado = await this.estabelecimentoSrv.buscarComProgramaFidelidadeOuCartaoFidelidade();
      }else{
        estabelecimentoResultado = await this.estabelecimentoSrv.buscarTodos();
      } 
      if (estabelecimentoResultado.success) {
        this.estabelecimentos = <Array<Estabelecimento>>estabelecimentoResultado.data;        
      }
    } catch (error) {
      console.log('Erro ao carregar os estabelecimentos', error);
    }
  }

}
