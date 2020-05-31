import { UsuarioService } from './../shared/services/usuario.service';
import { Usuario } from './../shared/models/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss'],
})
export class UsuarioListaComponent implements OnInit {

  private usuarios: Array<Usuario> = new Array<Usuario>(); 

  constructor(private usuarioService: UsuarioService) { 
    
  }
 

  ngOnInit() {
    this.carregarListaUsuarios();

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
