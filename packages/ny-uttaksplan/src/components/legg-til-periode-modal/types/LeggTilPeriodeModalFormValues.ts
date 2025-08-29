import { Forelder, StønadskontoType } from '@navikt/fp-constants';

export enum HvaVilDuGjøre {
    LEGG_TIL_PERIODE = 'leggTilPeriode',
    LEGG_TIL_OPPHOLD = 'leggTilOpphold',
    LEGG_TIL_FERIE = 'leggTilFerie',
}

export type LeggTilPeriodeModalFormValues = {
    kontoType?: StønadskontoType;
    forelder: Forelder;
    fom: string;
    tom: string;
    skalDuJobbe: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
};
