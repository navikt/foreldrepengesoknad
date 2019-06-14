import { Forelder, NavnPåForeldre, Tidsperiode } from 'common/types';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    OppholdÅrsakType,
    isUttaksperiode,
    Arbeidsform,
    isOverskrivbarPeriode,
    PeriodeInfoType
} from '../../types/uttaksplan/periodetyper';
import { InjectedIntl } from 'react-intl';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import { findOldestDate } from '../dates/dates';
import { Barn, isFødtBarn, isUfødtBarn, isAdopsjonsbarn, isForeldreansvarsbarn } from '../../types/søknad/Barn';
import { formaterNavn } from '../domain/personUtil';
import getMessage from 'common/util/i18nUtils';
import { Navn } from '../../types/common';
import { getNavnGenitivEierform } from '../tekstUtils';
import { getStønadskontoFromOppholdsårsak } from './uttaksperiodeUtils';

const isValidStillingsprosent = (pst: string | undefined): boolean =>
    pst !== undefined && isNaN(parseFloat(pst)) === false;

const prettifyProsent = (pst: string): number | undefined => {
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
    etternavn
}: {
    fornavn?: string;
    etternavn?: string;
}): Navn | undefined => {
    if (fornavn && etternavn) {
        return {
            fornavn,
            etternavn,
            navn: formaterNavn(fornavn, etternavn)
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

export const getStønadskontoNavn = (intl: InjectedIntl, konto: StønadskontoType, navnPåForeldre: NavnPåForeldre) => {
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
    intl: InjectedIntl,
    årsak: OppholdÅrsakType,
    foreldernavn: string,
    erMor: boolean
) => {
    return erMor
        ? getMessage(intl, `oppholdsårsaktype.foreldernavn.far.${årsak}`, { foreldernavn })
        : getMessage(intl, `oppholdsårsaktype.foreldernavn.mor.${årsak}`, { foreldernavn });
};

export const getFamiliehendelsedato = (barn: Partial<Barn>, situasjon?: Søkersituasjon): Date | undefined => {
    if (!situasjon) {
        return undefined;
    }
    if (isFødtBarn(barn, situasjon)) {
        return findOldestDate(barn.fødselsdatoer.filter((d) => d !== undefined));
    }
    if (isUfødtBarn(barn, situasjon)) {
        return barn.termindato;
    }
    if (isAdopsjonsbarn(barn, situasjon)) {
        return barn.adopsjonsdato;
    }
    if (isForeldreansvarsbarn(barn, situasjon)) {
        return barn.foreldreansvarsdato;
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

export const getPeriodeTittel = (intl: InjectedIntl, periode: Periode, navnPåForeldre: NavnPåForeldre): string => {
    switch (periode.type) {
        case Periodetype.Uttak:
            const tittel = getStønadskontoNavn(intl, periode.konto, navnPåForeldre);
            if (
                periode.gradert &&
                periode.stillingsprosent !== undefined &&
                isValidStillingsprosent(periode.stillingsprosent)
            ) {
                return `${tittel} ${getMessage(intl, 'gradering.prosent', {
                    stillingsprosent: getUttaksprosentFromStillingsprosent(
                        prettifyProsent(periode.stillingsprosent),
                        periode.samtidigUttakProsent ? prettifyProsent(periode.samtidigUttakProsent) : undefined
                    )
                })}`;
            }
            return tittel;

        case Periodetype.Overføring:
            return getStønadskontoNavn(intl, periode.konto, navnPåForeldre);
        case Periodetype.Utsettelse:
            if (periode.årsak) {
                return getMessage(intl, `periodeliste.utsettelsesårsak`, {
                    årsak: getMessage(intl, `utsettelsesårsak.${periode.årsak}`)
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
                    const stønadskontotype = getStønadskontoFromOppholdsårsak(periode.årsak);
                    return getStønadskontoNavn(intl, stønadskontotype, navnPåForeldre);
                default:
                    // TODO legge til alle infotyper
                    return getMessage(intl, `periodetype.info.${periode.infotype}`);
            }
    }
};

export const getTidsperioderIUttaksplan = (uttaksplan: Periode[], periodeId: string | undefined): Tidsperiode[] =>
    uttaksplan.filter((p) => !isOverskrivbarPeriode(p) && p.id !== periodeId).map((p) => p.tidsperiode);

export const uttaksplanInneholderFrilansaktivitet = (uttaksplan: Periode[]): boolean => {
    return uttaksplan.some(
        (periode: Periode) =>
            isUttaksperiode(periode) &&
            periode.arbeidsformer !== undefined &&
            periode.arbeidsformer.length > 0 &&
            periode.arbeidsformer.some((arbeidsform: Arbeidsform) => arbeidsform === Arbeidsform.frilans)
    );
};

export const uttaksplanInneholderSelvstendignæringaktivitet = (uttaksplan: Periode[]): boolean => {
    return uttaksplan.some(
        (periode: Periode) =>
            isUttaksperiode(periode) &&
            periode.arbeidsformer !== undefined &&
            periode.arbeidsformer.length > 0 &&
            periode.arbeidsformer.some(
                (arbeidsform: Arbeidsform) => arbeidsform === Arbeidsform.selvstendignæringsdrivende
            )
    );
};
