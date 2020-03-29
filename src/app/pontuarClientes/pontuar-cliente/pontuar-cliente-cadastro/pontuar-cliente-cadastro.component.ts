import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/usuarios/shared/services/usuario.service';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { Estabelecimento } from 'src/app/estabelecimentos/shared/models/estabelecimento';
import { EstabelecimentoService } from 'src/app/estabelecimentos/shared/services/estabelecimento.service';
import { PontosClienteProgramaFidelidade } from '../../shared/models/pontos-cliente-programa-fidelidade';
import { ProgramaFidelidadeService } from 'src/app/programasFidelidade/shared/services/programa-fidelidade.service';
import { ProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/programa-fidelidade';
import { PontosClienteProgramaFidelidadeService } from '../../shared/services/pontos-cliente-programa-fidelidade.service';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { TotalPontosClienteProgramaFidelidadeService } from '../../shared/services/total-pontos-cliente-programa-fidelidade.service';
import { TotalPontosClienteProgramaFidelidade } from '../../shared/models/total-pontos-cliente-programa-fidelidade';

@Component({
  selector: 'app-pontuar-cliente-cadastro',
  templateUrl: './pontuar-cliente-cadastro.component.html',
  styleUrls: ['./pontuar-cliente-cadastro.component.scss'],
})
export class PontuarClienteCadastroComponent implements OnInit {

  private formulario : FormGroup;  
  private usuarioLogado: Usuario;
  estabelecimentos: Array<Estabelecimento> = new Array<Estabelecimento>(); 
  usuarios: Array<Usuario> = new Array<Usuario>();
  programasFidelidade: Array<ProgramaFidelidade> = new Array<ProgramaFidelidade>();

  constructor(
    private formBuilder: FormBuilder,    
    private estabelecimentoService : EstabelecimentoService,
    private programaFidelidadeService: ProgramaFidelidadeService,
    private pontosClienteProgramaFidelidadeService: PontosClienteProgramaFidelidadeService,
    private totalPontosClienteProgramaFidelidadeService : TotalPontosClienteProgramaFidelidadeService,
    private alertSrv: AlertaService,
    
  ) { }

  ngOnInit() {
    this.usuarioLogado = AutenticadorService.UsuarioLogado;      
    this.montarCamposTela();    
    this.carregarListaEstabelecimento();      
  }

  private montarCamposTela() {  
    this.formulario = this.formBuilder.group({
      email: [null], clienteId: [null], quantidadePontos: [null], programaFidelidadeId: [null]
    });    
  } 

  async pesquisarUsuario(): Promise<void> {
    try {
      let estabelecimentoId: number = Number(this.estabelecimentos[0].id);      
      let usuariosEstabelecimentoResultado = await this.estabelecimentoService.buscarPorIdEstabelecimentoEEmail(estabelecimentoId, this.formulario.get("email").value);
      if (usuariosEstabelecimentoResultado.success) {        
        this.usuarios = <Array<Usuario>>usuariosEstabelecimentoResultado.data.usuarios;                
      }
    } catch (error) {
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
    } catch (error) {
      console.log('Erro ao carregar os estabelecimentos', error);
    }
  }

  async carregarListaProgramaFidelidade(estabelecimentos : Array<Estabelecimento>): Promise<void> {
    try {      
      let estabelecimentoId: number = Number(estabelecimentos[0].id);         
      let programaFidelidadeResultado = await this.programaFidelidadeService.buscarPorIdEstabelecimento(estabelecimentoId);        
      if (programaFidelidadeResultado.success) {
        this.programasFidelidade = <Array<ProgramaFidelidade>>programaFidelidadeResultado.data;
      }
    } catch (error) {
      console.log('Erro ao carregar os programas fidelidade', error);
    }
  }


  async onSubmit(): Promise<void>{
    try {             
      let clienteId =  this.formulario.get("clienteId").value;
      let quantidadePontos = this.formulario.get("quantidadePontos").value;      
      let totalPontosClienteProgramaFidelidade : TotalPontosClienteProgramaFidelidade = new TotalPontosClienteProgramaFidelidade();
      totalPontosClienteProgramaFidelidade.programaFidelidadeId = this.formulario.get("programaFidelidadeId").value;
      totalPontosClienteProgramaFidelidade.usuarioId = clienteId;
      let PontosClientesProgramaFidelidades : PontosClienteProgramaFidelidade = new PontosClienteProgramaFidelidade();
      PontosClientesProgramaFidelidades.dataPontuacao = new Date();
      PontosClientesProgramaFidelidades.pontos = quantidadePontos;

      let totalPontosClieteProgramaFidelidadeResultado = await this.totalPontosClienteProgramaFidelidadeService.getUsuarioIdAtivo(clienteId);
      if (totalPontosClieteProgramaFidelidadeResultado.data == null){ // Caso não exista um regristo de pontos então cria o primeiro
        totalPontosClienteProgramaFidelidade.totalPontos = quantidadePontos
        let listaPontosClienteProgramaFidelidade = new Array<PontosClienteProgramaFidelidade>();
        listaPontosClienteProgramaFidelidade.push(PontosClientesProgramaFidelidades);
        totalPontosClienteProgramaFidelidade.PontosClienteProgramaFidelidades = listaPontosClienteProgramaFidelidade;
        totalPontosClieteProgramaFidelidadeResultado = await this.totalPontosClienteProgramaFidelidadeService.salvar(totalPontosClienteProgramaFidelidade);
      }else{ // Caso exista um regristo de pontos então atualiza a pontuação total
        let totalPontosClienteProgramaFidelidadeId = totalPontosClieteProgramaFidelidadeResultado.data.id;
        PontosClientesProgramaFidelidades.totalPontosClienteProgramaFidelidadeId = totalPontosClienteProgramaFidelidadeId
        await this.pontosClienteProgramaFidelidadeService.salvar(PontosClientesProgramaFidelidades);
        let somatorioPontosProgramaFidelidadeResultado = await this.pontosClienteProgramaFidelidadeService.buscarSomatorioPontosProgramaFidelidade(totalPontosClienteProgramaFidelidadeId);        
        totalPontosClienteProgramaFidelidade.totalPontos = somatorioPontosProgramaFidelidadeResultado.data.pontos;        
        totalPontosClieteProgramaFidelidadeResultado = await this.totalPontosClienteProgramaFidelidadeService.atualizar(totalPontosClienteProgramaFidelidadeId,totalPontosClienteProgramaFidelidade);
      }
      if (totalPontosClieteProgramaFidelidadeResultado.success) {
          this.alertSrv.toast('Pontuação realizada com sucesso!');
      }
    } catch (error) {
        console.log('Erro ao pontuar um cliente', error);    
    }
  }   


  
   
   


}