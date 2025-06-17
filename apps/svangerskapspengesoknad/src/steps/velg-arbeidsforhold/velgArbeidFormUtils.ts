import { IntlShape } from 'react-intl';
import { Arbeidsforholdstype } from 'types/Tilrettelegging';
import { getUnikeArbeidsforhold } from 'utils/arbeidsforholdUtils';

import {
    Arbeidsforhold,
    ArbeidsforholdOgInntektSvp,
    EGEN_NÆRING_ID,
    FRILANS_ID,
    Frilans,
    NæringFormValues,
} from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

type VelgArbeidsforholdOptions = {
    id: string;
    arbeidsforholdType: Arbeidsforholdstype;
    arbeidsforholdNavn: string;
};

export const getOptionNavn = (type: Arbeidsforholdstype, intl: IntlShape, navn?: string): string | undefined => {
    if (type === Arbeidsforholdstype.SELVSTENDIG && (!navn || navn.trim().length === 0)) {
        return intl.formatMessage({ id: 'egenNæring' });
    }
    return capitalizeFirstLetterInEveryWordOnly(navn);
};

const getNæringTilretteleggingOption = (næring: NæringFormValues): VelgArbeidsforholdOptions => ({
    id: EGEN_NÆRING_ID,
    arbeidsforholdType: Arbeidsforholdstype.SELVSTENDIG,
    arbeidsforholdNavn: næring.navnPåNæringen!,
});

const getFrilansTilretteleggingOption = (): VelgArbeidsforholdOptions => ({
    id: FRILANS_ID,
    arbeidsforholdType: Arbeidsforholdstype.FRILANSER,
    arbeidsforholdNavn: FRILANS_ID,
});

const getArbeidsforholdTilretteleggingOptions = (
    arbeidsforhold: Arbeidsforhold[],
    termindato: string,
    intl: IntlShape,
): VelgArbeidsforholdOptions[] =>
    getUnikeArbeidsforhold(arbeidsforhold, termindato).map((forhold) => ({
        id: forhold.id,
        arbeidsforholdType:
            forhold.arbeidsgiverIdType === 'orgnr' ? Arbeidsforholdstype.VIRKSOMHET : Arbeidsforholdstype.PRIVAT,
        arbeidsforholdNavn:
            forhold.arbeidsgiverIdType === 'orgnr' || forhold.arbeidsgiverNavn
                ? forhold.arbeidsgiverNavn
                : intl.formatMessage({ id: 'privat.arbeidsgiver' }),
    }));

export const mapArbeidsforholdToVelgArbeidOptions = (
    inntektsinformasjon: ArbeidsforholdOgInntektSvp,
    arbeidsforhold: Arbeidsforhold[],
    termindato: string,
    intl: IntlShape,
    frilans?: Frilans,
    egenNæring?: NæringFormValues,
): VelgArbeidsforholdOptions[] => {
    const unikeArbeidsforhold = getArbeidsforholdTilretteleggingOptions(arbeidsforhold, termindato, intl);
    const næringValg =
        inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende && egenNæring
            ? [getNæringTilretteleggingOption(egenNæring)]
            : [];
    const frilansValg = inntektsinformasjon.harJobbetSomFrilans && frilans ? [getFrilansTilretteleggingOption()] : [];

    return [...unikeArbeidsforhold, ...næringValg, ...frilansValg];
};
