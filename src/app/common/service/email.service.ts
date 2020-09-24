import { Injectable } from '@angular/core';

import { HttpService } from 'src/app/common/service/http.service';
import { EmailModel } from '../model/EmailModel';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { Estabelecimento } from 'src/app/estabelecimentos/shared/models/estabelecimento';
import { ProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/programa-fidelidade';
import { ServiceBase } from 'src/app/base/serviceBase';
import { ConfigHelper } from '../helpers/configHelper';
import { CampoItemProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/campo-item-programa-fidelidade';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends ServiceBase<EmailModel>{

  
    url: string = `${ConfigHelper.Url}email`;  
    
    constructor(public httpService: HttpService) {
      super(`${ConfigHelper.Url}email`, httpService);    
     }

  public async enviarEmailPontuarCliente(usuario: Usuario, estabelecimento : Estabelecimento,
    programasFidelidade : ProgramaFidelidade, pontosGanhos : number, totalPontos : number){
    
    let msgHtml = this.msgHtmlPontuarCliente(usuario.nome,estabelecimento.nome, 
      pontosGanhos,totalPontos, programasFidelidade.CampoItemProgramaFidelidades);
    const titulo = 'Fideliza Mais - Pontos Recebidos'
    let emailModel : EmailModel = this.criarEmailModel('maikel.souza@gmail.com',titulo,undefined ,msgHtml);    
    this.httpService.post(`${this.url}/enviarEmail`,emailModel);  
    
  }

  public async enviarEmailResgatarPontosCliente(usuario: Usuario, estabelecimento : Estabelecimento,
    programasFidelidade : ProgramaFidelidade, pontosGanhos : number, totalPontos : number){
    
    let msgHtml = this.msgHtmlResgatarPontosCliente(usuario.nome,estabelecimento.nome, 
      pontosGanhos,totalPontos, programasFidelidade.CampoItemProgramaFidelidades);
    const titulo = 'Fideliza Mais - Pontos Resgatados'
    let emailModel : EmailModel = this.criarEmailModel('maikel.souza@gmail.com',titulo,undefined ,msgHtml);    
    this.httpService.post(`${this.url}/enviarEmail`,emailModel);
  }

  public async enviarEmailNovoClienteEstabelecimento(usuario: Usuario, senha: string, estabelecimento: Estabelecimento,
    programasFidelidade: ProgramaFidelidade) {

    let msgHtml = this.msgHtmlNovoClienteEstabelecimento(usuario.nome, usuario.email,
      senha, estabelecimento.nome, programasFidelidade.CampoItemProgramaFidelidades);
    const titulo = 'Fideliza Mais - Cadastro Realizado com Sucesso'
    let emailModel: EmailModel = this.criarEmailModel(usuario.email, titulo, undefined, msgHtml);
    this.httpService.post(`${this.url}/enviarEmail`, emailModel);
  }

  public async enviarEmailAssociandoClienteEstabelecimento(usuario: Usuario, senha: string, estabelecimento: Estabelecimento,
    programasFidelidade: ProgramaFidelidade) {

    let msgHtml = this.msgHtmlAssociarClienteEstabelecimento(usuario.nome,
       estabelecimento.nome, programasFidelidade.CampoItemProgramaFidelidades);
    const titulo = 'Fideliza Mais - Adesão ao Programa de Fidelizada Realizada com Sucesso'
    let emailModel: EmailModel = this.criarEmailModel(usuario.email, titulo, undefined, msgHtml);
    this.httpService.post(`${this.url}/enviarEmail`, emailModel);
  }


  private msgHtmlPontuarCliente(nomeCliente: string,
     nomeEstabelecimento: string, pontosGanhos : number, 
     totalPontos : number, campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade> ) : string{     
     let textoHtmlInicio : string = '';
     let textoHtmlLinhasTabela : string = '';
     let textoHtmlFim : string = '';
     textoHtmlInicio = `
          <html>
            <h3>Olá <strong>${nomeCliente},</strong></h3>
            <div>
                <p>Você acaba de ganhar <strong>${pontosGanhos} ponto(s) </strong>com o(a) <strong>${nomeEstabelecimento}.</strong>
                </br>Seu saldo é de <strong>${totalPontos} pontos.</strong></p>
            </div>
            <div>
              <p>Veja abaixo os benefícios do(a) <strong>${nomeEstabelecimento}</strong>.</p>
            </div>
            <table border="1">
              <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Qtd Pontos</th>
                </tr>
              </thead>
            <tbody>`                
            campoItemProgramaFidelidades.forEach(element => {
              textoHtmlLinhasTabela+= 
                      `<tr>
                          <td>${element.nome}</td>
                          <td>${element.descricao || ''}</td>
                        <td style="text-align:center">${element.quantidadePontos}</td>
                      </tr>`;  
            });                            
            textoHtmlFim = `</tbody></table></br></br></br><div><p><strong>FIDELIZA MAIS</strong></p></div></html>`;             
    return textoHtmlInicio.concat(textoHtmlLinhasTabela,textoHtmlFim);
  }

  private msgHtmlResgatarPontosCliente(nomeCliente: string,
    nomeEstabelecimento: string, pontosGanhos : number, 
    totalPontos : number, campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade> ) : string{     
    let textoHtmlInicio : string = '';
    let textoHtmlLinhasTabela : string = '';
    let textoHtmlFim : string = '';
    textoHtmlInicio = `
         <html>
           <h3>Olá <strong>${nomeCliente},</strong></h3>
           <div>
               <p>Você acaba de resgatar <strong>${pontosGanhos} ponto(s) </strong>com o(a) <strong>${nomeEstabelecimento}.</strong>
               </br>Seu saldo é de <strong>${totalPontos} pontos.</strong></p>
           </div>
           <div>
             <p>Veja abaixo os benefícios do(a) <strong>${nomeEstabelecimento}</strong>.</p>
           </div>
           <table border="1">
             <thead>
               <tr>
                   <th>Nome</th>
                   <th>Descrição</th>
                   <th>Qtd Pontos</th>
               </tr>
             </thead>
           <tbody>`                
           campoItemProgramaFidelidades.forEach(element => {
             textoHtmlLinhasTabela+= 
                     `<tr>
                         <td>${element.nome}</td>
                         <td>${element.descricao || ''}</td>
                       <td style="text-align:center">${element.quantidadePontos}</td>
                     </tr>`;  
           });                            
           textoHtmlFim = `</tbody></table></br></br></br><div><p><strong>FIDELIZA MAIS</strong></p></div></html>`;             
   return textoHtmlInicio.concat(textoHtmlLinhasTabela,textoHtmlFim);
 }

 private msgHtmlNovoClienteEstabelecimento(nomeCliente: string, email: string, senha: string,
  nomeEstabelecimento: string, campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade> ) : string{     
  let textoHtmlInicio : string = '';
  let textoHtmlLinhasTabela : string = '';
  let textoHtmlFim : string = '';
  textoHtmlInicio = `
       <html>
         <h3>Olá <strong>${nomeCliente},</strong></h3>
         <div>
             <p>Você foi cadastrado(a) no aplicativo <strong>Fideliza Mais</strong> pelo estabelecimento <strong>${nomeEstabelecimento}.</strong>
             </p>
             <p>Login: ${email}</p>
             <p>Senha: ${senha}</p>
         </div>
         <div>
           <p>Veja abaixo os benefícios do(a) <strong>${nomeEstabelecimento}</strong>.</p>
         </div>
         <table border="1">
           <thead>
             <tr>
                 <th>Nome</th>
                 <th>Descrição</th>
                 <th>Qtd Pontos</th>
             </tr>
           </thead>
         <tbody>`                
         campoItemProgramaFidelidades.forEach(element => {
           textoHtmlLinhasTabela+= 
                   `<tr>
                       <td>${element.nome}</td>
                       <td>${element.descricao || ''}</td>
                     <td style="text-align:center">${element.quantidadePontos}</td>
                   </tr>`;  
         });                            
         textoHtmlFim = `</tbody></table></br></br></br><div><p><strong>FIDELIZA MAIS</strong></p></div></html>`;             
    return textoHtmlInicio.concat(textoHtmlLinhasTabela,textoHtmlFim);
  }

  private msgHtmlAssociarClienteEstabelecimento(nomeCliente: string,
    nomeEstabelecimento: string, campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade> ) : string{     
    let textoHtmlInicio : string = '';
    let textoHtmlLinhasTabela : string = '';
    let textoHtmlFim : string = '';
    textoHtmlInicio = `
         <html>
           <h3>Olá <strong>${nomeCliente},</strong></h3>
           <div>
               <p>Você aderiu ao programa de fidelidade do estabelecimento <strong>${nomeEstabelecimento}.</strong>
               </p>                       
           </div>
           <div>
             <p>Veja abaixo os benefícios do(a) <strong>${nomeEstabelecimento}</strong>.</p>
           </div>
           <table border="1">
             <thead>
               <tr>
                   <th>Nome</th>
                   <th>Descrição</th>
                   <th>Qtd Pontos</th>
               </tr>
             </thead>
           <tbody>`                
           campoItemProgramaFidelidades.forEach(element => {
             textoHtmlLinhasTabela+= 
                     `<tr>
                         <td>${element.nome}</td>
                         <td>${element.descricao || ''}</td>
                       <td style="text-align:center">${element.quantidadePontos}</td>
                     </tr>`;  
           });                            
           textoHtmlFim = `</tbody></table></br></br></br><div><p><strong>FIDELIZA MAIS</strong></p></div></html>`;             
      return textoHtmlInicio.concat(textoHtmlLinhasTabela,textoHtmlFim);
    }

  private construirRodapeHtml(): string{

    const msgRodapHtml : string = "<footer> </footer>" ; 

    return msgRodapHtml;
  }

  
  private criarEmailModel(to: string, subject: string,
    text?: string, html?: string): EmailModel {
    let emailModel: EmailModel = new EmailModel();
    emailModel.to = to;
    emailModel.subject = subject;
    emailModel.text = text
    emailModel.html = html;
    return emailModel;
  }

}
