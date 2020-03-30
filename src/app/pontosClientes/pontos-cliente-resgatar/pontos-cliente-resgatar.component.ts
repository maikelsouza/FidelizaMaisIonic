import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/programa-fidelidade';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { EstabelecimentoService } from 'src/app/estabelecimentos/shared/services/estabelecimento.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { Estabelecimento } from 'src/app/estabelecimentos/shared/models/estabelecimento';
import { ProgramaFidelidadeService } from 'src/app/programasFidelidade/shared/services/programa-fidelidade.service';
import { CampoItemProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/campo-item-programa-fidelidade';

@Component({
  selector: 'app-pontos-cliente-resgatar',
  templateUrl: './pontos-cliente-resgatar.component.html',
  styleUrls: ['./pontos-cliente-resgatar.component.scss'],
})
export class PontosClienteResgatarComponent implements OnInit {

  private formulario: FormGroup;
  private usuarioLogado: Usuario;
  programasFidelidade: Array<ProgramaFidelidade> = new Array<ProgramaFidelidade>();
  estabelecimentos: Array<Estabelecimento> = new Array<Estabelecimento>();
  campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade> = new Array<CampoItemProgramaFidelidade>();
  usuarios: Array<Usuario> = new Array<Usuario>();

  constructor(private formBuilder: FormBuilder,
    private estabelecimentoService: EstabelecimentoService, 
    private programaFidelidadeService: ProgramaFidelidadeService,
    private alertSrv: AlertaService) { }

  ngOnInit() {
    this.usuarioLogado = AutenticadorService.UsuarioLogado;
    this.montarCamposTela();
    this.carregarListaEstabelecimento();
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      email: [null], clienteId: [null], programaFidelidadeId: [null], 
      campoItemProgramaFidelidadeId: [null]
    });
  }

  async pesquisarUsuario(): Promise<void> {
    try {
      let estabelecimentoId: number = Number(this.estabelecimentos[0].id);
      let usuariosEstabelecimentoResultado = await this.estabelecimentoService.buscarPorIdEstabelecimentoEEmail(estabelecimentoId, this.formulario.get("email").value);
      if (usuariosEstabelecimentoResultado.success) {
        this.usuarios = <Array<Usuario>>usuariosEstabelecimentoResultado.data.usuarios;
      }
    }
    catch (error) {
      console.log('Erro ao carregar os tipos de estabelecimentos', error);
    }
  }

  async carregarListaEstabelecimento(): Promise<void> {
    try {
      let estabelecimentoResultado = await this.estabelecimentoService.buscarPorIdUsuario(this.usuarioLogado[0].id);
      if (estabelecimentoResultado.success) {
        this.estabelecimentos = <Array<Estabelecimento>>estabelecimentoResultado.data;
        this.carregarListaProgramaFidelidade(this.estabelecimentos);
      }
    }
    catch (error) {
      console.log('Erro ao carregar os estabelecimentos', error);
    }
  }
  
  async carregarCamposItensProgramaFidelidade(event): Promise<void> {
    const programaFidelidadeId =  this.formulario.get("programaFidelidadeId").value;
    this.programasFidelidade.forEach(element => {
      if (element.id == programaFidelidadeId){
        this.campoItemProgramaFidelidades = element.CampoItemProgramaFidelidades;
      }
    });
    
  }

  async carregarListaProgramaFidelidade(estabelecimentos: Array<Estabelecimento>): Promise<void> {
    try {
      let estabelecimentoId: number = Number(estabelecimentos[0].id);
      let programaFidelidadeResultado = await this.programaFidelidadeService.buscarPorIdEstabelecimento(estabelecimentoId);
      if (programaFidelidadeResultado.success) {
        this.programasFidelidade = <Array<ProgramaFidelidade>>programaFidelidadeResultado.data;
      }
    }
    catch (error) {
      console.log('Erro ao carregar os programas fidelidade', error);
    }
  }

  

}
