import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { Forelder, NavnPåForeldre, StønadskontoType } from '@navikt/fp-common';
import { Stønadskonto } from '@navikt/fp-types/src/TilgjengeligeStønadskontoer';
import { Uttaksdagen, capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

import { getForelderNavn } from './periodeUtils';

export const getFiltrerteVelgbareStønadskontotyper = (
    valgbareKontoer: StønadskontoType[],
    periodeFom: Date | undefined,
    familiehendelsesdato: Date,
): StønadskontoType[] => {
    if (!periodeFom) {
        return valgbareKontoer;
    }
    const uttaksdagFamiliehendelse = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const periodenStarterFørFødsel = dayjs(periodeFom).isBefore(dayjs(uttaksdagFamiliehendelse), 'd');
    const kontoer = periodenStarterFørFødsel
        ? valgbareKontoer.filter(
              (kontoType) =>
                  kontoType === StønadskontoType.Fellesperiode || kontoType === StønadskontoType.Foreldrepenger,
          )
        : valgbareKontoer;

    return kontoer;
};

export const getVelgbareStønadskontotyper = (stønadskontoTyper: Stønadskonto[]): StønadskontoType[] =>
    stønadskontoTyper
        .filter(
            (kontoType) =>
                kontoType.konto === StønadskontoType.Fellesperiode ||
                kontoType.konto === StønadskontoType.Fedrekvote ||
                kontoType.konto === StønadskontoType.Mødrekvote ||
                kontoType.konto === StønadskontoType.Foreldrepenger ||
                kontoType.konto === StønadskontoType.AktivitetsfriKvote,
        )
        .map((kontoType) => kontoType.konto);

export const getStønadskontoNavn = (
    intl: IntlShape,
    konto: StønadskontoType,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    if (
        (erFarEllerMedmor && konto === StønadskontoType.Fedrekvote) ||
        (!erFarEllerMedmor && konto === StønadskontoType.Mødrekvote)
    ) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.dinKvote' });
    }
    let navn;

    switch (konto) {
        case StønadskontoType.Mødrekvote:
            navn = navnPåForeldre.mor;
            break;
        case StønadskontoType.Fedrekvote:
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
        if (konto === StønadskontoType.AktivitetsfriKvote) {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        if (konto === StønadskontoType.Foreldrepenger) {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR' });
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getUttakAnnenPartStønadskontoNavn = (
    intl: IntlShape,
    konto: StønadskontoType,
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
            konto === StønadskontoType.Fellesperiode
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
