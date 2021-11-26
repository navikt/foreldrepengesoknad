import SøknadRoutes from 'app/routes/routes';
import Sak from 'app/types/Sak';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Søknad } from './types/Søknad';
import UttaksplanInfo from './types/UttaksplanInfo';

export interface ForeldrepengesøknadContextState {
    version: number;
    currentRoute: SøknadRoutes;
    søknad: Søknad;
    søkerinfo: Søkerinfo;
    harEksisterendeSak?: boolean;
    harAnnenPartEksisterendeSak?: boolean;
    annenPartEksisterendeSakSaksnummer?: string;
    saker: Sak[];
    uttaksplanInfo?: UttaksplanInfo;
}

export const foreldrepengesøknadInitialState: ForeldrepengesøknadContextState = {
    version: 3,
    currentRoute: SøknadRoutes.VELKOMMEN,
    søknad: {
        type: 'foreldrepenger',
        harGodkjentVilkår: false,
        søkersituasjon: {
            rolle: '',
            situasjon: '',
        },
        barn: undefined!,
        annenForelder: {
            kanIkkeOppgis: false,
        },
        søker: {
            harHattAnnenInntektSiste10Mnd: undefined!,
            harJobbetSomFrilansSiste10Mnd: undefined!,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined!,
            erAleneOmOmsorg: undefined!,
            språkkode: 'nb',
        },
        informasjonOmUtenlandsopphold: {
            iNorgeNeste12Mnd: undefined!,
            iNorgeSiste12Mnd: undefined!,
            tidligereOpphold: [],
            senereOpphold: [],
        },
        erEndringssøknad: false,
        dekningsgrad: undefined!,
        uttaksplan: [],
    },
    søkerinfo: undefined!,
    saker: [],
    uttaksplanInfo: undefined,
};
