import Søknad from '../../../../types/søknad/Søknad';
import { Søkerinfo } from '../../../../types/søkerinfo';
import AnnenForelder from '../../../../types/søknad/AnnenForelder';
import { Søker } from '../../../../types/søknad/Søker';
import { Barn, ForeldreansvarBarn } from '../../../../types/søknad/Barn';
import Person from '../../../../types/Person';
import { QuestionConfig, Questions, questionIsAnswered } from '../../../../util/questions/Question';
import { erFarEllerMedmor } from '../../../../util/domain/personUtil';

export interface AnnenForelderStegVisibility {
    navnPåAnnenForelder: boolean;
    kanIkkeOppgis: boolean;
    fødselsnummer: boolean;
    deltOmsorg: boolean;
    harRettPåForeldrepenger: boolean;
    erMorUfør: boolean;
    erAnnenForelderInformert: boolean;
    foreldreansvarsdato: boolean;
    personaliaRegistrertAnnenForelder: boolean;
    isComplete: boolean;
}

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
    'omsorgsovertakelseDato' = 'omsorgsovertakelseDato'
}

const annenForelderSpørsmålConfig: QuestionConfig<AnnenForelderSpørsmålPayload> = {
    [AnnenForelderSpørsmålKeys.navnPåAnnenForelder]: {
        getValue: ({ annenForelder }) => annenForelder.fornavn,
        ownDependency: (props) =>
            props.annenForelder.kanIkkeOppgis !== true && props.annenForelderErRegistrert === false
    },
    [AnnenForelderSpørsmålKeys.kanIkkeOppgis]: {
        isOptional: true,
        getValue: ({ annenForelder }) => annenForelder.kanIkkeOppgis,
        ownDependency: (props) =>
            props.annenForelder.kanIkkeOppgis !== true && props.annenForelderErRegistrert === false
    },
    [AnnenForelderSpørsmålKeys.fødselsnummer]: {
        getValue: ({ annenForelder }) => annenForelder.fnr,
        ownDependency: (props) => {
            return (
                props.annenForelder.kanIkkeOppgis !== true &&
                props.annenForelderErRegistrert === false &&
                questionIsAnswered(props.annenForelder.fornavn)
            );
        }
    },
    [AnnenForelderSpørsmålKeys.deltOmsorg]: {
        getValue: ({ søker }) => søker.erAleneOmOmsorg,
        ownDependency: (props) =>
            props.annenForelder.kanIkkeOppgis !== true &&
            (props.annenForelderErRegistrert === true ||
                ((props.annenForelder.utenlandskFnr !== true && questionIsAnswered(props.annenForelder.fnr)) ||
                    (props.annenForelder.utenlandskFnr === true &&
                        questionIsAnswered(props.annenForelder.bostedsland) &&
                        questionIsAnswered(props.annenForelder.fnr))))
    },
    [AnnenForelderSpørsmålKeys.harRettPåForeldrepenger]: {
        getValue: ({ annenForelder }) => annenForelder.harRettPåForeldrepenger,
        parentQuestion: AnnenForelderSpørsmålKeys.deltOmsorg,
        ownDependency: (props) => {
            return props.søker.erAleneOmOmsorg === false;
        }
    },
    [AnnenForelderSpørsmålKeys.erMorUfør]: {
        getValue: ({ annenForelder }) => annenForelder.erUfør,
        parentQuestion: AnnenForelderSpørsmålKeys.harRettPåForeldrepenger,
        ownDependency: (props) => props.annenForelder.harRettPåForeldrepenger === false
    },
    [AnnenForelderSpørsmålKeys.erAnnenForelderInformert]: {
        getValue: ({ annenForelder }) => annenForelder.erInformertOmSøknaden,
        parentQuestion: AnnenForelderSpørsmålKeys.deltOmsorg,
        ownDependency: (props) => {
            return props.søker.erAleneOmOmsorg === false && props.annenForelder.harRettPåForeldrepenger === true;
        }
    },
    [AnnenForelderSpørsmålKeys.omsorgsovertakelseDato]: {
        getValue: ({ barn }) => (barn as ForeldreansvarBarn).foreldreansvarsdato,
        parentQuestion: AnnenForelderSpørsmålKeys.deltOmsorg,
        ownDependency: (props) => props.søker.erAleneOmOmsorg === true
    }
};

const questions = Questions(annenForelderSpørsmålConfig);

export const getAnnenForelderStegVisibility = (
    søknad: Partial<Søknad>,
    søkerinfo: Søkerinfo
): AnnenForelderStegVisibility | undefined => {
    const { annenForelder, søker, barn } = søknad;
    const { person } = søkerinfo;

    if (!søker || !barn || !annenForelder || !person) {
        return;
    }
    const registrertAnnenForelder = søknad.sensitivInfoIkkeLagre
        ? søknad.sensitivInfoIkkeLagre.registrertAnnenForelder
        : undefined;

    const payload: AnnenForelderSpørsmålPayload = {
        søker,
        barn,
        annenForelder,
        person,
        søkerErFarEllerMedmor: erFarEllerMedmor(person.kjønn, søker.rolle),
        annenForelderErRegistrert: registrertAnnenForelder !== undefined
    };

    const skalVises = (question: AnnenForelderSpørsmålKeys): boolean => {
        return questions.isVisible(question, payload);
    };

    return {
        navnPåAnnenForelder: skalVises(AnnenForelderSpørsmålKeys.navnPåAnnenForelder),
        kanIkkeOppgis: skalVises(AnnenForelderSpørsmålKeys.kanIkkeOppgis),
        fødselsnummer: skalVises(AnnenForelderSpørsmålKeys.fødselsnummer),
        deltOmsorg: skalVises(AnnenForelderSpørsmålKeys.deltOmsorg),
        erAnnenForelderInformert: skalVises(AnnenForelderSpørsmålKeys.erAnnenForelderInformert),
        erMorUfør: skalVises(AnnenForelderSpørsmålKeys.erMorUfør),
        harRettPåForeldrepenger: skalVises(AnnenForelderSpørsmålKeys.harRettPåForeldrepenger),
        foreldreansvarsdato: skalVises(AnnenForelderSpørsmålKeys.omsorgsovertakelseDato),
        personaliaRegistrertAnnenForelder: annenForelder.kanIkkeOppgis !== true,
        isComplete: questions.allQuestionsAreAnswered(payload)
    };
};
