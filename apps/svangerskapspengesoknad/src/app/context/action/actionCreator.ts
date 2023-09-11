import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
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
    SET_CURRENT_TILRETTELEGGING_ID = 'setCurrentTilretteleggingId',
    SET_HARGODKJENTVILKÅR = 'setHarGodkjentVilkår',
    SET_UTENLANDSOPPHOLD = 'setUtenlandsopphold',
    SET_VEDLEGG = 'setVedlegg',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    GODKJENT_OPPSUMMERING = 'godkjentOppsummering',
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
    payload: Tilrettelegging[];
}

const setTilrettelegging = (payload: Tilrettelegging[]): SetTilrettelegging => ({
    type: SvangerskapspengerContextActionKeys.SET_TILRETTELEGGING,
    payload,
});

interface SetCurrentRoute {
    type: SvangerskapspengerContextActionKeys.SET_CURRENT_ROUTE;
    payload: string;
}

const setCurrentRoute = (payload: string): SetCurrentRoute => ({
    type: SvangerskapspengerContextActionKeys.SET_CURRENT_ROUTE,
    payload,
});

interface SetCurrentTilretteleggingId {
    type: SvangerskapspengerContextActionKeys.SET_CURRENT_TILRETTELEGGING_ID;
    payload: string | undefined;
}

const setCurrentTilretteleggingId = (payload: string | undefined): SetCurrentTilretteleggingId => ({
    type: SvangerskapspengerContextActionKeys.SET_CURRENT_TILRETTELEGGING_ID,
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

interface SetVedlegg {
    type: SvangerskapspengerContextActionKeys.SET_VEDLEGG;
    payload: Attachment[];
}

const setVedlegg = (payload: Attachment[]): SetVedlegg => ({
    type: SvangerskapspengerContextActionKeys.SET_VEDLEGG,
    payload,
});

interface AvbrytSøknad {
    type: SvangerskapspengerContextActionKeys.AVBRYT_SØKNAD;
}

const avbrytSøknad = (): AvbrytSøknad => ({
    type: SvangerskapspengerContextActionKeys.AVBRYT_SØKNAD,
});

interface GodkjentOppsummering {
    type: SvangerskapspengerContextActionKeys.GODKJENT_OPPSUMMERING;
    payload: boolean;
}

const setGodkjentOppsummering = (payload: boolean): GodkjentOppsummering => ({
    type: SvangerskapspengerContextActionKeys.GODKJENT_OPPSUMMERING,
    payload,
});

export type SvangerskapspengerContextAction =
    | SetBarn
    | SetSøker
    | SetTilrettelegging
    | SetCurrentRoute
    | SetCurrentTilretteleggingId
    | SetSøkerinfo
    | SetHarGodkjentVilkår
    | SetUtenlandsopphold
    | SetVedlegg
    | AvbrytSøknad
    | GodkjentOppsummering;

export default {
    setBarn,
    setSøker,
    setTilrettelegging,
    setCurrentRoute,
    setCurrentTilretteleggingId,
    setSøkerinfo,
    setHarGodkjentVilkår,
    setUtenlandsopphold,
    setVedlegg,
    avbrytSøknad,
    setGodkjentOppsummering,
};
