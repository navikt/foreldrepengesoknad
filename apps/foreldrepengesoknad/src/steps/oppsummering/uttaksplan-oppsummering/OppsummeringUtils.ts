import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { getForelderNavn } from 'utils/isFarEllerMedmor';
import { getStønadskontoNavn } from 'utils/stønadskontoerUtils';
import {
    getUttaksprosentFromStillingsprosent,
    isUttaksperiodeFarMedmorPgaFødsel,
    prettifyProsent,
} from 'utils/uttaksplanInfoUtils';

import {
    Arbeidsform,
    Overføringsperiode,
    PeriodeUtenUttakUtsettelse,
    Periodetype,
    Utsettelsesperiode,
} from '@navikt/fp-common';
import {
    EksternArbeidsforholdDto_fpoversikt,
    NavnPåForeldre,
    Situasjon,
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

type MessageValue = string | number | boolean | Date | null | undefined;

const getValgtArbeidsgiverNavn = (arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[], orgnr?: string) => {
    if (orgnr) {
        const valgtArbeidsgiver = arbeidsforhold.find(
            ({ arbeidsgiverId, arbeidsgiverIdType }) => arbeidsgiverIdType === 'orgnr' && arbeidsgiverId === orgnr,
        );
        if (valgtArbeidsgiver) {
            return valgtArbeidsgiver.arbeidsgiverNavn;
        }
    }
    return '';
};

export const getArbeidsformTekst = (
    intl: IntlShape,
    arbeidsformer: Arbeidsform[],
    orgnumre?: string[],
    arbeidsforhold?: EksternArbeidsforholdDto_fpoversikt[],
) => {
    let arbeidstakerTekster: string[] = [];
    let arbeidsformerTekster: string[] = [];

    if (orgnumre !== undefined && orgnumre.length > 0 && arbeidsforhold && arbeidsforhold.length > 0) {
        arbeidstakerTekster = orgnumre.map((orgnr) => {
            const arbeidsgiverNavn = getValgtArbeidsgiverNavn(arbeidsforhold, orgnr);
            return intl.formatMessage({ id: `oppsummering.uttak.arbeidstaker` }, { orgnr, arbeidsgiverNavn });
        });
    }

    if (arbeidsformer !== undefined && arbeidsformer.length > 0) {
        arbeidsformerTekster = arbeidsformer
            .filter((arbeidsform) => arbeidsform !== Arbeidsform.arbeidstaker)
            .map((arbeidsform) => {
                if (arbeidsform === Arbeidsform.selvstendignæringsdrivende) {
                    return intl.formatMessage({ id: 'oppsummering.uttak.selvstendig_næringsdrivende' });
                }
                return intl.formatMessage({ id: 'oppsummering.uttak.frilans' });
            });
    }

    return arbeidstakerTekster.concat(arbeidsformerTekster);
};

export const getÅrsakTekst = (
    intl: IntlShape,
    { type, årsak }: Utsettelsesperiode | Overføringsperiode | PeriodeUtenUttakUtsettelse,
    messageValues?: { [key: string]: MessageValue },
) => {
    const intlKeyPrefix = type === Periodetype.Utsettelse ? 'utsettelsesårsak.' : 'overføringsårsaktype.';
    //@ts-expect-error Fiks dynamisk id
    return intl.formatMessage({ id: `uttaksplan.${intlKeyPrefix + årsak}` }, messageValues);
};

export const erUttaksperiode = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt): boolean => {
    return !('trekkdager' in periode) && !periode.oppholdÅrsak && !periode.overføringÅrsak && !periode.utsettelseÅrsak;
};

export const uttaksperiodeKanJusteresVedFødsel = (
    ønskerJustertUttakVedFødsel: boolean | undefined,
    termindato: string | undefined,
    uttaksperiodeFom: string,
) => {
    return !!ønskerJustertUttakVedFødsel && termindato !== undefined && dayjs(uttaksperiodeFom).isSame(termindato, 'd');
};

export const getPeriodeTittel = (
    intl: IntlShape,
    periode: UttakPeriode_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
    familiehendelsesdato: string,
    termindato: string | undefined,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
): string => {
    if (erUttaksperiode(periode)) {
        return getPeriodeTittelUttaksPeriode(
            intl,
            periode,
            navnPåForeldre,
            familiehendelsesdato,
            termindato,
            situasjon,
            erFarEllerMedmor,
            erAleneOmOmsorg,
        );
    }
    if (!('trekkdager' in periode) && periode.overføringÅrsak) {
        return getStønadskontoNavn(intl, periode.kontoType, navnPåForeldre, erFarEllerMedmor);
    }

    if (!('trekkdager' in periode) && periode.utsettelseÅrsak) {
        if (periode.utsettelseÅrsak) {
            return intl.formatMessage(
                { id: 'uttaksplan.periodeliste.utsettelsesårsak' },
                {
                    årsak: intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${periode.utsettelseÅrsak}` }),
                },
            );
        }
        return intl.formatMessage({ id: 'uttaksplan.periodeliste.utsettelsesårsak.ukjent' });
    }

    if (!('trekkdager' in periode) && periode.oppholdÅrsak) {
        return getOppholdskontoNavn(
            intl,
            periode.oppholdÅrsak,
            getForelderNavn(periode.forelder, navnPåForeldre),
            periode.forelder === 'MOR',
        );
    }

    return '';
};

const getPeriodeTittelUttaksPeriode = (
    intl: IntlShape,
    periode: UttakPeriode_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
    familiehendelsesdato: string,
    termindato: string | undefined,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    const tittelMedNavn = getStønadskontoNavn(
        intl,
        periode.kontoType,
        navnPåForeldre,
        erFarEllerMedmor,
        erAleneOmOmsorg,
    );
    const tittel = appendPeriodeNavnHvisUttakRundtFødselFarMedmor(
        intl,
        tittelMedNavn,
        periode,
        situasjon,
        familiehendelsesdato,
        termindato,
    );
    if (periode.gradering?.arbeidstidprosent || periode.samtidigUttak) {
        return `${tittel} ${intl.formatMessage(
            { id: 'gradering.prosent' },
            {
                stillingsprosent: getUttaksprosentFromStillingsprosent(
                    prettifyProsent(periode.gradering?.arbeidstidprosent),
                    periode.samtidigUttak ? prettifyProsent(periode.samtidigUttak) : undefined,
                ),
            },
        )}`;
    }
    return tittel;
};

const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: UttakOppholdÅrsak_fpoversikt,
    foreldernavn: string,
    erMor: boolean,
) => {
    const navn = capitalizeFirstLetter(foreldernavn);
    if (erMor) {
        return intl.formatMessage(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.${årsak}` },
            { foreldernavn: navn },
        );
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
    return intl.formatMessage({ id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.${årsak}` }, { foreldernavn: navn });
};

const appendPeriodeNavnHvisUttakRundtFødselFarMedmor = (
    intl: IntlShape,
    periodeNavn: string,
    periode: UttakPeriode_fpoversikt,
    situasjon: Situasjon,
    familiehendelsesdato: string,
    termindato: string | undefined,
): string => {
    return situasjon === 'fødsel' && isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato)
        ? periodeNavn + intl.formatMessage({ id: 'rundtFødsel' })
        : periodeNavn;
};
