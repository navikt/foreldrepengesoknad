import { BrukerRolleSak_fpoversikt, NavnPåForeldre, RettighetType_fpoversikt } from '@navikt/fp-types';

export type ForeldreInfo = {
    søker: BrukerRolleSak_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
    rettighetType: RettighetType_fpoversikt;
    erMedmorDelAvSøknaden: boolean;
    erIkkeSøkerSpesifisert?: boolean;
};
