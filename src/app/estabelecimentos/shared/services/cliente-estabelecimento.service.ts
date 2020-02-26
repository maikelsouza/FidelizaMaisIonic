import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/common/service/http.service';
import { ConfigHelper } from 'src/app/common/helpers/configHelper';
import { ServiceBase } from 'src/app/base/serviceBase';
import { ClienteEstabelecimento } from '../models/cliente-estabelecimento';
import { HttpResultModel } from 'src/app/common/model/HttpResultModel';

@Injectable({
  providedIn: 'root'
})
export class ClienteEstabelecimentoService extends ServiceBase<ClienteEstabelecimento> {

  url: string = `${ConfigHelper.Url}clienteEstabelecimento`;

  constructor(public httpService: HttpService) {    
    super(`${ConfigHelper.Url}clienteEstabelecimento`, httpService);
  }

  async buscarPorIdUsuario(id: number): Promise<HttpResultModel> {        
    return this.httpService.get(`${this.url}/buscarPorUsuario/${id}`);        
  }

}