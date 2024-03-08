import { FunctionComponent } from 'react';

import {
    AnnenForelder,
    EksisterendeSak,
    harAnnenForelderRettIEØS,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { Søker, SøkersituasjonFp } from '@navikt/fp-types';

import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';

import FarMedmorAleneomsorgFødselAdopsjon from './scenarios/far-medmor-aleneomsorg-fødsel/FarMedmorAleneomsorgFødsel';
import FarMedmorFødselFørsteganggsøknadBeggeHarRett from './scenarios/far-medmor-fødsel-begge-har-rett/FarMedmorFødselBeggeHarRett';
import FarMedmorFødselOgMorHarIkkeRett from './scenarios/far-medmor-fødsel-og-mor-har-ikke-rett/FarMedmorFødselOgMorHarIkkeRett';
import FarMedmorFørstegangssøknadMedAnnenPart from './scenarios/farMedmor-førstegangssøknad-med-annen-part/FarMedmorFørstegangssøknadMedAnnenPart';
import MorFarAdopsjonAnnenForelderHarRettIEØS from './scenarios/mor-far-adopsjon-annen-part-har-rett-i-eøs/MorFarAdopsjonAnnenForelderHarRettIEØS';
import MorFarAdopsjon from './scenarios/mor-far-adopsjon/MorFarAdopsjon';
import MorFarFødselAnnenForelderHarRettIEØS from './scenarios/mor-far-fødsel-annen-part-har-rett-i-eøs/MorFarFødselAnnenForelderHarRettIEØS';
import MorFødsel from './scenarios/mor-fodsel/MorFødsel';
import { getUttaksplanScenario } from './scenarios/scenarios';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
    søkersituasjon: SøkersituasjonFp;
    annenForelder: AnnenForelder;
    erEndringssøknad: boolean;
    søker: Søker;
    goToNextDefaultStep: () => Promise<void>;
    goToPreviousDefaultStep: () => Promise<void>;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const UttaksplanInfoScenarios: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakAnnenPart,
    søkersituasjon,
    annenForelder,
    erEndringssøknad,
    søker,
    goToNextDefaultStep,
    goToPreviousDefaultStep,
    oppdaterBarnOgLagreUttaksplandata,
}) => {
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const annenForelderOppgittIkkeAleneOmOmsorg = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerINorge !== undefined
        : false;
    const annenForelderHarRettIEØS = harAnnenForelderRettIEØS(annenForelder);

    const scenario = getUttaksplanScenario({
        erFødsel,
        erFarEllerMedmor,
        søkerErAleneOmOmsorg: !!oppgittAnnenForelder?.erAleneOmOmsorg,
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
                    erEndringssøknad={erEndringssøknad}
                    søker={søker}
                    goToNextDefaultStep={goToNextDefaultStep}
                    goToPreviousDefaultStep={goToPreviousDefaultStep}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
        case 'farMedmorFødselBeggeHarRett':
            return (
                <FarMedmorFødselFørsteganggsøknadBeggeHarRett
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    erEndringssøknad={erEndringssøknad}
                    søker={søker}
                    goToNextDefaultStep={goToNextDefaultStep}
                    goToPreviousDefaultStep={goToPreviousDefaultStep}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
        case 'farMedmorFødselMorHarIkkeRett':
            return (
                <FarMedmorFødselOgMorHarIkkeRett
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    erEndringssøknad={erEndringssøknad}
                    søker={søker}
                    goToNextDefaultStep={goToNextDefaultStep}
                    goToPreviousDefaultStep={goToPreviousDefaultStep}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
        case 'farMedmorFørstegangssøknadMedAnnenPart':
            return (
                <FarMedmorFørstegangssøknadMedAnnenPart
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    eksisterendeSakAnnenPart={eksisterendeSakAnnenPart}
                    erEndringssøknad={erEndringssøknad}
                    goToNextDefaultStep={goToNextDefaultStep}
                    goToPreviousDefaultStep={goToPreviousDefaultStep}
                    søker={søker}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
        case 'morFarAdopsjon':
            return (
                <MorFarAdopsjon
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    erEndringssøknad={erEndringssøknad}
                    søker={søker}
                    goToNextDefaultStep={goToNextDefaultStep}
                    goToPreviousDefaultStep={goToPreviousDefaultStep}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
        case 'morFødsel':
            return (
                <MorFødsel
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    eksisterendeSakFar={eksisterendeSakAnnenPart}
                    erEndringssøknad={erEndringssøknad}
                    søker={søker}
                    goToNextDefaultStep={goToNextDefaultStep}
                    goToPreviousDefaultStep={goToPreviousDefaultStep}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
        case 'morFarFødselAnnenForelderHarRettIEØS':
            return (
                <MorFarFødselAnnenForelderHarRettIEØS
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    erEndringssøknad={erEndringssøknad}
                    søker={søker}
                    goToNextDefaultStep={goToNextDefaultStep}
                    goToPreviousDefaultStep={goToPreviousDefaultStep}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
        case 'morFarAdopsjonAnnenForelderHarRettIEØS':
            return (
                <MorFarAdopsjonAnnenForelderHarRettIEØS
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    erEndringssøknad={erEndringssøknad}
                    søker={søker}
                    goToNextDefaultStep={goToNextDefaultStep}
                    goToPreviousDefaultStep={goToPreviousDefaultStep}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
    }
};

export default UttaksplanInfoScenarios;
