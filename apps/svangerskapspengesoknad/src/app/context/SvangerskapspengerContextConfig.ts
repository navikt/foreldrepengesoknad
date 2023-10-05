import SøknadRoutes from 'app/routes/routes';
import { Søkerrolle } from 'app/types/Søker';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Søknad } from 'app/types/Søknad';

export interface SvangerskapspengerContextState {
    version: number;
    currentRoute: string;
    currentTilretteleggingId: string | undefined;
    søkerinfo: Søkerinfo;
    søknad: Søknad;
}

export const svangerskapspengerInitialState: SvangerskapspengerContextState = {
    version: 1,
    currentRoute: SøknadRoutes.FORSIDE,
    currentTilretteleggingId: undefined,
    søkerinfo: undefined!,
    søknad: {
        harGodkjentVilkår: false,
        barn: undefined!,
        søker: {
            rolle: Søkerrolle.MOR,
            harHattAnnenInntekt: undefined!,
            harJobbetSomFrilans: undefined!,
            harJobbetSomSelvstendigNæringsdrivende: undefined!,
            frilansInformasjon: undefined!,
            språkkode: undefined!,
        },
        tilrettelegging: [],
        informasjonOmUtenlandsopphold: {
            iNorgePåHendelsestidspunktet: undefined!,
            iNorgeSiste12Mnd: undefined!,
            iNorgeNeste12Mnd: undefined!,
            jobbetINorgeSiste12Mnd: undefined!,
            tidligereOpphold: [],
            senereOpphold: [],
        },
        harGodkjentOppsummering: false,
    },
};
