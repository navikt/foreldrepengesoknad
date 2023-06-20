import SøknadRoutes from 'app/routes/routes';
import { Søkerinfo } from 'app/types/Søkerinfo';

export interface SvangerskapspengesøknadContextState {
    version: number;
    currentRoute: SøknadRoutes;
    søkerinfo: Søkerinfo;
}

export const svangerskapspengesøknadInitialState: SvangerskapspengesøknadContextState = {
    version: 1,
    currentRoute: SøknadRoutes.VELKOMMEN,
    søkerinfo: undefined!,
};
