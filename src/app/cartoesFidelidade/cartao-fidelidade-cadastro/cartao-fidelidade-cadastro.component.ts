import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { CartaoFidelidadeService } from './../shared/services/cartao-fidelidade.service';
import { AlertaService } from './../../common/service/alerta.service';



@Component({
  selector: 'app-cartao-fidelidade-cadastro',
  templateUrl: './cartao-fidelidade-cadastro.component.html',
  styleUrls: ['./cartao-fidelidade-cadastro.component.scss'],
})
export class CartaoFidelidadeCadastroComponent implements OnInit {


  private formulario : FormGroup;  
  private CampoRegistroCartaoFidelidades : FormArray;
  

  constructor(
    private formBuilder: FormBuilder,
    private cartaoFidelidadeService: CartaoFidelidadeService,
    private alertService: AlertaService    
  ) { }

  ngOnInit() {
    
    this.montarCamposTela();
    
  } 

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      nome: [null], ativo: [true], descricao: [null], quantidadeMarcacao: [null], dataExpiracao: [null],
      estabelecimentoId: [31], premio: [null],    
      CampoRegistroCartaoFidelidades : this.formBuilder.array([this.criarCampoRegistroCartaoFidelidade()])
    });
  }
  
  async onSubmit(): Promise<void>{
    try {            
        this.addItens(this.formulario.get('quantidadeMarcacao').value);      
        let resultado = await this.cartaoFidelidadeService.salvar(this.formulario.value);  
        if (resultado.success){
          this.alertService.toast('Cartão Fidelidade salvo com sucesso!');
        }      
    } catch (error) {
        console.log('Erro ao salvar um Cartão Fidelidade', error);    
    }
  }
  
  
  addItens(quantidadeMarcacao : number): void{
    this.CampoRegistroCartaoFidelidades = this.formulario.get('CampoRegistroCartaoFidelidades') as FormArray;
    for (let index = 0; index < quantidadeMarcacao -1; index++) {
      this.CampoRegistroCartaoFidelidades.push(this.criarCampoRegistroCartaoFidelidade());
    }
  }

  criarCampoRegistroCartaoFidelidade(): FormGroup {  
    return this.formBuilder.group({
          marcado: false,
          data: new Date()                 
      });
  } 

}
