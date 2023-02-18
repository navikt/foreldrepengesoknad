import { intlUtils } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { IntlShape } from 'react-intl';
import {
    Arbeidsform,
    Overføringsperiode,
    Periodetype,
    PeriodeUtenUttakUtsettelse,
    Utsettelsesperiode,
} from 'uttaksplan/types/Periode';

type MessageValue = string | number | boolean | Date | null | undefined;

const getValgtArbeidsgiverNavn = (arbeidsforhold: Arbeidsforhold[], orgnr?: string) => {
    if (orgnr) {
        const valgtArbeidsgiver = arbeidsforhold.find(
            ({ arbeidsgiverId, arbeidsgiverIdType }) => arbeidsgiverIdType === 'orgnr' && arbeidsgiverId === orgnr
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
    arbeidsforhold?: Arbeidsforhold[]
) => {
    let arbeidstakerTekster: string[] = [];
    let arbeidsformerTekster: string[] = [];

    if (orgnumre !== undefined && orgnumre.length > 0 && arbeidsforhold && arbeidsforhold.length > 0) {
        arbeidstakerTekster = orgnumre.map((orgnr) => {
            const arbeidsgiverNavn = getValgtArbeidsgiverNavn(arbeidsforhold, orgnr);
            return intlUtils(intl, `oppsummering.uttak.arbeidstaker`, { orgnr, arbeidsgiverNavn });
        });
    }

    if (arbeidsformer !== undefined && arbeidsformer.length > 0) {
        arbeidsformerTekster = arbeidsformer
            .filter((arbeidsform) => arbeidsform !== Arbeidsform.arbeidstaker)
            .map((arbeidsform) => {
                return intlUtils(intl, `oppsummering.uttak.${arbeidsform.toLowerCase()}`);
            });
    }

    return arbeidstakerTekster.concat(arbeidsformerTekster);
};

export const getÅrsakTekst = (
    intl: IntlShape,
    { type, årsak }: Utsettelsesperiode | Overføringsperiode | PeriodeUtenUttakUtsettelse,
    messageValues?: { [key: string]: MessageValue }
) => {
    const intlKeyPrefix = type === Periodetype.Utsettelse ? 'utsettelsesårsak.' : 'overføringsårsaktype.';
    return intlUtils(intl, `uttaksplan.${intlKeyPrefix + årsak}`, messageValues);
};
