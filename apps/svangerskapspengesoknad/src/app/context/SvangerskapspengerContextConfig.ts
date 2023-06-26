import SøknadRoutes from 'app/routes/routes';
import { Søkerinfo } from 'app/types/Søkerinfo';

export interface SvangerskapspengerContextState {
    version: number;
    currentRoute: SøknadRoutes;
    søkerinfo: Søkerinfo;
}

export const svangerskapspengerInitialState: SvangerskapspengerContextState = {
    version: 1,
    currentRoute: SøknadRoutes.VELKOMMEN,
    søkerinfo: undefined!,
};
