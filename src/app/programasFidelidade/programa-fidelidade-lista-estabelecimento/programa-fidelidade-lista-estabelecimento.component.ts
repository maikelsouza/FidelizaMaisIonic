import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProgramaFidelidadeService } from '../shared/services/programa-fidelidade.service';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { ProgramaFidelidade } from '../shared/models/programa-fidelidade';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-programa-fidelidade-lista-estabelecimento',
  templateUrl: './programa-fidelidade-lista-estabelecimento.component.html',
  styleUrls: ['./programa-fidelidade-lista-estabelecimento.component.scss'],
})
export class ProgramaFidelidadeListaEstabelecimentoComponent implements OnInit, OnDestroy {
  
 
  private programasFidelidade: Array<ProgramaFidelidade> = new Array<ProgramaFidelidade>(); 
  private id : number;
  private inscricao : Subscription;
  public exibeBotaoNovo: boolean = true; 

  constructor(
    private formBuilder: FormBuilder,
    private programaFidelidadeService: ProgramaFidelidadeService,
    private alertService: AlertaService,
    private route: ActivatedRoute  
  ) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];        
      }
    );
    
    this.programaFidelidadeService.emitirProgramaFidelidadeCriado.subscribe(
      () => {
        this.carregarListaPorEstabelecimento();
      }
    );
    this.carregarListaPorEstabelecimento();    
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe;
  }


  async carregarListaPorEstabelecimento(): Promise<void> {
    try {       
      let resultado = await this.programaFidelidadeService.buscarPorIdEstabelecimento(this.id);
      if (resultado.success) {
        this.programasFidelidade = <Array<ProgramaFidelidade>>resultado.data;  
        this.exibeBotaoNovo = this.programasFidelidade.length === 0;       
      }
    } catch (error) {
      console.log('Erro ao carregar os programa fidelidade', error);
    }
  }

}
