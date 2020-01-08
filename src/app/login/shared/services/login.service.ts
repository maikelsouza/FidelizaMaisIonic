import { UsuarioService } from './../../../usuarios/shared/services/usuario.service';
import { HttpService } from './../../../common/service/http.service';
import { Injectable } from '@angular/core';

import { ServiceBase } from 'src/app/base/serviceBase';
import { ConfigHelper } from './../../../common/helpers/configHelper';
import { HttpResultModel } from './../../../common/model/HttpResultModel';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ServiceBase<Usuario> {

  url: string = `${ConfigHelper.Url}usuario`;

  constructor(public httpService: HttpService) { 
    super(`${ConfigHelper.Url}usuario`, httpService);
  }

  async autenticar(login: string, senha: string): Promise<HttpResultModel> {          
   return this.http.post(`${this.url}/autenticar`, { email: login, senha: senha });   
  } 
}
