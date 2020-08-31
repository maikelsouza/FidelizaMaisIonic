import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EstabelecimentoVO } from '../shared/vos/estabelecimento-vo';
import { ClienteEstabelecimento } from '../shared/models/cliente-estabelecimento';
import { ClienteEstabelecimentoService } from '../shared/services/cliente-estabelecimento.service';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { EstabelecimentoService } from '../shared/services/estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-visualizar',
  templateUrl: './estabelecimento-visualizar.component.html',
  styleUrls: ['./estabelecimento-visualizar.component.scss'],
})
export class EstabelecimentoVisualizarComponent implements OnInit {

    
  estabelecimentoVO : EstabelecimentoVO;
  usuarioLogado: Usuario;
  
  
  constructor(    
    private router: Router,
    private clienteEstabelecimentoService: ClienteEstabelecimentoService,  
    private alertSrv: AlertaService,
    private estabelecimentoService: EstabelecimentoService,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.estabelecimentoVO = nav.extras.state.estabelecimentoVO; 
   }

  ngOnInit() {
    this.usuarioLogado = AutenticadorService.UsuarioLogado;      
  } 

  async associarClienteEstabelecimento(estabelecimentoId: number){
    try { 
      let clienteEstabelecimento : ClienteEstabelecimento = new ClienteEstabelecimento(); 
      clienteEstabelecimento.dataCriacao = new Date();
      clienteEstabelecimento.estabelecimentoId = estabelecimentoId;
      clienteEstabelecimento.usuarioId = this.usuarioLogado[0].id;
      let resultado = await this.clienteEstabelecimentoService.salvar(clienteEstabelecimento);
      if (resultado.success){
        this.alertSrv.toast('Cliente associado com sucesso!');        
        await this.estabelecimentoService.notificarListaEstabelecimento();
        this.router.navigate(['/estabelecimento/lista'],{ queryParams: { tipoUsuario: this.usuarioLogado[0].GrupoUsuario.nome } });             
      }
    } catch (error) {
        console.log('Erro ao associar um cliente a um estabelecimento', error);    
    }
  }

  async desassociarClienteEstabelecimento(estabelecimentoId: number) {
    try {
      let clienteEstabelecimento : ClienteEstabelecimento = new ClienteEstabelecimento(); 
      clienteEstabelecimento.dataCriacao = new Date();
      clienteEstabelecimento.estabelecimentoId = estabelecimentoId;
      clienteEstabelecimento.usuarioId = this.usuarioLogado[0].id;      
      let resultado = await this.clienteEstabelecimentoService.deletePorUsuarioEEstabelecimento(this.usuarioLogado[0].id, estabelecimentoId);
      if (resultado.success) {
        this.alertSrv.toast('Cliente desassociar com sucesso!');
        await this.estabelecimentoService.notificarListaEstabelecimento();
        this.router.navigate(['/estabelecimento/lista'],{ queryParams: { tipoUsuario: this.usuarioLogado[0].GrupoUsuario.nome } });                                                    
      }
    } catch (error) {
      console.log('Erro ao desassociar um cliente a um estabelecimento', error);
    }
  }

}
