import { PontosClienteProgramaFidelidade } from './pontos-cliente-programa-fidelidade';

export class TotalPontosClienteProgramaFidelidade {

    id: number;
    totalPontos: number;    
    dataResgate: Date; 
    ativo: boolean;
    usuarioId: number;
    programaFidelidadeId: number;   
    PontosClienteProgramaFidelidades: Array<PontosClienteProgramaFidelidade>;
}
