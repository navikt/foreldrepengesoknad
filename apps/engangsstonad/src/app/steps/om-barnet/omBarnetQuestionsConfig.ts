import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

export interface OmBarnetQuestionPayload extends OmBarnetFormData {
    situasjon: string;
    kjønn: string;
}

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
        visibilityFilter: ({ adopsjonAvEktefellesBarn, erBarnetFødt, søkerAdopsjonAlene, kjønn, adopsjonsdato }) =>
            erBarnetFødt !== YesOrNo.UNANSWERED ||
            (adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED && hasValue(adopsjonsdato)),
    },
    [OmBarnetFormField.adopsjonsdato]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ adopsjonsdato }) => hasValue(adopsjonsdato),
        visibilityFilter: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.søkerAdopsjonAlene]: {
        isIncluded: ({ situasjon, kjønn, adopsjonAvEktefellesBarn }) =>
            situasjon === 'adopsjon' && kjønn === 'M' && adopsjonAvEktefellesBarn === YesOrNo.NO,
        isAnswered: ({ søkerAdopsjonAlene }) => søkerAdopsjonAlene !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ adopsjonAvEktefellesBarn, fødselsdatoer }) =>
            adopsjonAvEktefellesBarn === YesOrNo.NO && fødselsdatoer?.length > 0 && fødselsdatoer[0] !== '',
    },
    [OmBarnetFormField.fødselsdatoer]: {
        isIncluded: ({ erBarnetFødt, adopsjonAvEktefellesBarn }) =>
            erBarnetFødt === YesOrNo.YES || adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ fødselsdatoer }) => fødselsdatoer?.length > 0 && fødselsdatoer[0] !== '',
        visibilityFilter: ({ antallBarn }) => hasValue(antallBarn),
    },
    [OmBarnetFormField.omsorgsovertakelse]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ omsorgsovertakelse }) => omsorgsovertakelse?.length > 0,
        visibilityFilter: ({ adopsjonAvEktefellesBarn, fødselsdatoer, søkerAdopsjonAlene, kjønn }) =>
            (adopsjonAvEktefellesBarn === YesOrNo.YES && fødselsdatoer?.length > 0 && fødselsdatoer[0] !== '') ||
            (adopsjonAvEktefellesBarn === YesOrNo.NO && søkerAdopsjonAlene !== YesOrNo.UNANSWERED) ||
            (kjønn === 'K' && fødselsdatoer?.length > 0 && fødselsdatoer[0] !== ''),
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ termindato }) => hasValue(termindato),
        visibilityFilter: ({ antallBarn }) => hasValue(antallBarn),
    },
    [OmBarnetFormField.terminbekreftelse]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ terminbekreftelse }) => terminbekreftelse?.length > 0,
        visibilityFilter: ({ termindato }) => hasValue(termindato),
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ terminbekreftelsedato }) => hasValue(terminbekreftelsedato),
        visibilityFilter: ({ terminbekreftelse }) => terminbekreftelse?.length > 0,
    },
};

const omBarnetQuestionsConfig = Questions<OmBarnetQuestionPayload, OmBarnetFormField>(OmBarnetFormConfig);

export default omBarnetQuestionsConfig;
