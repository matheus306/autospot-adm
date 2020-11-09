import { ItemSerie } from '@app/_models';
import { FichaTecnica } from './ficha-tecnica';
export class AnoModelo {
    id?: number;
    ano?: number;
    Label?: string;
    Value?: string;
    itensDeSerie?: Array<ItemSerie>
    fichaTecnica?: Array<FichaTecnica>
}