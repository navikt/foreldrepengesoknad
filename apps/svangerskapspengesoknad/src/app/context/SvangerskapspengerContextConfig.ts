import SøknadRoutes from 'app/routes/routes';
import { Søkerrolle } from 'app/types/Søker';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Søknad } from 'app/types/Søknad';

export interface SvangerskapspengerContextState {
    version: number;
    currentRoute: SøknadRoutes;
    søkerinfo: Søkerinfo;
    søknad: Søknad;
}

export const svangerskapspengerInitialState: SvangerskapspengerContextState = {
    version: 1,
    currentRoute: SøknadRoutes.FORSIDE,
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
    },
};
