import Søknad, { SøkerRolle, Søkersituasjon } from '../../../types/søknad/Søknad';
import { Søkerinfo } from '../../../types/søkerinfo';
import AnnenForelder from '../../../types/søknad/AnnenForelder';
import { Søker } from '../../../types/søknad/Søker';
import { Barn, isAdopsjonsbarn } from '../../../types/søknad/Barn';
import Person from '../../../types/Person';
import { QuestionConfig, Questions, questionValueIsOk, QuestionVisibility } from '../../../util/questions/Question';
import { getErSøkerFarEllerMedmor } from '../../../util/domain/personUtil';

interface AnnenForelderSpørsmålPayload {
    søker: Søker;
    barn: Barn;
    annenForelder: AnnenForelder;
    gjelderStebarnsadopsjon: boolean;
    person: Person;
    søkerErFarEllerMedmor: boolean;
    annenForelderErRegistrert: boolean;
    erEndringssøknad: boolean;
}

export enum AnnenForelderSpørsmålKeys {
    'navnPåAnnenForelder' = 'navnPåAnnenForelder',
    'kanIkkeOppgis' = 'kanIkkeOppgis',
    'fødselsnummer' = 'fødselsnummer',
    'deltOmsorg' = 'deltOmsorg',
    'erAnnenForelderInformert' = 'erAnnenForelderInformert',
    'erMorUfør' = 'erMorUfør',
    'harRettPåForeldrepenger' = 'harRettPåForeldrepenger',
    'datoForAleneomsorg' = 'datoForAleneomsorg',
}

export type AnnenForelderStegVisibility = QuestionVisibility<AnnenForelderSpørsmålKeys>;

export const skalBrukerStoppesPgaAnnenForelderIkkeInformert = (
    annenForelder: AnnenForelder,
    visibility: AnnenForelderStegVisibility | undefined
): boolean => {
    if (visibility && visibility.isVisible(AnnenForelderSpørsmålKeys.erAnnenForelderInformert)) {
        return annenForelder.erInformertOmSøknaden === false;
    }
    return false;
};

const gjelderSøknadenStebarnsadopsjon = (barn: Barn, situasjon: Søkersituasjon): boolean => {
    if (situasjon === Søkersituasjon.ADOPSJON && isAdopsjonsbarn(barn, situasjon)) {
        return barn.adopsjonAvEktefellesBarn === true;
    }
    return false;
};

const visDeltOmsorg = (payload: AnnenForelderSpørsmålPayload): boolean => {
    const { annenForelder, annenForelderErRegistrert } = payload;
    if (annenForelder.kanIkkeOppgis) {
        return false;
    }
    return (
        annenForelderErRegistrert === true ||
        (annenForelder.utenlandskFnr !== true && questionValueIsOk(annenForelder.fnr)) ||
        (annenForelder.utenlandskFnr === true && questionValueIsOk(annenForelder.bostedsland))
    );
};
const visErAnnenForelderInformert = (payload: AnnenForelderSpørsmålPayload): boolean => {
    const { søker, annenForelder } = payload;
    return søker.erAleneOmOmsorg === false && annenForelder.harRettPåForeldrepenger === true;
};

const visAnnenForelderKanIkkeOppgis = (payload: AnnenForelderSpørsmålPayload): boolean => {
    const { annenForelderErRegistrert, søkerErFarEllerMedmor, søker, gjelderStebarnsadopsjon } = payload;
    if (gjelderStebarnsadopsjon) {
        return false;
    }
    if (søkerErFarEllerMedmor && søker.rolle === SøkerRolle.MEDMOR) {
        return false;
    }
    return annenForelderErRegistrert === false;
};

const annenForelderSpørsmålConfig: QuestionConfig<AnnenForelderSpørsmålPayload, AnnenForelderSpørsmålKeys> = {
    [AnnenForelderSpørsmålKeys.navnPåAnnenForelder]: {
        isAnswered: ({ annenForelder }) =>
            questionValueIsOk(annenForelder.fornavn) && questionValueIsOk(annenForelder.etternavn),
        isIncluded: (payload) => payload.annenForelderErRegistrert === false,
        isOptional: (payload) => payload.annenForelder.kanIkkeOppgis === true,
    },
    [AnnenForelderSpørsmålKeys.kanIkkeOppgis]: {
        isOptional: () => true,
        isAnswered: ({ annenForelder }) => questionValueIsOk(annenForelder.kanIkkeOppgis),
        isIncluded: (payload) => visAnnenForelderKanIkkeOppgis(payload),
    },
    [AnnenForelderSpørsmålKeys.fødselsnummer]: {
        isAnswered: ({ annenForelder }) =>
            (questionValueIsOk(annenForelder.fnr) && annenForelder.utenlandskFnr !== true) ||
            (annenForelder.utenlandskFnr === true &&
                annenForelder.bostedsland !== undefined &&
                annenForelder.bostedsland.length > 0),
        isIncluded: (payload) => {
            return (
                payload.annenForelder.kanIkkeOppgis !== true &&
                payload.annenForelderErRegistrert === false &&
                questionValueIsOk(payload.annenForelder.fornavn) &&
                questionValueIsOk(payload.annenForelder.etternavn)
            );
        },
    },
    [AnnenForelderSpørsmålKeys.deltOmsorg]: {
        isAnswered: ({ søker }) => questionValueIsOk(søker.erAleneOmOmsorg),
        isIncluded: (payload) => visDeltOmsorg(payload),
    },
    [AnnenForelderSpørsmålKeys.harRettPåForeldrepenger]: {
        isAnswered: ({ annenForelder }) => questionValueIsOk(annenForelder.harRettPåForeldrepenger),
        parentQuestion: AnnenForelderSpørsmålKeys.deltOmsorg,
        isIncluded: (payload) => {
            return payload.søker.erAleneOmOmsorg === false;
        },
    },
    [AnnenForelderSpørsmålKeys.erMorUfør]: {
        isAnswered: ({ annenForelder }) => questionValueIsOk(annenForelder.harMorUføretrygd ),
        parentQuestion: AnnenForelderSpørsmålKeys.harRettPåForeldrepenger,
        isIncluded: (payload) =>
            payload.søker.erAleneOmOmsorg === false &&
            payload.annenForelder.harRettPåForeldrepenger === false &&
            payload.søkerErFarEllerMedmor,
    },
    [AnnenForelderSpørsmålKeys.erAnnenForelderInformert]: {
        isAnswered: ({ annenForelder }) => questionValueIsOk(annenForelder.erInformertOmSøknaden),
        parentQuestion: AnnenForelderSpørsmålKeys.deltOmsorg,
        isIncluded: (payload) => visErAnnenForelderInformert(payload),
    },
    [AnnenForelderSpørsmålKeys.datoForAleneomsorg]: {
        isAnswered: ({ barn }) => barn.datoForAleneomsorg !== undefined,
        parentQuestion: AnnenForelderSpørsmålKeys.deltOmsorg,
        isIncluded: (payload) =>
            payload.erEndringssøknad === false &&
            payload.søker.erAleneOmOmsorg === true &&
            payload.søkerErFarEllerMedmor === true,
    },
};

export const getAnnenForelderStegVisibility = (
    søknad: Partial<Søknad>,
    søkerinfo: Søkerinfo
): QuestionVisibility<AnnenForelderSpørsmålKeys> | undefined => {
    const { annenForelder, søker, barn, situasjon } = søknad;
    const { person } = søkerinfo;

    if (!søker || !barn || !annenForelder || !person || !situasjon) {
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
        erEndringssøknad: søknad.erEndringssøknad === true,
        søkerErFarEllerMedmor: getErSøkerFarEllerMedmor(søker.rolle),
        annenForelderErRegistrert: registrertAnnenForelder !== undefined,
        gjelderStebarnsadopsjon: gjelderSøknadenStebarnsadopsjon(barn, situasjon),
    };

    return Questions(annenForelderSpørsmålConfig).getVisbility(payload);
};
