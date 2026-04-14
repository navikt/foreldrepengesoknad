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
    Aktivitet_fpoversikt,
    EksternArbeidsforholdDto_fpoversikt,
    NavnPåForeldre,
    Situasjon,
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden, capitalizeFirstLetter } from '@navikt/fp-utils';

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

export const getAktivitetTekst = (
    intl: IntlShape,
    aktivitet: Aktivitet_fpoversikt,
    arbeidsforhold?: EksternArbeidsforholdDto_fpoversikt[],
) => {
    const type = aktivitet.type;
    const orgnummer = aktivitet.arbeidsgiver?.id;

    if (type === 'ORDINÆRT_ARBEID' && orgnummer !== undefined && arbeidsforhold && arbeidsforhold.length > 0) {
        const arbeidsgiverNavn = getValgtArbeidsgiverNavn(arbeidsforhold, orgnummer);
        return intl.formatMessage({ id: `oppsummering.uttak.arbeidstaker` }, { orgnr: orgnummer, arbeidsgiverNavn });
    } else if (type === 'SELVSTENDIG_NÆRINGSDRIVENDE') {
        return intl.formatMessage({ id: 'oppsummering.uttak.selvstendig_næringsdrivende' });
    } else if (type === 'FRILANS') {
        return intl.formatMessage({ id: 'oppsummering.uttak.frilans' });
    } else if (type === 'ANNET') {
        return intl.formatMessage({ id: 'oppsummering.uttak.annet' });
    }

    throw new Error(`Ikke håndtert aktivitetstype: ${type}`);
};

export const uttaksperiodeKanJusteresVedFødsel = (
    ønskerJustertUttakVedFødsel: boolean | undefined,
    termindato: string | undefined,
    uttaksperiodeFom: string,
): boolean => {
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
    if (Uttaksperioden.erUttaksperiode(periode)) {
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
        if (årsak === 'FEDREKVOTE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.far.FEDREKVOTE_ANNEN_FORELDER' },
                { foreldernavn: navn },
            );
        }
        if (årsak === 'FELLESPERIODE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.far.FELLESPERIODE_ANNEN_FORELDER' },
                { foreldernavn: navn },
            );
        }
        if (årsak === 'MØDREKVOTE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.far.MØDREKVOTE_ANNEN_FORELDER' },
                { foreldernavn: navn },
            );
        }
    }

    if (årsak === 'FEDREKVOTE_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.mor.FEDREKVOTE_ANNEN_FORELDER' },
            { foreldernavn: navn },
        );
    }

    if (årsak === 'FELLESPERIODE_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.mor.FELLESPERIODE_ANNEN_FORELDER' },
            { foreldernavn: navn },
        );
    }

    return intl.formatMessage(
        { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.mor.MØDREKVOTE_ANNEN_FORELDER' },
        { foreldernavn: navn },
    );
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
