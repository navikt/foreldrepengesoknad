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
            harHattAnnenInntektSiste10Mnd: undefined!,
            harJobbetSomFrilansSiste10Mnd: undefined!,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined!,
            frilansInformasjon: undefined!,
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
        vedlegg: [],
        harGodkjentOppsummering: false,
    },
};
