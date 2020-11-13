import { AnoModelo } from './ano-modelo';

export class FichaTecnica {

    id?: number;

    anoModelo?: AnoModelo;
    
    potencia?: number;

    torque?: number;

    transmissaoEnum?: any;

    numeroDeMarchas?: number;

    alimentacaoEnum?: any;

    largura?: number;

    altura?: number;

    comprimento?: number;

    tracaoEnum?: any;

    direcaoEnum?: any;

    rodasEnum?: any;

    pneus?: string;

    peso?: number;

    pbt?: number;

    portaMalas?: number;

    tanqueCombustivel?: number;

    quantidadeDeMotoresEletricos?: number;

    potenciaG?: number;

    potenciaE?: number;

    torqueG?: number;

    torqueE?: number;

    cilindrada?: number;

    qtdCilindros?: number;

    qtdValvulas?: number;

    potenciaEletrica?: number;

    torqueEletrico?: number;

    potenciaCombinada?: number;

    torqueCombinado?: number;

    quantidadeDeMotores?: number;

    potenciaCombinadaG?: number;

    potenciaCombinadaE?: number;

    torqueCombinadoG?: number;

    torqueCombinadoE?: number;

    tipoFonteEnergetica?: any;
}