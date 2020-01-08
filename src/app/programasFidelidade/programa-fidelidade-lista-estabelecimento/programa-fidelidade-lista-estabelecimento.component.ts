import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProgramaFidelidadeService } from '../shared/services/programa-fidelidade.service';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { ProgramaFidelidade } from '../shared/models/programa-fidelidade';

@Component({
  selector: 'app-programa-fidelidade-lista-estabelecimento',
  templateUrl: './programa-fidelidade-lista-estabelecimento.component.html',
  styleUrls: ['./programa-fidelidade-lista-estabelecimento.component.scss'],
})
export class ProgramaFidelidadeListaEstabelecimentoComponent implements OnInit {

  private programasFidelidade: Array<ProgramaFidelidade> = new Array<ProgramaFidelidade>(); 

  constructor(
    private formBuilder: FormBuilder,
    private programaFidelidadeService: ProgramaFidelidadeService,
    private alertService: AlertaService  
  ) { }

  ngOnInit() {
    this.carregarListaPorEstabelecimento();
  }

  async carregarListaPorEstabelecimento(): Promise<void> {
    try {       
      let resultado = await this.programaFidelidadeService.buscarPorIdEstabelecimento(31);
      if (resultado.success) {
        this.programasFidelidade = <Array<ProgramaFidelidade>>resultado.data;        
      }
    } catch (error) {
      console.log('Erro ao carregar os programa fidelidade', error);
    }
  }

}
