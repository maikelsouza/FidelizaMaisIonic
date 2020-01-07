import { ConfigHelper } from './../../common/helpers/configHelper';
import { HttpService } from './../../common/service/http.service';
import { HttpResultModel } from '../../common/model/HttpResultModel';
import { Estabelecimento } from './estabelecimento';
import { Injectable } from '@angular/core';
import { ServiceBase } from 'src/app/base/serviceBase';

@Injectable({
  providedIn: 'root'
})

export class EstabelecimentoService  extends ServiceBase<Estabelecimento> 
{
   
   url: string = `${ConfigHelper.Url}estabelecimento`;

  constructor(public httpService: HttpService) {    
    super(`${ConfigHelper.Url}estabelecimento`, httpService);
  }


  async salvar(estabelecimento: Estabelecimento): Promise<HttpResultModel> {    
    estabelecimento.ativo = true;
    let respotas = this.httpService.post(`${this.url}`,estabelecimento);
    return respotas;
  } 
}
