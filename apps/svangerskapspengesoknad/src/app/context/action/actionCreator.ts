import { Tilrettelegging } from 'app/types/Tilrettelegging';
import { SvangerskapspengerContextState } from '../SvangerskapspengerContextConfig';

export enum SvangerskapspengerContextActionKeys {
    SET_SØKER = 'setSøker',
    SET_TILRETTELEGGING = 'setTilrettelegging',
    SET_CURRENT_TILRETTELEGGING_ID = 'setCurrentTilretteleggingId',
    SET_HARGODKJENTVILKÅR = 'setHarGodkjentVilkår',
    AVBRYT_SØKNAD = 'avbrytSøknad',
    GODKJENT_OPPSUMMERING = 'godkjentOppsummering',
    APPLY_STORED_STATE = 'applyStoredState',
}

interface SetTilrettelegging {
    type: SvangerskapspengerContextActionKeys.SET_TILRETTELEGGING;
    payload: Tilrettelegging[];
}

const setTilrettelegging = (payload: Tilrettelegging[]): SetTilrettelegging => ({
    type: SvangerskapspengerContextActionKeys.SET_TILRETTELEGGING,
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

interface SetHarGodkjentVilkår {
    type: SvangerskapspengerContextActionKeys.SET_HARGODKJENTVILKÅR;
    payload: boolean;
}

const setHarGodkjentVilkår = (payload: boolean): SetHarGodkjentVilkår => ({
    type: SvangerskapspengerContextActionKeys.SET_HARGODKJENTVILKÅR,
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

interface ApplyStoredState {
    type: SvangerskapspengerContextActionKeys.APPLY_STORED_STATE;
    payload: SvangerskapspengerContextState;
}

const applyStoredState = (payload: SvangerskapspengerContextState): ApplyStoredState => ({
    type: SvangerskapspengerContextActionKeys.APPLY_STORED_STATE,
    payload,
});

export type SvangerskapspengerContextAction =
    | SetTilrettelegging
    | SetCurrentTilretteleggingId
    | SetHarGodkjentVilkår
    | AvbrytSøknad
    | GodkjentOppsummering
    | ApplyStoredState;

export default {
    setTilrettelegging,
    setCurrentTilretteleggingId,
    setHarGodkjentVilkår,
    avbrytSøknad,
    setGodkjentOppsummering,
    applyStoredState,
};
