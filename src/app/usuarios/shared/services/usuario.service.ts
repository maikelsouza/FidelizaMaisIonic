import { Injectable,EventEmitter } from '@angular/core';

import { ConfigHelper } from './../../../common/helpers/configHelper';
import { Usuario } from './../models/usuario';
import { ServiceBase } from 'src/app/base/serviceBase';
import { HttpResultModel } from './../../../common/model/HttpResultModel';
import { HttpService } from './../../../common/service/http.service';
import { EmailModel } from 'src/app/common/model/EmailModel';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceBase<Usuario> {

  url: string = `${ConfigHelper.Url}usuario`;

  emitirUsuarioCriado = new EventEmitter();

  constructor(public httpService: HttpService) {
    super(`${ConfigHelper.Url}usuario`, httpService);
   }

  async salvar(usuario: Usuario): Promise<HttpResultModel> {       
    return this.httpService.post(`${this.url}`,usuario);    
  }
  
  async salvarNovoCliente(usuario: Usuario): Promise<HttpResultModel> {       
    return this.httpService.post(`${this.url}/novoCliente`,usuario);    
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

  async gerarNovaSenha (id :number, emailModel: EmailModel){    
    return this.httpService.put(`${this.url}/gerarNovaSenha/${id}`,emailModel);      
  }

  async notificarUsuarioSalvo(){    
    this.emitirUsuarioCriado.emit();
  }

}
