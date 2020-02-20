import { CampoItemProgramaFidelidade } from './campo-item-programa-fidelidade';

export class ProgramaFidelidade {

    id: number;
    nome: string;
    descricao: string;
    ativo: boolean;
    dataExpiracao: Date;
    regra: number;    
    estabelecimentoId: number;
    CampoItemProgramaFidelidades: Array<CampoItemProgramaFidelidade>;
}
