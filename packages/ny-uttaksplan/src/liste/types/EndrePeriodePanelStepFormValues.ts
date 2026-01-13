import { BrukerRolleSak_fpoversikt, KontoTypeUttak, MorsAktivitet } from '@navikt/fp-types';

import { HvaVilDuGjøre } from './LeggTilPeriodePanelFormValues';

export type EndrePeriodePanelStepFormValues = {
    fom: string;
    tom: string;
    kontoType?: KontoTypeUttak;
    forelder?: BrukerRolleSak_fpoversikt;
    skalDuJobbe?: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
    hvaVilDuGjøre?: HvaVilDuGjøre;
    morsAktivitet?: MorsAktivitet;
};
