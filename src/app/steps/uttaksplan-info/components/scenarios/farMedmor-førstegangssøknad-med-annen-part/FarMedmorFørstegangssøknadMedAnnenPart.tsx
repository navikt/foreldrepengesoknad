import { Block } from '@navikt/fp-common';
import InfoOmSøknaden from 'app/components/info-eksisterende-sak/InfoOmSøknaden';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getValgtStønadskontoMengde } from 'app/utils/stønadskontoUtils';
import React, { FunctionComponent } from 'react';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
}

const FarMedmorFørstegangssøknadMedAnnenPart: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakAnnenPart,
}) => {
    const søknad = useSøknad();
    const { barn, søkersituasjon, annenForelder } = søknad;
    const familiehendelsedato = getFamiliehendelsedato(barn);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);

    const tilgjengeligeStønadskontoer100 = getValgtStønadskontoMengde(
        Dekningsgrad.HUNDRE_PROSENT,
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
        familiehendelsedato,
        erMorUfør
    );
    // const tilgjengeligeStønadskontoer80 = getValgtStønadskontoMengde(
    //     Dekningsgrad.ÅTTI_PROSENT,
    //     tilgjengeligeStønadskontoer80DTO,
    //     tilgjengeligeStønadskontoer100DTO,
    //     familiehendelsedato,
    //     erMorUfør
    // );

    return (
        <>
            <Block padBottom="l">
                <InfoOmSøknaden
                    eksisterendeSak={eksisterendeSakAnnenPart}
                    erIUttaksplanenSteg={false}
                    tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer100}
                />
            </Block>
        </>
    );
};

export default FarMedmorFørstegangssøknadMedAnnenPart;
