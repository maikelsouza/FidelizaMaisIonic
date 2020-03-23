import { Injectable } from '@angular/core';
import { PontosClientesProgramaFidelidade } from '../models/pontos-clientes-programa-fidelidade';
import { HttpResultModel } from 'src/app/common/model/HttpResultModel';
import { ConfigHelper } from 'src/app/common/helpers/configHelper';
import { ServiceBase } from 'src/app/base/serviceBase';
import { HttpService } from 'src/app/common/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class PontosClienteProgramaFidelidadeService extends ServiceBase<PontosClienteProgramaFidelidadeService>{

  url: string = `${ConfigHelper.Url}pontosClienteProgramaFidelidade`;

  constructor(public httpService: HttpService) { 
    super(`${ConfigHelper.Url}pontosClienteProgramaFidelidade`, httpService);
  }


  async salvar(pontosClientesProgramaFidelidade: PontosClientesProgramaFidelidade): Promise<HttpResultModel> {                  
    return this.httpService.post(`${this.url}`,pontosClientesProgramaFidelidade);    
  } 
}
