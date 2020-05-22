import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import { Estabelecimento } from '../shared/models/estabelecimento';

@Component({
  selector: 'app-estabelecimento-visualizar',
  templateUrl: './estabelecimento-visualizar.component.html',
  styleUrls: ['./estabelecimento-visualizar.component.scss'],
})
export class EstabelecimentoVisualizarComponent implements OnInit {

  private formulario: FormGroup;
  private inscricao: Subscription;
  estabelecimento: Estabelecimento = new Estabelecimento(); 
  titulo = "Novo programa fidelidade"; 
  id : number;
 // nome: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private estabelecimentoSrv: EstabelecimentoService
  ) { }

  ngOnInit() {
   // this.montarCamposTela1();
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params.id;
        this.montarCamposTela();
      })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe;
  }



  private async montarCamposTela() {
    let estabelecimentoResultado = await this.estabelecimentoSrv.buscarPorId(this.id);
      if (estabelecimentoResultado.success) {
        this.estabelecimento = estabelecimentoResultado.data;
        
        
        
        
        
      /*   this.formulario = this.formBuilder.group({
          nome: [estabelecimentoResultado.data.nome],
          email: [estabelecimentoResultado.data.email],      
          EnderecoEstabelecimentos: this.formBuilder.group({
            id: [null],
            rua: [null], numero: [null],
            complemento: [null], cep: [null],
            bairro: [null], cidade: [null], uf: [null]
          }),
          telefone: this.formBuilder.group({
            telefoneId1: [null], telefoneNumero1: [null], telefoneTipo1: [null]        
          }),
          midiaSocial: this.formBuilder.group({
            midiaSocialNome1: [null], midiaSocialUrl1: [null]        
          })
        });
      }   */
  }}

}

  

 // public get nome() {return this.formulario.get('nome')}

