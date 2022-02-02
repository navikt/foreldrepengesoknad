import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { RegistrertBarn } from 'app/types/Person';
import { Søkerrolle } from 'app/types/Søkerrolle';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import dayjs from 'dayjs';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

export interface OmBarnetQuestionPayload extends OmBarnetFormData {
    situasjon: string;
    rolle: Søkerrolle;
    arbeidsforhold: Arbeidsforhold[];
    registrerteBarn: RegistrertBarn[];
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

export const kanSøkePåTermin = (rolle: Søkerrolle, termindato: string): boolean => {
    if (!isFarEllerMedmor(rolle)) {
        return true;
    }
    return hasValue(termindato) ? andreAugust2022ReglerGjelder(new Date(termindato)) : false;
};

const skalViseErBarnFødt = (
    situasjon: string,
    registrerteBarn: RegistrertBarn[],
    gjelderAnnetBarn: boolean
): boolean => {
    if (situasjon === 'fødsel') {
        if (registrerteBarn.length > 0) {
            return gjelderAnnetBarn;
        }

        return true;
    }

    return false;
};

const OmBarnetFormConfig: QuestionConfig<OmBarnetQuestionPayload, OmBarnetFormField> = {
    [OmBarnetFormField.gjelderAnnetBarn]: {
        isIncluded: ({ registrerteBarn }) => registrerteBarn.length > 0,
        isAnswered: () => true,
        visibilityFilter: ({ situasjon }) => situasjon === 'fødsel',
    },
    [OmBarnetFormField.valgteBarn]: {
        isIncluded: ({ registrerteBarn, situasjon }) => registrerteBarn.length > 0 && situasjon === 'fødsel',
        isAnswered: ({ valgteBarn, gjelderAnnetBarn }) => valgteBarn.length > 0 || gjelderAnnetBarn,
        visibilityFilter: ({ registrerteBarn }) => registrerteBarn.length > 0,
    },
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: {
        isIncluded: ({ situasjon }) => situasjon === 'adopsjon',
        isAnswered: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ situasjon }) => situasjon === 'adopsjon',
    },
    [OmBarnetFormField.erBarnetFødt]: {
        isIncluded: ({ situasjon }) => situasjon === 'fødsel',
        isAnswered: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ situasjon, registrerteBarn, gjelderAnnetBarn }) =>
            skalViseErBarnFødt(situasjon, registrerteBarn, gjelderAnnetBarn),
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
        isIncluded: ({ rolle, erBarnetFødt, arbeidsforhold, termindato }) =>
            erBarnetFødt === YesOrNo.NO && arbeidsforhold.length === 0 && kanSøkePåTermin(rolle, termindato),
        isAnswered: ({ rolle, termindato, terminbekreftelse }) =>
            kanSøkePåTermin(rolle, termindato) && hasValue(terminbekreftelse),
        visibilityFilter: ({ termindato }) => hasValue(termindato),
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: ({ rolle, erBarnetFødt, arbeidsforhold, termindato }) =>
            erBarnetFødt === YesOrNo.NO && arbeidsforhold.length === 0 && kanSøkePåTermin(rolle, termindato),
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
