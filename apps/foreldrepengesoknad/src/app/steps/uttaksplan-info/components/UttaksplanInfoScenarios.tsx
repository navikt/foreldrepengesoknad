import { FunctionComponent } from 'react';
import {
    AnnenForelder,
    EksisterendeSak,
    harAnnenForelderRettIEØS,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { SøkersituasjonFp } from '@navikt/fp-types';
import Person from '@navikt/fp-common/src/common/types/Person';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import Søker from 'app/context/types/Søker';
import FarMedmorFødselFørsteganggsøknadBeggeHarRett from './scenarios/far-medmor-fødsel-begge-har-rett/FarMedmorFødselBeggeHarRett';
import MorFødsel from './scenarios/mor-fodsel/MorFødsel';
import MorFarAdopsjon from './scenarios/mor-far-adopsjon/MorFarAdopsjon';
import MorFarAdopsjonAnnenForelderHarRettIEØS from './scenarios/mor-far-adopsjon-annen-part-har-rett-i-eøs/MorFarAdopsjonAnnenForelderHarRettIEØS';
import MorFarFødselAnnenForelderHarRettIEØS from './scenarios/mor-far-fødsel-annen-part-har-rett-i-eøs/MorFarFødselAnnenForelderHarRettIEØS';
import FarMedmorAleneomsorgFødselAdopsjon from './scenarios/far-medmor-aleneomsorg-fødsel/FarMedmorAleneomsorgFødsel';
import FarMedmorFødselOgMorHarIkkeRett from './scenarios/far-medmor-fødsel-og-mor-har-ikke-rett/FarMedmorFødselOgMorHarIkkeRett';
import FarMedmorFørstegangssøknadMedAnnenPart from './scenarios/farMedmor-førstegangssøknad-med-annen-part/FarMedmorFørstegangssøknadMedAnnenPart';
import { getUttaksplanScenario } from './scenarios/scenarios';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
    søkersituasjon: SøkersituasjonFp;
    søker: Søker;
    annenForelder: AnnenForelder;
    erEndringssøknad: boolean;
    person: Person;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const UttaksplanInfoScenarios: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakAnnenPart,
    søkersituasjon,
    søker,
    annenForelder,
    erEndringssøknad,
    person,
    mellomlagreSøknadOgNaviger,
    oppdaterBarnOgLagreUttaksplandata,
}) => {
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
                    erEndringssøknad={erEndringssøknad}
                    person={person}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                    scenario={scenario}
                />
            );
        case 'farMedmorFødselBeggeHarRett':
            return (
                <FarMedmorFødselFørsteganggsøknadBeggeHarRett
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    eksisterendeSakAnnenPart={eksisterendeSakAnnenPart}
                    erEndringssøknad={erEndringssøknad}
                    person={person}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                    scenario={scenario}
                />
            );
        case 'farMedmorFødselMorHarIkkeRett':
            return (
                <FarMedmorFødselOgMorHarIkkeRett
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    erEndringssøknad={erEndringssøknad}
                    person={person}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                    scenario={scenario}
                />
            );
        case 'farMedmorFørstegangssøknadMedAnnenPart':
            return (
                <FarMedmorFørstegangssøknadMedAnnenPart
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    eksisterendeSakAnnenPart={eksisterendeSakAnnenPart}
                    erEndringssøknad={erEndringssøknad}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    person={person}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
        case 'morFarAdopsjon':
            return (
                <MorFarAdopsjon
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    erEndringssøknad={erEndringssøknad}
                    person={person}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
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
                    person={person}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                />
            );
        case 'morFarFødselAnnenForelderHarRettIEØS':
            return (
                <MorFarFødselAnnenForelderHarRettIEØS
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    erEndringssøknad={erEndringssøknad}
                    person={person}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                    scenario={scenario}
                />
            );
        case 'morFarAdopsjonAnnenForelderHarRettIEØS':
            return (
                <MorFarAdopsjonAnnenForelderHarRettIEØS
                    tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                    tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                    erEndringssøknad={erEndringssøknad}
                    person={person}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
                    scenario={scenario}
                />
            );
    }
};

export default UttaksplanInfoScenarios;
