import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import { SkjemaFormData, initialSkjemaFormData } from './skjemaFormTypes';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { IntlShape } from 'react-intl';
import { TEXT_INPUT_MAX_LENGTH, TEXT_INPUT_MIN_LENGTH, hasValue } from 'app/utils/validationUtils';
import { intlUtils, validateTextInputField } from '@navikt/fp-common';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';

export const getInitialSkjemaValuesFromState = (state: SvangerskapspengerContextState): SkjemaFormData => {
    const alleVedlegg = state.søknad.vedlegg;
    const tilrettelegginger = state.søknad.tilrettelegging;

    const vedleggForTilrettelegging = tilrettelegginger.map((tilrettelegging: Tilrettelegging) => {
        return tilrettelegging.vedlegg?.map((vedleggId: string) => {
            return alleVedlegg.find((vedlegg: Attachment) => vedlegg.id === vedleggId);
        });
    }) as Attachment[][];

    const risikofaktorerFrilans =
        tilrettelegginger.find((t: Tilrettelegging) => {
            return t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER;
        })?.arbeidsforhold.risikofaktorer || '';
    const risikofaktorerNæring =
        tilrettelegginger.find((t: Tilrettelegging) => {
            return t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG;
        })?.arbeidsforhold.risikofaktorer || '';
    return {
        ...initialSkjemaFormData,
        vedlegg: vedleggForTilrettelegging,
        risikofaktorerFrilans,
        risikofaktorerNæring,
    };
};

export const mapTilretteleggingMedSkjema = (
    tilrettelegging: Tilrettelegging[],
    values: SkjemaFormData,
): Tilrettelegging[] => {
    return tilrettelegging.map((t, index) => {
        let risikofaktorer = undefined;
        if (t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER) {
            risikofaktorer = values.risikofaktorerFrilans
                ? replaceInvisibleCharsWithSpace(values.risikofaktorerFrilans)
                : undefined;
        }
        if (t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG) {
            risikofaktorer = values.risikofaktorerNæring
                ? replaceInvisibleCharsWithSpace(values.risikofaktorerNæring)
                : undefined;
        }
        const arbeid = { ...t.arbeidsforhold, risikofaktorer };
        return {
            ...t,
            vedlegg: values.vedlegg ? values.vedlegg[index].map((v) => v.id) : [],
            arbeidsforhold: arbeid,
        };
    });
};

export const getVedleggForTilrettelegging = (values: Partial<SkjemaFormData>, index: number): Attachment[] => {
    return values.vedlegg && values.vedlegg.length > index && values.vedlegg[index] ? values.vedlegg[index] : [] || [];
};

export const validateRisikofaktorer =
    (intl: IntlShape, label: string, type: Arbeidsforholdstype) => (risikoFaktorer: string) => {
        if (!hasValue(risikoFaktorer) || risikoFaktorer.trim() === '') {
            return intlUtils(intl, `valideringsfeil.skjema.risikofaktorer.${type}.påkrevd`);
        }

        if (risikoFaktorer.length > TEXT_INPUT_MAX_LENGTH) {
            return intlUtils(intl, `valideringsfeil.skjema.risikofaktorer.forLang`);
        }

        if (risikoFaktorer.length < TEXT_INPUT_MIN_LENGTH) {
            return intlUtils(intl, `valideringsfeil.skjema.risikofaktorer.forKort`);
        }

        return validateTextInputField(risikoFaktorer, label, intl);
    };
