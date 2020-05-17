import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuarios/shared/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.scss'],
})
export class LogoffComponent implements OnInit {

  constructor(    
    private route: Router
  ) { }

  ngOnInit() {
    // Rever se ao sair vai para uma tela diferente (um novo componente) ou fica na mesma do app.component
    UsuarioService.RemoverLogin();
    this.route.navigate(['/']);         
  }

}
