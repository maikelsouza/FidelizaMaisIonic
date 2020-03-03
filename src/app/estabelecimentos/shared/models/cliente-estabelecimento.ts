import { Estabelecimento } from './estabelecimento';

export class ClienteEstabelecimento {
        id: number;
        dataCriacao: Date;
        ativo: boolean;
        usuarioId: number;
        estabelecimentoId: number;
}
