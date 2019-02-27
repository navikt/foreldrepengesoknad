import { ValidertPeriode } from 'app/redux/reducers/uttaksplanValideringReducer';
import { InjectedIntl } from 'react-intl';
import { Advarsel } from 'app/components/periodeliste/elements/PeriodelisteItemHeader';
import getMessage from 'common/util/i18nUtils';
import { UttaksplanIkonKeys } from 'app/components/uttaksplan-ikon/UttaksplanIkon';

export const getAdvarselForPeriode = (validertPeriode: ValidertPeriode, intl: InjectedIntl): Advarsel | undefined => {
    if (validertPeriode === undefined) {
        return;
    }

    if (validertPeriode.valideringsfeil.length > 0) {
        return {
            type: 'feil',
            beskrivelse: getMessage(intl, `uttaksplan.validering.feil.${validertPeriode.valideringsfeil[0].feilKey}`)
        };
    }
    if (validertPeriode.overlappendePerioder.length > 0) {
        return {
            type: 'feil',
            beskrivelse: getMessage(intl, `periodeliste.overlappendePeriode`)
        };
    }
    if (validertPeriode.advarsler.length > 0) {
        const advarsel = validertPeriode.advarsler[0];
        return {
            type: 'advarsel',
            beskrivelse: getMessage(intl, `uttaksplan.validering.advarsel.${advarsel.advarselKey}`)
        };
    }
    return undefined;
};

export const getIkonForAdvarsel = (advarsel: Advarsel): UttaksplanIkonKeys => {
    if (advarsel.type === 'advarsel') {
        return UttaksplanIkonKeys.advarsel;
    }

    return UttaksplanIkonKeys.feil;
};
