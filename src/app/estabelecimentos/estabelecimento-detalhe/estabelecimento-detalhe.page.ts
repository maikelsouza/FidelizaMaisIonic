import { Estabelecimento } from './../shared/models/estabelecimento';
import { AlertaService } from './../../common/service/alerta.service';
import { TipoEstabelecimento } from 'src/app/tipoEstabelecimento/shared/models/tipo-estabelecimento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEstabelecimentoService } from 'src/app/tipoEstabelecimento/shared/services/tipo-estabelecimento.service';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { Usuario } from 'src/app/usuarios/shared/models/usuario';
import { MidiaSocial } from '../shared/models/midia-social';
import { Telefone } from '../shared/models/telefone';



@Component({
  selector: 'app-estabelecimento-detalhe',
  templateUrl: './estabelecimento-detalhe.page.html',
  styleUrls: ['./estabelecimento-detalhe.page.scss'],
})
export class EstabelecimentoDetalhePage implements OnInit {

  private id: number;
  private tipoUsuario: string;
  private inscricao: Subscription;
  private estabelecimento: Estabelecimento = new Estabelecimento();
  private formulario: FormGroup;
  private tipoEstabelecimentos: Array<TipoEstabelecimento> = new Array<TipoEstabelecimento>();
  private tiposTelefone = ['Celular', 'Fixo'];
  usuarioLogado: Usuario;
  private midiaSocialStr: string = 'midiaSocial';
  private telefoneStr: string = 'telefone';


  constructor(private route: ActivatedRoute,
    private router: Router,
    private estabelecimentoService: EstabelecimentoService,
    private formBuilder: FormBuilder,
    private tipoEstabelecimentoSrv: TipoEstabelecimentoService,
    private alertSrv: AlertaService) { }

  ngOnInit() {
    this.usuarioLogado = AutenticadorService.UsuarioLogado;
    this.montarCamposTela();
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.buscarPorId();
      }
    );

    this.carregarTipoEstabelecimento();
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      id: [null], nome: [null, Validators.required],
      ativo: [null, Validators.required], cnpj: [null],
      email: [null, Validators.email],
      tipoEstabelecimentoId: [null, Validators.required],
      EnderecoEstabelecimentos: this.formBuilder.group({
        id: [null],
        rua: [null, Validators.required], numero: [null, Validators.required],
        complemento: [null], cep: [null, Validators.required],
        bairro: [null, Validators.required], cidade: [null, Validators.required],
        uf: [null, Validators.required], pais: [null, Validators.required]
      }),
      telefone: this.formBuilder.group({
        telefoneId1: [null], telefoneNumero1: [null], telefoneTipo1: [null],
        //telefoneId2: [null], telefoneNumero2: [null], telefoneTipo2: [null],        
      }),
      midiaSocial: this.formBuilder.group({
        midiaSocialNome1: [null], midiaSocialUrl1: [null],
        //midiaSocialNome2: [null], midiaSocialUrl2: [null],
        //midiaSocialNome3: [null], midiaSocialUrl3: [null]
      })
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe;
  }

  public async buscarPorId(): Promise<void> {
    try {
      let estabelecimentoResultado = await this.estabelecimentoService.buscarPorId(this.id);
      if (estabelecimentoResultado.success) {
        this.estabelecimento = estabelecimentoResultado.data;
        this.formulario = this.formBuilder.group({
          id: [this.estabelecimento.id, Validators.required],
          nome: [this.estabelecimento.nome, Validators.required],
          cnpj: [this.estabelecimento.cnpj],
          email: [this.estabelecimento.email, Validators.email],
          ativo: [this.estabelecimento.ativo, Validators.required],
          tipoEstabelecimentoId: [this.estabelecimento.tipoEstabelecimentoId, Validators.required],
          EnderecoEstabelecimentos: this.formBuilder.group({
            id: [this.estabelecimento.EnderecoEstabelecimento.id],
            rua: [this.estabelecimento.EnderecoEstabelecimento.rua, Validators.required],
            numero: [this.estabelecimento.EnderecoEstabelecimento.numero, Validators.required],
            complemento: [this.estabelecimento.EnderecoEstabelecimento.complemento],
            cep: [this.estabelecimento.EnderecoEstabelecimento.cep, Validators.required],
            bairro: [this.estabelecimento.EnderecoEstabelecimento.bairro, Validators.required],
            cidade: [this.estabelecimento.EnderecoEstabelecimento.cidade, Validators.required],
            uf: [this.estabelecimento.EnderecoEstabelecimento.uf, Validators.required],
            pais: [this.estabelecimento.EnderecoEstabelecimento.pais, Validators.required]
          }),
          telefone: this.formBuilder.group({
            telefoneId1: [this.estabelecimento.Telefones.length > 0 ? this.estabelecimento.Telefones[0].id : null],
            telefoneNumero1: [this.estabelecimento.Telefones.length > 0 ? this.estabelecimento.Telefones[0].numero : null],
            telefoneTipo1: [this.estabelecimento.Telefones.length > 0 ? this.estabelecimento.Telefones[0].tipo : null],
            telefoneId2: [this.estabelecimento.Telefones.length > 1 ? this.estabelecimento.Telefones[1].id : null],
            telefoneNumero2: [this.estabelecimento.Telefones.length > 1 ? this.estabelecimento.Telefones[1].numero : null],
            telefoneTipo2: [this.estabelecimento.Telefones.length > 1 ? this.estabelecimento.Telefones[1].tipo : null],
            telefoneId3: [this.estabelecimento.Telefones.length > 2 ? this.estabelecimento.Telefones[2].id : null],
            telefoneNumero3: [this.estabelecimento.Telefones.length > 2 ? this.estabelecimento.Telefones[2].numero : null],
            telefoneTipo3: [this.estabelecimento.Telefones.length > 2 ? this.estabelecimento.Telefones[2].tipo : null]
          }),
          midiaSocial: this.formBuilder.group({
            midiaSocialId1: [this.estabelecimento.MidiaSocials.length > 0 ? this.estabelecimento.MidiaSocials[0].id : null],
            midiaSocialNome1: [this.estabelecimento.MidiaSocials.length > 0 ? this.estabelecimento.MidiaSocials[0].nome : null],
            midiaSocialUrl1: [this.estabelecimento.MidiaSocials.length > 0 ? this.estabelecimento.MidiaSocials[0].url : null],
            midiaSocialId2: [this.estabelecimento.MidiaSocials.length > 1 ? this.estabelecimento.MidiaSocials[1].id : null],
            midiaSocialNome2: [this.estabelecimento.MidiaSocials.length > 1 ? this.estabelecimento.MidiaSocials[1].nome : null],
            midiaSocialUrl2: [this.estabelecimento.MidiaSocials.length > 1 ? this.estabelecimento.MidiaSocials[1].url : null],
            midiaSocialId3: [this.estabelecimento.MidiaSocials.length > 2 ? this.estabelecimento.MidiaSocials[2].id : null],
            midiaSocialNome3: [this.estabelecimento.MidiaSocials.length > 2 ? this.estabelecimento.MidiaSocials[2].nome : null],
            midiaSocialUrl3: [this.estabelecimento.MidiaSocials.length > 2 ? this.estabelecimento.MidiaSocials[2].url : null]
          })
        })
      }
    } catch (error) {
      console.log('Erro ao carregar o estabelecimento', error);
    }
  }

  async carregarTipoEstabelecimento(): Promise<void> {
    try {
      let tipoEstabelecimentoResulta = await this.tipoEstabelecimentoSrv.buscarTodosAtivos();
      if (tipoEstabelecimentoResulta.success) {
        this.tipoEstabelecimentos = <Array<TipoEstabelecimento>>tipoEstabelecimentoResulta.data;
      }
    } catch (error) {
      console.log('Erro ao carregar os tipos de estabelecimentos', error);
    }
  }

  async  onSubmit(): Promise<void> {
    try {
      if (this.validarObrigatoriedadeTelefones()) {
        this.alertSrv.alert('Campo Obrigatório!', 'O campo telefone é obrigatório');
      } else if (this.validarObrigatoriedadeMidiaSocial()) {
        this.alertSrv.alert('Campo Obrigatório!', 'O campo mídia social é obrigatório');
      } else {      
        let resultado = await this.estabelecimentoService.atualizar(this.formulario.get("id").value, this.formulario.value);
        if (resultado.success) {
          this.alertSrv.toast('Estabelecimento atualizado com sucesso!');
          await this.estabelecimentoService.notificarListaEstabelecimento();
          this.router.navigate(['/estabelecimento/lista'], { queryParams: { tipoUsuario: this.usuarioLogado[0].GrupoUsuario.nome } });
        }
      }
    } catch (error) {
      console.log('Erro ao atualizar o estabelecimento', error);
    }
  }

  validarObrigatoriedadeTelefones(): boolean {
    let resultado: boolean = false;
    const { telefoneNumero1, telefoneTipo1 } = this.formulario.get(this.telefoneStr).value;
   
    // Situação onde foi inserido o número telefone, mas não foi o tipo
    if ((telefoneNumero1 != '' && telefoneNumero1 != null && telefoneNumero1 != undefined)
      && (telefoneTipo1 == null || telefoneTipo1 == '' || telefoneTipo1 == undefined)) {
      resultado = true;
    }
    // Situação onde não foi inserido o número do telefone, mas foi o tipo
    if ((telefoneNumero1 == null || telefoneNumero1 == '' || telefoneNumero1 == undefined) 
      && (telefoneTipo1 != '' && telefoneTipo1 != null && telefoneTipo1 != undefined)) {
      resultado = true;
    }
    return resultado;
  }

  validarObrigatoriedadeMidiaSocial(): boolean {    
    let resultado: boolean = false;
    const { midiaSocialNome1, midiaSocialUrl1 } = this.formulario.get(this.midiaSocialStr).value;
    // Situação onde foi inserido o nome, mas não foi a url
    if ((midiaSocialNome1 != '' && midiaSocialNome1 != null && midiaSocialNome1 != undefined)
      && (midiaSocialUrl1 == null || midiaSocialUrl1 == '' || midiaSocialUrl1 == undefined)) {
      resultado = true;
    }
    // Situação onde não foi inserido o nome, mas foi a url
    if ((midiaSocialNome1 == null || midiaSocialNome1 == '' || midiaSocialNome1 == undefined) 
      && (midiaSocialUrl1 != '' && midiaSocialUrl1 != null && midiaSocialUrl1 != undefined)) {
      resultado = true;
    }
    return resultado;
  }

  verificaMidiaSocialvazia(): boolean {
    let resultado: boolean = false;
    const { midiaSocialNome1, midiaSocialUrl1 } = this.formulario.get(this.midiaSocialStr).value;
    if ((midiaSocialNome1 == '' || midiaSocialNome1 == null && midiaSocialNome1 == undefined)
      && (midiaSocialUrl1 == '' || midiaSocialUrl1 == null || midiaSocialUrl1 == undefined)) {
      resultado = true;
    }
    return resultado;
  }

  verificaTelefonevazio(): boolean {
    let resultado: boolean = false;
    const { telefoneNumero1, telefoneTipo1 } = this.formulario.get(this.telefoneStr).value;
    if ((telefoneNumero1 == '' || telefoneNumero1 == null && telefoneNumero1 == undefined)
      && (telefoneTipo1 == '' || telefoneTipo1 == null || telefoneTipo1 == undefined)) {
      resultado = true;
    }
    return resultado;
  }

  public get nome() { return this.formulario.get('nome') }
  public get email() { return this.formulario.get('email') }
  public get rua() { return this.formulario.get('EnderecoEstabelecimentos.rua') }
  public get numero() { return this.formulario.get('EnderecoEstabelecimentos.numero') }
  public get cep() { return this.formulario.get('EnderecoEstabelecimentos.cep') }
  public get bairro() { return this.formulario.get('EnderecoEstabelecimentos.bairro') }
  public get cidade() { return this.formulario.get('EnderecoEstabelecimentos.cidade') }
  public get uf() { return this.formulario.get('EnderecoEstabelecimentos.uf') }
  public get pais() { return this.formulario.get('EnderecoEstabelecimentos.pais') }
  public get tipoEstabelecimentoId() { return this.formulario.get('tipoEstabelecimentoId') }
  public get ativo() { return this.formulario.get('ativo') }



}


