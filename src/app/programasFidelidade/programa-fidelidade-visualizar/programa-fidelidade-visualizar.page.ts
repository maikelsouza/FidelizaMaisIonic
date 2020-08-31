import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CampoItemProgramaFidelidade } from '../shared/models/campo-item-programa-fidelidade';
import { ProgramaFidelidadeService } from '../shared/services/programa-fidelidade.service';
import { ProgramaFidelidade } from '../shared/models/programa-fidelidade';

@Component({
  selector: 'app-programa-fidelidade-visualizar',
  templateUrl: './programa-fidelidade-visualizar.page.html',
  styleUrls: ['./programa-fidelidade-visualizar.page.scss'],
})
export class ProgramaFidelidadeVisualizarPage implements OnInit {

  campoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade> = new Array<CampoItemProgramaFidelidade>();
  programasFidelidade: Array<ProgramaFidelidade> = new Array<ProgramaFidelidade>();
  programaFidelidade: ProgramaFidelidade = new ProgramaFidelidade();

  constructor(    
    private route: ActivatedRoute,
    private programaFidelidadeService: ProgramaFidelidadeService
  ) { }

  ngOnInit() {
     this.carregarListaProgramaFidelidade();
  }


  
  async carregarListaProgramaFidelidade(): Promise<void> {
    
    try {
      let estabelecimentoId: number = Number( this.route.snapshot.params['id']);
      let programaFidelidadeResultado = await this.programaFidelidadeService.buscarPorIdEstabelecimentoEAtivo(estabelecimentoId);
      if (programaFidelidadeResultado.success) {
        this.programasFidelidade = <Array<ProgramaFidelidade>>programaFidelidadeResultado.data;
        await this.carregarCamposItensProgramaFidelidade();
      }
    }
    catch (error) {
      console.log('Erro ao carregar os programas fidelidade', error);
    }
  }

  async carregarCamposItensProgramaFidelidade(): Promise<void> {    
    const programaFidelidadeId : number = Number(this.programasFidelidade[0].id);
    this.programasFidelidade.forEach(element => {
      if (element.id == programaFidelidadeId){
        this.campoItemProgramaFidelidades = element.CampoItemProgramaFidelidades;
      }
    });
    this.programaFidelidade = this.programasFidelidade[0];
  }
}
