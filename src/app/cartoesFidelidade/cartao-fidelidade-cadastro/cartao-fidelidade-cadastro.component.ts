import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartaoFidelidadeService } from './../shared/services/cartao-fidelidade.service';
import { AlertaService } from './../../common/service/alerta.service';



@Component({
  selector: 'app-cartao-fidelidade-cadastro',
  templateUrl: './cartao-fidelidade-cadastro.component.html',
  styleUrls: ['./cartao-fidelidade-cadastro.component.scss'],
})
export class CartaoFidelidadeCadastroComponent implements OnInit, OnDestroy {


  formulario : FormGroup;  
  private inscricao: Subscription;
  private CampoRegistroCartaoFidelidades : FormArray;
  private estabelecimentoId : number;

  constructor(
    private formBuilder: FormBuilder,
    private cartaoFidelidadeService: CartaoFidelidadeService,
    private alertService: AlertaService,
    private route: ActivatedRoute,
    private router: Router        
  ) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {         
        this.estabelecimentoId = params.estabelecimentoId;           
      })  
    this.montarCamposTela();
  } 

  ngOnDestroy() {
    this.inscricao.unsubscribe;
  }
  
  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required], ativo: [true, Validators.required],
      descricao: [null], quantidadeMarcacao: [null, Validators.required],
      dataExpiracao: [null],estabelecimentoId: [this.estabelecimentoId],
      premio: [null, Validators.required],    
      CampoRegistroCartaoFidelidades : this.formBuilder.array([this.criarCampoRegistroCartaoFidelidade()])
    });
  }

  public get nome() {return this.formulario.get('nome')}  
  public get ativo() {return this.formulario.get('ativo')}
  public get quantidadeMarcacao() {return this.formulario.get('quantidadeMarcacao')}
  public get premio() {return this.formulario.get('premio')}
  
  
  async onSubmit(): Promise<void>{
    try {            
        this.addItens(this.formulario.get('quantidadeMarcacao').value);      
        let resultado = await this.cartaoFidelidadeService.salvar(this.formulario.value);  
        if (resultado.success){
          this.alertService.toast('Cartão Fidelidade salvo com sucesso!');
          await this.cartaoFidelidadeService.notificarCartaoFidelidadeSalvo();
        }     
        this.router.navigate(['/cartaoFidelidade/listaEstabelecimento',this.estabelecimentoId]);      
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
