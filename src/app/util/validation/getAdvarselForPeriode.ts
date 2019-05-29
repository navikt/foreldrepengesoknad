import { InjectedIntl } from 'react-intl';
import { UttaksplanIkonKeys } from 'app/components/uttaksplan-ikon/UttaksplanIkon';
import { VeilederMessage } from 'app/components/veileder-info/types';

export const getVeilederMeldingForPeriode = (meldinger: VeilederMessage[], intl: InjectedIntl): VeilederMessage => {
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
