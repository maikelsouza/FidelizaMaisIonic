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
    UsuarioService.RemoverLogin();
    this.route.navigate(['/']);         
  }

}
