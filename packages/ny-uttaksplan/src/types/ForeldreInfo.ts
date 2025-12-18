import { NavnPåForeldre, RettighetType_fpoversikt } from '@navikt/fp-types';

export type Søker = 'MOR' | 'FAR_ELLER_MEDMOR' | 'IKKE_SPESIFISERT';

export type ForeldreInfo = {
    søker: Søker;
    navnPåForeldre: NavnPåForeldre;
    rettighetType: RettighetType_fpoversikt;
    erMedmorDelAvSøknaden: boolean;
};
