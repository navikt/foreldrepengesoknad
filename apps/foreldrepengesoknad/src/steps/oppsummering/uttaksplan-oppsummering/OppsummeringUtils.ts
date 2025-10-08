import { IntlShape } from 'react-intl';

import {
    Arbeidsform,
    Overføringsperiode,
    PeriodeUtenUttakUtsettelse,
    Periodetype,
    Utsettelsesperiode,
} from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';

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
