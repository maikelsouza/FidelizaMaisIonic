import { AlertaService } from './../../common/service/alerta.service';
import { MidiaSocial } from './../shared/models/midia-social';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { EnderecoEstabelecimento } from '../shared/models/endereco-estabelecimento';
import { TipoEstabelecimentoService } from '../../tipoEstabelecimento/shared/services/tipo-estabelecimento.service';
import { Estabelecimento } from '../shared/models/estabelecimento';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import { TipoEstabelecimento } from 'src/app/tipoEstabelecimento/shared/models/tipo-estabelecimento';
import { Telefone } from '../shared/models/telefone';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuarios/shared/services/usuario.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';

@Component({
  selector: 'app-form-estabelecimento',
  templateUrl: './form-estabelecimento.page.html',
  styleUrls: ['./form-estabelecimento.page.scss'],
  providers:  [ EstabelecimentoService]
})



export class FormEstabelecimentoPage implements OnInit {

  private formulario : FormGroup;  
  enderecoEstabelecimento: EnderecoEstabelecimento = new EnderecoEstabelecimento();
  estabelecimento: Estabelecimento = new Estabelecimento();  
  tipoEstabelecimentos: Array<TipoEstabelecimento> = new Array<TipoEstabelecimento>(); 
  usuariosSemEstabelecimento: Array<Usuario> = new Array<Usuario>(); 
  
  private Telefones : FormArray;
  private MidiaSocials : FormArray;
  private tiposTelefone = ['Celular', 'Fixo']; 

  constructor(public navCtrl: NavController,
    private estabelecimentoSrv: EstabelecimentoService,
    private tipoEstabelecimentoSrv: TipoEstabelecimentoService,
    private formBuilder: FormBuilder,
    private alertSrv: AlertaService,
    private router: Router,
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
      let resultado = await this.estabelecimentoSrv.salvar(this.formulario.value);  
      if (resultado.success){
        this.alertSrv.toast('Estabelecimento salvo com sucesso!');
        this.router.navigate(['/estabelecimentos']);  
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
      nome: [null], cnpj: [null], email: [null],tipoEstabelecimentoId: [null], ativo: [true], usuarioId: [null],
      EnderecoEstabelecimento: this.formBuilder.group({       
        rua: [null], numero: [null], complemento: [null],
        cep: [null], 
                     
        bairro: [null], cidade: [null],
        uf: [null], pais: ["Brasil"]
      }),           
     Telefones : this.formBuilder.array([this.criarItemTelefone()]),
     MidiaSocials : this.formBuilder.array([this.criarItemMidiaSocial()])
    });    
  } 

ngOnInit() {
  this.carregarUsuariosSemEstabelecimentos();
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
