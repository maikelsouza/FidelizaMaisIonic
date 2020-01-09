import { Estabelecimento } from './../shared/models/estabelecimento';
import { AlertaService } from './../../common/service/alerta.service';
import { TipoEstabelecimento } from 'src/app/tipoEstabelecimento/shared/models/tipo-estabelecimento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import {FormBuilder, FormGroup } from '@angular/forms';
import { TipoEstabelecimentoService } from 'src/app/tipoEstabelecimento/shared/services/tipo-estabelecimento.service';



@Component({
  selector: 'app-estabelecimento-detalhe',
  templateUrl: './estabelecimento-detalhe.page.html',
  styleUrls: ['./estabelecimento-detalhe.page.scss'],
})
export class EstabelecimentoDetalhePage implements OnInit {

  private id : number;
  private inscricao : Subscription;
  private estabelecimento : Estabelecimento = new Estabelecimento();
  private formulario : FormGroup;  
  private tipoEstabelecimentos: Array<TipoEstabelecimento> = new Array<TipoEstabelecimento>(); 
  private tiposTelefone = ['Celular', 'Fixo']; 
 

  constructor(private route: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService,
    private formBuilder: FormBuilder,
    private tipoEstabelecimentoSrv: TipoEstabelecimentoService,
    private alertSrv: AlertaService) {

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
    this.carregarTipoEstabelecimento();   
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      id : [null], nome: [null], ativo: [null], cnpj: [null], email: [null],tipoEstabelecimentoId: [null],
      EnderecoEstabelecimentos: this.formBuilder.group({
        id: [null],
         rua: [null], numero: [null], complemento: [null],
         cep: [null], 
         bairro: [null], cidade: [null],
        uf: [null], pais: [null]
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
          id: [this.estabelecimento.id],
          nome: [this.estabelecimento.nome],
          cnpj: [this.estabelecimento.cnpj],
          email: [this.estabelecimento.email],       
          ativo: [this.estabelecimento.ativo],    
          tipoEstabelecimentoId: [this.estabelecimento.tipoEstabelecimentoId],
          EnderecoEstabelecimentos: this.formBuilder.group({
            id: [this.estabelecimento.EnderecoEstabelecimento.id],
            rua: [this.estabelecimento.EnderecoEstabelecimento.rua],
            numero: [this.estabelecimento.EnderecoEstabelecimento.numero],
            complemento: [this.estabelecimento.EnderecoEstabelecimento.complemento],
            cep: [this.estabelecimento.EnderecoEstabelecimento.cep],
            bairro: [this.estabelecimento.EnderecoEstabelecimento.bairro],
            cidade: [this.estabelecimento.EnderecoEstabelecimento.cidade],
            uf: [this.estabelecimento.EnderecoEstabelecimento.uf],
            pais: [this.estabelecimento.EnderecoEstabelecimento.pais]
          }),        
          telefone: this.formBuilder.group({
            telefoneId1: [this.estabelecimento.Telefones.length > 0 ? this.estabelecimento.Telefones[0].id : null],
            telefoneNumero1: [this.estabelecimento.Telefones.length > 0 ? this.estabelecimento.Telefones[0].numero : null],
            telefoneTipo1: [this.estabelecimento.Telefones.length > 0 ? this.estabelecimento.Telefones[0].tipo : null],            
            telefoneId2: [this.estabelecimento.Telefones.length > 1 ? this.estabelecimento.Telefones[1].id : null],            
            telefoneNumero2: [this.estabelecimento.Telefones.length > 1 ? this.estabelecimento.Telefones[1].numero : null],
            telefoneTipo2: [this.estabelecimento.Telefones.length > 1 ?  this.estabelecimento.Telefones[1].tipo : null],
            telefoneId3: [this.estabelecimento.Telefones.length > 2 ? this.estabelecimento.Telefones[2].id : null],
            telefoneNumero3: [this.estabelecimento.Telefones.length > 2 ? this.estabelecimento.Telefones[2].numero : null],
            telefoneTipo3: [this.estabelecimento.Telefones.length > 2 ?  this.estabelecimento.Telefones[2].tipo : null]
          }),
          midiaSocial: this.formBuilder.group({
            midiaSocialId1: [this.estabelecimento.MidiaSocials.length > 0 ? this.estabelecimento.MidiaSocials[0].id : null],
            midiaSocialNome1: [this.estabelecimento.MidiaSocials.length > 0 ? this.estabelecimento.MidiaSocials[0].nome : null],
            midiaSocialUrl1: [this.estabelecimento.MidiaSocials.length > 0 ? this.estabelecimento.MidiaSocials[0].url : null],            
            midiaSocialId2: [this.estabelecimento.MidiaSocials.length > 1 ? this.estabelecimento.MidiaSocials[1].id : null],
            midiaSocialNome2: [this.estabelecimento.MidiaSocials.length > 1 ? this.estabelecimento.MidiaSocials[1].nome : null],
            midiaSocialUrl2: [this.estabelecimento.MidiaSocials.length > 1 ?  this.estabelecimento.MidiaSocials[1].url : null],
            midiaSocialId3: [this.estabelecimento.MidiaSocials.length > 2 ? this.estabelecimento.MidiaSocials[2].id : null],
            midiaSocialNome3: [this.estabelecimento.MidiaSocials.length > 2 ? this.estabelecimento.MidiaSocials[2].nome : null],
            midiaSocialUrl3: [this.estabelecimento.MidiaSocials.length > 2 ?  this.estabelecimento.MidiaSocials[2].url : null]
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

  async  onSubmit():  Promise<void> {     
    try {    
       let resultado = await this.estabelecimentoService.atualizar(this.formulario.get("id").value,this.formulario.value);
       if (resultado.success){
          this.alertSrv.toast('Estabelecimento atualizado com sucesso!');
       }
    } catch (error) {
      console.log('Erro ao atualizar o estabelecimento', error);
    }
  }
 
  
}


