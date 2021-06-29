import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import React, { FunctionComponent } from 'react';
import FarMedmorFødselFørsteganggsøknadBeggeHarRett from './scenarios/far-medmor-fødsel-begge-har-rett/FarMedmorFødselBeggeHarRett';
import MorFødsel from './scenarios/mor-fodsel/MorFødsel';
import MorFarAdopsjon from './scenarios/mor-far-adopsjon/MorFarAdopsjon';
import FarMedmorAleneomsorgFødselAdopsjon from './scenarios/far-medmor-aleneomsorg-fødsel/FarMedmorAleneomsorgFødsel';
import FarMedmorFødselOgMorHarIkkeRett from './scenarios/far-medmor-fødsel-og-mor-har-ikke-rett/FarMedmorFødselOgMorHarIkkeRett';
import { EksisterendeSak } from 'app/types/EksisterendeSak';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
}

const UttaksplanInfoScenarios: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakAnnenPart,
}) => {
    return (
        <>
            <FarMedmorFødselFørsteganggsøknadBeggeHarRett
                tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
                eksisterendeSakAnnenPart={eksisterendeSakAnnenPart}
            />
            <MorFødsel
                tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
            />
            <MorFarAdopsjon
                tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
            />
            <FarMedmorAleneomsorgFødselAdopsjon
                tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
            />
            <FarMedmorFødselOgMorHarIkkeRett
                tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
            />
        </>
    );
};

export default UttaksplanInfoScenarios;
