import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { Estabelecimento } from 'src/app/estabelecimentos/shared/models/estabelecimento';
import { EstabelecimentoService } from 'src/app/estabelecimentos/shared/services/estabelecimento.service';
import { PontosClienteProgramaFidelidade } from '../shared/models/pontos-cliente-programa-fidelidade';
import { ProgramaFidelidadeService } from 'src/app/programasFidelidade/shared/services/programa-fidelidade.service';
import { ProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/programa-fidelidade';
import { PontosClienteProgramaFidelidadeService } from '../shared/services/pontos-cliente-programa-fidelidade.service';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { TotalPontosClienteProgramaFidelidadeService } from '../shared/services/total-pontos-cliente-programa-fidelidade.service';
import { TotalPontosClienteProgramaFidelidade } from '../shared/models/total-pontos-cliente-programa-fidelidade';

@Component({
  selector: 'app-pontos-cliente-pontuar',
  templateUrl: './pontos-cliente-pontuar.component.html',
  styleUrls: ['./pontos-cliente-pontuar.component.scss'],
})
export class PontosClientePontuarComponent implements OnInit {
  private formulario: FormGroup;
  private usuarioLogado: Usuario;
  estabelecimentos: Array<Estabelecimento> = new Array<Estabelecimento>();
  usuarios: Array<Usuario> = new Array<Usuario>();
  programasFidelidade: Array<ProgramaFidelidade> = new Array<ProgramaFidelidade>();

  constructor(private formBuilder: FormBuilder,
     private estabelecimentoService: EstabelecimentoService, 
     private programaFidelidadeService: ProgramaFidelidadeService,
     private pontosClienteProgramaFidelidadeService: PontosClienteProgramaFidelidadeService,
     private totalPontosClienteProgramaFidelidadeService: TotalPontosClienteProgramaFidelidadeService,
     private alertSrv: AlertaService,     
     private navController: NavController
     ) { }

  ngOnInit() {    
    this.usuarioLogado = AutenticadorService.UsuarioLogado;
    this.montarCamposTela();
    this.carregarListaEstabelecimento();
  }
  
  private montarCamposTela() {
    this.formulario = this.formBuilder.group({      
      clienteId: [null,Validators.required], 
      valorGasto: ["00,0", Validators.required]      
    });
  }

  public get valorGasto() {return this.formulario.get('valorGasto')}
  public get clienteId() {return this.formulario.get('clienteId')} 
 

  async pesquisarUsuario(event: any): Promise<void> {
    try {            
      this.usuarios = new Array<Usuario>();
      const email = event.target.value.trim();
      if (!email) {
        return;
      }
      let estabelecimentoId: number = Number(this.estabelecimentos[0].id);
      let usuariosEstabelecimentoResultado = await this.estabelecimentoService.buscarPorIdEstabelecimentoEEmail(estabelecimentoId, email);      
      if (usuariosEstabelecimentoResultado.success && usuariosEstabelecimentoResultado.data != null) {
        this.usuarios = <Array<Usuario>>usuariosEstabelecimentoResultado.data.usuarios;
      }else{
        this.alertSrv.alert("Cliente não encontrado ",`O cliente ${email} não foi encontrado!`);
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
  async carregarListaProgramaFidelidade(estabelecimentos: Array<Estabelecimento>): Promise<void> {
    try {
      let estabelecimentoId: number = Number(estabelecimentos[0].id);
      let programaFidelidadeResultado = await this.programaFidelidadeService.buscarPorIdEstabelecimentoEAtivo(estabelecimentoId);
      if (programaFidelidadeResultado.success) {
        this.programasFidelidade = <Array<ProgramaFidelidade>>programaFidelidadeResultado.data;
      }
    }
    catch (error) {
      console.log('Erro ao carregar os programas fidelidade', error);
    }
  }
  async onSubmit(): Promise<void> {
    try { // Colocar essas regras no service
      const valorGasto = this.formulario.get("valorGasto").value;
      const programaFilidade : ProgramaFidelidade = this.programasFidelidade[0];
      //const regra = this.programasFidelidade[0].regra;
      const regra = programaFilidade.regra;
      if (!this.verificarValorGastoMaiorIgualRegra(valorGasto,regra)){
        this.alertSrv.alert('Valor Mínimo Não Alcançado!',`O valor gasto dever ser maior ou igual a R$ ${regra},00`); 
      }else{        
        const clienteId = this.formulario.get("clienteId").value;
        // Pego o primeiro valor, pois atualmente o estabelecimento pode cadastrar somente um programa de fidelidade.
        const programaFidelidadeId = this.programasFidelidade[0].id;
        const quantidadePontos = this.calcularPontos(valorGasto,regra);
        let totalPontosClienteProgramaFidelidade: TotalPontosClienteProgramaFidelidade = new TotalPontosClienteProgramaFidelidade();
        totalPontosClienteProgramaFidelidade.programaFidelidadeId = programaFidelidadeId;
        totalPontosClienteProgramaFidelidade.usuarioId = clienteId;
        let PontosClientesProgramaFidelidades: PontosClienteProgramaFidelidade = new PontosClienteProgramaFidelidade();
        PontosClientesProgramaFidelidades.pontos = quantidadePontos;
        let totalPontosClieteProgramaFidelidadeResultado = await this.totalPontosClienteProgramaFidelidadeService.getUsuarioIdProgramaFidelidadeIdAtivo(clienteId,programaFidelidadeId);
        if (totalPontosClieteProgramaFidelidadeResultado.data == null) { // Caso não exista um regristo de pontos então cria o primeiro
          totalPontosClienteProgramaFidelidade.totalPontos = quantidadePontos;
          let listaPontosClienteProgramaFidelidade = new Array<PontosClienteProgramaFidelidade>();
          listaPontosClienteProgramaFidelidade.push(PontosClientesProgramaFidelidades);
          totalPontosClienteProgramaFidelidade.PontosClienteProgramaFidelidades = listaPontosClienteProgramaFidelidade;
          totalPontosClieteProgramaFidelidadeResultado = await 
          this.totalPontosClienteProgramaFidelidadeService.salvarEEnviarEmailPontuarCliente(totalPontosClienteProgramaFidelidade,
            this.pegarUsuario(clienteId),this.estabelecimentos[0],programaFilidade,quantidadePontos);
        }
        else { // Caso exista um regristo de pontos então atualiza a pontuação total
          let totalPontosClienteProgramaFidelidadeId = totalPontosClieteProgramaFidelidadeResultado.data.id;
          PontosClientesProgramaFidelidades.totalPontosClienteProgramaFidelidadeId = totalPontosClienteProgramaFidelidadeId;
          await this.pontosClienteProgramaFidelidadeService.salvar(PontosClientesProgramaFidelidades);
          let somatorioPontosProgramaFidelidadeResultado = await this.pontosClienteProgramaFidelidadeService.buscarSomatorioPontosProgramaFidelidade(totalPontosClienteProgramaFidelidadeId);
          totalPontosClienteProgramaFidelidade.totalPontos = somatorioPontosProgramaFidelidadeResultado.data.pontos;
          totalPontosClieteProgramaFidelidadeResultado = await 
            this.totalPontosClienteProgramaFidelidadeService.atualizarEEnviarEmailPontuarCliente(totalPontosClienteProgramaFidelidadeId,
               totalPontosClienteProgramaFidelidade,this.pegarUsuario(clienteId),this.estabelecimentos[0],
               programaFilidade,quantidadePontos);
        }
        if (totalPontosClieteProgramaFidelidadeResultado.success) {
          this.navController.navigateRoot('/principal');
          this.alertSrv.toast('Pontuação realizada com sucesso!');
        }
      }
    }
    catch (error) {
      console.log('Erro ao pontuar um cliente', error);
    }
  }
  private calcularPontos(valorGasto: any, regra: number): number {    
    const posicaoVirgura = valorGasto.indexOf(",");
    const valorGastoSemDecimais = valorGasto.substr(0, posicaoVirgura);
    const valorGastoSemDecimaisEPontos = valorGastoSemDecimais.replace(/\D+/g, '');
    return Math.trunc(valorGastoSemDecimaisEPontos / regra);
  }

  private verificarValorGastoMaiorIgualRegra(valorGasto: any, regra: number) : boolean{    
    const posicaoVirgura = valorGasto.indexOf(",");
    const valorGastoSemDecimais = valorGasto.substr(0, posicaoVirgura);
    const valorGastoSemDecimaisEPontos = valorGastoSemDecimais.replace(/\D+/g, '');
    return valorGastoSemDecimaisEPontos >= regra;
  }

  private pegarUsuario(id : number): Usuario{
    let usuario : Usuario;
    this.usuarios.forEach(element => {
      if (element.id == id){
        usuario = element
      }
    });
    return usuario;
  }
}
