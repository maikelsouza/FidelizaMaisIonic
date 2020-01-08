import { ConfigHelper } from './../../../common/helpers/configHelper';
import { Usuario } from './../models/usuario';
import { ServiceBase } from 'src/app/base/serviceBase';
import { HttpService } from './../../../common/service/http.service';
import { HttpResultModel } from './../../../common/model/HttpResultModel';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceBase<Usuario> {

  url: string = `${ConfigHelper.Url}usuario`;

  constructor(public httpService: HttpService) {
    super(`${ConfigHelper.Url}usuario`, httpService);
   }

  async salvar(usuario: Usuario): Promise<HttpResultModel> {       
    let respotas = this.httpService.post(`${this.url}`,usuario);
    return respotas;
  } 

  async buscarTodos(): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}`);
    return respotas;
  } 

  async buscarPorId(id: number): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}/${id}`);
    return respotas;
  }

  async atualizar (id :string, usuario: Usuario){
    let respotas = this.httpService.put(`${this.url}/${id}`,usuario);  
    return respotas; 
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
}
