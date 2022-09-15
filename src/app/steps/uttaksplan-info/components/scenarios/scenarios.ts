import { EksisterendeSak } from 'app/types/EksisterendeSak';

export type UttaksplanInfoScenario =
    | 'farMedmorAleneomsorgFødselAdopsjon'
    | 'farMedmorFødselBeggeHarRett'
    | 'farMedmorFødselMorHarIkkeRett'
    | 'farMedmorFørstegangssøknadMedAnnenPart'
    | 'morFarAdopsjon'
    | 'morFødsel'
    | 'morFarAnnenForelderHarRettIEØS';

interface UttaksplanScenarioParams {
    erFødsel: boolean;
    erFarEllerMedmor: boolean;
    søkerErAleneOmOmsorg: boolean;
    annenForelderKanIkkeOppgis: boolean;
    annenForelderHarRett: boolean;
    erAdopsjon: boolean;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
    annenForelderOppgittIkkeAleneOmOmsorg: boolean;
    annenPartHarRettIEØS: boolean;
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
    annenPartHarRettIEØS,
}: UttaksplanScenarioParams): UttaksplanInfoScenario => {
    if (erFødsel && erFarEllerMedmor && (søkerErAleneOmOmsorg || annenForelderKanIkkeOppgis)) {
        return 'farMedmorAleneomsorgFødselAdopsjon';
    }
    if (annenPartHarRettIEØS) {
        return 'morFarAnnenForelderHarRettIEØS';
    }

    if (
        erFarEllerMedmor &&
        erFødsel &&
        annenForelderHarRett &&
        (eksisterendeSakAnnenPart === undefined || eksisterendeSakAnnenPart.uttaksplan.length === 0)
    ) {
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

    if (erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelderKanIkkeOppgis || søkerErAleneOmOmsorg)) {
        return 'morFarAdopsjon';
    }

    return 'morFødsel';
};
