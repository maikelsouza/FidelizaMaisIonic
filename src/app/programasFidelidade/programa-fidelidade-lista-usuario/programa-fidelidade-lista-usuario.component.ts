import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProgramaFidelidadeService } from '../shared/services/programa-fidelidade.service';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { ProgramaFidelidade } from '../shared/models/programa-fidelidade';

@Component({
  selector: 'app-programa-fidelidade-lista-usuario',
  templateUrl: './programa-fidelidade-lista-usuario.component.html',
  styleUrls: ['./programa-fidelidade-lista-usuario.component.scss'],
})
export class ProgramaFidelidadeListaUsuarioComponent implements OnInit {

  private programasFidelidade: Array<ProgramaFidelidade> = new Array<ProgramaFidelidade>(); 

  constructor(
    private formBuilder: FormBuilder,
    private programaFidelidadeService: ProgramaFidelidadeService,
    private alertService: AlertaService  
  ) { }

  ngOnInit() {
    this.carregarListaPorUsuario();
  }

  async carregarListaPorUsuario(): Promise<void> {
    try {       
      let resultado = await this.programaFidelidadeService.buscarPorIdUsuario(1);
      if (resultado.success) {
        this.programasFidelidade = <Array<ProgramaFidelidade>>resultado.data;        
      }
    } catch (error) {
      console.log('Erro ao carregar os programa fidelidade ', error);
    }
  }

}
