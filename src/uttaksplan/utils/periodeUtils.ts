import { intlUtils } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { OppholdÅrsakType } from '../types/OppholdÅrsakType';
import { PeriodeInfoType } from '../types/PeriodeInfoType';
import { StønadskontoType } from '../types/StønadskontoType';
import { Periode, Periodetype } from './../types/Periode';
import { getNavnGenitivEierform } from './../../app/utils/personUtils';
import { NavnPåForeldre } from './../../app/types/NavnPåForeldre';
import { Forelder } from './../../app/types/Forelder';

const isValidStillingsprosent = (pst: string | undefined): boolean =>
    pst !== undefined && isNaN(parseFloat(pst)) === false;

const prettifyProsent = (pst: string | undefined): number | undefined => {
    if (pst === undefined) {
        return undefined;
    }

    const nbr = parseFloat(pst);
    if (isNaN(nbr)) {
        return undefined;
    }
    if (Math.round(nbr) === nbr) {
        return Math.round(nbr);
    }
    return nbr;
};

export const getStønadskontoNavn = (intl: IntlShape, konto: StønadskontoType, navnPåForeldre: NavnPåForeldre) => {
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
            { id: `stønadskontotype.foreldernavn.kvote` },
            { navn: getNavnGenitivEierform(navn, intl.locale) }
        );
    }
    return intl.formatMessage({ id: `stønadskontotype.${konto}` });
};

export const getUttaksprosentFromStillingsprosent = (
    stillingsPst: number | undefined,
    samtidigUttakPst: number | undefined
): number | undefined => {
    if (samtidigUttakPst) {
        return samtidigUttakPst;
    }
    if (stillingsPst) {
        return 100 - stillingsPst;
    }
    return undefined;
};

export const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: OppholdÅrsakType,
    foreldernavn: string,
    erMor: boolean
) => {
    return erMor
        ? intlUtils(intl, `oppholdsårsaktype.foreldernavn.far.${årsak}`, { foreldernavn })
        : intlUtils(intl, `oppholdsårsaktype.foreldernavn.mor.${årsak}`, { foreldernavn });
};

export const getStønadskontoFromOppholdsårsak = (årsak: OppholdÅrsakType): StønadskontoType => {
    if (årsak === OppholdÅrsakType.UttakFedrekvoteAnnenForelder) {
        return StønadskontoType.Fedrekvote;
    }

    if (årsak === OppholdÅrsakType.UttakMødrekvoteAnnenForelder) {
        return StønadskontoType.Mødrekvote;
    }

    if (årsak === OppholdÅrsakType.UttakFellesperiodeAnnenForelder) {
        return StønadskontoType.Fellesperiode;
    }

    return StønadskontoType.ForeldrepengerFørFødsel;
};

export const getForelderNavn = (forelder: Forelder, navnPåForeldre: NavnPåForeldre): string => {
    if (navnPåForeldre.farMedmor) {
        return forelder === Forelder.mor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    }
    return forelder === Forelder.mor ? navnPåForeldre.mor : forelder;
};

export const getPeriodeTittel = (intl: IntlShape, periode: Periode, navnPåForeldre: NavnPåForeldre): string => {
    switch (periode.type) {
        case Periodetype.Uttak:
            const tittel = getStønadskontoNavn(intl, periode.konto, navnPåForeldre);
            if (
                (periode.gradert && isValidStillingsprosent(periode.stillingsprosent)) ||
                (periode.ønskerSamtidigUttak && isValidStillingsprosent(periode.samtidigUttakProsent))
            ) {
                return `${tittel} ${intlUtils(intl, 'gradering.prosent', {
                    stillingsprosent: getUttaksprosentFromStillingsprosent(
                        prettifyProsent(periode.stillingsprosent),
                        periode.samtidigUttakProsent ? prettifyProsent(periode.samtidigUttakProsent) : undefined
                    ),
                })}`;
            }

            return tittel;

        case Periodetype.Overføring:
            return getStønadskontoNavn(intl, periode.konto, navnPåForeldre);
        case Periodetype.Utsettelse:
            if (periode.årsak) {
                return intlUtils(intl, `periodeliste.utsettelsesårsak`, {
                    årsak: intlUtils(intl, `utsettelsesårsak.${periode.årsak}`),
                });
            }
            return intlUtils(intl, `periodeliste.utsettelsesårsak.ukjent`);
        case Periodetype.Opphold:
            return getOppholdskontoNavn(
                intl,
                periode.årsak,
                getForelderNavn(periode.forelder, navnPåForeldre),
                periode.forelder === 'mor'
            );
        case Periodetype.Hull:
            return intlUtils(intl, `periodetype.hull.tittel`);
        case Periodetype.Info:
            switch (periode.infotype) {
                case PeriodeInfoType.uttakAnnenPart:
                    return getStønadskontoNavn(intl, getStønadskontoFromOppholdsårsak(periode.årsak), navnPåForeldre);
                case PeriodeInfoType.utsettelseAnnenPart:
                    return intlUtils(intl, `periodetype.info.utsettelse.${periode.årsak}`, {
                        navn: getForelderNavn(periode.forelder, navnPåForeldre),
                    });
                default:
                    return intlUtils(intl, `periodetype.info.${periode.infotype}`);
            }
    }
};
