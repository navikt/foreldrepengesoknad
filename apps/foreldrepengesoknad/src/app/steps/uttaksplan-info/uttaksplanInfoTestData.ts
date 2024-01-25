import { Dekningsgrad } from '@navikt/fp-common';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';

interface UttaksplanInfoTestData {
    stønadskonto100: TilgjengeligeStønadskontoerDTO;
    stønadskonto80: TilgjengeligeStønadskontoerDTO;
    søkerinfo: SøkerinfoDTO;
    dekningsgrad: Dekningsgrad;
    antallBarn: number;
    fødselsdatoer: Date[];
    adopsjonsdato: Date;
}

export default UttaksplanInfoTestData;
