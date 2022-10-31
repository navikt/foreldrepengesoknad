import { EksisterendeSakV2 } from 'app/types/EksisterendeSak';

export type UttaksplanInfoScenario =
    | 'farMedmorAleneomsorgFødselAdopsjon'
    | 'farMedmorFødselBeggeHarRett'
    | 'farMedmorFødselMorHarIkkeRett'
    | 'farMedmorFørstegangssøknadMedAnnenPart'
    | 'morFarAdopsjon'
    | 'morFødsel'
    | 'morFarFødselAnnenForelderHarRettIEØS'
    | 'morFarAdopsjonAnnenForelderHarRettIEØS';

interface UttaksplanScenarioParams {
    erFødsel: boolean;
    erFarEllerMedmor: boolean;
    søkerErAleneOmOmsorg: boolean;
    annenForelderKanIkkeOppgis: boolean;
    annenForelderHarRett: boolean;
    erAdopsjon: boolean;
    eksisterendeSakAnnenPart: EksisterendeSakV2 | undefined;
    annenForelderOppgittIkkeAleneOmOmsorg: boolean;
    annenForelderHarRettIEØS: boolean;
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
    annenForelderHarRettIEØS,
}: UttaksplanScenarioParams): UttaksplanInfoScenario => {
    if (erFødsel && erFarEllerMedmor && (søkerErAleneOmOmsorg || annenForelderKanIkkeOppgis)) {
        return 'farMedmorAleneomsorgFødselAdopsjon';
    }
    if (annenForelderHarRettIEØS) {
        return erFødsel ? 'morFarFødselAnnenForelderHarRettIEØS' : 'morFarAdopsjonAnnenForelderHarRettIEØS';
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

    return 'morFødsel';
};
