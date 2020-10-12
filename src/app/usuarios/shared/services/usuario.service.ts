import { Injectable,EventEmitter } from '@angular/core';

import { ConfigHelper } from './../../../common/helpers/configHelper';
import { Usuario } from './../models/usuario';
import { ServiceBase } from 'src/app/base/serviceBase';
import { HttpResultModel } from './../../../common/model/HttpResultModel';
import { HttpService } from './../../../common/service/http.service';
import { EmailModel } from 'src/app/common/model/EmailModel';
import { ClienteEstabelecimento } from 'src/app/estabelecimentos/shared/models/cliente-estabelecimento';
import { EstabelecimentoService } from 'src/app/estabelecimentos/shared/services/estabelecimento.service';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { ClienteEstabelecimentoService } from 'src/app/estabelecimentos/shared/services/cliente-estabelecimento.service';
import { EmailService } from 'src/app/common/service/email.service';
import { ProgramaFidelidadeService } from 'src/app/programasFidelidade/shared/services/programa-fidelidade.service';
import { Estabelecimento } from 'src/app/estabelecimentos/shared/models/estabelecimento';
import { ProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/programa-fidelidade';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceBase<Usuario> {

  url: string = `${ConfigHelper.Url}usuario`;

  emitirUsuarioCriado = new EventEmitter();

  constructor(public httpService: HttpService,
    public estabelecimentoService : EstabelecimentoService,
    public clienteEstabelecimentoService : ClienteEstabelecimentoService,
    private emailService: EmailService,
    private programaFidelidadeService: ProgramaFidelidadeService,
    ) {
    super(`${ConfigHelper.Url}usuario`, httpService);
   }

  async salvar(usuario: Usuario): Promise<HttpResultModel> {       
    return this.httpService.post(`${this.url}`,usuario);    
  }
  
  async salvarNovoCliente(usuario: Usuario): Promise<HttpResultModel> {       
    return this.httpService.post(`${this.url}/novoCliente`,usuario);    
  }

  
  async salvarNovoClienteEstabelecimento(usuario: Usuario): Promise<HttpResultModel> {  
    let estabelecimentos: Array<Estabelecimento> = new Array<Estabelecimento>(); 
    let listaProgramaFidelidade: Array<ProgramaFidelidade> = new Array<ProgramaFidelidade>(); 
    let usuarioBanco =  await this.buscarPorEmail(usuario.email);
    let estabelecimentosResultado = await this.estabelecimentoService.buscarPorIdUsuario(AutenticadorService.UsuarioLogado[0].id);
    estabelecimentos = <Array<Estabelecimento>>estabelecimentosResultado.data;
    const estabelecimentoId : number = Number(estabelecimentos[0].id);    
    let programaFidelidadeResultado = await this.programaFidelidadeService.buscarPorIdEstabelecimentoEAtivo(estabelecimentoId);
    listaProgramaFidelidade = <Array<ProgramaFidelidade>>programaFidelidadeResultado.data;
    if (usuarioBanco.data === null){   // Caso onde não existe o usuário na aplicação    
      usuario.senha = this.gerarSenha();
      usuarioBanco = await this.salvar(usuario);  // Cria ele      
      await this.clienteEstabelecimentoService.salvar(this.pupularClienteEstabelecimento(estabelecimentoId,usuarioBanco.data.id));
      this.notificarUsuario(true,usuarioBanco,usuario,estabelecimentos,listaProgramaFidelidade);
   // this.emailService.enviarEmailNovoClienteEstabelecimento(usuarioBanco.data,usuario.senha,estabelecimentos[0],listaProgramaFidelidade[0]);   
    }else{ // Caso onde já exista o usuário na aplicação
      let clienteEstabelecimento = await this.clienteEstabelecimentoService.buscarPorUsuarioIdEEstabelecimentoId(usuarioBanco.data.id,estabelecimentoId);
      if ( clienteEstabelecimento.data === null){ // Não está associado ao estabelecimento  
        await this.clienteEstabelecimentoService.salvar(this.pupularClienteEstabelecimento(estabelecimentoId,usuarioBanco.data.id));                
        this.notificarUsuario(false,usuarioBanco,usuario,estabelecimentos,listaProgramaFidelidade);
        //this.emailService.enviarEmailAssociandoClienteEstabelecimento(usuarioBanco.data,usuario.senha, estabelecimentos[0],listaProgramaFidelidade[0]);   
      }
    }
   return  usuarioBanco;
  }

  private notificarUsuario(novoUsuario : boolean, usuarioBanco : HttpResultModel, 
    usuario : Usuario,estabelecimentos: Array<Estabelecimento>, listaProgramaFidelidade: Array<ProgramaFidelidade>  ){
    if(novoUsuario){
      if (usuario.email != null && usuario.email.trim() != ''){
        this.emailService.enviarEmailNovoClienteEstabelecimento(usuarioBanco.data,usuario.senha,estabelecimentos[0],listaProgramaFidelidade[0]);   
      }else{
        // chamada para enviar via sms
      }
    }else{
      if (usuario.email != null && usuario.email.trim() != ''){
        this.emailService.enviarEmailAssociandoClienteEstabelecimento(usuarioBanco.data,usuario.senha, estabelecimentos[0],listaProgramaFidelidade[0]);   
      }else{
        // chamada para enviar via sms
      }
    }
  }
  

  private pupularClienteEstabelecimento(estabelecimentoId: number, usuarioId: number) : ClienteEstabelecimento{
    let clienteEstabelecimento : ClienteEstabelecimento = new ClienteEstabelecimento(); 
    clienteEstabelecimento.dataCriacao = new Date();
    clienteEstabelecimento.estabelecimentoId = estabelecimentoId;
    clienteEstabelecimento.usuarioId = usuarioId;
    return clienteEstabelecimento;    
  }

  async buscarTodos(): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}`);
    return respotas;
  } 

  async buscarSemEstabelecimentosAssociados(): Promise<HttpResultModel> {        
    return this.httpService.get(`${this.url}/buscarSemEstabelecimentosAssociados`);    
  }
  
  async buscarPorEmail(email: string): Promise<HttpResultModel> {        
    return this.httpService.get(`${this.url}/buscarPorEmail/${email}`);                                                     
  }

  async buscarPorId(id: number): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}/${id}`);
    return respotas;
  }

  async atualizar (id :string, usuario: Usuario){
    let respotas = this.httpService.put(`${this.url}/${id}`,usuario);  
    return respotas; 
  }

  async atualizarSenha (id :number, senha: any){    
    return this.httpService.put(`${this.url}/atualizarSenha/${id}`,senha);      
  }

  static RegistrarLogin(result: any) {
    localStorage.setItem(ConfigHelper.storageKeys.token, result.token);
    localStorage.setItem(ConfigHelper.storageKeys.usuario, JSON.stringify(result.usuario));
  } 

  static get GetTokenAccess(): string {
    return localStorage.getItem(ConfigHelper.storageKeys.token);
  }

  static get IsLogado(): boolean {
    return (localStorage.getItem(ConfigHelper.storageKeys.token) != undefined);
  }

  static  RemoverLogin()  {
    localStorage.removeItem(ConfigHelper.storageKeys.token);
    localStorage.removeItem(ConfigHelper.storageKeys.usuario);
  }

  static RegistrarMantermeConectado(email: string, senha: string) {
    localStorage.setItem(ConfigHelper.storageKeys.usuarioEmail, email);
    localStorage.setItem(ConfigHelper.storageKeys.usuarioSenha, senha);
  }

  static  RemoverMantermeConectado()  {
    localStorage.removeItem(ConfigHelper.storageKeys.usuarioEmail);
    localStorage.removeItem(ConfigHelper.storageKeys.usuarioSenha);
  }

  static get IsMantermeConectado(): boolean {
    return (localStorage.getItem(ConfigHelper.storageKeys.usuarioEmail) != undefined
    && localStorage.getItem(ConfigHelper.storageKeys.usuarioSenha) != undefined);    
  }

  static get getManterMeConectado(): any {
    return {
      email: localStorage.getItem(ConfigHelper.storageKeys.usuarioEmail),
      senha: localStorage.getItem(ConfigHelper.storageKeys.usuarioSenha)
    }
  }


  async gerarNovaSenha (id :number, emailModel: EmailModel){    
    return this.httpService.put(`${this.url}/gerarNovaSenha/${id}`,emailModel);      
  }  

  async notificarUsuarioSalvo(){    
    this.emitirUsuarioCriado.emit();
  }

  private gerarSenha() : string {
    let senha = '';
    let numeros = [];
    for (let index = 0; index < 6; index++) {
      numeros.push(Math.floor(Math.random() * 10));
    }
    return senha.concat(numeros[0], numeros[1], numeros[2], numeros[3], numeros[4], numeros[5]);
  };

}
