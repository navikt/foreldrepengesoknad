import SøknadRoutes from 'app/routes/routes';
import { Søkerinfo } from 'app/types/Søkerinfo';

export enum SvangerskapspengerContextActionKeys {
    SET_SØKERINFO = 'setSøkerinfo',
    SET_CURRENT_ROUTE = 'setCurrentRoute',
    SET_HARGODKJENTVILKÅR = 'setHarGodkjentVilkår',
}

interface SetCurrentRoute {
    type: SvangerskapspengerContextActionKeys.SET_CURRENT_ROUTE;
    payload: SøknadRoutes;
}

const setCurrentRoute = (payload: SøknadRoutes): SetCurrentRoute => ({
    type: SvangerskapspengerContextActionKeys.SET_CURRENT_ROUTE,
    payload,
});

interface SetSøkerinfo {
    type: SvangerskapspengerContextActionKeys.SET_SØKERINFO;
    payload: Søkerinfo;
}

const setSøkerinfo = (payload: Søkerinfo): SetSøkerinfo => ({
    type: SvangerskapspengerContextActionKeys.SET_SØKERINFO,
    payload,
});

interface SetHarGodkjentVilkår {
    type: SvangerskapspengerContextActionKeys.SET_HARGODKJENTVILKÅR;
    payload: boolean;
}

const setHarGodkjentVilkår = (payload: boolean): SetHarGodkjentVilkår => ({
    type: SvangerskapspengerContextActionKeys.SET_HARGODKJENTVILKÅR,
    payload,
});

export type SvangerskapspengerContextAction = SetCurrentRoute | SetSøkerinfo | SetHarGodkjentVilkår;

export default {
    setCurrentRoute,
    setSøkerinfo,
    setHarGodkjentVilkår,
};
