export class ModeloAutospotDTO {
    codigo: number;
    descricao: string;
    marca: string;
    modelo: string;
    ano: number;

    constructor()
    constructor(id: number)
    constructor(codigo?: number) {
        this.codigo = codigo;
    }
}