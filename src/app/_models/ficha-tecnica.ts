import { AnoModelo } from './ano-modelo';

export class FichaTecnica {

    id?: number;

    anoModelo?: AnoModelo;
    
    potencia?: number;

    torque?: number;

    transmissaoEnum?: number;

    numeroDeMarchas?: number;

    alimentacaoEnum?: number;

    largura?: number;

    altura?: number;

    comprimento?: number;

    tracaoEnum?: number;

    direcaoEnum?: number;

    rodasEnum?: number;

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

    tipoFonteEnergetica?: number;
}