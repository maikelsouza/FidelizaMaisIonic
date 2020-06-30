import { Component, OnInit} from '@angular/core';

import { Usuario } from '../usuarios/shared/models/usuario';
import { AutenticadorService } from '../common/service/autenticador.service';

@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss'],
})
export class PrincipalPage  implements OnInit {

  usuarioLogado: Usuario;  

  constructor(){}


ngOnInit(){  
   this.usuarioLogado = AutenticadorService.UsuarioLogado;     
}

}
