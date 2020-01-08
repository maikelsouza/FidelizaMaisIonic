import { CampoRegistroCartaoFidelidade } from './campo-registro-cartao-fidelidade';

export class CartaoFidelidade {

    id: number;
    nome: string;
    descricao: string;
    premio: string;
    quantidadeMarcacao: number;
    ativo: boolean;
    dataExpiracao: Date;
    usuarioId: number;
    estabelecimentoId: number;    
    CampoRegistroCartaoFidelidades: Array<CampoRegistroCartaoFidelidade>;
}
