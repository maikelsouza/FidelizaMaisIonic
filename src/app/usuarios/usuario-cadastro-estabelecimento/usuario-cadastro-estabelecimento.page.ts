import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../shared/services/usuario.service';
import { AlertaService } from 'src/app/common/service/alerta.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuario-cadastro-estabelecimento',
  templateUrl: './usuario-cadastro-estabelecimento.page.html',
  styleUrls: ['./usuario-cadastro-estabelecimento.page.scss'],
})
export class UsuarioCadastroEstabelecimentoPage implements OnInit {


  private formulario : FormGroup;  

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertService: AlertaService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.montarCamposTela();
  }

  public get nome() {return this.formulario.get('nome')}
  public get email() {return this.formulario.get('email')}
  public get sexo() {return this.formulario.get('sexo')}


  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      id : [null], 
      nome: [null, Validators.required], ativo: [true], 
      cpf: [null], email: [null, [Validators.required, Validators.email]],
      sexo: [null, Validators.required],
      dataNascimento: [null], 
      grupoUsuarioId: [3]
    });
  }

  async onSubmit(): Promise<void> {
    try {
      const resultado = await this.usuarioService.salvarNovoClienteEstabelecimento(this.formulario.value);
      if (resultado.success) {
        this.alertService.toast('Cliente cadastrado com sucesso!');
        this.navController.navigateRoot(['/pontosClientePontuar']);
      }      
    } catch (error) {
      console.log('Erro ao cadastrar um cliente', error);
    }
  }

}
