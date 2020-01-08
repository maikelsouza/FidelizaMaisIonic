import { HttpResultModel } from '../../../common/model/HttpResultModel';
import { HttpService } from '../../../common/service/http.service';
import { ConfigHelper } from '../../../common/helpers/configHelper';
import { Injectable } from '@angular/core';
import { ServiceBase } from 'src/app/base/serviceBase';
import { TipoEstabelecimento } from '../models/tipo-estabelecimento';

@Injectable({
  providedIn: 'root'
})
export class TipoEstabelecimentoService extends ServiceBase<TipoEstabelecimento> {

  url: string = `${ConfigHelper.Url}tipoEstabelecimento`;

  constructor(public httpService: HttpService) {
    super(`${ConfigHelper.Url}tipoEstabelecimento`, httpService);
   }

   async buscarTodosAtivos(): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}`);
    return respotas;
  } 
}
