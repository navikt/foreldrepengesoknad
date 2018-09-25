import { QuestionConfig, Questions, QuestionVisibility } from '../../../util/questions/Question';
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
        getValue: ({ periode }) => periode.gradert
    },
    [GradertUttakSpørsmålKeys.stillingsprosent]: {
        getValue: ({ periode }) => periode.stillingsprosent,
        parentQuestion: GradertUttakSpørsmålKeys.skalHaGradering,
        condition: ({ periode }) => periode.gradert === true
    },
    [GradertUttakSpørsmålKeys.hvorSkalDuJobbe]: {
        getValue: ({ periode }) => periode.orgnr,
        parentQuestion: GradertUttakSpørsmålKeys.stillingsprosent
    },
    [GradertUttakSpørsmålKeys.samtidigGradertUttak]: {
        getValue: ({ periode }) => periode.ønskerSamtidigUttak,
        condition: ({ annenForelderHarRett, erAleneOmOmsorg, periode }) =>
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
