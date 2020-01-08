import { TipoEstabelecimento } from 'src/app/tipoEstabelecimento/shared/models/tipo-estabelecimento';
import { MidiaSocial } from './midia-social';
import { Telefone } from './telefone';
import { EnderecoEstabelecimento } from './endereco-estabelecimento';
export class Estabelecimento {
    id: string;
    nome: string;
    linkLogo: string;
    cnpj: string;
    ativo: boolean;
    email: string;
    EnderecoEstabelecimento: EnderecoEstabelecimento;    
    TipoEstabelecimento: TipoEstabelecimento;    
    Telefones: Array<Telefone>;
    MidiaSocials: Array<MidiaSocial>;
    tipoEstabelecimentoId: any;   
}
