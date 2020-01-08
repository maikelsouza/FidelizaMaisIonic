import { Injectable } from '@angular/core';
import { ConfigHelper } from 'src/app/common/helpers/configHelper';
import { HttpService } from 'src/app/common/service/http.service';
import { ServiceBase } from 'src/app/base/serviceBase';
import { ProgramaFidelidade } from '../models/programa-fidelidade';
import { HttpResultModel } from 'src/app/common/model/HttpResultModel';

@Injectable({
  providedIn: 'root'
})
export class ProgramaFidelidadeService  extends ServiceBase<ProgramaFidelidade>{

  url: string = `${ConfigHelper.Url}programaFidelidade`;

  constructor(public httpService: HttpService) {
    super(`${ConfigHelper.Url}programaFidelidade`, httpService);
   }

   async salvar(programaFidelidade: ProgramaFidelidade): Promise<HttpResultModel> {                  
    let respotas = this.httpService.post(`${this.url}`,programaFidelidade);
    return respotas;
  } 

  async atualizar (id :string, programaFidelidade: ProgramaFidelidade){
    let respotas = this.httpService.put(`${this.url}/${id}`,programaFidelidade);  
    return respotas; 
  }

  async buscarPorIdUsuario(id: number): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}/buscarPorUsuario/${id}`);    
    return respotas;
  }

  async buscarPorId(id: number): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}/${id}`);
    return respotas;
  }

  async buscarPorIdEstabelecimento(id: number): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}/buscarPorEstabelecimento/${id}`);    
    return respotas;
  }
}
