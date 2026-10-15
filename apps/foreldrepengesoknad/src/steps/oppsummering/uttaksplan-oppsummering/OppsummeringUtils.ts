import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { Aktivitet_fpoversikt, EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

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
