import { Injectable } from '@angular/core';

import { ServiceBase } from 'src/app/base/serviceBase';
import { TotalPontosClienteProgramaFidelidade } from '../models/total-pontos-cliente-programa-fidelidade';
import { ConfigHelper } from 'src/app/common/helpers/configHelper';
import { HttpService } from 'src/app/common/service/http.service';
import { HttpResultModel } from 'src/app/common/model/HttpResultModel';
import { EmailService } from 'src/app/common/service/email.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { Estabelecimento } from 'src/app/estabelecimentos/shared/models/estabelecimento';
import { ProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/programa-fidelidade';

@Injectable({
  providedIn: 'root'
})
export class TotalPontosClienteProgramaFidelidadeService extends ServiceBase<TotalPontosClienteProgramaFidelidade> {

  url: string = `${ConfigHelper.Url}totalPontosClienteProgramaFidelidade`;

  constructor(public httpService: HttpService,
    private emailService: EmailService) { 
    super(`${ConfigHelper.Url}totalPontosClienteProgramaFidelidade`, httpService);
  }

  async salvarEEnviarEmailPontuarCliente(totalPontosClienteProgramaFidelidade: TotalPontosClienteProgramaFidelidade,
    usuario: Usuario, estabelecimento : Estabelecimento, 
    programasFidelidade: ProgramaFidelidade, pontosGanhos : number): Promise<HttpResultModel> {                  
    let httpResultModel: Promise<HttpResultModel>;  
    httpResultModel = this.httpService.post(`${this.url}`,totalPontosClienteProgramaFidelidade);  
    
    // No caso do método salvar, onde ainda não existe pontuação para o cliente, os pontos ganhos são iguais ao total de pontos
    this.emailService.enviarEmailPontuarCliente(usuario,estabelecimento,
      programasFidelidade,pontosGanhos,pontosGanhos);  
    return httpResultModel;  
  } 

  async salvar(totalPontosClienteProgramaFidelidade: TotalPontosClienteProgramaFidelidade): Promise<HttpResultModel> {                  
    return  this.httpService.post(`${this.url}`,totalPontosClienteProgramaFidelidade);  
  } 

  async atualizarEEnviarEmailPontuarCliente(id: number, totalPontosClienteProgramaFidelidade:
     TotalPontosClienteProgramaFidelidade, usuario: Usuario, estabelecimento : Estabelecimento, 
     programasFidelidade: ProgramaFidelidade, pontosGanhos : number): Promise<HttpResultModel> {                  
      let httpResultModel: Promise<HttpResultModel>;  
      httpResultModel = this.httpService.put(`${this.url}/${id}`,totalPontosClienteProgramaFidelidade);
      this.emailService.enviarEmailPontuarCliente(usuario,estabelecimento,
        programasFidelidade,pontosGanhos,totalPontosClienteProgramaFidelidade.totalPontos);  
      return httpResultModel;  
  }
  
  async atualizarEEnviarEmailResgatarPontos(id: number, totalPontosClienteProgramaFidelidade:
    TotalPontosClienteProgramaFidelidade, usuario: Usuario, estabelecimento : Estabelecimento, 
    programasFidelidade: ProgramaFidelidade, pontosGanhos : number, totalPontos : number): Promise<HttpResultModel> {                  
     let httpResultModel: Promise<HttpResultModel>;  
     httpResultModel = this.httpService.put(`${this.url}/${id}`,totalPontosClienteProgramaFidelidade);
     this.emailService.enviarEmailResgatarPontosCliente(usuario,estabelecimento,
       programasFidelidade,pontosGanhos,totalPontos);  
     return httpResultModel;  
 }

  async getUsuarioIdProgramaFidelidadeIdAtivo(usuarioId: number, programaFidelidadeId: number): Promise<HttpResultModel> {                  
    return this.httpService.get(`${this.url}/getUsuarioIdProgramaFidelidadeIdAtivo/${usuarioId}/${programaFidelidadeId}`);                                                 
  } 

  async buscarPorIdUsuarioEAtivo(usuarioId: number, ativo: boolean): Promise<HttpResultModel> {                  
    return this.httpService.get(`${this.url}/buscarPorIdUsuarioEAtivo/${usuarioId}/${ativo}`);                                                 
  } 

  

}
