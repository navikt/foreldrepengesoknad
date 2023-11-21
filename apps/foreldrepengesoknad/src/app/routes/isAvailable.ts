import { Periode } from '@navikt/fp-common';
import SøknadRoutes from './routes';
import { uttaksplanInneholderPerioderUtenKonto } from '@navikt/uttaksplan';

const isAvailable = (route: SøknadRoutes, harGodkjentVilkår: boolean, uttaksplan: Periode[] = []): boolean => {
    switch (route) {
        case SøknadRoutes.SØKERSITUASJON:
            return harGodkjentVilkår === true;
        case SøknadRoutes.OPPSUMMERING:
            return uttaksplanInneholderPerioderUtenKonto(uttaksplan) === false && uttaksplan.length > 0;
        default:
            return true;
    }
};

export default isAvailable;
