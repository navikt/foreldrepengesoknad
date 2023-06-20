import { Locale } from '@navikt/fp-common';
import { Søkerinfo } from 'app/types/Søkerinfo';

export enum SvangerskapspengerContextActionKeys {
    SET_SØKERINFO = 'setSøkerinfo',
    SET_HARGODKJENTVILKÅR = 'setGarGodtkjentVilkår',
    SET_SPRÅKKODE = 'setSpråkkode',
}

interface SetVelkommen {
    type: SvangerskapspengerContextActionKeys.SET_HARGODKJENTVILKÅR;
    payload: boolean;
}

const setVelkommen = (payload: boolean): SetVelkommen => ({
    type: SvangerskapspengerContextActionKeys.SET_HARGODKJENTVILKÅR,
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

interface SetSpråkkode {
    type: SvangerskapspengerContextActionKeys.SET_SPRÅKKODE;
    payload: Locale;
}

const setSpråkkode = (payload: Locale): SetSpråkkode => ({
    type: SvangerskapspengerContextActionKeys.SET_SPRÅKKODE,
    payload,
});

export type SvangerskapspengerContextAction = SetVelkommen | SetSøkerinfo | SetSpråkkode;

export default {
    setVelkommen,
    setSøkerinfo,
    setSpråkkode,
};
