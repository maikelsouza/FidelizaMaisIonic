import { Injectable } from '@angular/core';

import { ConfigHelper } from '../helpers/configHelper';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  constructor() { }

  static get GetTokenAccess(): string {
    return localStorage.getItem(ConfigHelper.storageKeys.token);
  }

  static get UsuarioLogado(): Usuario  {    
    return JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.usuario));
  }
}
