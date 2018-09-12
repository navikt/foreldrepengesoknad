import { Språkkode } from 'common/intl/types';

export enum CommonActionKeys {
    'SET_SPRÅK' = 'setSpråk',
    'VIS_AVBRYT_SØKNAD_DIALOG' = 'visAvbrytSøknadDialog',
    'SKJUL_AVBRYT_SØKNAD_DIALOG' = 'skjulAvbrytSøknadDialog'
}

interface SetSpråk {
    type: CommonActionKeys.SET_SPRÅK;
    språkkode: Språkkode;
}

interface VisAvbrytSøknadDialog {
    type: CommonActionKeys.VIS_AVBRYT_SØKNAD_DIALOG;
}
interface SkjulAvbrytSøknadDialog {
    type: CommonActionKeys.SKJUL_AVBRYT_SØKNAD_DIALOG;
}

export type CommonActionTypes = SetSpråk | VisAvbrytSøknadDialog | SkjulAvbrytSøknadDialog;
