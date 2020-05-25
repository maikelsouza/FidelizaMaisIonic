import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstabelecimentoService } from '../shared/services/estabelecimento.service';
import { Estabelecimento } from '../shared/models/estabelecimento';
import { EstabelecimentoVO } from '../shared/vos/estabelecimento-vo';

@Component({
  selector: 'app-estabelecimento-visualizar',
  templateUrl: './estabelecimento-visualizar.component.html',
  styleUrls: ['./estabelecimento-visualizar.component.scss'],
})
export class EstabelecimentoVisualizarComponent implements OnInit {

    
  estabelecimentoVO : EstabelecimentoVO;
  
  constructor(    
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    this.estabelecimentoVO = nav.extras.state.estabelecimentoVO; 
   }

  ngOnInit() {
   
   
  } 

}
