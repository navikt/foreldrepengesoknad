import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import React, { FunctionComponent } from 'react';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
}

const FarMedmorFørstegangssøknadMedAnnenPart: FunctionComponent<Props> = () => {
    return <div>Hello world</div>;
};

export default FarMedmorFørstegangssøknadMedAnnenPart;
