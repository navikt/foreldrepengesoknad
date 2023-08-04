import SøknadRoutes from 'app/routes/routes';
import { Barn } from 'app/types/Barn';
import InformasjonOmUtenlandsopphold from 'app/types/InformasjonOmUtenlandsopphold';
import { Søker } from 'app/types/Søker';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Tilrettelegging } from 'app/types/Tilrettelegging';

export enum SvangerskapspengerContextActionKeys {
    SET_BARN = 'setBarn',
    SET_SØKER = 'setSøker',
    SET_TILRETTELEGGING = 'setTilrettelegging',
    SET_SØKERINFO = 'setSøkerinfo',
    SET_CURRENT_ROUTE = 'setCurrentRoute',
    SET_HARGODKJENTVILKÅR = 'setHarGodkjentVilkår',
    SET_UTENLANDSOPPHOLD = 'setUtenlandsopphold',
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

interface SetTilrettelegging {
    type: SvangerskapspengerContextActionKeys.SET_TILRETTELEGGING;
    payload: Tilrettelegging;
}

const setTilrettelegging = (payload: Tilrettelegging): SetTilrettelegging => ({
    type: SvangerskapspengerContextActionKeys.SET_TILRETTELEGGING,
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

interface SetUtenlandsopphold {
    type: SvangerskapspengerContextActionKeys.SET_UTENLANDSOPPHOLD;
    payload: InformasjonOmUtenlandsopphold;
}

const setUtenlandsopphold = (payload: InformasjonOmUtenlandsopphold): SetUtenlandsopphold => ({
    type: SvangerskapspengerContextActionKeys.SET_UTENLANDSOPPHOLD,
    payload,
});

export type SvangerskapspengerContextAction =
    | SetBarn
    | SetSøker
    | SetTilrettelegging
    | SetCurrentRoute
    | SetSøkerinfo
    | SetHarGodkjentVilkår
    | SetUtenlandsopphold;

export default {
    setBarn,
    setSøker,
    setTilrettelegging,
    setCurrentRoute,
    setSøkerinfo,
    setHarGodkjentVilkår,
    setUtenlandsopphold,
};
