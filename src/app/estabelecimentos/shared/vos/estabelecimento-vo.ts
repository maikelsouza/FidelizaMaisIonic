import { Telefone } from '../models/telefone';
import { MidiaSocial } from '../models/midia-social';
import { ProgramaFidelidade } from 'src/app/programasFidelidade/shared/models/programa-fidelidade';

export class EstabelecimentoVO {
    id: number;
    nome: string;
    ativo: boolean;
    email: string;
    site: string;
    usuarioEstahAssociado : boolean;    
    teleneCelular: string;
    urlMidiaSocial: string;
    totalPontosCliente: number;
    Telefones: Array<Telefone>;
    MidiaSocials: Array<MidiaSocial>;
    programaFidelidadeAlias: Array<ProgramaFidelidade>;

}
