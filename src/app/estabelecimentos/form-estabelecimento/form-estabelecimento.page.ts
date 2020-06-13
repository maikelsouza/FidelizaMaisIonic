import { AlertaService } from './../../common/service/alerta.service';
import { MidiaSocial } from './../shared/models/midia-social';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { EnderecoEstabelecimento } from '../shared/models/endereco-estabelecimento';
import { TipoEstabelecimentoService } from '../../tipoEstabelecimento/shared/services/tipo-estabelecimento.service';
import { Estabelecimento } from '../shared/models/estabelecimento';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import { TipoEstabelecimento } from 'src/app/tipoEstabelecimento/shared/models/tipo-estabelecimento';
import { Telefone } from '../shared/models/telefone';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuarios/shared/services/usuario.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { Subscription } from 'rxjs';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';

@Component({
  selector: 'app-form-estabelecimento',
  templateUrl: './form-estabelecimento.page.html',
  styleUrls: ['./form-estabelecimento.page.scss'],  
})



export class FormEstabelecimentoPage implements OnInit {

  private formulario : FormGroup;  
  private inscricao: Subscription;
  enderecoEstabelecimento: EnderecoEstabelecimento = new EnderecoEstabelecimento();
  estabelecimento: Estabelecimento = new Estabelecimento();  
  tipoEstabelecimentos: Array<TipoEstabelecimento> = new Array<TipoEstabelecimento>(); 
  usuariosSemEstabelecimento: Array<Usuario> = new Array<Usuario>(); 
  tipoUsuario : string;
  usuarioLogado: Usuario;
  
  private Telefones : FormArray;
  private MidiaSocials : FormArray;
  private tiposTelefone = ['Celular', 'Fixo']; 

  private midiaSocialStr : string = 'MidiaSocials'; 
  private telefoneStr : string = 'Telefones'; 

  

  constructor(public navCtrl: NavController,
    private estabelecimentoSrv: EstabelecimentoService,
    private tipoEstabelecimentoSrv: TipoEstabelecimentoService,
    private formBuilder: FormBuilder,
    private alertSrv: AlertaService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
   ) {
     this.estabelecimento.EnderecoEstabelecimento = this.enderecoEstabelecimento;
     this.estabelecimento.Telefones = new Array();  
     this.estabelecimento.MidiaSocials = new Array();  
     this.carregarTipoEstabelecimento();
     this.montarCamposTela();
    /*  this.Telefones = this.formulario.get('Telefones') as FormArray;
     this.Telefones.push(this.criarItemTelefone());
     this.MidiaSocials = this.formulario.get('MidiaSocials') as FormArray;
     this.MidiaSocials.push(this.criarItemMidiaSocial());   */
  }
  
  async onSubmit(): Promise<void>{
    try {       
      
      if (this.validarObrigatoriedadeTelefones()){        
        this.alertSrv.alert('Campo Obrigatório', 'O campo telefone é obrigatório');
      }else if (this.validarObrigatoriedadeMidiaSocial()){
        this.alertSrv.alert('Campo Obrigatório','O campo mídia social é obrigatório');
      }else{
        // Ver como resolver os casos onde um objeto associado não foi preenchido. Se tem como resolver no sequelize ou com o angular
        if (this.verificaMidiaSocialvazia()){
          this.formulario.removeControl(this.midiaSocialStr);
        }
        if (this.verificaTelefonevazio()){
          this.formulario.removeControl(this.telefoneStr);
        }
        
        let resultado = await this.estabelecimentoSrv.salvar(this.formulario.value);          
        if (resultado.success){
            this.alertSrv.toast('Estabelecimento salvo com sucesso!');
            await this.estabelecimentoSrv.notificarListaEstabelecimento();            
            this.router.navigate(['/estabelecimento/lista'],{ queryParams: { tipoUsuario: this.usuarioLogado[0].GrupoUsuario.nome } });                      
          }
      }    
    } catch (error) {
        console.log('Erro ao salvar um Estabelecimento', error);    
    }
  }   
   

  async carregarTipoEstabelecimento(): Promise<void> {
    try {       
      let tipoEstabelecimentoResultado = await this.tipoEstabelecimentoSrv.buscarTodosAtivos();
      if (tipoEstabelecimentoResultado.success) {
        this.tipoEstabelecimentos = <Array<TipoEstabelecimento>>tipoEstabelecimentoResultado.data;
      }
    } catch (error) {
      console.log('Erro ao carregar os tipos de estabelecimentos', error);
    }
  } 

  async carregarUsuariosSemEstabelecimentos(): Promise<void> {
    try {       
      const usuariosSemEstabelecimentosResultado = await this.usuarioService.buscarSemEstabelecimentosAssociados();
      if (usuariosSemEstabelecimentosResultado.success) {
        this.usuariosSemEstabelecimento = <Array<Usuario>>usuariosSemEstabelecimentosResultado.data;
      }
    } catch (error) {
      console.log('Erro ao carregar os usuários sem estabelecimento', error);
    }
  } 
 
  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required], cnpj: [null],
      email: [null,Validators.email], 
      tipoEstabelecimentoId: [null, Validators.required],
      ativo: [true, Validators.required], 
      usuarioId: [null, Validators.required],
      site: [null], 
      EnderecoEstabelecimento: this.formBuilder.group({       
        rua: [null,Validators.required], numero: [null,Validators.required], complemento: [null],
        cep: [null,Validators.required],                      
        bairro: [null, Validators.required], cidade: [null,Validators.required],
        uf: [null,Validators.required], pais: ["Brasil",Validators.required]
      }),           
     Telefones : this.formBuilder.array([this.criarItemTelefone()]),
     MidiaSocials : this.formBuilder.array([this.criarItemMidiaSocial()])
    });    
  } 

  validarObrigatoriedadeTelefones(): boolean{
    const telefones = <Array<Telefone>>this.formulario.get(this.telefoneStr).value;
    let resultado : boolean = false; 
       if (telefones){
        telefones.forEach(element => {
          if(element.numero == '' && element.tipo == '' ){
            resultado = false;
          }
          if (element.numero != '' && element.tipo == ''){
            resultado = true;
          } 
          if (element.numero == '' && element.tipo != ''){
            resultado = true;
          } 
        });
      } 
      return resultado; 
  }

  validarObrigatoriedadeMidiaSocial(): boolean{
    const midiaSocials = <Array<MidiaSocial>>this.formulario.get(this.midiaSocialStr).value;
    let resultado : boolean = false; 
      if (midiaSocials){
         midiaSocials.forEach(element => {
          if(element.nome == '' && element.url == '' ){
            resultado = false;
          }
          if (element.nome != '' && element.url == ''){
            resultado = true;
          } 
          if (element.nome == '' && element.url != ''){
            resultado = true;
          } 
        });
      }
      return resultado; 
  }

  verificaMidiaSocialvazia(): boolean{
    const midiaSocials = <Array<MidiaSocial>>this.formulario.get(this.midiaSocialStr).value;
    let resultado : boolean = false; 
      if (midiaSocials){
         midiaSocials.forEach(element => {
          if(element.nome == '' && element.url == '' ){
            resultado = true;
          }          
        });
      }
      return resultado; 
  }

  verificaTelefonevazio(): boolean{
    const telefones = <Array<Telefone>>this.formulario.get(this.telefoneStr).value;
    let resultado : boolean = false; 
      if (telefones){
         telefones.forEach(element => {
          if(element.numero == '' && element.tipo == '' ){
            resultado = true;
          }          
        });
      }
      return resultado; 
  } 

  public get nome() {return this.formulario.get('nome')}
  public get email() {return this.formulario.get('email')}
  public get rua() {return this.formulario.get('EnderecoEstabelecimento.rua')}
  public get numero() {return this.formulario.get('EnderecoEstabelecimento.numero')}
  public get cep() {return this.formulario.get('EnderecoEstabelecimento.cep')}
  public get bairro() {return this.formulario.get('EnderecoEstabelecimento.bairro')}
  public get cidade() {return this.formulario.get('EnderecoEstabelecimento.cidade')}
  public get uf() {return this.formulario.get('EnderecoEstabelecimento.uf')}
  public get pais() {return this.formulario.get('EnderecoEstabelecimento.pais')}
  public get tipoEstabelecimentoId() {return this.formulario.get('tipoEstabelecimentoId')}
  public get ativo() {return this.formulario.get('ativo')}
  public get usuarioId() {return this.formulario.get('usuarioId')}  

ngOnInit() {
  this.usuarioLogado = AutenticadorService.UsuarioLogado;      
  this.inscricao = this.route.queryParams.subscribe(
    (queryParams: any) => {
      this.tipoUsuario = queryParams['tipoUsuario'];
    }
  ); 
  this.carregarUsuariosSemEstabelecimentos(); 
}

ngOnDestroy() {
  this.inscricao.unsubscribe;
}

criarItemTelefone(): FormGroup {  
    return this.formBuilder.group({
          numero: '',          
          tipo: ''      
      });
  } 

  criarItemMidiaSocial(): FormGroup {  
    return this.formBuilder.group({
          nome: '',
          url: ''      
      });
  } 
}
