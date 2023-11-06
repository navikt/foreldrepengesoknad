import {
    AnnenForelder,
    Attachment,
    Dekningsgrad,
    EksisterendeSak,
    Periode,
    Sak,
    Søkerinfo,
    Søkersituasjon,
    Tilleggsopplysninger,
} from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import { Kvittering } from 'app/types/Kvittering';
import { LocaleNo } from '@navikt/fp-types';
import { ForeldrepengesøknadContextState } from '../ForeldrepengesøknadContextConfig';
import Barn, { BarnFraNesteSak } from '@navikt/fp-common/src/common/types/Barn';
import InformasjonOmUtenlandsopphold from '../types/InformasjonOmUtenlandsopphold';
import Søker from '../types/Søker';
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
    SET_SØKNAD_GJELDER_ET_NYTT_BARN = 'setSøknadGjelderEtNyttBarn',
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
    SET_UTTAKSPLAN_SLETTET = 'setUttaksplanSlettet',
    SET_ØNSKER_JUSTERT_UTTAK_VED_FØDSEL = 'setØnskerJustertUttakVedFødsel',
    SET_BRUKER_SVARTE_JA_PÅ_AUTO_JUSTERING = 'setBrukerSvarteJaPAutoJustering',
    SET_BARN_FRA_NESTE_SAK = 'setBarnFraNesteSak',
    SET_ANNEN_PARTS_UTTAK_ER_LAGT_TIL_I_PLAN = 'setAnnenPartsUttakErLagtTilIPlan',
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
    payload: InformasjonOmUtenlandsopphold,
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

interface SetSøknadGjelderEtNyttBarn {
    type: ForeldrepengesøknadContextActionKeys.SET_SØKNAD_GJELDER_ET_NYTT_BARN;
    payload: boolean;
}

const setSøknadGjelderEtNyttBarn = (payload: boolean): SetSøknadGjelderEtNyttBarn => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SØKNAD_GJELDER_ET_NYTT_BARN,
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
    payload: LocaleNo;
}

const setSpråkkode = (payload: LocaleNo): SetSpråkkode => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SPRÅKKODE,
    payload,
});

interface SlettUttaksplan {
    type: ForeldrepengesøknadContextActionKeys.SLETT_UTTAKSPLAN;
    payload: Periode[];
}

const slettUttaksplan = (payload: Periode[]): SlettUttaksplan => ({
    type: ForeldrepengesøknadContextActionKeys.SLETT_UTTAKSPLAN,
    payload,
});

interface SetUttaksplanSlettet {
    type: ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN_SLETTET;
    uttaksplanHarBlittSlettet: boolean;
}

const setUttaksplanSlettet = (uttaksplanHarBlittSlettet: boolean): SetUttaksplanSlettet => ({
    type: ForeldrepengesøknadContextActionKeys.SET_UTTAKSPLAN_SLETTET,
    uttaksplanHarBlittSlettet,
});

interface SetØnskerJustertUttakVedFødsel {
    type: ForeldrepengesøknadContextActionKeys.SET_ØNSKER_JUSTERT_UTTAK_VED_FØDSEL;
    payload: boolean | undefined;
}

const setØnskerJustertUttakVedFødsel = (payload: boolean | undefined): SetØnskerJustertUttakVedFødsel => ({
    type: ForeldrepengesøknadContextActionKeys.SET_ØNSKER_JUSTERT_UTTAK_VED_FØDSEL,
    payload,
});

interface SetBrukerSvarteJaPåAutoJustering {
    type: ForeldrepengesøknadContextActionKeys.SET_BRUKER_SVARTE_JA_PÅ_AUTO_JUSTERING;
    payload: boolean | undefined;
}

const setBrukerSvarteJaPåAutoJustering = (payload: boolean | undefined): SetBrukerSvarteJaPåAutoJustering => ({
    type: ForeldrepengesøknadContextActionKeys.SET_BRUKER_SVARTE_JA_PÅ_AUTO_JUSTERING,
    payload,
});

interface SetBarnFraNesteSak {
    type: ForeldrepengesøknadContextActionKeys.SET_BARN_FRA_NESTE_SAK;
    payload: BarnFraNesteSak | undefined;
}

const setBarnFraNesteSak = (payload: BarnFraNesteSak | undefined): SetBarnFraNesteSak => ({
    type: ForeldrepengesøknadContextActionKeys.SET_BARN_FRA_NESTE_SAK,
    payload,
});

interface SetAnnenPartsUttakErLagtTilIPlan {
    type: ForeldrepengesøknadContextActionKeys.SET_ANNEN_PARTS_UTTAK_ER_LAGT_TIL_I_PLAN;
    payload: boolean;
}

const setAnnenPartsUttakErLagtTilIPlan = (payload: boolean): SetAnnenPartsUttakErLagtTilIPlan => ({
    type: ForeldrepengesøknadContextActionKeys.SET_ANNEN_PARTS_UTTAK_ER_LAGT_TIL_I_PLAN,
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
    | SetSøknadGjelderEtNyttBarn
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
    | SlettUttaksplan
    | SetUttaksplanSlettet
    | SetØnskerJustertUttakVedFødsel
    | SetBrukerSvarteJaPåAutoJustering
    | SetBarnFraNesteSak
    | SetAnnenPartsUttakErLagtTilIPlan;

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
    setSøknadGjelderEtNyttBarn,
    setEksisterendeSak,
    setGodkjentOppsummering,
    setKvittering,
    setAntallUkerIUttaksplan,
    setEndringstidspunkt,
    setSpråkkode,
    setPerioderSomSkalSendesInn,
    slettUttaksplan,
    setUttaksplanSlettet,
    setØnskerJustertUttakVedFødsel,
    setBrukerSvarteJaPåAutoJustering,
    setBarnFraNesteSak,
    setAnnenPartsUttakErLagtTilIPlan,
};
