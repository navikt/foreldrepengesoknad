import Søknad from '../../../../types/søknad/Søknad';
import { Søkerinfo } from '../../../../types/søkerinfo';
import AnnenForelder from '../../../../types/s\u00F8knad/AnnenForelder';
import { Søker } from '../../../../types/s\u00F8knad/S\u00F8ker';
import { Barn, ForeldreansvarBarn } from '../../../../types/s\u00F8knad/Barn';
import Person from '../../../../types/Person';
import { QuestionConfig, Questions, questionHasValidInput } from '../../../../util/questions/Question';

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
}

interface AnnenForelderSpørsmålPayload {
    søker: Søker;
    barn: Barn;
    annenForelder: AnnenForelder;
    person: Person;
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
        getValue: ({ annenForelder }) => annenForelder.fornavn
    },
    [AnnenForelderSpørsmål.annenForelderKanIkkeOppgis]: {
        getValue: ({ annenForelder }) => annenForelder.kanIkkeOppgis
    },
    [AnnenForelderSpørsmål.fødselsnummer]: {
        getValue: ({ annenForelder }) => annenForelder.fnr,
        dependsOnQuestion: {
            question: AnnenForelderSpørsmål.navnPåAnnenForelder,
            check: (verdi) => questionHasValidInput(verdi)
        }
    },
    [AnnenForelderSpørsmål.deltOmsorg]: {
        getValue: ({ søker }) => søker.erAleneOmOmsorg,
        dependsOnQuestion: {
            question: AnnenForelderSpørsmål.fødselsnummer,
            check: (verdi) => questionHasValidInput(verdi)
        },
        dependency: (props) =>
            (props.annenForelder.utenlandskFnr !== true && questionHasValidInput(props.annenForelder.fnr)) ||
            (props.annenForelder.utenlandskFnr && props.annenForelder.bostedsland !== undefined)
    },
    [AnnenForelderSpørsmål.erAnnenForelderInformert]: {
        getValue: ({ annenForelder }) => annenForelder.erInformertOmSøknaden,
        dependency: (props) => {
            return props.søker.erAleneOmOmsorg === false && props.annenForelder.harRettPåForeldrepenger === true;
        }
    },
    [AnnenForelderSpørsmål.erMorUfør]: { getValue: ({ annenForelder }) => annenForelder.erUfør },
    [AnnenForelderSpørsmål.harRettPåForeldrepenger]: {
        getValue: ({ annenForelder }) => annenForelder.harRettPåForeldrepenger,
        dependsOnQuestion: {
            question: AnnenForelderSpørsmål.deltOmsorg,
            check: (verdi) => verdi === false
        }
    },
    [AnnenForelderSpørsmål.omsorgsovertakelseDato]: {
        getValue: ({ barn }) => (barn as ForeldreansvarBarn).foreldreansvarsdato
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
        person
    };

    // /* Data */
    // const erFarEllerMedmor = df.getErFarEllerMedmor(søker, person);
    // const annenForelderHarOpplystOmPågåendeSak = df.getHarAnnenForelderOpplystOmSinPågåendeSak(
    //     registrertAnnenForelder!
    // );
    // const gjelderAdopsjonAvEktefellesBarn = df.getGjelderAdopsjonAvEktefellesBarn(barn);

    // /* Visibility */
    // const farEllerMedmorBolk = f.visFarEllerMedmorBolk(erFarEllerMedmor);

    // const registrertAnnenForelderBolk = f.visRegistrertAnnenForelderBolk(registrertAnnenForelder);

    // const annenForelderPersonaliaPart = f.visAnnenForelderPersonaliaPart(registrertAnnenForelder);

    // const annenForelderKanIkkeOppgisValg = f.visAnnenForelderKanIkkeOppgisValg(
    //     annenForelderPersonaliaPart,
    //     gjelderAdopsjonAvEktefellesBarn
    // );

    // const annenForelderOppfølgingPart = f.visAnnenForelderOppfølgingPart(annenForelder, registrertAnnenForelder);
    // const fødselsnummerInput = f.visFødselsnummerInput(annenForelderPersonaliaPart, annenForelder);
    // const harRettPåForeldrepengerSpørsmål = f.visHarRettPåForeldrepengerSpørsmål(
    //     søker,
    //     erFarEllerMedmor,
    //     annenForelderHarOpplystOmPågåendeSak
    // );
    // const erMorUførSpørsmål = f.visErMorUførSpørsmål(annenForelder, erFarEllerMedmor);
    // const erAnnenForelderInformertSpørsmål = f.visErAnnenForelderInformertSpørsmål(
    //     søker,
    //     annenForelder,
    //     annenForelderHarOpplystOmPågåendeSak,
    //     erFarEllerMedmor
    // );
    // const omsorgsovertakelseDatoSpørsmål = f.visOmsorgsovertakelseDatoSpørsmål(farEllerMedmorBolk, søker);
    // const omsorgsovertakelseVedleggSpørsmål = f.visOmsorgsovertakelseVedleggSpørsmål(farEllerMedmorBolk, søker, barn);
    // const infoOmOmsorgsovertakelse = f.visInfoOmOmsorgsovertakelse(barn);

    const kanOppgiInfo = annenForelder.kanIkkeOppgis !== true;
    const spørOmPersonalia = registrertAnnenForelder === undefined;

    const skalVises = (question: AnnenForelderSpørsmål): boolean => {
        return questions.check(question, payload);
    };
    return {
        navnPåAnnenForelder: spørOmPersonalia,
        annenForelderKanIkkeOppgis: spørOmPersonalia,
        fødselsnummer: skalVises(AnnenForelderSpørsmål.fødselsnummer),
        deltOmsorg: kanOppgiInfo && skalVises(AnnenForelderSpørsmål.deltOmsorg),
        erAnnenForelderInformert: kanOppgiInfo && skalVises(AnnenForelderSpørsmål.erAnnenForelderInformert),
        erMorUfør: kanOppgiInfo && skalVises(AnnenForelderSpørsmål.erMorUfør),
        harRettPåForeldrepenger: kanOppgiInfo && skalVises(AnnenForelderSpørsmål.harRettPåForeldrepenger),
        omsorgsovertakelseDato: kanOppgiInfo && skalVises(AnnenForelderSpørsmål.omsorgsovertakelseDato),
        personaliaRegistrertAnnenForelder: kanOppgiInfo
    };
};
