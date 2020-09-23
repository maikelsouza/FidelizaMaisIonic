import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { AlertaService } from './../../common/service/alerta.service';
import { CartaoFidelidadeService } from './../shared/services/cartao-fidelidade.service';
import { CartaoFidelidade } from '../shared/models/cartao-fidelidade';
import { CampoRegistroCartaoFidelidade } from '../shared/models/campo-registro-cartao-fidelidade';

@Component({
  selector: 'app-cartao-fidelidade-editar',
  templateUrl: './cartao-fidelidade-editar.component.html',
  styleUrls: ['./cartao-fidelidade-editar.component.scss'],
})
export class CartaoFidelidadeEditarComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  private id: number;
  private inscricao: Subscription;
  cartaoFidelidade: CartaoFidelidade = new CartaoFidelidade();
  public CampoRegistroCartaoFidelidades: FormArray;
  
  constructor(
    private formBuilder: FormBuilder,
    private cartaoFidelidadeService: CartaoFidelidadeService,
    private alertService: AlertaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.montarCamposTela();
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params.id;
        this.buscarPorId();
      }
    );
  }

  public async buscarPorId(): Promise<void> {
    try {
      const resultado = await this.cartaoFidelidadeService.buscarPorId(this.id);
      if (resultado.success) {
        this.cartaoFidelidade = resultado.data;
        this.formulario = this.formBuilder.group({
          id: [this.cartaoFidelidade.id],
          nome: [this.cartaoFidelidade.nome, Validators.required],
          descricao: [this.cartaoFidelidade.descricao],
          premio: [this.cartaoFidelidade.premio, Validators.required],
          ativo: [this.cartaoFidelidade.ativo, Validators.required],
          quantidadeMarcacao: [this.cartaoFidelidade.quantidadeMarcacao, Validators.required],
          dataExpiracao: [this.cartaoFidelidade.dataExpiracao],
          CampoRegistroCartaoFidelidades: this.formBuilder.array([])
        });
        this.popularCamposRegristroCartaoFidelidade(null);     
      }
    } catch (error) {
      console.log('Erro ao carregar o cartão fidelidade', error);
    }
  }


  popularCamposRegristroCartaoFidelidade(campoRegistroCartaoFidelidades: CampoRegistroCartaoFidelidade): FormGroup {
    this.CampoRegistroCartaoFidelidades = this.formulario.get('CampoRegistroCartaoFidelidades') as FormArray;
    this.cartaoFidelidade.CampoRegistroCartaoFidelidades.forEach(element => {
    this.CampoRegistroCartaoFidelidades.push(this.createItem(element));
    });    
    return null;
  }

  createItem(campoRegistroCartaoFidelidades: CampoRegistroCartaoFidelidade): FormGroup {
    return this.formBuilder.group({
      marcado: campoRegistroCartaoFidelidades.marcado,
      data: campoRegistroCartaoFidelidades.data,
      id: campoRegistroCartaoFidelidades.id
    });
  }

 
  ngOnDestroy() {
    this.inscricao.unsubscribe;
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required], ativo: [null, Validators.required], 
      descricao: [null], quantidadeMarcacao: [null, Validators.required], 
      dataExpiracao: [null], premio: [null, Validators.required],
      CampoRegistroCartaoFidelidades: this.formBuilder.array([])
    });
  }

  public get nome() {return this.formulario.get('nome')}  
  public get ativo() {return this.formulario.get('ativo')}
  public get quantidadeMarcacao() {return this.formulario.get('quantidadeMarcacao')}
  public get premio() {return this.formulario.get('premio')}
  

  async onSubmit(): Promise<void> {
    try {
      console.log(this.formulario.value);
      const resultado = await this.cartaoFidelidadeService.atualizar(this.formulario.get('id').value, this.formulario.value);
      if (resultado.success) {
        this.alertService.toast('Cartão Fidelidade atualizado com sucesso!');
      }
    } catch (error) {
      console.log('Erro ao atualizar um Cartão Fidelidade', error);
    }
  }

  criarCampoRegistroCartaoFidelidade2(campoRegistroCartaoFidelidade: CampoRegistroCartaoFidelidade): FormGroup {
    return this.formBuilder.group({
      id: campoRegistroCartaoFidelidade.id,
      marcado: campoRegistroCartaoFidelidade.marcado,
      data: campoRegistroCartaoFidelidade.data
    });
  }

}






