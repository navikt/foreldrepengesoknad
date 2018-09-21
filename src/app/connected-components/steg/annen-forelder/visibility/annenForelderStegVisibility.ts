import Søknad from '../../../../types/søknad/Søknad';
import { Søkerinfo } from '../../../../types/søkerinfo';
import AnnenForelder from '../../../../types/s\u00F8knad/AnnenForelder';
import { Søker } from '../../../../types/s\u00F8knad/S\u00F8ker';
import { Barn, ForeldreansvarBarn } from '../../../../types/s\u00F8knad/Barn';
import Person from '../../../../types/Person';
import { QuestionConfig, Questions, questionIsAnswered } from '../../../../util/questions/Question';
import { erFarEllerMedmor } from '../../../../util/domain/personUtil';

export interface AnnenForelderStegVisibility {
    navnPåAnnenForelder: boolean;
    annenForelderKanIkkeOppgis: boolean;
    fødselsnummer: boolean;
    deltOmsorg: boolean;
    harRettPåForeldrepenger: boolean;
    erMorUfør: boolean;
    erAnnenForelderInformert: boolean;
    omsorgsovertakelseDato: boolean;
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

enum AnnenForelderSpørsmål {
    'navnPåAnnenForelder' = 'navnPåAnnenForelder',
    'annenForelderKanIkkeOppgis' = 'annenForelderKanIkkeOppgis',
    'fødselsnummer' = 'fødselsnummer',
    'deltOmsorg' = 'deltOmsorg',
    'erAnnenForelderInformert' = 'erAnnenForelderInformert',
    'erMorUfør' = 'erMorUfør',
    'harRettPåForeldrepenger' = 'harRettPåForeldrepenger',
    'omsorgsovertakelseDato' = 'omsorgsovertakelseDato'
}

const annenForelderSpørsmålConfig: QuestionConfig<AnnenForelderSpørsmålPayload> = {
    [AnnenForelderSpørsmål.navnPåAnnenForelder]: {
        getValue: ({ annenForelder }) => annenForelder.fornavn,
        ownDependency: (props) => props.annenForelderErRegistrert === false
    },
    [AnnenForelderSpørsmål.annenForelderKanIkkeOppgis]: {
        isOptional: true,
        getValue: ({ annenForelder }) => annenForelder.kanIkkeOppgis,
        ownDependency: (props) => props.annenForelderErRegistrert === false
    },
    [AnnenForelderSpørsmål.fødselsnummer]: {
        getValue: ({ annenForelder }) => annenForelder.fnr,
        ownDependency: (props) => {
            return props.annenForelderErRegistrert === false && questionIsAnswered(props.annenForelder.fornavn);
        }
    },
    [AnnenForelderSpørsmål.deltOmsorg]: {
        getValue: ({ søker }) => søker.erAleneOmOmsorg,
        ownDependency: (props) =>
            props.annenForelderErRegistrert === true ||
            ((props.annenForelder.utenlandskFnr !== true && questionIsAnswered(props.annenForelder.fnr)) ||
                (props.annenForelder.utenlandskFnr === true &&
                    questionIsAnswered(props.annenForelder.bostedsland) &&
                    questionIsAnswered(props.annenForelder.fnr)))
    },
    [AnnenForelderSpørsmål.harRettPåForeldrepenger]: {
        getValue: ({ annenForelder }) => annenForelder.harRettPåForeldrepenger,
        parentQuestion: AnnenForelderSpørsmål.deltOmsorg,
        ownDependency: (props) => props.søker.erAleneOmOmsorg === false
    },
    [AnnenForelderSpørsmål.erMorUfør]: {
        getValue: ({ annenForelder }) => annenForelder.erUfør,
        parentQuestion: AnnenForelderSpørsmål.harRettPåForeldrepenger,
        ownDependency: (props) => props.annenForelder.harRettPåForeldrepenger === false
    },
    [AnnenForelderSpørsmål.erAnnenForelderInformert]: {
        getValue: ({ annenForelder }) => annenForelder.erInformertOmSøknaden,
        parentQuestion: AnnenForelderSpørsmål.deltOmsorg,
        ownDependency: (props) => {
            return props.søker.erAleneOmOmsorg === false && props.annenForelder.harRettPåForeldrepenger === true;
        }
    },
    [AnnenForelderSpørsmål.omsorgsovertakelseDato]: {
        getValue: ({ barn }) => (barn as ForeldreansvarBarn).foreldreansvarsdato,
        parentQuestion: AnnenForelderSpørsmål.deltOmsorg,
        ownDependency: (props) => props.søker.erAleneOmOmsorg === true
    }
};

const questions = Questions(annenForelderSpørsmålConfig);

export const getAnnenForelderStegVisibility = (
    søknad: Partial<Søknad>,
    søkerinfo: Søkerinfo
): AnnenForelderStegVisibility | undefined => {
    const { annenForelder, søker, barn } = søknad;
    const registrertAnnenForelder = søknad.sensitivInfoIkkeLagre
        ? søknad.sensitivInfoIkkeLagre.registrertAnnenForelder
        : undefined;
    const { person } = søkerinfo;

    if (!søker || !barn || !annenForelder || !person) {
        return;
    }
    const payload: AnnenForelderSpørsmålPayload = {
        søker,
        barn,
        annenForelder,
        person,
        søkerErFarEllerMedmor: erFarEllerMedmor(person.kjønn, søker.rolle),
        annenForelderErRegistrert: registrertAnnenForelder !== undefined
    };

    const skalVises = (question: AnnenForelderSpørsmål): boolean => {
        return questions.check(question, payload);
    };

    console.log(payload);
    return {
        navnPåAnnenForelder: skalVises(AnnenForelderSpørsmål.navnPåAnnenForelder),
        annenForelderKanIkkeOppgis: skalVises(AnnenForelderSpørsmål.annenForelderKanIkkeOppgis),
        fødselsnummer: skalVises(AnnenForelderSpørsmål.fødselsnummer),
        deltOmsorg: skalVises(AnnenForelderSpørsmål.deltOmsorg),
        erAnnenForelderInformert: skalVises(AnnenForelderSpørsmål.erAnnenForelderInformert),
        erMorUfør: skalVises(AnnenForelderSpørsmål.erMorUfør),
        harRettPåForeldrepenger: skalVises(AnnenForelderSpørsmål.harRettPåForeldrepenger),
        omsorgsovertakelseDato: skalVises(AnnenForelderSpørsmål.omsorgsovertakelseDato),
        personaliaRegistrertAnnenForelder: annenForelder.kanIkkeOppgis !== true,
        isComplete: questions.allQuestionsAnswered(payload)
    };
};
