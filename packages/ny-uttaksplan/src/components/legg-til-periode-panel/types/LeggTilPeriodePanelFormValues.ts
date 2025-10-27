import { Forelder } from '@navikt/fp-constants';
import { KontoTypeUttak } from '@navikt/fp-types';

export enum HvaVilDuGjøre {
    LEGG_TIL_PERIODE = 'leggTilPeriode',
    LEGG_TIL_OPPHOLD = 'leggTilOpphold',
    LEGG_TIL_FERIE = 'leggTilFerie',
}

export type LeggTilPeriodePanelFormValues = {
    kontoType?: KontoTypeUttak;
    forelder: Forelder;
    fom: string;
    tom: string;
    skalDuJobbe: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
    hvaVilDuGjøre: HvaVilDuGjøre | undefined;
};
