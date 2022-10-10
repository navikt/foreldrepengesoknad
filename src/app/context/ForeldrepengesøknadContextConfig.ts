import SøknadRoutes from 'app/routes/routes';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Kvittering } from 'app/types/Kvittering';
import Sak from 'app/types/Sak';
import { Sakv2 } from 'app/types/sakerv2/Sakv2';
import { Situasjon } from 'app/types/Situasjon';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Søkerrolle } from 'app/types/Søkerrolle';
import { Periode } from 'uttaksplan/types/Periode';
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
    sakerv2: Sakv2[];
    uttaksplanInfo?: UttaksplanInfo;
    kvittering: Kvittering;
    eksisterendeSak?: EksisterendeSak;
    antallUkerIUttaksplan: number;
    endringstidspunkt?: Date;
    perioderSomSkalSendesInn: Periode[];
    harUttaksplanBlittSlettet: boolean;
    brukerSvarteJaPåAutoJustering: boolean | undefined;
}

export const foreldrepengesøknadInitialState: ForeldrepengesøknadContextState = {
    version: 4,
    currentRoute: SøknadRoutes.VELKOMMEN,
    søknad: {
        type: 'foreldrepenger',
        harGodkjentVilkår: false,
        søkersituasjon: {
            rolle: '' as Søkerrolle,
            situasjon: '' as Situasjon,
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
        harGodkjentOppsummering: false,
        vedlegg: [],
        tilleggsopplysninger: {
            begrunnelseForSenEndring: undefined!,
        },
        saksnummer: undefined,
        ønskerJustertUttakVedFødsel: undefined,
    },
    søkerinfo: undefined!,
    saker: [],
    sakerv2: [],
    uttaksplanInfo: undefined,
    antallUkerIUttaksplan: undefined!,
    kvittering: undefined!,
    endringstidspunkt: undefined,
    perioderSomSkalSendesInn: [],
    harUttaksplanBlittSlettet: false,
    brukerSvarteJaPåAutoJustering: undefined,
};
