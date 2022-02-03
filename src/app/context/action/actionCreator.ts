import SøknadRoutes from 'app/routes/routes';
import { Attachment } from 'app/types/Attachment';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import Sak from 'app/types/Sak';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Periode } from 'uttaksplan/types/Periode';
import { ForeldrepengesøknadContextState } from '../ForeldrepengesøknadContextConfig';
import AnnenForelder from '../types/AnnenForelder';
import Barn from '../types/Barn';
import InformasjonOmUtenlandsopphold from '../types/InformasjonOmUtenlandsopphold';
import Søker from '../types/Søker';
import Søkersituasjon from '../types/Søkersituasjon';
import { Søknad } from '../types/Søknad';
import UttaksplanInfo from '../types/UttaksplanInfo';

export enum ForeldrepengesøknadContextActionKeys {
    SET_HARGODKJENTVILKÅR = 'setVelkommen',
    SET_ER_ENDRINGSSØKNAD = 'setErEndringssøknad',
    SET_SØKERSITUASJON = 'setSøkersituasjon',
    SET_OMBARNET = 'setOmBarnet',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    UPDATE_CURRENT_ROUTE = 'updateCurrentRoute',
    APPLY_STORED_STATE = 'applyStoredState',
    SET_ANNENFORELDER = 'setAnnenForelder',
    SET_SØKERINFO = 'setSøkerinfo',
    SET_SØKER = 'setSøker',
    SET_INFORMASJON_OM_UTENLANDSOPPHOLD = 'setInformasjonOmUtenlandsopphold',
    SET_INFORMASJON_OM_ANDRE_INNTEKTER = 'setInformasjonOmAndreInntekter',
    SET_SAKER = 'setSaker',
    SET_UTTAKSPLAN_INFO = 'setUttaksplanInfo',
    SET_DEKNINGSGRAD = 'setDekningsgrad',
    SET_VEDLEGG = 'setVedlegg',
    LAG_UTTAKSPLANFORSLAG = 'lagUttaksplanforslag',
    SET_UTTAKSPLAN = 'setUttaksplan',
    SET_SØKNAD = 'setSøknad',
}

interface SetVelkommen {
    type: ForeldrepengesøknadContextActionKeys.SET_HARGODKJENTVILKÅR;
    payload: boolean;
}

const setVelkommen = (payload: boolean): SetVelkommen => ({
    type: ForeldrepengesøknadContextActionKeys.SET_HARGODKJENTVILKÅR,
    payload,
});

interface SetErEndringssøknad {
    type: ForeldrepengesøknadContextActionKeys.SET_ER_ENDRINGSSØKNAD;
    payload: boolean;
}

const setErEndringssøknad = (payload: boolean): SetErEndringssøknad => ({
    type: ForeldrepengesøknadContextActionKeys.SET_ER_ENDRINGSSØKNAD,
    payload,
});

interface SetSøkersituasjon {
    type: ForeldrepengesøknadContextActionKeys.SET_SØKERSITUASJON;
    payload: Søkersituasjon;
}

const setSøkersituasjon = (payload: Søkersituasjon): SetSøkersituasjon => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SØKERSITUASJON,
    payload,
});

interface SetOmBarnet {
    type: ForeldrepengesøknadContextActionKeys.SET_OMBARNET;
    payload: Barn;
}

const setOmBarnet = (payload: Barn): SetOmBarnet => ({
    type: ForeldrepengesøknadContextActionKeys.SET_OMBARNET,
    payload,
});

interface AvbrytSøknad {
    type: ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD;
}

const avbrytSøknad = (): AvbrytSøknad => ({
    type: ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD,
});

interface UpdateCurrentRoute {
    type: ForeldrepengesøknadContextActionKeys.UPDATE_CURRENT_ROUTE;
    payload: SøknadRoutes;
}

const updateCurrentRoute = (payload: SøknadRoutes): UpdateCurrentRoute => ({
    type: ForeldrepengesøknadContextActionKeys.UPDATE_CURRENT_ROUTE,
    payload,
});

interface ApplyStoredState {
    type: ForeldrepengesøknadContextActionKeys.APPLY_STORED_STATE;
    payload: ForeldrepengesøknadContextState;
}

const applyStoredState = (payload: ForeldrepengesøknadContextState): ApplyStoredState => ({
    type: ForeldrepengesøknadContextActionKeys.APPLY_STORED_STATE,
    payload,
});

interface SetAnnenForelder {
    type: ForeldrepengesøknadContextActionKeys.SET_ANNENFORELDER;
    payload: AnnenForelder;
}

const setAnnenForelder = (payload: AnnenForelder): SetAnnenForelder => ({
    type: ForeldrepengesøknadContextActionKeys.SET_ANNENFORELDER,
    payload,
});

interface SetSøkerinfo {
    type: ForeldrepengesøknadContextActionKeys.SET_SØKERINFO;
    payload: Søkerinfo;
}

const setSøkerinfo = (payload: Søkerinfo): SetSøkerinfo => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SØKERINFO,
    payload,
});

interface SetSøker {
    type: ForeldrepengesøknadContextActionKeys.SET_SØKER;
    payload: Søker;
}

const setSøker = (payload: Søker): SetSøker => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SØKER,
    payload,
});

interface SetInformasjonOmUtenlandsopphold {
    type: ForeldrepengesøknadContextActionKeys.SET_INFORMASJON_OM_UTENLANDSOPPHOLD;
    payload: InformasjonOmUtenlandsopphold;
}

const setInformasjonOmUtenlandsopphold = (
    payload: InformasjonOmUtenlandsopphold
): SetInformasjonOmUtenlandsopphold => ({
    type: ForeldrepengesøknadContextActionKeys.SET_INFORMASJON_OM_UTENLANDSOPPHOLD,
    payload,
});

interface SetSaker {
    type: ForeldrepengesøknadContextActionKeys.SET_SAKER;
    payload: Sak[];
}

const setSaker = (payload: Sak[]): SetSaker => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SAKER,
    payload,
});

interface SetUttaksplanInfo {
    type: ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN_INFO;
    payload: UttaksplanInfo;
}

const setUttaksplanInfo = (payload: UttaksplanInfo): SetUttaksplanInfo => ({
    type: ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN_INFO,
    payload,
});

interface SetDekningsgrad {
    type: ForeldrepengesøknadContextActionKeys.SET_DEKNINGSGRAD;
    dekningsgrad: Dekningsgrad;
}

const setDekningsgrad = (dekningsgrad: Dekningsgrad): SetDekningsgrad => ({
    type: ForeldrepengesøknadContextActionKeys.SET_DEKNINGSGRAD,
    dekningsgrad,
});

interface SetVedlegg {
    type: ForeldrepengesøknadContextActionKeys.SET_VEDLEGG;
    vedlegg: Attachment[];
}

const setVedlegg = (vedlegg: Attachment[]): SetVedlegg => ({
    type: ForeldrepengesøknadContextActionKeys.SET_VEDLEGG,
    vedlegg,
});

interface LagUttaksplanforslag {
    type: ForeldrepengesøknadContextActionKeys.LAG_UTTAKSPLANFORSLAG;
    payload: Periode[];
}

const lagUttaksplanforslag = (payload: Periode[]): LagUttaksplanforslag => ({
    type: ForeldrepengesøknadContextActionKeys.LAG_UTTAKSPLANFORSLAG,
    payload,
});

interface SetUttaksplan {
    type: ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN;
    payload: Periode[];
}

const setUttaksplan = (payload: Periode[]): SetUttaksplan => ({
    type: ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN,
    payload,
});

interface SetSøknad {
    type: ForeldrepengesøknadContextActionKeys.SET_SØKNAD;
    payload: Søknad;
}

const setSøknad = (payload: Søknad): SetSøknad => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SØKNAD,
    payload,
});

export type ForeldrepengesøknadContextAction =
    | SetVelkommen
    | SetErEndringssøknad
    | SetSøkersituasjon
    | SetOmBarnet
    | AvbrytSøknad
    | UpdateCurrentRoute
    | SetAnnenForelder
    | SetSøkerinfo
    | SetSøker
    | SetInformasjonOmUtenlandsopphold
    | SetSaker
    | SetUttaksplanInfo
    | SetDekningsgrad
    | ApplyStoredState
    | SetVedlegg
    | SetSøknad
    | LagUttaksplanforslag
    | SetUttaksplan;

export default {
    setVelkommen,
    setErEndringssøknad,
    setSøkersituasjon,
    setOmBarnet,
    avbrytSøknad,
    updateCurrentRoute,
    applyStoredState,
    setAnnenForelder,
    setSøkerinfo,
    setSøker,
    setInformasjonOmUtenlandsopphold,
    setSaker,
    setUttaksplanInfo,
    setDekningsgrad,
    setVedlegg,
    lagUttaksplanforslag,
    setUttaksplan,
    setSøknad,
};
