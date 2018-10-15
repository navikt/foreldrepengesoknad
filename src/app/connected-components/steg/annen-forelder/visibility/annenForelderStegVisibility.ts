import Søknad from '../../../../types/søknad/Søknad';
import { Søkerinfo } from '../../../../types/søkerinfo';
import AnnenForelder from '../../../../types/søknad/AnnenForelder';
import { Søker } from '../../../../types/søknad/Søker';
import { Barn } from '../../../../types/søknad/Barn';
import Person from '../../../../types/Person';
import { QuestionConfig, Questions, questionValueIsOk, QuestionVisibility } from '../../../../util/questions/Question';
import { erFarEllerMedmor } from '../../../../util/domain/personUtil';

interface AnnenForelderSpørsmålPayload {
    søker: Søker;
    barn: Barn;
    annenForelder: AnnenForelder;
    person: Person;
    søkerErFarEllerMedmor: boolean;
    annenForelderErRegistrert: boolean;
}

export enum AnnenForelderSpørsmålKeys {
    'navnPåAnnenForelder' = 'navnPåAnnenForelder',
    'kanIkkeOppgis' = 'kanIkkeOppgis',
    'fødselsnummer' = 'fødselsnummer',
    'deltOmsorg' = 'deltOmsorg',
    'erAnnenForelderInformert' = 'erAnnenForelderInformert',
    'erMorUfør' = 'erMorUfør',
    'harRettPåForeldrepenger' = 'harRettPåForeldrepenger',
    'datoForAleneomsorg' = 'datoForAleneomsorg'
}

export type AnnenForelderStegVisibility = QuestionVisibility<AnnenForelderSpørsmålKeys>;

const visDeltOmsorg = (payload: AnnenForelderSpørsmålPayload): boolean => {
    const { annenForelder, annenForelderErRegistrert } = payload;
    if (annenForelder.kanIkkeOppgis) {
        return false;
    }
    return (
        annenForelderErRegistrert === true ||
        ((annenForelder.utenlandskFnr !== true && questionValueIsOk(annenForelder.fnr)) ||
            (annenForelder.utenlandskFnr === true && questionValueIsOk(annenForelder.bostedsland)))
    );
};

const annenForelderSpørsmålConfig: QuestionConfig<AnnenForelderSpørsmålPayload, AnnenForelderSpørsmålKeys> = {
    [AnnenForelderSpørsmålKeys.navnPåAnnenForelder]: {
        isAnswered: ({ annenForelder }) => questionValueIsOk(annenForelder.fornavn),
        condition: (props) => props.annenForelderErRegistrert === false,
        isOptional: (props) => props.annenForelder.kanIkkeOppgis === true
    },
    [AnnenForelderSpørsmålKeys.kanIkkeOppgis]: {
        isOptional: () => true,
        isAnswered: ({ annenForelder }) => questionValueIsOk(annenForelder.kanIkkeOppgis),
        condition: (props) => props.annenForelderErRegistrert === false && !props.søkerErFarEllerMedmor
    },
    [AnnenForelderSpørsmålKeys.fødselsnummer]: {
        isAnswered: ({ annenForelder }) =>
            questionValueIsOk(annenForelder.fnr) ||
            (annenForelder.utenlandskFnr === true && annenForelder.bostedsland !== undefined),
        condition: (props) => {
            return (
                props.annenForelder.kanIkkeOppgis !== true &&
                props.annenForelderErRegistrert === false &&
                questionValueIsOk(props.annenForelder.fornavn)
            );
        }
    },
    [AnnenForelderSpørsmålKeys.deltOmsorg]: {
        isAnswered: ({ søker }) => questionValueIsOk(søker.erAleneOmOmsorg),
        condition: (payload) => visDeltOmsorg(payload)
    },
    [AnnenForelderSpørsmålKeys.harRettPåForeldrepenger]: {
        isAnswered: ({ annenForelder }) => questionValueIsOk(annenForelder.harRettPåForeldrepenger),
        parentQuestion: AnnenForelderSpørsmålKeys.deltOmsorg,
        condition: (props) => {
            return (
                props.søker.erAleneOmOmsorg === false ||
                (props.søker.erAleneOmOmsorg && props.søkerErFarEllerMedmor === false)
            );
        }
    },
    [AnnenForelderSpørsmålKeys.erMorUfør]: {
        isAnswered: ({ annenForelder }) => questionValueIsOk(annenForelder.erUfør),
        parentQuestion: AnnenForelderSpørsmålKeys.harRettPåForeldrepenger,
        condition: (props) =>
            props.søker.erAleneOmOmsorg === false &&
            props.annenForelder.harRettPåForeldrepenger === false &&
            props.søkerErFarEllerMedmor
    },
    [AnnenForelderSpørsmålKeys.erAnnenForelderInformert]: {
        isAnswered: ({ annenForelder }) => questionValueIsOk(annenForelder.erInformertOmSøknaden),
        parentQuestion: AnnenForelderSpørsmålKeys.deltOmsorg,
        condition: (props) => {
            return props.søker.erAleneOmOmsorg === false && props.annenForelder.harRettPåForeldrepenger === true;
        }
    },
    [AnnenForelderSpørsmålKeys.datoForAleneomsorg]: {
        isAnswered: ({ barn }) => barn.datoForAleneomsorg !== undefined,
        parentQuestion: AnnenForelderSpørsmålKeys.deltOmsorg,
        condition: (props) => props.søker.erAleneOmOmsorg === true && props.søkerErFarEllerMedmor === true
    }
};

export const getAnnenForelderStegVisibility = (
    søknad: Partial<Søknad>,
    søkerinfo: Søkerinfo
): QuestionVisibility<AnnenForelderSpørsmålKeys> | undefined => {
    const { annenForelder, søker, barn } = søknad;
    const { person } = søkerinfo;

    if (!søker || !barn || !annenForelder || !person) {
        return undefined;
    }
    const registrertAnnenForelder = søknad.sensitivInfoIkkeLagre
        ? søknad.sensitivInfoIkkeLagre.registrertAnnenForelder
        : undefined;

    const payload: AnnenForelderSpørsmålPayload = {
        søker,
        barn,
        annenForelder,
        person,
        søkerErFarEllerMedmor: erFarEllerMedmor(søker.rolle),
        annenForelderErRegistrert: registrertAnnenForelder !== undefined
    };

    return Questions(annenForelderSpørsmålConfig).getVisbility(payload);
};
