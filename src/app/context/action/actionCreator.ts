import { Locale } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import { Attachment } from 'app/types/Attachment';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Kvittering } from 'app/types/Kvittering';
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
import { Tilleggsopplysninger } from '../types/Tilleggsopplysninger';
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
    SET_PERIODER_SOM_SKAL_SENDES_INN = 'setPerioderSomSkalSendesInn',
    SET_SØKNAD = 'setSøknad',
    SET_EKSISTERENDE_SAK = 'setEksisterendeSak',
    SET_GODKJENT_OPPSUMMERING = 'setGodkjentOppsummering',
    SET_KVITTERING = 'setKvittering',
    SET_ANTALL_UKER_I_UTTAKSPLAN = 'setAntallUkerIUttaksplan',
    SET_ENDRINGSTIDSPUNKT = 'setEndringstidspunkt',
    SET_SPRÅKKODE = 'setSpråkkode',
    SET_TILLEGGSOPPLYSNINGER = 'setTilleggsopplysninger',
    SLETT_UTTAKSPLAN = 'slettUttaksplan',
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

interface SetTilleggsopplysninger {
    type: ForeldrepengesøknadContextActionKeys.SET_TILLEGGSOPPLYSNINGER;
    payload: Tilleggsopplysninger;
}

const setTilleggsopplysninger = (payload: Tilleggsopplysninger): SetTilleggsopplysninger => ({
    type: ForeldrepengesøknadContextActionKeys.SET_TILLEGGSOPPLYSNINGER,
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

interface SetPerioderSomSkalSendesInn {
    type: ForeldrepengesøknadContextActionKeys.SET_PERIODER_SOM_SKAL_SENDES_INN;
    payload: Periode[];
}

const setPerioderSomSkalSendesInn = (payload: Periode[]): SetPerioderSomSkalSendesInn => ({
    type: ForeldrepengesøknadContextActionKeys.SET_PERIODER_SOM_SKAL_SENDES_INN,
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

interface SetEksisterendeSak {
    type: ForeldrepengesøknadContextActionKeys.SET_EKSISTERENDE_SAK;
    payload: EksisterendeSak | undefined;
}

const setEksisterendeSak = (payload: EksisterendeSak | undefined): SetEksisterendeSak => ({
    type: ForeldrepengesøknadContextActionKeys.SET_EKSISTERENDE_SAK,
    payload,
});

interface SetGodkjentOppsummering {
    type: ForeldrepengesøknadContextActionKeys.SET_GODKJENT_OPPSUMMERING;
    payload: boolean;
}

const setGodkjentOppsummering = (payload: boolean): SetGodkjentOppsummering => ({
    type: ForeldrepengesøknadContextActionKeys.SET_GODKJENT_OPPSUMMERING,
    payload,
});

interface SetAntallUkerIUttaksplan {
    type: ForeldrepengesøknadContextActionKeys.SET_ANTALL_UKER_I_UTTAKSPLAN;
    payload: number;
}

const setAntallUkerIUttaksplan = (payload: number): SetAntallUkerIUttaksplan => ({
    type: ForeldrepengesøknadContextActionKeys.SET_ANTALL_UKER_I_UTTAKSPLAN,
    payload,
});

interface SetEndringstidspunkt {
    type: ForeldrepengesøknadContextActionKeys.SET_ENDRINGSTIDSPUNKT;
    payload: Date | undefined;
}

const setEndringstidspunkt = (payload: Date | undefined): SetEndringstidspunkt => ({
    type: ForeldrepengesøknadContextActionKeys.SET_ENDRINGSTIDSPUNKT,
    payload,
});

interface SetKvittering {
    type: ForeldrepengesøknadContextActionKeys.SET_KVITTERING;
    payload: Kvittering;
}

const setKvittering = (payload: Kvittering): SetKvittering => ({
    type: ForeldrepengesøknadContextActionKeys.SET_KVITTERING,
    payload,
});

interface SetSpråkkode {
    type: ForeldrepengesøknadContextActionKeys.SET_SPRÅKKODE;
    payload: Locale;
}

const setSpråkkode = (payload: Locale): SetSpråkkode => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SPRÅKKODE,
    payload,
});

interface SlettUttaksplan {
    type: ForeldrepengesøknadContextActionKeys.SLETT_UTTAKSPLAN;
}

const slettUttaksplan = (): SlettUttaksplan => ({
    type: ForeldrepengesøknadContextActionKeys.SLETT_UTTAKSPLAN,
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
    | SetTilleggsopplysninger
    | SetDekningsgrad
    | ApplyStoredState
    | SetVedlegg
    | SetSøknad
    | SetEksisterendeSak
    | LagUttaksplanforslag
    | SetGodkjentOppsummering
    | SetAntallUkerIUttaksplan
    | SetEndringstidspunkt
    | SetKvittering
    | SetSpråkkode
    | SetUttaksplan
    | SetPerioderSomSkalSendesInn
    | SlettUttaksplan;

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
    setTilleggsopplysninger,
    setDekningsgrad,
    setVedlegg,
    lagUttaksplanforslag,
    setUttaksplan,
    setSøknad,
    setEksisterendeSak,
    setGodkjentOppsummering,
    setKvittering,
    setAntallUkerIUttaksplan,
    setEndringstidspunkt,
    setSpråkkode,
    setPerioderSomSkalSendesInn,
    slettUttaksplan,
};
