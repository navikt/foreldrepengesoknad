import { EksisterendeSak } from 'app/types/EksisterendeSak';

export type UttaksplanInfoScenario =
    | 'farMedmorAleneomsorgFødselAdopsjon'
    | 'farMedmorFødselBeggeHarRett'
    | 'farMedmorFødselMorHarIkkeRett'
    | 'farMedmorFørstegangssøknadMedAnnenPart'
    | 'morFarAdopsjon'
    | 'morFødsel';

interface UttaksplanScenarioParams {
    erFødsel: boolean;
    erFarEllerMedmor: boolean;
    søkerErAleneOmOmsorg: boolean;
    annenForelderKanIkkeOppgis: boolean;
    annenForelderHarRett: boolean;
    erAdopsjon: boolean;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
    annenForelderOppgittIkkeAleneOmOmsorg: boolean;
}

export const getUttaksplanScenario = ({
    erFødsel,
    erFarEllerMedmor,
    søkerErAleneOmOmsorg,
    annenForelderKanIkkeOppgis,
    annenForelderHarRett,
    eksisterendeSakAnnenPart,
    erAdopsjon,
    annenForelderOppgittIkkeAleneOmOmsorg,
}: UttaksplanScenarioParams): UttaksplanInfoScenario => {
    if (erFødsel && erFarEllerMedmor && (søkerErAleneOmOmsorg || annenForelderKanIkkeOppgis)) {
        return 'farMedmorAleneomsorgFødselAdopsjon';
    }

    if (erFarEllerMedmor && erFødsel && annenForelderHarRett && eksisterendeSakAnnenPart === undefined) {
        return 'farMedmorFødselBeggeHarRett';
    }

    if (erFarEllerMedmor && erFødsel && !annenForelderHarRett) {
        return 'farMedmorFødselMorHarIkkeRett';
    }

    if (eksisterendeSakAnnenPart && erFarEllerMedmor) {
        return 'farMedmorFørstegangssøknadMedAnnenPart';
    }

    if (erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelderKanIkkeOppgis || søkerErAleneOmOmsorg)) {
        return 'morFarAdopsjon';
    }

    return 'morFødsel';
};
