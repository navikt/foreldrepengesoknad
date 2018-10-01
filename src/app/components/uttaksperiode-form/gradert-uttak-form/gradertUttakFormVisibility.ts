import { QuestionConfig, Questions, QuestionVisibility, questionIsAnswered } from '../../../util/questions/Question';
import { Uttaksperiode } from '../../../types/uttaksplan/periodetyper';

interface GradertUttakSpørsmålPayload {
    periode: Uttaksperiode;
    erAleneOmOmsorg: boolean;
    annenForelderHarRett: boolean;
}

export enum GradertUttakSpørsmålKeys {
    'skalHaGradering' = 'skalHaGradering',
    'stillingsprosent' = 'stillingsprosent',
    'samtidigGradertUttak' = 'samtidigGradertUttak',
    'hvorSkalDuJobbe' = 'hvorSkalDuJobbe'
}

export type GradertUttakSpørsmålVisibility = QuestionVisibility<GradertUttakSpørsmålKeys>;

const gradertUttakSpørsmålConfig: QuestionConfig<GradertUttakSpørsmålPayload, GradertUttakSpørsmålKeys> = {
    [GradertUttakSpørsmålKeys.skalHaGradering]: {
        isAnswered: ({ periode }) => questionIsAnswered(periode.gradert)
    },
    [GradertUttakSpørsmålKeys.stillingsprosent]: {
        isAnswered: ({ periode }) => questionIsAnswered(periode.stillingsprosent),
        parentQuestion: GradertUttakSpørsmålKeys.skalHaGradering,
        condition: ({ periode }) => periode.gradert === true
    },
    [GradertUttakSpørsmålKeys.hvorSkalDuJobbe]: {
        isAnswered: ({ periode }) => questionIsAnswered(periode.orgnr),
        parentQuestion: GradertUttakSpørsmålKeys.stillingsprosent
    },
    [GradertUttakSpørsmålKeys.samtidigGradertUttak]: {
        isAnswered: ({ periode }) => questionIsAnswered(periode.ønskerSamtidigUttak),
        condition: ({ annenForelderHarRett, erAleneOmOmsorg, periode }) =>
            periode.gradert === true &&
            erAleneOmOmsorg === false &&
            annenForelderHarRett &&
            (periode.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende === true || periode.orgnr !== undefined)
    }
};

export const getGradertUttakSpørsmålVisibility = (
    periode: Uttaksperiode,
    annenForelderHarRett: boolean,
    erAleneOmOmsorg: boolean
): QuestionVisibility<GradertUttakSpørsmålKeys> => {
    const payload: GradertUttakSpørsmålPayload = {
        periode,
        erAleneOmOmsorg,
        annenForelderHarRett
    };

    return Questions(gradertUttakSpørsmålConfig).getVisbility(payload);
};
