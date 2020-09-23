import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertaService } from './../../common/service/alerta.service';
import { UsuarioService } from './../shared/services/usuario.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
export class UsuarioCadastroComponent implements OnInit {

  formulario : FormGroup;  
  private tipoUsuario : string;  
  inscricao: Subscription;
  private textoConfirmarSenha : String = "NaoSeraEnviadaServidor";  
  tiposSexo = ['Masculino', 'Feminino']; 
  
  

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertService: AlertaService,
    private route: ActivatedRoute,
    private router: Router
    
  ) { }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      id : [null], 
      nome: [null, Validators.required], ativo: [true], 
      cpf: [null], email: [null, [Validators.required, Validators.email]],
      sexo: [null, Validators.required],
      dataNascimento: [null], 
      senha: [null,Validators.required], 
      confirmarSenha: [null, Validators.required], 
      grupoUsuarioId: [null]
    });
  }

  public get nome() {return this.formulario.get('nome')}
  public get email() {return this.formulario.get('email')}
  public get sexo() {return this.formulario.get('sexo')}
  public get senha() {return this.formulario.get('senha')}
  public get confirmarSenha() {return this.formulario.get('confirmarSenha')}

  private validarSenha(): Boolean{
    if (this.formulario.get("senha").value == this.formulario.get("confirmarSenha").value){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit() {
    console.info("ngOnInit - Usuario Cadastro");    
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.tipoUsuario = queryParams['tipoUsuario'];
      }
    ); 
    this.montarCamposTela();
  }

  ngOnDestroy(){      
    console.info("ngOnDestroy - Usuario Cadastro");       
    this.inscricao.unsubscribe();    
  }

  async onSubmit(): Promise<void>{
    try { 
      if (this.validarSenha()){
        const grupoUsuarioId = this.tipoUsuario;
        this.formulario.value.grupoUsuarioId = grupoUsuarioId;
        this.formulario.value.confirmarSenha = this.textoConfirmarSenha;
        if (grupoUsuarioId == '2') { // ESTABELECIMENTOS
          this.salvarUsuarioEstabelecimento();
        }
        if (grupoUsuarioId == '3'){ // CLIENTES
          this.salvarUsuarioCliente();
        }
      }else{
        this.alertService.alert('Campos Diferentes','O campo senha e confirmar senha estão diferentes');
      }
    } catch (error) {
        console.log('Erro ao salvar um Usuario', error);    
    }
  }   

  private async salvarUsuarioEstabelecimento(){    
    const resultado = await this.usuarioService.salvar(this.formulario.value);  
    if (resultado.success){
      this.alertService.toast('Usuário salvo com sucesso!');      
      await this.usuarioService.notificarUsuarioSalvo();                            
      this.router.navigate(['/usuarios']);         
    }  
  }

  private async salvarUsuarioCliente(){
     const resultado = await this.usuarioService.salvarNovoCliente(this.formulario.value);           
    if (resultado.success){
      this.alertService.toast('Usuário salvo com sucesso!');          
      this.router.navigate(['/login']);         
    }                    
  }

}
