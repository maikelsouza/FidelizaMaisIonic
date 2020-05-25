import { Telefone } from '../models/telefone';
import { MidiaSocial } from '../models/midia-social';

export class EstabelecimentoVO {
    id: number;
    nome: string;
    ativo: boolean;
    email: string;
    site: string;
    usuarioEstahAssociado : boolean;
    teleneCelular: string;
    urlMidiaSocial: string;
    Telefones: Array<Telefone>;
    MidiaSocials: Array<MidiaSocial>;

}
