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
        if(id){
          this.buscarPorId(id);
        }
      })     
  }

  private montarCamposTela(programaFidelidade: ProgramaFidelidade) {
console.log("campo item: " +programaFidelidade.CampoItemProgramaFidelidades);
    programaFidelidade.CampoItemProgramaFidelidades = <Array<CampoItemProgramaFidelidade>>programaFidelidade.CampoItemProgramaFidelidades;    
    console.log("campo item depois: " +<Array<CampoItemProgramaFidelidade>>programaFidelidade.CampoItemProgramaFidelidades);
    this.formulario = this.formBuilder.group({
      id: [programaFidelidade.id], nome: [programaFidelidade.nome], ativo: [true],
      descricao: [programaFidelidade.descricao], dataExpiracao: [null],
      //regra: [programaFidelidade.regra], 
      regra: [1], usuarioId: [1],
      estabelecimentoId: [31],
      CampoItemProgramaFidelidades: this.formBuilder.array([ this.criarItemProgramaFidelidade(programaFidelidade.CampoItemProgramaFidelidades) ])
    });
  }

  async onSubmit(): Promise<void>{
    try {                  
      let resultado = null;  
      if (this.formulario.get('id').value) {        
        resultado = await this.programaFidelidadeService.atualizar(this.formulario.get('id').value,this.formulario.value);  
      } else {
        resultado = await this.programaFidelidadeService.salvar(this.formulario.value); 
      }  
      if (resultado.success){
          this.alertService.toast('Programa Fidelidade salvo com sucesso!');
      }      
    } catch (error) {
        console.log('Erro ao salvar um Programa Fidelidade', error);    
    }
  }

  criarItemProgramaFidelidade(campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade>): FormGroup {
    let campoItemProgramaFidelidade: FormGroup;
    if (campoItemProgramaFidelidades){
      this.campoItemProgramaFidelidades = this.formulario.get('CampoItemProgramaFidelidades') as FormArray;      
      campoItemProgramaFidelidades.forEach(element => {
        campoItemProgramaFidelidade = this.formBuilder.group({
          nome: element.nome,
          descricao: element.descricao,
          ativo: true,
          quantidadePontos: element.quantidadePontos,
          dataExpiracao: element.dataExpiracao     
        });   
        this.campoItemProgramaFidelidades.push(campoItemProgramaFidelidade);        
   });
    }else{
      let campoItemProgramaFidelidade: FormGroup;
      campoItemProgramaFidelidade = this.formBuilder.group({
        nome: '',
        descricao: '',
        ativo: true,
        quantidadePontos: '',
        dataExpiracao: ''     
      });
      return campoItemProgramaFidelidade;
    }
   
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
        this.montarCamposTela(resultado.data);
      }
    } catch (error) {
      console.log('Erro ao carregar o cartão fidelidade', error);
    }
  }
  
}
