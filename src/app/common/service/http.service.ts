
import { AlertaService } from './alerta.service';
import { HttpResultModel } from './../model/HttpResultModel';
import { NetworkService } from './../network/network.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutenticadorService } from './autenticador.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private networkSrv: NetworkService,
    private spinner: SpinnerService,
    private alertSrv: AlertaService

  ) { }

  public createHeader(header?: HttpHeaders): HttpHeaders {
    if (!header) {
      header = new HttpHeaders();
    }
    
    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');    

    let token = AutenticadorService.GetTokenAccess;    
    if (token) {
      header = header.append('x-access-token', token);
    }
    return header;
  }

  public get(url: string): Promise<HttpResultModel> {
    this.spinner.show();
    const header = this.createHeader();    
    return new Promise((resolve) => {
      if (this.networkSrv.IsOnline) {
        this.http.get(url, { headers: header })
          .subscribe(res => {
            this.spinner.hide();            
            resolve({ success: true, data: res, err: undefined });
          }, err => {
              this.spinner.hide();
             this.alertSrv.toast('Não foi possível consultar os dados, verifique sua conexão e tente novamente');
            resolve({ success: false, data: undefined, err });
          });
      } else {
        this.alertSrv.toast('Você está Offline, e infelizmente não pode ser carregado os dados!');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

  public post(url: string, model: any): Promise<HttpResultModel> { 
    this.spinner.show();        
    const header = this.createHeader();
    return new Promise((resolve) => { 
      if (this.networkSrv.IsOnline) {
        this.http.post(url, model, { headers: header })
          .subscribe(res => {
            this.spinner.hide();
            resolve({ success: true, data: res, err: undefined });
          }, err => {
            this.spinner.hide();            
            if (err.status == 400) {
              let msg = '';
              console.log('Erro 404 ' + err.error.message);              
              err.error.validation.forEach(err => {
                msg += `<li>${err.message}</li>`;
              });
             this.alertSrv.alert(err.error.message, msg);
            } else if (err.status == 404) {              
              this.alertSrv.alert('Informação', err.error.message);
              console.log('Erro 404 ' + err.error.message);
            } else {              
               this.alertSrv.toast('Não foi possível realizar o processamento da informação, verifique sua conexão');
            }
            resolve({ success: false, data: undefined, err });
          });
      } else {
         this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado os dados!');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

  public put(url: string, model: any): Promise<HttpResultModel> { 
    this.spinner.show();
    const header = this.createHeader();
    return new Promise((resolve) => {
      if (this.networkSrv.IsOnline) {
        this.http.put(url, model, { headers: header })
          .subscribe(res => {
            this.spinner.hide();
            resolve({ success: true, data: res, err: undefined });
          }, err => {
            this.spinner.hide();
            console.log(err);
            if (err.status == 400) {
              let msg = '';
              // tslint:disable-next-line:no-shadowed-variable
              err.error.validation.forEach(err => {
                msg += `<li>${err.message}</li>`;
              });
               this.alertSrv.alert(err.error.message, msg);
            } else if (err.status == 404) {             
              this.alertSrv.alert('Informação', err.error.message);
            } else {
               this.alertSrv.toast('Não foi possível realizar o processamento da informação, verifique sua conexão');
            resolve({ success: false, data: undefined, err });
            }
          });
      } else {
        this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado os dados!');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

  public delete(url: string): Promise<HttpResultModel> {
    this.spinner.show();
    const header = this.createHeader();
    return new Promise((resolve) => {
      if (this.networkSrv.IsOnline) {
        this.http.delete(url, { headers: header }).subscribe(_res => {
          this.spinner.hide();
          resolve({ success: true, data: _res, err: undefined });
        }, err => {
           this.spinner.hide();
           this.alertSrv.toast('Não foi possível realizar a exclusão do registro!');
          resolve({ success: true, data: undefined, err });
        });
      } else {      
        this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado os dados!');
      }
      resolve({ success: true, data: [], err: undefined });
    });
  }

}
