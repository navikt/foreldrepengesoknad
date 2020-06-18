import { VeilederMessage } from 'app/components/veilederInfo/types';
import { UttaksplanIkonKeys } from 'app/components/ikoner/uttaksplanIkon/UttaksplanIkon';

export const getVeilederMeldingForPeriode = (meldinger: VeilederMessage[]): VeilederMessage => {
    return meldinger[0];
};

export const getIkonForVeilederMelding = (melding: VeilederMessage): UttaksplanIkonKeys => {
    switch (melding.type) {
        case 'feil':
            return UttaksplanIkonKeys.feil;
        case 'advarsel':
            return UttaksplanIkonKeys.advarsel;
        default:
            return UttaksplanIkonKeys.info;
    }
};
