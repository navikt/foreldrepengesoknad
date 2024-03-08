import { Dekningsgrad, SaksperiodeDTO } from '@navikt/fp-common';
import { Søkerinfo } from '@navikt/fp-types';

import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';

interface UttaksplanInfoTestData {
    stønadskonto100: TilgjengeligeStønadskontoerDTO;
    stønadskonto80: TilgjengeligeStønadskontoerDTO;
    søkerinfo: Søkerinfo;
    dekningsgrad: Dekningsgrad;
    antallBarn: number;
    fødselsdatoer: string[];
    termindato: string;
    adopsjonsdato: string;
    uttaksplanAnnenPart: SaksperiodeDTO[];
}

export default UttaksplanInfoTestData;
