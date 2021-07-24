import { Component, OnInit } from '@angular/core';

import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { Estabelecimento } from 'src/app/estabelecimentos/shared/models/estabelecimento';
import { EstabelecimentoService } from 'src/app/estabelecimentos/shared/services/estabelecimento.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';

@Component({
  selector: 'app-meus-clientes-lista',
  templateUrl: './meus-clientes-lista.page.html',
  styleUrls: ['./meus-clientes-lista.page.scss'],
})
export class MeusClientesListaPage implements OnInit {


  private usuarioLogado: Usuario;
  private estabelecimentos: Array<Estabelecimento> = new Array<Estabelecimento>();
  clientes: Array<Usuario> = new Array<Usuario>();

  constructor(
    private estabelecimentoService: EstabelecimentoService     
  ) { }

  ngOnInit() {
    console.info("ngOnInit - Meus Clientes Lista");    
    this.usuarioLogado = AutenticadorService.UsuarioLogado;
    this.carregarListaEstabelecimento();
  }


  private async carregarListaEstabelecimento(){
    try {
      let estabelecimentoResultado = await this.estabelecimentoService.buscarPorIdUsuario(this.usuarioLogado[0].id);
      if (estabelecimentoResultado.success) {
        this.estabelecimentos = <Array<Estabelecimento>>estabelecimentoResultado.data;
        const idEstabelecimento: number = Number(this.estabelecimentos[0].id);       
        this.carregarListaClienteAssociadosEstabelecimento(idEstabelecimento);
      }
    }
    catch (error) {
      console.log('Erro ao carregar os estabelecimentos', error);
    }
  }

  async carregarListaClienteAssociadosEstabelecimento(idEstabelecimento: number) {
    try {      
      const usuariosEstabelecimentoResultado = await this.estabelecimentoService.buscarClientesAssociadosPorIdEstabelecimento(idEstabelecimento);
      if (usuariosEstabelecimentoResultado.success && usuariosEstabelecimentoResultado.data != null) {
        this.clientes = <Array<Usuario>>usuariosEstabelecimentoResultado.data.usuarios;        
      }
    }
    catch (error) {
      console.log('Erro ao carregar os clientes', error);
    }
  }

  ngOnDestroy() {
    console.info("ngOnDestroy - Meus Clientes Lista");    
  }

}
