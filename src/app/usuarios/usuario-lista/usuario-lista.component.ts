import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsuarioService } from './../shared/services/usuario.service';
import { Usuario } from './../shared/models/usuario';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss'],
})
export class UsuarioListaComponent implements OnInit{

  usuarios: Array<Usuario> = new Array<Usuario>(); 
  private inscricaoCarregarListaUsuarios : Subscription;

  constructor(private usuarioService: UsuarioService) { }
 

  ngOnInit() {    
    console.info("ngOnInit - usuario-lista");
    this.inscricaoCarregarListaUsuarios = this.usuarioService.emitirUsuarioCriado.subscribe(
        () => {
          this.carregarListaUsuarios();
        }
      
      );
      this.carregarListaUsuarios();
  }  

  ngOnDestroy(): void {    
    console.info("ngOnDestroy - usuario-lista");
    this.inscricaoCarregarListaUsuarios.unsubscribe();
  }

  async carregarListaUsuarios(): Promise<void> {
    try {       
      let usuariosResultado = await this.usuarioService.buscarTodos();
      if (usuariosResultado.success) {
        this.usuarios = <Array<Usuario>>usuariosResultado.data;        
      }
    } catch (error) {
      console.log('Erro ao carregar os usuarios', error);
    }
  }

  
}
