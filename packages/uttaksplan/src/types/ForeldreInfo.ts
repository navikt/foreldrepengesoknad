import { BrukerRolleSak_fpoversikt, NavnPåForeldre, RettighetType_fpoversikt } from '@navikt/fp-types';

export type ForeldreInfo = {
    søker: BrukerRolleSak_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
    rettighetType: RettighetType_fpoversikt;
    erMedmorDelAvSøknaden: boolean;
    erIkkeSøkerSpesifisert?: boolean;
    /**
     * Sann når paret er to fedre (f.eks. adopsjon). Da er domenerollene MOR og
     * FAR_MEDMOR fortsatt i bruk internt, men ingen av foreldrene er en «mor» –
     * så generiske Mor/Mors-tekster skal erstattes med foreldrenes faktiske
     * navn (eller "Far 1"/"Far 2"), og regler som gjelder mors aktivitet
     * (aktivitetskrav knyttet til den fødende mor) skal ikke vises.
     */
    erFarOgFar?: boolean;
};
