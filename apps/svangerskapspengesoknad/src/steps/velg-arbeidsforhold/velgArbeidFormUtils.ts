import { IntlShape } from 'react-intl';
import { Arbeidsforholdstype } from 'types/Tilrettelegging';
import { getUnikeArbeidsforhold } from 'utils/arbeidsforholdUtils';

import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import { Arbeidsforhold, ArbeidsforholdOgInntektSvp, FRILANS_ID, Frilans, NæringDto } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

type VelgArbeidsforholdOptions = {
    id: string;
    arbeidsforholdType: Arbeidsforholdstype;
    arbeidsforholdNavn: string;
};

export const getOptionNavn = (type: Arbeidsforholdstype, intl: IntlShape, navn?: string): string | undefined => {
    if (type === 'selvstendig' && (!navn || navn.trim().length === 0)) {
        return intl.formatMessage({ id: 'egenNæring' });
    }
    return capitalizeFirstLetterInEveryWordOnly(navn);
};

const getNæringTilretteleggingOption = (næring: NæringDto): VelgArbeidsforholdOptions => ({
    id: EGEN_NÆRING_ID,
    arbeidsforholdType: 'selvstendig',
    arbeidsforholdNavn: næring.navnPåNæringen!,
});

const getFrilansTilretteleggingOption = (): VelgArbeidsforholdOptions => ({
    id: FRILANS_ID,
    arbeidsforholdType: 'frilanser',
    arbeidsforholdNavn: FRILANS_ID,
});

const getArbeidsforholdTilretteleggingOptions = (
    arbeidsforhold: Arbeidsforhold[],
    termindato: string,
    intl: IntlShape,
): VelgArbeidsforholdOptions[] =>
    getUnikeArbeidsforhold(arbeidsforhold, termindato).map((forhold) => ({
        id: forhold.id,
        arbeidsforholdType: forhold.arbeidsgiverIdType === 'orgnr' ? 'virksomhet' : 'privat',
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
    egenNæring?: NæringDto,
): VelgArbeidsforholdOptions[] => {
    const unikeArbeidsforhold = getArbeidsforholdTilretteleggingOptions(arbeidsforhold, termindato, intl);
    const næringValg =
        inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende && egenNæring
            ? [getNæringTilretteleggingOption(egenNæring)]
            : [];
    const frilansValg = inntektsinformasjon.harJobbetSomFrilans && frilans ? [getFrilansTilretteleggingOption()] : [];

    return [...unikeArbeidsforhold, ...næringValg, ...frilansValg];
};
