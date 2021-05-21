import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Søkerrolle } from 'app/types/Søkerrolle';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import dayjs from 'dayjs';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

export interface OmBarnetQuestionPayload extends OmBarnetFormData {
    situasjon: string;
    rolle: Søkerrolle;
    arbeidsforhold: Arbeidsforhold[];
}

const includeTermindato = (rolle: Søkerrolle, fødselsdato: string | undefined): boolean => {
    if (!fødselsdato) {
        return false;
    }

    if (isFarEllerMedmor(rolle)) {
        const sixWeeksAfterBirthday = dayjs(fødselsdato).add(6, 'weeks');

        return dayjs(sixWeeksAfterBirthday).isAfter(new Date());
    }

    return true;
};

const OmBarnetFormConfig: QuestionConfig<OmBarnetQuestionPayload, OmBarnetFormField> = {
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: {
        isIncluded: ({ situasjon }) => situasjon === 'adopsjon',
        isAnswered: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ situasjon }) => situasjon === 'adopsjon',
    },
    [OmBarnetFormField.erBarnetFødt]: {
        isIncluded: ({ situasjon }) => situasjon === 'fødsel',
        isAnswered: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ situasjon }) => situasjon === 'fødsel',
    },
    [OmBarnetFormField.antallBarn]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarn }) => hasValue(antallBarn),
        visibilityFilter: ({ adopsjonAvEktefellesBarn, erBarnetFødt, adopsjonsdato }) =>
            erBarnetFødt !== YesOrNo.UNANSWERED ||
            (adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED && hasValue(adopsjonsdato)),
    },
    [OmBarnetFormField.adopsjonsdato]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ adopsjonsdato }) => hasValue(adopsjonsdato),
        visibilityFilter: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.fødselsdatoer]: {
        isIncluded: ({ erBarnetFødt, adopsjonAvEktefellesBarn }) =>
            erBarnetFødt === YesOrNo.YES || adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ fødselsdatoer }) => fødselsdatoer.length > 0 && hasValue(fødselsdatoer[0]),
        visibilityFilter: ({ antallBarn }) => {
            return hasValue(antallBarn);
        },
    },
    [OmBarnetFormField.omsorgsovertakelse]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: () => true,
        visibilityFilter: ({ adoptertIUtlandet, adopsjonAvEktefellesBarn, fødselsdatoer }) =>
            adoptertIUtlandet !== YesOrNo.UNANSWERED ||
            (adopsjonAvEktefellesBarn === YesOrNo.YES && hasValue(fødselsdatoer[0])),
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: ({ rolle, fødselsdatoer, erBarnetFødt }) =>
            (includeTermindato(rolle, fødselsdatoer[0]) && erBarnetFødt !== YesOrNo.UNANSWERED) ||
            erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ termindato }) => hasValue(termindato),
        visibilityFilter: ({ fødselsdatoer, erBarnetFødt, antallBarn }) => {
            return hasValue(fødselsdatoer[0]) || (erBarnetFødt === YesOrNo.NO && hasValue(antallBarn));
        },
    },
    [OmBarnetFormField.terminbekreftelse]: {
        isIncluded: ({ erBarnetFødt, arbeidsforhold }) => erBarnetFødt === YesOrNo.NO && arbeidsforhold.length === 0,
        isAnswered: () => true,
        visibilityFilter: ({ termindato }) => hasValue(termindato),
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: ({ erBarnetFødt, arbeidsforhold }) => erBarnetFødt === YesOrNo.NO && arbeidsforhold.length === 0,
        isAnswered: ({ terminbekreftelsedato }) => hasValue(terminbekreftelsedato),
        visibilityFilter: ({ termindato }) => hasValue(termindato),
    },
    [OmBarnetFormField.adoptertIUtlandet]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn === YesOrNo.NO,
        isAnswered: ({ adoptertIUtlandet }) => adoptertIUtlandet !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ fødselsdatoer }) => hasValue(fødselsdatoer[0]),
    },
    [OmBarnetFormField.ankomstdato]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn === YesOrNo.NO,
        isAnswered: ({ ankomstdato }) => hasValue(ankomstdato),
        visibilityFilter: ({ adoptertIUtlandet }) => adoptertIUtlandet === YesOrNo.YES,
    },
};

const omBarnetQuestionsConfig = Questions<OmBarnetQuestionPayload, OmBarnetFormField>(OmBarnetFormConfig);

export default omBarnetQuestionsConfig;
