import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import React, { FunctionComponent } from 'react';
import FarMedmorFødselFørsteganggsøknadBeggeHarRett from './scenarios/far-medmor-fødsel-begge-har-rett/FarMedmorFødselBeggeHarRett';
import MorFødsel from './scenarios/mor-fodsel/MorFødsel';
import MorFarAdopsjon from './scenarios/mor-far-adopsjon/MorFarAdopsjon';
import MorFarAdopsjonAnnenForelderHarRettIEØS from './scenarios/mor-far-adopsjon-annen-part-har-rett-i-eøs/MorFarAdopsjonAnnenForelderHarRettIEØS';
import MorFarFødselAnnenForelderHarRettIEØS from './scenarios/mor-far-fødsel-annen-part-har-rett-i-eøs/MorFarFødselAnnenForelderHarRettIEØS';
import FarMedmorAleneomsorgFødselAdopsjon from './scenarios/far-medmor-aleneomsorg-fødsel/FarMedmorAleneomsorgFødsel';
import FarMedmorFødselOgMorHarIkkeRett from './scenarios/far-medmor-fødsel-og-mor-har-ikke-rett/FarMedmorFødselOgMorHarIkkeRett';
import { EksisterendeSakV2 } from 'app/types/EksisterendeSak';
import FarMedmorFørstegangssøknadMedAnnenPart from './scenarios/farMedmor-førstegangssøknad-med-annen-part/FarMedmorFørstegangssøknadMedAnnenPart';
import { getUttaksplanScenario } from './scenarios/scenarios';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import useSøknad from 'app/utils/hooks/useSøknad';
import { harAnnenForelderRettIEØS } from 'app/utils/annenForelderUtils';
interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSakV2 | undefined;
}

const UttaksplanInfoScenarios: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakAnnenPart,
}) => {
    const { søkersituasjon, søker, annenForelder } = useSøknad();
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;
    const annenForelderOppgittIkkeAleneOmOmsorg = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerINorge !== undefined
        : false;
    const annenForelderHarRettIEØS = harAnnenForelderRettIEØS(annenForelder);

    const scenario = getUttaksplanScenario({
        erFødsel,
        erFarEllerMedmor,
        søkerErAleneOmOmsorg: !!søker.erAleneOmOmsorg,
        annenForelderKanIkkeOppgis: annenForelder.kanIkkeOppgis,
        annenForelderHarRett: annenForelderHarRett,
        erAdopsjon,
        eksisterendeSakAnnenPart,
        annenForelderOppgittIkkeAleneOmOmsorg,
        annenForelderHarRettIEØS,
    });

    switch (scenario) {
        case 'farMedmorAleneomsorgFødselAdopsjon':
            return (
                <FarMedmorAleneomsorgFødselAdopsjon
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                />
            );
        case 'farMedmorFødselBeggeHarRett':
            return (
                <FarMedmorFødselFørsteganggsøknadBeggeHarRett
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    eksisterendeSakAnnenPart={eksisterendeSakAnnenPart}
                />
            );
        case 'farMedmorFødselMorHarIkkeRett':
            return (
                <FarMedmorFødselOgMorHarIkkeRett
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                />
            );
        case 'farMedmorFørstegangssøknadMedAnnenPart':
            return (
                <FarMedmorFørstegangssøknadMedAnnenPart
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    eksisterendeSakAnnenPart={eksisterendeSakAnnenPart}
                />
            );
        case 'morFarAdopsjon':
            return (
                <MorFarAdopsjon
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                />
            );
        case 'morFødsel':
            return (
                <MorFødsel
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    eksisterendeSakFar={eksisterendeSakAnnenPart}
                />
            );
        case 'morFarFødselAnnenForelderHarRettIEØS':
            return (
                <MorFarFødselAnnenForelderHarRettIEØS
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                />
            );
        case 'morFarAdopsjonAnnenForelderHarRettIEØS':
            return (
                <MorFarAdopsjonAnnenForelderHarRettIEØS
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                />
            );
    }
};

export default UttaksplanInfoScenarios;
