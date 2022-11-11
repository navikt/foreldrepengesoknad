import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { RegistrertBarn } from 'app/types/Person';
import { Situasjon } from 'app/types/Situasjon';
import { Søkerrolle } from 'app/types/Søkerrolle';
import {
    andreAugust2022ReglerGjelder,
    førsteOktober2021ReglerGjelder,
    getEldsteRegistrerteBarn,
    ISOStringToDate,
} from 'app/utils/dateUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import dayjs from 'dayjs';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

export interface OmBarnetQuestionPayload extends OmBarnetFormData {
    situasjon: Situasjon;
    rolle: Søkerrolle;
    arbeidsforhold: Arbeidsforhold[];
    valgteRegistrerteBarn: RegistrertBarn[] | undefined;
    søknadGjelderEtNyttBarn: boolean;
}

const erDatoInnenforDeSiste12Ukene = (dato: Date) => {
    const twelveWeeksAfterBirthday = dayjs(dato).add(12, 'weeks');
    return dayjs(twelveWeeksAfterBirthday).isAfter(new Date(), 'day');
};

const includeTermindato = (
    rolle: Søkerrolle,
    fødselsdato: string | undefined,
    valgteRegistrerteBarn: RegistrertBarn[] | undefined,
    situasjon: Situasjon
): boolean => {
    if (situasjon === 'adopsjon') {
        return false;
    }

    let eldsteBarnFødselsdato = undefined;

    if (valgteRegistrerteBarn !== undefined && valgteRegistrerteBarn.length > 0) {
        const eldsteBarn = getEldsteRegistrerteBarn(valgteRegistrerteBarn);

        eldsteBarnFødselsdato = eldsteBarn.fødselsdato;
    }

    if (!fødselsdato && !eldsteBarnFødselsdato) {
        return false;
    }

    const relevantFødselsdato = eldsteBarnFødselsdato || ISOStringToDate(fødselsdato);

    if (isFarEllerMedmor(rolle)) {
        if (
            andreAugust2022ReglerGjelder(relevantFødselsdato!) &&
            valgteRegistrerteBarn !== undefined &&
            valgteRegistrerteBarn.length === 0
        ) {
            return true;
        }
        return erDatoInnenforDeSiste12Ukene(relevantFødselsdato!);
    }
    return true;
};

const includeTerminbekreftelse = (
    erBarnetFødt: YesOrNo,
    arbeidsforhold: Arbeidsforhold[],
    rolle: Søkerrolle,
    termindato: string
) => {
    return erBarnetFødt === YesOrNo.NO && arbeidsforhold.length === 0 && kanSøkePåTermin(rolle, termindato);
};

const includeAdoptertIUtlandet = (adopsjonAvEktefellesBarn: YesOrNo, omsorgsovertakelse: string) => {
    return (
        adopsjonAvEktefellesBarn === YesOrNo.NO &&
        omsorgsovertakelse !== '' &&
        !førsteOktober2021ReglerGjelder(ISOStringToDate(omsorgsovertakelse)!)
    );
};

const includeAnkomstDato = (adopsjonAvEktefellesBarn: YesOrNo, adopsjonsdato: string) => {
    return adopsjonAvEktefellesBarn === YesOrNo.NO && includeAdoptertIUtlandet(adopsjonAvEktefellesBarn, adopsjonsdato);
};

export const kanSøkePåTermin = (rolle: Søkerrolle, termindato: string): boolean => {
    if (!isFarEllerMedmor(rolle)) {
        return true;
    }
    return hasValue(termindato) ? andreAugust2022ReglerGjelder(new Date(termindato)) : false;
};

const skalViseErBarnFødt = (situasjon: string, søknadGjelderEtNyttBarn: boolean): boolean => {
    if (situasjon === 'fødsel') {
        return søknadGjelderEtNyttBarn;
    }

    return false;
};

const skalViseOmsorgsovertakelse = (
    adopsjonsdato: string,
    adopsjonAvEktefellesBarn: YesOrNo,
    adoptertIUtlandet: YesOrNo,
    ankomstdato: string,
    søknadGjelderEtNyttBarn: boolean,
    fødselsdatoer: string[] | undefined
) => {
    console.log(
        adopsjonAvEktefellesBarn,
        adopsjonsdato,
        adoptertIUtlandet,
        ankomstdato,
        søknadGjelderEtNyttBarn,
        fødselsdatoer
    );

    if (søknadGjelderEtNyttBarn) {
        return (
            (søknadGjelderEtNyttBarn &&
                includeAdoptertIUtlandet(adopsjonAvEktefellesBarn, adopsjonsdato) &&
                adoptertIUtlandet !== YesOrNo.UNANSWERED) ||
            (søknadGjelderEtNyttBarn &&
                !includeAdoptertIUtlandet(adopsjonAvEktefellesBarn, adopsjonsdato) &&
                fødselsdatoer !== undefined &&
                hasValue(fødselsdatoer[0])) ||
            (søknadGjelderEtNyttBarn &&
                adopsjonAvEktefellesBarn === YesOrNo.YES &&
                fødselsdatoer !== undefined &&
                hasValue(fødselsdatoer[0]))
        );
    } else {
        return (
            (adopsjonAvEktefellesBarn === YesOrNo.YES && hasValue(adopsjonsdato)) ||
            (adopsjonAvEktefellesBarn === YesOrNo.NO &&
                hasValue(adopsjonsdato) &&
                !includeAdoptertIUtlandet(adopsjonAvEktefellesBarn, adopsjonsdato)) ||
            (adopsjonAvEktefellesBarn === YesOrNo.NO &&
                includeAdoptertIUtlandet(adopsjonAvEktefellesBarn, adopsjonsdato) &&
                adoptertIUtlandet === YesOrNo.NO) ||
            (adopsjonAvEktefellesBarn === YesOrNo.NO &&
                includeAdoptertIUtlandet(adopsjonAvEktefellesBarn, adopsjonsdato) &&
                adoptertIUtlandet === YesOrNo.YES &&
                hasValue(ankomstdato))
        );
    }
};

const OmBarnetFormConfig: QuestionConfig<OmBarnetQuestionPayload, OmBarnetFormField> = {
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: {
        isIncluded: ({ situasjon }) => situasjon === 'adopsjon',
        isAnswered: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ situasjon }) => situasjon === 'adopsjon',
    },
    [OmBarnetFormField.erBarnetFødt]: {
        isIncluded: ({ situasjon, søknadGjelderEtNyttBarn }) => søknadGjelderEtNyttBarn && situasjon === 'fødsel',
        isAnswered: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ situasjon, søknadGjelderEtNyttBarn }) =>
            skalViseErBarnFødt(situasjon, søknadGjelderEtNyttBarn),
    },
    [OmBarnetFormField.antallBarn]: {
        isIncluded: ({ søknadGjelderEtNyttBarn }) => søknadGjelderEtNyttBarn,
        isAnswered: ({ antallBarn }) => hasValue(antallBarn),
        visibilityFilter: ({ adopsjonAvEktefellesBarn, erBarnetFødt, adopsjonsdato }) =>
            erBarnetFødt !== YesOrNo.UNANSWERED ||
            (adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED && hasValue(adopsjonsdato)),
    },
    [OmBarnetFormField.antallBarnSelect]: {
        isIncluded: ({ antallBarn, søknadGjelderEtNyttBarn }) =>
            parseInt(antallBarn, 10) >= 3 && søknadGjelderEtNyttBarn,
        isAnswered: ({ antallBarnSelect }) => hasValue(antallBarnSelect),
        visibilityFilter: ({ adopsjonAvEktefellesBarn, erBarnetFødt, adopsjonsdato, antallBarn }) =>
            parseInt(antallBarn, 10) >= 3 &&
            (erBarnetFødt !== YesOrNo.UNANSWERED ||
                (adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED && hasValue(adopsjonsdato))),
    },
    [OmBarnetFormField.adopsjonsdato]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ adopsjonsdato }) => hasValue(adopsjonsdato),
        visibilityFilter: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.fødselsdatoer]: {
        isIncluded: ({ erBarnetFødt, adopsjonAvEktefellesBarn, søknadGjelderEtNyttBarn }) =>
            søknadGjelderEtNyttBarn &&
            (erBarnetFødt === YesOrNo.YES || adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED),
        isAnswered: ({ fødselsdatoer }) => fødselsdatoer.length > 0 && hasValue(fødselsdatoer[0]),
        visibilityFilter: ({ antallBarn }) => {
            return hasValue(antallBarn);
        },
    },
    [OmBarnetFormField.omsorgsovertakelse]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: () => true,
        visibilityFilter: ({
            adopsjonsdato,
            adopsjonAvEktefellesBarn,
            ankomstdato,
            adoptertIUtlandet,
            søknadGjelderEtNyttBarn,
            fødselsdatoer,
        }) =>
            skalViseOmsorgsovertakelse(
                adopsjonsdato,
                adopsjonAvEktefellesBarn,
                adoptertIUtlandet,
                ankomstdato,
                søknadGjelderEtNyttBarn,
                fødselsdatoer
            ),
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: ({ rolle, fødselsdatoer, erBarnetFødt, situasjon, valgteRegistrerteBarn }) =>
            includeTermindato(rolle, fødselsdatoer[0], valgteRegistrerteBarn, situasjon) || erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ termindato }) => hasValue(termindato),
        visibilityFilter: ({ fødselsdatoer, erBarnetFødt, antallBarn, valgteRegistrerteBarn }) => {
            return (
                hasValue(fødselsdatoer[0]) ||
                (erBarnetFødt === YesOrNo.NO && hasValue(antallBarn)) ||
                (valgteRegistrerteBarn !== undefined && valgteRegistrerteBarn.length > 0)
            );
        },
    },
    [OmBarnetFormField.terminbekreftelse]: {
        isIncluded: ({ erBarnetFødt, arbeidsforhold, rolle, termindato }) =>
            includeTerminbekreftelse(erBarnetFødt, arbeidsforhold, rolle, termindato),
        isAnswered: ({ terminbekreftelse }) => hasValue(terminbekreftelse),
        visibilityFilter: ({ termindato }) => hasValue(termindato),
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: ({ erBarnetFødt, arbeidsforhold, rolle, termindato }) =>
            erBarnetFødt === YesOrNo.NO && arbeidsforhold.length === 0 && kanSøkePåTermin(rolle, termindato),
        isAnswered: ({ terminbekreftelsedato }) => hasValue(terminbekreftelsedato),
        visibilityFilter: ({ termindato }) => hasValue(termindato),
    },
    [OmBarnetFormField.adoptertIUtlandet]: {
        isIncluded: ({ adopsjonAvEktefellesBarn, adopsjonsdato }) =>
            includeAdoptertIUtlandet(adopsjonAvEktefellesBarn, adopsjonsdato),
        isAnswered: ({ adoptertIUtlandet }) => adoptertIUtlandet !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ fødselsdatoer, søknadGjelderEtNyttBarn }) =>
            (søknadGjelderEtNyttBarn && hasValue(fødselsdatoer[0])) || !søknadGjelderEtNyttBarn,
    },
    [OmBarnetFormField.ankomstdato]: {
        isIncluded: ({ adopsjonAvEktefellesBarn, adopsjonsdato }) =>
            includeAnkomstDato(adopsjonAvEktefellesBarn, adopsjonsdato),
        isAnswered: ({ ankomstdato }) => hasValue(ankomstdato),
        visibilityFilter: ({ adoptertIUtlandet }) => adoptertIUtlandet === YesOrNo.YES,
    },
};

const omBarnetQuestionsConfig = Questions<OmBarnetQuestionPayload, OmBarnetFormField>(OmBarnetFormConfig);

export default omBarnetQuestionsConfig;
