import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { ProgramaFidelidadeService } from '../shared/services/programa-fidelidade.service';
import { ProgramaFidelidade } from '../shared/models/programa-fidelidade';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CampoItemProgramaFidelidade } from '../shared/models/campo-item-programa-fidelidade';

@Component({
  selector: 'app-programa-fidelidade-cadastro',
  templateUrl: './programa-fidelidade-cadastro.component.html',
  styleUrls: ['./programa-fidelidade-cadastro.component.scss'],
})
export class ProgramaFidelidadeCadastroComponent implements OnInit, OnDestroy{

  private formulario : FormGroup;  
  private inscricao: Subscription;
  private programaFidelidade : ProgramaFidelidade;
  private campoItemProgramaFidelidades: FormArray;
  

  constructor(
    private formBuilder: FormBuilder,
    private programaFidelidadeService: ProgramaFidelidadeService,
    private alertService: AlertaService,
    private route: ActivatedRoute    
  ) { }

  ngOnInit() {    
    this.montarCamposTela(new ProgramaFidelidade())
    this.inscricao = this.route.params.subscribe(
      (params: any) => { 
        let id = params.id;         
        if(id){ // Condição que descobre se é uma edição ou cadastro
          this.buscarPorId(id);
        }
      })     
  }

  private montarCamposTela(programaFidelidade: ProgramaFidelidade) { 
    this.formulario = this.formBuilder.group({
      id: [programaFidelidade.id], nome: [programaFidelidade.nome], ativo: [true],
      descricao: [programaFidelidade.descricao], dataExpiracao: [null],
      //regra: [programaFidelidade.regra], 
      regra: [1], usuarioId: [1],
      estabelecimentoId: [31],
      CampoItemProgramaFidelidades: this.formBuilder.array([this.criarItemProgramaFidelidade(programaFidelidade.CampoItemProgramaFidelidades)])
    });    
  }

  private montarCamposTelaEditar(programaFidelidade: ProgramaFidelidade) { 
    this.formulario = this.formBuilder.group({
      id: [programaFidelidade.id], nome: [programaFidelidade.nome], ativo: [true],
      descricao: [programaFidelidade.descricao], dataExpiracao: [null],
      //regra: [programaFidelidade.regra], 
      regra: [1], usuarioId: [1],
      estabelecimentoId: [31],
      CampoItemProgramaFidelidades: this.formBuilder.array([])
    });
    this.criarItensProgramaFidelidade(programaFidelidade.CampoItemProgramaFidelidades)
  }

  async onSubmit(): Promise<void>{
    try {                  
      let resultado = null;  
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

  criarItem(campoRegistroCartaoFidelidades: CampoItemProgramaFidelidade): FormGroup {
    return this.formBuilder.group({
      nome: campoRegistroCartaoFidelidades.nome,
          descricao: campoRegistroCartaoFidelidades.descricao,
          ativo: true,
          quantidadePontos: campoRegistroCartaoFidelidades.quantidadePontos,
          dataExpiracao: campoRegistroCartaoFidelidades.dataExpiracao   
    });
  }

  criarItemProgramaFidelidade(campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade>): FormGroup {
    let campoItemProgramaFidelidade: FormGroup;
      campoItemProgramaFidelidade = this.formBuilder.group({
        id: "",
        nome: '',
        descricao: '',
        ativo: true,
        quantidadePontos: '',
        dataExpiracao: ''     
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

  public async buscarPorId(id: number): Promise<void> {
    try {
      const resultado = await this.programaFidelidadeService.buscarPorId(id);      
      if (resultado.success) {        
        console.log(resultado.data);
        this.montarCamposTelaEditar(resultado.data);
      }
    } catch (error) {
      console.log('Erro ao carregar o cartão fidelidade', error);
    }
  }
  
}
