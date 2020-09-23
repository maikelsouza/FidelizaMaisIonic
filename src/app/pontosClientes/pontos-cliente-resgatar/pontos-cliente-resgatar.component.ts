import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { ProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/programa-fidelidade';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { EstabelecimentoService } from 'src/app/estabelecimentos/shared/services/estabelecimento.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { Estabelecimento } from 'src/app/estabelecimentos/shared/models/estabelecimento';
import { ProgramaFidelidadeService } from 'src/app/programasFidelidade/shared/services/programa-fidelidade.service';
import { CampoItemProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/campo-item-programa-fidelidade';
import { TotalPontosClienteProgramaFidelidadeService } from '../shared/services/total-pontos-cliente-programa-fidelidade.service';
import { PontosClienteProgramaFidelidade } from '../shared/models/pontos-cliente-programa-fidelidade';
import { TotalPontosClienteProgramaFidelidade } from '../shared/models/total-pontos-cliente-programa-fidelidade';


@Component({
  selector: 'app-pontos-cliente-resgatar',
  templateUrl: './pontos-cliente-resgatar.component.html',
  styleUrls: ['./pontos-cliente-resgatar.component.scss'],
})
export class PontosClienteResgatarComponent implements OnInit {

  formulario: FormGroup;
  private usuarioLogado: Usuario;
  programasFidelidade: Array<ProgramaFidelidade> = new Array<ProgramaFidelidade>();
  estabelecimentos: Array<Estabelecimento> = new Array<Estabelecimento>();
  campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade> = new Array<CampoItemProgramaFidelidade>();
  usuarios: Array<Usuario> = new Array<Usuario>();
  todosUsuarios: Array<Usuario> = new Array<Usuario>();
  

  constructor(
    private formBuilder: FormBuilder,
    private estabelecimentoService: EstabelecimentoService, 
    private programaFidelidadeService: ProgramaFidelidadeService,
    private totalPontosClienteProgramaFidelidadeService: TotalPontosClienteProgramaFidelidadeService,
    private alertSrv: AlertaService,
    private navController: NavController) { }

  ngOnInit() {
    console.info("ngOnInit - Pontos cliente Resgatar");    
    this.usuarioLogado = AutenticadorService.UsuarioLogado;
    this.montarCamposTela();
    this.carregarListaEstabelecimento();
  }

  ngOnDestroy(){         
    console.info("ngOnDestroy - Pontos cliente Resgatar");
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({    
      clienteId: [null, Validators.required],      
      campoItemProgramaFidelidadeId: [null, Validators.required]
    });
  }
  
  public get clienteId() {return this.formulario.get('clienteId')}  
  public get campoItemProgramaFidelidadeId() {return this.formulario.get('campoItemProgramaFidelidadeId')}
 

  pesquisarUsuario(event: any) {   
      
    const nome :string = event.target.value;
    this.usuarios = this.todosUsuarios;
    if (nome && nome.trim() != ''){        
      this.usuarios = this.usuarios.filter(usuario => {
        return (usuario.nome.toLowerCase().indexOf(nome.toLowerCase()) > -1);
      })
    }      
  }

  async carregarListaEstabelecimento(): Promise<void> {
    try {
      let estabelecimentoResultado = await this.estabelecimentoService.buscarPorIdUsuario(this.usuarioLogado[0].id);
      if (estabelecimentoResultado.success && estabelecimentoResultado.data != null) {
        this.estabelecimentos = <Array<Estabelecimento>>estabelecimentoResultado.data;
        const IdEstabelecimento: number = Number(this.estabelecimentos[0].id);
        await this.carregarListaProgramaFidelidade(this.estabelecimentos);
        await this.carregarCamposItensProgramaFidelidade();
        await this.carregarListaClienteAssociadosEstabelecimento(IdEstabelecimento);
      }
    }
    catch (error) {
      console.log('Erro ao carregar os estabelecimentos', error);
    }
  }
  
  async carregarCamposItensProgramaFidelidade(): Promise<void> {    
    const programaFidelidadeId : number = Number(this.programasFidelidade[0].id);
    this.programasFidelidade.forEach(element => {
      if (element.id == programaFidelidadeId){
        this.campoItemProgramaFidelidades = element.CampoItemProgramaFidelidades;
      }
    });
    
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

  async carregarListaClienteAssociadosEstabelecimento(IdEstabelecimento: number) {
    try {      
      let usuariosEstabelecimentoResultado = await this.estabelecimentoService.buscarClientesAssociadosPorIdEstabelecimento(IdEstabelecimento);
      if (usuariosEstabelecimentoResultado.success && usuariosEstabelecimentoResultado.data != null) {
        this.usuarios = <Array<Usuario>>usuariosEstabelecimentoResultado.data.usuarios;
        this.todosUsuarios = this.usuarios;
      }else{
        this.alertSrv.alert("Cliente não encontrado ",`Não exite cliente associados para pontuar!`);
      }
    }
    catch (error) {
      console.log('Erro ao carregar os estabelecimentos', error);
    }
  }

  async onSubmit(): Promise<void> {
    // Código precisa de um refactory!!! Regra de negócio deve ir para o service
    try { 
      const clienteId = this.formulario.get("clienteId").value;
      const programaFidelidadeId : number = Number(this.programasFidelidade[0].id);
      const campoItemProgramaFidelidadeId : number = Number(this.formulario.get("campoItemProgramaFidelidadeId").value);      
      let totalPontosClieteProgramaFidelidadeResultado = await this.totalPontosClienteProgramaFidelidadeService.getUsuarioIdProgramaFidelidadeIdAtivo(clienteId,programaFidelidadeId);
      if (totalPontosClieteProgramaFidelidadeResultado.data != null){
        const totalPontos = totalPontosClieteProgramaFidelidadeResultado.data.totalPontos;
        let quantidadePontos = null;
        let pontosSuficiente: boolean = true ;
        this.campoItemProgramaFidelidades.forEach(element => {
          if (element.id == campoItemProgramaFidelidadeId){
            quantidadePontos = element.quantidadePontos; 
            if (element.quantidadePontos > totalPontos){
              pontosSuficiente = false;              
              this.alertSrv.alert('Pontuação Insuficiente',
              `O Cliente não possue pontos para esse item. Total pontos do cliente: ${totalPontos}`);
            } 
          }
        });
        if (pontosSuficiente){
          const diferencaPontos = totalPontos - quantidadePontos;
          totalPontosClieteProgramaFidelidadeResultado.data.totalPontos = diferencaPontos;
          totalPontosClieteProgramaFidelidadeResultado.data.dataResgate = new Date();
          totalPontosClieteProgramaFidelidadeResultado.data.ativo = false;
          // Caso seja maior que zero, significa que o cliente ainda tem pontos sobrando, logo ele cria um novo total de pontos
          // e um novo pontos cliente, sendo que ambos terão o restanto dos pontos.
          if (diferencaPontos > 0){ 
            let totalPontosClienteProgramaFidelidade: TotalPontosClienteProgramaFidelidade = new TotalPontosClienteProgramaFidelidade();
            let PontosClientesProgramaFidelidades: PontosClienteProgramaFidelidade = new PontosClienteProgramaFidelidade();
            let listaPontosClienteProgramaFidelidade = new Array<PontosClienteProgramaFidelidade>();
            totalPontosClieteProgramaFidelidadeResultado.data.totalPontos = 0;
            PontosClientesProgramaFidelidades.pontos = diferencaPontos;          
            listaPontosClienteProgramaFidelidade.push(PontosClientesProgramaFidelidades);
            totalPontosClienteProgramaFidelidade.PontosClienteProgramaFidelidades = listaPontosClienteProgramaFidelidade;  
            totalPontosClienteProgramaFidelidade.usuarioId = clienteId;
            totalPontosClienteProgramaFidelidade.programaFidelidadeId = programaFidelidadeId;
            totalPontosClienteProgramaFidelidade.totalPontos = diferencaPontos;
            await this.totalPontosClienteProgramaFidelidadeService.salvar(totalPontosClienteProgramaFidelidade);
          }        
          
          totalPontosClieteProgramaFidelidadeResultado = await this.totalPontosClienteProgramaFidelidadeService.
              atualizarEEnviarEmailResgatarPontos(totalPontosClieteProgramaFidelidadeResultado.data.id, 
                totalPontosClieteProgramaFidelidadeResultado.data,this.pegarUsuario(clienteId),
                this.estabelecimentos[0],this.programasFidelidade[0],quantidadePontos,diferencaPontos);
          if (totalPontosClieteProgramaFidelidadeResultado.success) {     
            this.navController.navigateRoot('/principal');               
            this.alertSrv.toast('Resgate realizado com sucesso!');
          }
        }
      }else{
        this.alertSrv.alert('Pontuação Insuficiente',
        `O Cliente não possue pontos para esse item. Total pontos do cliente: 0`);
      }

    }
    catch (error) {
      console.log('Erro ao pontuar um cliente', error);
    }

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
