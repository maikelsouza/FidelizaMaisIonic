import { HttpResultModel } from './../../../common/model/HttpResultModel';
import { ConfigHelper } from '../../../common/helpers/configHelper';
import { HttpService } from '../../../common/service/http.service';
import { Estabelecimento } from '../models/estabelecimento';
import { Injectable,EventEmitter } from '@angular/core';
import { ServiceBase } from 'src/app/base/serviceBase';

@Injectable({
  providedIn: 'root'
})

export class EstabelecimentoService  extends ServiceBase<Estabelecimento> 
{
   
   url: string = `${ConfigHelper.Url}estabelecimento`;

   emitirListarEstabelecimento = new EventEmitter();

  constructor(public httpService: HttpService) {    
    super(`${ConfigHelper.Url}estabelecimento`, httpService);
  }


  async salvar(estabelecimento: Estabelecimento): Promise<HttpResultModel> {    
    estabelecimento.ativo = true;            
    let respotas = this.httpService.post(`${this.url}`,estabelecimento);
    return respotas;
  } 

  async buscarTodos(): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}`);
    return respotas;
  } 

  async buscarPorId(id: number): Promise<HttpResultModel> {        
    return this.httpService.get(`${this.url}/${id}`);    
  }

  async atualizar (id :string, estabelecimento: Estabelecimento){
    let respotas = this.httpService.put(`${this.url}/${id}`,estabelecimento);  
    return respotas; 
  }

  async delete (id :string){
    let respotas = this.httpService.delete(`${this.url}/${id}`);  
    return respotas; 
  }

  async buscarPorIdUsuario(id: number): Promise<HttpResultModel> {        
    let respotas = this.httpService.get(`${this.url}/buscarPorUsuario/${id}`);        
    return respotas;
  }

  async buscarComProgramaFidelidadeOuCartaoFidelidade(): Promise<HttpResultModel> {        
    return this.httpService.get(`${this.url}/buscarComProgramaFidelidadeOuCartaoFidelidade`);        
  }

  async notificarListaEstabelecimento(){    
    this.emitirListarEstabelecimento.emit();
  }



}
