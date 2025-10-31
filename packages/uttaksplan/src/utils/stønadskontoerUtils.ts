import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { Forelder, NavnPåForeldre } from '@navikt/fp-common';
import { KontoDto_fpoversikt, KontoTypeUttak_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen, capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

import { getForelderNavn } from './periodeUtils';

export const getFiltrerteVelgbareStønadskontotyper = (
    valgbareKontoer: KontoTypeUttak_fpoversikt[],
    periodeFom: Date | undefined,
    familiehendelsesdato: Date,
): KontoTypeUttak_fpoversikt[] => {
    if (!periodeFom) {
        return valgbareKontoer;
    }
    const uttaksdagFamiliehendelse = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const periodenStarterFørFødsel = dayjs(periodeFom).isBefore(dayjs(uttaksdagFamiliehendelse), 'd');
    const kontoer = periodenStarterFørFødsel
        ? valgbareKontoer.filter((kontoType) => kontoType === 'FELLESPERIODE' || kontoType === 'FORELDREPENGER')
        : valgbareKontoer;

    return kontoer;
};

export const getVelgbareStønadskontotyper = (stønadskontoTyper: KontoDto_fpoversikt[]): KontoTypeUttak_fpoversikt[] =>
    stønadskontoTyper
        .filter(
            (kontoType) =>
                kontoType.konto === 'FELLESPERIODE' ||
                kontoType.konto === 'FEDREKVOTE' ||
                kontoType.konto === 'MØDREKVOTE' ||
                kontoType.konto === 'FORELDREPENGER' ||
                kontoType.konto === 'AKTIVITETSFRI_KVOTE',
        )
        .map((kontoType) => kontoType.konto);

export const getStønadskontoNavn = (
    intl: IntlShape,
    konto: KontoTypeUttak_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    if ((erFarEllerMedmor && konto === 'FEDREKVOTE') || (!erFarEllerMedmor && konto === 'MØDREKVOTE')) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.dinKvote' });
    }
    let navn;

    switch (konto) {
        case 'MØDREKVOTE':
            navn = navnPåForeldre.mor;
            break;
        case 'FEDREKVOTE':
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }

    if (navn) {
        return intl.formatMessage(
            { id: 'uttaksplan.stønadskontotype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) },
        );
    }

    if (erFarEllerMedmor === true && erAleneOmOmsorg === false) {
        if (konto === 'AKTIVITETSFRI_KVOTE') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        if (konto === 'FORELDREPENGER') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR' });
        }
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getUttakAnnenPartStønadskontoNavn = (
    intl: IntlShape,
    konto: KontoTypeUttak_fpoversikt,
    periodeForelder: Forelder,
    navnPåForeldre: NavnPåForeldre,
    samtidigUttakProsent: string | undefined,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    const forelderNavn = getForelderNavn(periodeForelder, navnPåForeldre);
    if (samtidigUttakProsent !== undefined) {
        const navn = getNavnGenitivEierform(forelderNavn, intl.locale);
        const intlTekst =
            konto === 'FELLESPERIODE'
                ? 'uttaksplan.periodeAnnenPart.tittel.gradertEllerSamtidigUttakFellesperiode'
                : 'uttaksplan.periodeAnnenPart.tittel.gradertEllerSamtidigUttak';
        return intl.formatMessage(
            { id: intlTekst },
            {
                navn: capitalizeFirstLetter(navn),
                prosent: samtidigUttakProsent,
            },
        );
    }
    return getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg);
};
