import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { Søkerrolle } from 'app/types/Søkerrolle';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import dayjs from 'dayjs';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

export interface OmBarnetQuestionPayload extends OmBarnetFormData {
    situasjon: string;
    rolle: Søkerrolle;
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
        isAnswered: ({ fødselsdatoer }) =>
            fødselsdatoer !== undefined && fødselsdatoer.length > 0 && hasValue(fødselsdatoer[0]),
        visibilityFilter: ({ antallBarn }) => {
            return hasValue(antallBarn);
        },
    },
    [OmBarnetFormField.omsorgsovertakelse]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ omsorgsovertakelse }) => omsorgsovertakelse !== undefined && omsorgsovertakelse.length > 0,
        visibilityFilter: ({ adopsjonAvEktefellesBarn, fødselsdatoer, rolle }) =>
            (adopsjonAvEktefellesBarn === YesOrNo.YES &&
                fødselsdatoer !== undefined &&
                fødselsdatoer.length > 0 &&
                hasValue(fødselsdatoer[0])) ||
            adopsjonAvEktefellesBarn === YesOrNo.NO ||
            (rolle === 'mor' && fødselsdatoer !== undefined && fødselsdatoer.length > 0 && hasValue(fødselsdatoer[0])),
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: ({ rolle, fødselsdatoer }) =>
            fødselsdatoer !== undefined && includeTermindato(rolle, fødselsdatoer[0]),
        isAnswered: ({ termindato }) => hasValue(termindato),
        visibilityFilter: ({ fødselsdatoer }) => {
            return fødselsdatoer !== undefined && hasValue(fødselsdatoer[0]);
        },
    },
    [OmBarnetFormField.terminbekreftelse]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ terminbekreftelse }) => terminbekreftelse !== undefined && terminbekreftelse.length > 0,
        visibilityFilter: ({ termindato }) => hasValue(termindato),
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ terminbekreftelsedato }) => hasValue(terminbekreftelsedato),
        visibilityFilter: ({ terminbekreftelse }) => terminbekreftelse !== undefined && terminbekreftelse.length > 0,
    },
};

const omBarnetQuestionsConfig = Questions<OmBarnetQuestionPayload, OmBarnetFormField>(OmBarnetFormConfig);

export default omBarnetQuestionsConfig;
