import { Injectable } from '@angular/core';

import { ConfigHelper } from 'src/app/common/helpers/configHelper';
import { HttpService } from 'src/app/common/service/http.service';
import { ServiceBase } from 'src/app/base/serviceBase';
import { CartaoFidelidade } from '../models/cartao-fidelidade';
import { HttpResultModel } from 'src/app/common/model/HttpResultModel';

@Injectable({
  providedIn: 'root'
})
export class CartaoFidelidadeService extends ServiceBase<CartaoFidelidade> {

  url: string = `${ConfigHelper.Url}cartaoFidelidade`;

  
  constructor(public httpService: HttpService) {    
    super(`${ConfigHelper.Url}cartaoFidelidade`, httpService);
  }


  async salvar(cartaoFidelidade: CartaoFidelidade): Promise<HttpResultModel> {                  
    let respotas = this.httpService.post(`${this.url}`,cartaoFidelidade);
    return respotas;
  } 

  async atualizar (id :string, cartaoFidelidade: CartaoFidelidade){
    let respotas = this.httpService.put(`${this.url}/${id}`,cartaoFidelidade);  
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
