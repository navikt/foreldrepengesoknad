import { Søkerinfo } from '@navikt/fp-types';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';

interface UttaksplanInfoTestData {
    stønadskonto100: TilgjengeligeStønadskontoerDTO;
    stønadskonto80: TilgjengeligeStønadskontoerDTO;
    søkerinfo: Søkerinfo;
}

export default UttaksplanInfoTestData;
