import SøknadRoutes from 'app/routes/routes';
import { Barn } from 'app/types/Barn';
import { Søker } from 'app/types/Søker';
import { Søkerinfo } from 'app/types/Søkerinfo';

export enum SvangerskapspengerContextActionKeys {
    SET_BARN = 'setBarn',
    SET_SØKER = 'setSøker',
    SET_SØKERINFO = 'setSøkerinfo',
    SET_CURRENT_ROUTE = 'setCurrentRoute',
    SET_HARGODKJENTVILKÅR = 'setHarGodkjentVilkår',
}
interface SetBarn {
    type: SvangerskapspengerContextActionKeys.SET_BARN;
    payload: Barn;
}

const setBarn = (payload: Barn): SetBarn => ({
    type: SvangerskapspengerContextActionKeys.SET_BARN,
    payload,
});

interface SetSøker {
    type: SvangerskapspengerContextActionKeys.SET_SØKER;
    payload: Søker;
}

const setSøker = (payload: Søker): SetSøker => ({
    type: SvangerskapspengerContextActionKeys.SET_SØKER,
    payload,
});

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

export type SvangerskapspengerContextAction =
    | SetBarn
    | SetSøker
    | SetCurrentRoute
    | SetSøkerinfo
    | SetHarGodkjentVilkår;

export default {
    setBarn,
    setSøker,
    setCurrentRoute,
    setSøkerinfo,
    setHarGodkjentVilkår,
};
