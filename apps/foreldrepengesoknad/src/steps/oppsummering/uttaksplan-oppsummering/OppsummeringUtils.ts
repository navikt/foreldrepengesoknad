import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { getForelderNavn } from 'utils/isFarEllerMedmor';
import { getStønadskvoteNavn } from 'utils/stønadskvoterUtils';
import {
    getUttaksprosentFromStillingsprosent,
    isUttaksperiodeFarMedmorPgaFødsel,
    prettifyProsent,
} from 'utils/uttaksplanInfoUtils';

import {
    Aktivitet_fpoversikt,
    EksternArbeidsforholdDto_fpoversikt,
    KontoType,
    NavnPåForeldre,
    PeriodeDto_fpoversikt,
    Situasjon,
    UttakDto_fpoversikt,
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
    }
    switch (type) {
        case 'SELVSTENDIG_NÆRINGSDRIVENDE': {
            return intl.formatMessage({ id: 'oppsummering.uttak.selvstendig_næringsdrivende' });
        }
        case 'FRILANS': {
            return intl.formatMessage({ id: 'oppsummering.uttak.frilans' });
        }
        case 'ANNET': {
            return intl.formatMessage({ id: 'oppsummering.uttak.annet' });
        }
        // No default
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
    periode: PeriodeDto_fpoversikt,
    part: UttakDto_fpoversikt | undefined,
    navnPåForeldre: NavnPåForeldre,
    familiehendelsesdato: string,
    termindato: string | undefined,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
): string => {
    if (part && Uttaksperioden.erUttaksperiode(part)) {
        return getPeriodeTittelUttaksPeriode(
            intl,
            periode,
            part,
            navnPåForeldre,
            familiehendelsesdato,
            termindato,
            situasjon,
            erFarEllerMedmor,
            erAleneOmOmsorg,
        );
    }
    if (part?.overføringÅrsak) {
        return getStønadskvoteNavn(intl, part.kontoType, navnPåForeldre, erFarEllerMedmor);
    }

    if (part?.utsettelseÅrsak) {
        return intl.formatMessage(
            { id: 'uttaksplan.periodeliste.utsettelsesårsak' },
            {
                årsak: intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${part.utsettelseÅrsak}` }),
            },
        );
    }

    // Oppholdsperiodar finst berre i søkjaren sin eigen liste (part er alltid udefinert her, sidan
    // ei oppholdsperiode strukturelt er «søkjar manglar uttak, annan part har det»). Årsaka til
    // oppholdet er difor annan part sin kontoType, ikkje eit eige oppholdÅrsak-felt frå backend.
    if (Uttaksperioden.erOppholdsperiode(periode)) {
        return getOppholdskontoNavn(
            intl,
            periode.annenPart?.kontoType,
            getForelderNavn(erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR', navnPåForeldre),
            !erFarEllerMedmor,
        );
    }

    return '';
};

const getPeriodeTittelUttaksPeriode = (
    intl: IntlShape,
    periode: PeriodeDto_fpoversikt,
    part: UttakDto_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
    familiehendelsesdato: string,
    termindato: string | undefined,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    const tittelMedNavn = getStønadskvoteNavn(intl, part.kontoType, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg);
    // isUttaksperiodeFarMedmorPgaFødsel sjekkar alltid .søker-parten av periode. Her kan «parten vi ser
    // på» vera annenPart (t.d. i annan part si liste), så vi byggjer ei periode der .søker peikar på
    // rett part før vi kallar han, i staden for å endra den delte sjekk-funksjonen sin kontrakt.
    const periodeForFødselssjekk: PeriodeDto_fpoversikt = { ...periode, søker: part };
    const tittel = appendPeriodeNavnHvisUttakRundtFødselFarMedmor(
        intl,
        tittelMedNavn,
        periodeForFødselssjekk,
        situasjon,
        familiehendelsesdato,
        termindato,
    );
    if (part.gradering?.arbeidstidprosent || part.samtidigUttak) {
        return `${tittel} ${intl.formatMessage(
            { id: 'gradering.prosent' },
            {
                stillingsprosent: getUttaksprosentFromStillingsprosent(
                    prettifyProsent(part.gradering?.arbeidstidprosent),
                    part.samtidigUttak ? prettifyProsent(part.samtidigUttak) : undefined,
                ),
            },
        )}`;
    }
    return tittel;
};

const getOppholdskontoNavn = (
    intl: IntlShape,
    kontoType: KontoType | undefined,
    foreldernavn: string,
    erMor: boolean,
) => {
    const navn = capitalizeFirstLetter(foreldernavn);
    if (erMor) {
        if (kontoType === 'FEDREKVOTE') {
            return intl.formatMessage(
                { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.far.FEDREKVOTE_ANNEN_FORELDER' },
                { foreldernavn: navn },
            );
        }
        if (kontoType === 'FELLESPERIODE') {
            return intl.formatMessage(
                { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.far.FELLESPERIODE_ANNEN_FORELDER' },
                { foreldernavn: navn },
            );
        }
        if (kontoType === 'MØDREKVOTE') {
            return intl.formatMessage(
                { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.far.MØDREKVOTE_ANNEN_FORELDER' },
                { foreldernavn: navn },
            );
        }
    }

    if (kontoType === 'FEDREKVOTE') {
        return intl.formatMessage(
            { id: 'uttaksplan.oppholdsårsaktype.foreldernavn.mor.FEDREKVOTE_ANNEN_FORELDER' },
            { foreldernavn: navn },
        );
    }

    if (kontoType === 'FELLESPERIODE') {
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
    periode: PeriodeDto_fpoversikt,
    situasjon: Situasjon,
    familiehendelsesdato: string,
    termindato: string | undefined,
): string => {
    return situasjon === 'fødsel' && isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato)
        ? periodeNavn + intl.formatMessage({ id: 'rundtFødsel' })
        : periodeNavn;
};
