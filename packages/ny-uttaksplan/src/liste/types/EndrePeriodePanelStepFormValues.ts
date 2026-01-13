import { BrukerRolleSak_fpoversikt, KontoTypeUttak, MorsAktivitet } from '@navikt/fp-types';

import { HvaVilDuGjøre } from './LeggTilPeriodePanelFormValues';

export type EndrePeriodePanelStepFormValues = {
    fom: string | undefined;
    tom: string | undefined;
    kontoType: KontoTypeUttak;
    forelder?: BrukerRolleSak_fpoversikt;
    skalDuJobbe: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
    hvaVilDuGjøre: HvaVilDuGjøre;
    morsAktivitet?: MorsAktivitet | undefined;
};
