import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/usuarios/shared/services/usuario.service';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { Estabelecimento } from 'src/app/estabelecimentos/shared/models/estabelecimento';
import { EstabelecimentoService } from 'src/app/estabelecimentos/shared/services/estabelecimento.service';

@Component({
  selector: 'app-pontuar-cliente-cadastro',
  templateUrl: './pontuar-cliente-cadastro.component.html',
  styleUrls: ['./pontuar-cliente-cadastro.component.scss'],
})
export class PontuarClienteCadastroComponent implements OnInit {

  private formulario : FormGroup;  
  private usuarioLogado: Usuario;
  estabelecimentos: Array<Estabelecimento> = new Array<Estabelecimento>(); 

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private estabelecimentoService : EstabelecimentoService,
    
  ) { }

  ngOnInit() {
    this.usuarioLogado = AutenticadorService.UsuarioLogado;      
    this.montarCamposTela();
    this.carregarListaEstabelecimento();
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      email: [null]
    });    
  } 

  async pesquisarUsuario(): Promise<void> {
    try {
      let IdEstabelecimento: number = Number(this.estabelecimentos[0].id);      
      let tipoEstabelecimentoResulta = await this.estabelecimentoService.buscarPorIdEstabelecimentoEEmail(IdEstabelecimento, this.formulario.get("email").value);
      if (tipoEstabelecimentoResulta.success) {
        console.log("MAIKEL "+tipoEstabelecimentoResulta.data);

      }
    } catch (error) {
      console.log('Erro ao carregar os tipos de estabelecimentos', error);
    }
  }
  
  async carregarListaEstabelecimento(): Promise<void> {
    try {
      let estabelecimentoResultado = undefined;
      estabelecimentoResultado = await this.estabelecimentoService.buscarPorIdUsuario(this.usuarioLogado[0].id);
      if (estabelecimentoResultado.success) {
        this.estabelecimentos = <Array<Estabelecimento>>estabelecimentoResultado.data;
      }
    } catch (error) {
      console.log('Erro ao carregar os estabelecimentos', error);
    }
  }

}
