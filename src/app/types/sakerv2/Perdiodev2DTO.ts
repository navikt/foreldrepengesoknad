import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export interface Periodev2DTO {
    flerbarnsdager: boolean;
    fom: string;
    tom: string;
    kontoType: StønadskontoType;
    resultat: {
        innvilget: boolean;
    };
    samtidigUttak: number;
    gradering: {
        prosent: number;
    };
}
