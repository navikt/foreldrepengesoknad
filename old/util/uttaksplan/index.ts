import { IntlShape } from 'react-intl';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Forelder, NavnPåForeldre, Tidsperiode } from 'common/types';
import getMessage from 'common/util/i18nUtils';
import { Navn } from '../../types/common';
import { Barn, isAdopsjonsbarn, isForeldreansvarsbarn, isFødtBarn, isUfødtBarn } from '../../types/søknad/Barn';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import {
    Arbeidsform,
    isOverskrivbarPeriode,
    isUtsettelsesperiode,
    isUttaksperiode,
    OppholdÅrsakType,
    Periode,
    PeriodeInfoType,
    Periodetype,
    StønadskontoType,
    UtsettelseÅrsakType,
} from '../../types/uttaksplan/periodetyper';
import { findOldestDate } from '../dates/dates';
import { formaterNavn } from '../domain/personUtil';
import { getNavnGenitivEierform } from '../tekstUtils';
import { getStønadskontoFromOppholdsårsak } from './uttaksperiodeUtils';

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

export const getForelderNavn = (forelder: Forelder, navnPåForeldre: NavnPåForeldre): string => {
    if (navnPåForeldre.farMedmor) {
        return forelder === Forelder.mor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    }
    return forelder === Forelder.mor ? navnPåForeldre.mor : forelder;
};

export const getNavnFromObject = ({
    fornavn,
    etternavn,
}: {
    fornavn?: string;
    etternavn?: string;
}): Navn | undefined => {
    if (fornavn && etternavn) {
        return {
            fornavn,
            etternavn,
            navn: formaterNavn(fornavn, etternavn),
        };
    }
    return undefined;
};

export const getPeriodeForelderNavn = (periode: Periode, navnPåForeldre: NavnPåForeldre): string => {
    if (
        periode.type === Periodetype.Utsettelse ||
        periode.type === Periodetype.Uttak ||
        periode.type === Periodetype.Overføring ||
        periode.type === Periodetype.Opphold ||
        periode.type === Periodetype.Info
    ) {
        return getForelderNavn(periode.forelder, navnPåForeldre);
    }
    return 'Ingen forelder registrert';
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

export const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: OppholdÅrsakType,
    foreldernavn: string,
    erMor: boolean
) => {
    return erMor
        ? getMessage(intl, `oppholdsårsaktype.foreldernavn.far.${årsak}`, { foreldernavn })
        : getMessage(intl, `oppholdsårsaktype.foreldernavn.mor.${årsak}`, { foreldernavn });
};

export const getUtsettelseTekst = (
    intl: IntlShape,
    årsak: UtsettelseÅrsakType,
    foreldernavn: string,
    erMor: boolean
) => {
    return erMor
        ? getMessage(intl, `utsettelseårsaktype.foreldernavn.far.${årsak}`, { foreldernavn })
        : getMessage(intl, `utsettelseårsaktype.foreldernavn.mor.${årsak}`, { foreldernavn });
};

export const getFamiliehendelsedato = (barn: Partial<Barn>, situasjon?: Søkersituasjon): Date | undefined => {
    if (!situasjon) {
        return undefined;
    }
    if (isFødtBarn(barn, situasjon)) {
        const fødselsdatoer: Date[] = [];
        barn.fødselsdatoer.forEach((fd) => {
            const date = ISOStringToDate(fd);
            if (date) {
                fødselsdatoer.push(date);
            }
        });
        return findOldestDate(fødselsdatoer);
    }
    if (isUfødtBarn(barn, situasjon)) {
        return ISOStringToDate(barn.termindato);
    }
    if (isAdopsjonsbarn(barn, situasjon)) {
        return ISOStringToDate(barn.adopsjonsdato);
    }
    if (isForeldreansvarsbarn(barn, situasjon)) {
        return ISOStringToDate(barn.foreldreansvarsdato);
    }
    return undefined;
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

export const getPeriodeTittel = (intl: IntlShape, periode: Periode, navnPåForeldre: NavnPåForeldre): string => {
    switch (periode.type) {
        case Periodetype.Uttak:
            const tittel = getStønadskontoNavn(intl, periode.konto, navnPåForeldre);
            if (
                (periode.gradert && isValidStillingsprosent(periode.stillingsprosent)) ||
                (periode.ønskerSamtidigUttak && isValidStillingsprosent(periode.samtidigUttakProsent))
            ) {
                return `${tittel} ${getMessage(intl, 'gradering.prosent', {
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
                return getMessage(intl, `periodeliste.utsettelsesårsak`, {
                    årsak: getMessage(intl, `utsettelsesårsak.${periode.årsak}`),
                });
            }
            return getMessage(intl, `periodeliste.utsettelsesårsak.ukjent`);
        case Periodetype.Opphold:
            return getOppholdskontoNavn(
                intl,
                periode.årsak,
                getForelderNavn(periode.forelder, navnPåForeldre),
                periode.forelder === Forelder.mor
            );
        case Periodetype.Hull:
            return getMessage(intl, `periodetype.hull.tittel`);
        case Periodetype.Info:
            switch (periode.infotype) {
                case PeriodeInfoType.uttakAnnenPart:
                    return getStønadskontoNavn(intl, getStønadskontoFromOppholdsårsak(periode.årsak), navnPåForeldre);
                case PeriodeInfoType.utsettelseAnnenPart:
                    return getMessage(intl, `periodetype.info.utsettelse.${periode.årsak}`, {
                        navn: getForelderNavn(periode.forelder, navnPåForeldre),
                    });
                default:
                    return getMessage(intl, `periodetype.info.${periode.infotype}`);
            }
    }
};

export const getTidsperioderIUttaksplan = (uttaksplan: Periode[], periodeId: string | undefined): Tidsperiode[] =>
    uttaksplan.filter((p) => !isOverskrivbarPeriode(p) && p.id !== periodeId).map((p) => p.tidsperiode);

export const getUtsettelserIUttaksplan = (uttaksplan: Periode[], periodeId: string | undefined): Tidsperiode[] =>
    uttaksplan.filter((p) => isUtsettelsesperiode(p) && p.id !== periodeId).map((p) => p.tidsperiode);

export const uttaksplanInneholderFrilansaktivitet = (uttaksplan: Periode[]): boolean => {
    return uttaksplan.some(
        (periode: Periode) =>
            (isUttaksperiode(periode) || isUtsettelsesperiode(periode)) &&
            periode.arbeidsformer !== undefined &&
            periode.arbeidsformer.length > 0 &&
            periode.arbeidsformer.some((arbeidsform: Arbeidsform) => arbeidsform === Arbeidsform.frilans)
    );
};

export const uttaksplanInneholderSelvstendignæringaktivitet = (uttaksplan: Periode[]): boolean => {
    return uttaksplan.some(
        (periode: Periode) =>
            (isUttaksperiode(periode) || isUtsettelsesperiode(periode)) &&
            periode.arbeidsformer !== undefined &&
            periode.arbeidsformer.length > 0 &&
            periode.arbeidsformer.some(
                (arbeidsform: Arbeidsform) => arbeidsform === Arbeidsform.selvstendignæringsdrivende
            )
    );
};
