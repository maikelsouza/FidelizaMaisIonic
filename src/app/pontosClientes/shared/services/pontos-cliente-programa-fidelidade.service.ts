import { Injectable } from '@angular/core';
import { PontosClienteProgramaFidelidade } from '../models/pontos-cliente-programa-fidelidade';
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


  async salvar(pontosClientesProgramaFidelidade: PontosClienteProgramaFidelidade): Promise<HttpResultModel> {                  
    return this.httpService.post(`${this.url}`,pontosClientesProgramaFidelidade);    
  } 



  async buscarSomatorioPontosProgramaFidelidade(totalPontosClienteProgramaFidelidadeId: number): Promise<HttpResultModel> {                  
    return this.httpService.get(`${this.url}/buscarSomatorioPontosProgramaFidelidade/${totalPontosClienteProgramaFidelidadeId}`);                                                 
  } 
  
}
