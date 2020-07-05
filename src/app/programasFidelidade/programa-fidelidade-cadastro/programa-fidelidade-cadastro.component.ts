import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlertaService } from 'src/app/common/service/alerta.service';
import { ProgramaFidelidadeService } from '../shared/services/programa-fidelidade.service';
import { ProgramaFidelidade } from '../shared/models/programa-fidelidade';
import { CampoItemProgramaFidelidade } from '../shared/models/campo-item-programa-fidelidade';


@Component({
  selector: 'app-programa-fidelidade-cadastro',
  templateUrl: './programa-fidelidade-cadastro.component.html',
  styleUrls: ['./programa-fidelidade-cadastro.component.scss'],
})
export class ProgramaFidelidadeCadastroComponent implements OnInit, OnDestroy{

  private formulario : FormGroup;  
  private inscricao: Subscription;
  private estabelecimentoId : number;
  private programaFidelidade : ProgramaFidelidade;
  private campoItemProgramaFidelidades: FormArray;
  mostrarCancelarEdicao : boolean = false;
  id : number;
  titulo = "Novo Programa Fidelidade"; 
  labelBtnSalvarAtualizar ="Salvar"; 
  
  

  constructor(
    private formBuilder: FormBuilder,
    private programaFidelidadeService: ProgramaFidelidadeService,
    private alertService: AlertaService,
    private route: ActivatedRoute,
    private router: Router,    
  ) { }

  ngOnInit() {    
    this.inscricao = this.route.params.subscribe(
      (params: any) => { 
        this.id = params.id;    
        this.estabelecimentoId = params.idEstabelecimento;           
        this.montarCamposTela(new ProgramaFidelidade())
        if(this.id){ // Condição que descobre se é uma edição ou cadastro
          this.mostrarCancelarEdicao = true;
          this.buscarPorId();
          this.titulo = "Editar Programa Fidelidade";
          this.labelBtnSalvarAtualizar ="Atualizar"; 
        }
      })     
  }


  private montarCamposTela(programaFidelidade: ProgramaFidelidade) { 
    this.formulario = this.formBuilder.group({
      id: [programaFidelidade.id], nome: [programaFidelidade.nome, Validators.required], 
      ativo: [true, Validators.required],
      descricao: [programaFidelidade.descricao], 
      dataExpiracao: [programaFidelidade.dataExpiracao],
      regra: [programaFidelidade.regra, Validators.required], 
      usuarioId: [null],
      estabelecimentoId: [this.estabelecimentoId],
      CampoItemProgramaFidelidades: this.formBuilder.array([this.criarItemProgramaFidelidade(programaFidelidade.CampoItemProgramaFidelidades)])
    });    
  }

  private montarCamposTelaEditar(programaFidelidade: ProgramaFidelidade) { 
    this.formulario = this.formBuilder.group({
      id: [programaFidelidade.id], nome: [programaFidelidade.nome], ativo: [true],
      descricao: [programaFidelidade.descricao], dataExpiracao: [programaFidelidade.dataExpiracao],      
      regra: [programaFidelidade.regra], usuarioId: [null],
      estabelecimentoId: [programaFidelidade.estabelecimentoId],
      CampoItemProgramaFidelidades: this.formBuilder.array([])
    });
    this.criarItensProgramaFidelidade(programaFidelidade.CampoItemProgramaFidelidades)
  }

  public get ativo() { return this.formulario.get('ativo') }
  public get regra() { return this.formulario.get('regra') }
  public get nome() { return this.formulario.get('nome') }

  async onSubmit(): Promise<void>{
    try {                  
      let resultado = null;  
      if (!this.validarCampoItemNomeProgramaFidelidade()){
        this.alertService.alert('Campo Obrigatório', 'O campo nome do item do programa de fidelidade é obrigatório');
      }else if (!this.validarCampoItemQuantidadePontosProgramaFidelidade()){
        this.alertService.alert('Campo Obrigatório', 'O campo quantidade pontos do item do programa de fidelidade é obrigatório');
      }else{
        if (this.formulario.get('id').value) {        
          resultado = await this.programaFidelidadeService.atualizar(this.formulario.get('id').value,this.formulario.value);
          if (resultado.success){
            this.alertService.toast('Programa Fidelidade atualizado com sucesso!');
          }      
        } else {
          resultado = await this.programaFidelidadeService.salvar(this.formulario.value); 
          if (resultado.success){
              this.alertService.toast('Programa Fidelidade salvo com sucesso!');
          }      
        }
        let estabelecimentoId =  this.estabelecimentoId == undefined ? this.formulario.get("estabelecimentoId").value : this.estabelecimentoId;
        await this.programaFidelidadeService.notificarProgramaFidelidadeSalvo();
        this.router.navigate(['/programaFidelidade/listaEstabelecimento',estabelecimentoId]);      
      }
    } catch (error) {
        console.log('Erro ao salvar / alterar um Programa Fidelidade', error);    
    }
  }

  criarItensProgramaFidelidade(campoItemProgramaFidelidadess: Array<CampoItemProgramaFidelidade>){
    this.campoItemProgramaFidelidades = this.formulario.get('CampoItemProgramaFidelidades') as FormArray;      
    campoItemProgramaFidelidadess.forEach(element => {
      this.campoItemProgramaFidelidades.push(this.criarItem(element));        
      });   
  }

  criarItem(CampoItemProgramaFidelidades: CampoItemProgramaFidelidade): FormGroup {
    return this.formBuilder.group({
          id: CampoItemProgramaFidelidades.id,
          nome: CampoItemProgramaFidelidades.nome,
          descricao: CampoItemProgramaFidelidades.descricao,
          ativo: CampoItemProgramaFidelidades.ativo,
          quantidadePontos: CampoItemProgramaFidelidades.quantidadePontos,
          dataExpiracao: CampoItemProgramaFidelidades.dataExpiracao         
    });
  }

  criarItemProgramaFidelidade(campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade>): FormGroup {
      let campoItemProgramaFidelidade: FormGroup;
      campoItemProgramaFidelidade = this.formBuilder.group({        
        nome: [null],
        descricao: [null],
        ativo: [true,],
        quantidadePontos: [null],
        dataExpiracao: [null],     
      });
      return campoItemProgramaFidelidade;
  }
   
  adicionarItemProgramaFidelidade(): void {
    this.campoItemProgramaFidelidades = this.formulario.get('CampoItemProgramaFidelidades') as FormArray;  
    this.campoItemProgramaFidelidades.push(this.criarItemProgramaFidelidade(null));
    
  }

  removerItemProgramaFidelidade(index) {
    this.campoItemProgramaFidelidades.removeAt(index);
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe;
  }

  public async buscarPorId(): Promise<void> {
    try {
      const resultado = await this.programaFidelidadeService.buscarPorId(this.id);      
      if (resultado.success) {                
        this.montarCamposTelaEditar(resultado.data);
      }
    } catch (error) {
      console.log('Erro ao carregar o cartão fidelidade', error);
    }
  }

  private validarCampoItemNomeProgramaFidelidade() : boolean{
    let valido : boolean = true;
    let campoItemProgramaFidelidades = this.formulario.get('CampoItemProgramaFidelidades') as FormArray;       
    campoItemProgramaFidelidades.controls.forEach(element => {
      if (!element.value.nome){
        valido = false;
      }
    });
    return valido;
  }

  private validarCampoItemQuantidadePontosProgramaFidelidade() : boolean{
    let valido : boolean = true;
    let campoItemProgramaFidelidades = this.formulario.get('CampoItemProgramaFidelidades') as FormArray;       
    campoItemProgramaFidelidades.controls.forEach(element => {
      if (!element.value.quantidadePontos){
        valido = false;
      }
    });
    return valido;
  }
  
}
