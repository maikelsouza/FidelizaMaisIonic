import { Injectable } from '@angular/core';
import { ServiceBase } from 'src/app/base/serviceBase';
import { TotalPontosClienteProgramaFidelidade } from '../models/total-pontos-cliente-programa-fidelidade';
import { ConfigHelper } from 'src/app/common/helpers/configHelper';
import { HttpService } from 'src/app/common/service/http.service';
import { HttpResultModel } from 'src/app/common/model/HttpResultModel';

@Injectable({
  providedIn: 'root'
})
export class TotalPontosClienteProgramaFidelidadeService extends ServiceBase<TotalPontosClienteProgramaFidelidade> {

  url: string = `${ConfigHelper.Url}totalPontosClienteProgramaFidelidade`;

  constructor(public httpService: HttpService) { 
    super(`${ConfigHelper.Url}totalPontosClienteProgramaFidelidade`, httpService);
  }

  async salvar(totalPontosClienteProgramaFidelidade: TotalPontosClienteProgramaFidelidade): Promise<HttpResultModel> {                  
    return this.httpService.post(`${this.url}`,totalPontosClienteProgramaFidelidade);    
  } 

  async countUsuariotivo(usuarioId: number): Promise<HttpResultModel> {                  
    return this.httpService.get(`${this.url}/countUsuarioIdAtivo/${usuarioId}`);                                                 
  } 

  async getUsuarioIdAtivo(usuarioId: number): Promise<HttpResultModel> {                  
    return this.httpService.get(`${this.url}/getUsuarioIdAtivo/${usuarioId}`);                                                 
  } 

  

}
