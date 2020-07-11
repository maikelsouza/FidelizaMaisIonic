import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlertaService } from './../../common/service/alerta.service';
import { Usuario } from '../shared/models/usuario';
import { UsuarioService } from './../shared/services/usuario.service';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.scss'],
})
export class UsuarioDetalheComponent implements OnInit {

  private formulario : FormGroup;  
  private id : number;
  private inscricao : Subscription;
  private usuario : Usuario = new Usuario();

  constructor(private alertService: AlertaService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) {

      this.id = this.route.snapshot.params['id'];
     }

  ngOnInit() {
    this.montarCamposTela();
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.buscarPorId();
      }
    );
  }

  public async buscarPorId(): Promise<void> {
    try {
      let usuarioResultado = await this.usuarioService.buscarPorId(this.id);
      if (usuarioResultado.success) {
        this.usuario = usuarioResultado.data;        
        this.formulario = this.formBuilder.group({
          id: [this.usuario.id],
          nome: [this.usuario.nome,Validators.required],
          cpf: [this.usuario.cpf],
          email: [this.usuario.email,[Validators.required, Validators.email]],       
          ativo: [this.usuario.ativo,Validators.required],  
          sexo: [this.usuario.sexo,Validators.required],  
          dataNascimento: [this.usuario.dataNascimento],  
        })
      }      
    } catch (error) {
      console.log('Erro ao carregar o Usuário', error);
    }
  }
  public get nome() {return this.formulario.get('nome')}
  public get email() {return this.formulario.get('email')}
  public get ativo() {return this.formulario.get('ativo')}
  public get sexo() {return this.formulario.get('sexo')}

  async  onSubmit():  Promise<void> {     
    try {    
       let resultado = await this.usuarioService.atualizar(this.formulario.get("id").value,this.formulario.value);
       if (resultado.success){
          await this.usuarioService.notificarUsuarioSalvo();                
          this.alertService.toast('Usuário atualizado com sucesso!');        
          this.router.navigate(['/usuarios']);         
       }
    } catch (error) {
      console.log('Erro ao atualizar o estabelecimento', error);
    }
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe;
  }


  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
        id : [null], nome: [null], ativo: [null], cpf: [null],
         email: [null],sexo: [null],dataNascimento: [null]
    });
  }
}
