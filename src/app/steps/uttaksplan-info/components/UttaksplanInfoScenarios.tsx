import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import React, { FunctionComponent } from 'react';
import FarMedmorFødselFørsteganggsøknadBeggeHarRett from './scenarios/far-medmor-fødsel-begge-har-rett/FarMedmorFødselBeggeHarRett';
import MorFødsel from './scenarios/mor-fodsel/MorFødsel';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const UttaksplanInfoScenarios: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
}) => {
    return (
        <>
            <FarMedmorFødselFørsteganggsøknadBeggeHarRett
                tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
            />
            <MorFødsel
                tilgjengeligeStønadskontoer100DTO={tilgjengeligeStønadskontoer100DTO}
                tilgjengeligeStønadskontoer80DTO={tilgjengeligeStønadskontoer80DTO}
            />
        </>
    );
};

export default UttaksplanInfoScenarios;
