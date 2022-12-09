import SøknadRoutes from 'app/routes/routes';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Kvittering } from 'app/types/Kvittering';
import { Sak } from 'app/types/Sak';
import { Situasjon } from 'app/types/Situasjon';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Søkerrolle } from 'app/types/Søkerrolle';
import { Periode } from 'uttaksplan/types/Periode';
import { BarnFraNesteSak } from './types/Barn';
import { Søknad } from './types/Søknad';
import UttaksplanInfo from './types/UttaksplanInfo';

export interface ForeldrepengesøknadContextState {
    version: number;
    currentRoute: SøknadRoutes;
    søknad: Søknad;
    søkerinfo: Søkerinfo;
    saker: Sak[];
    kvittering: Kvittering;
    antallUkerIUttaksplan: number;
    perioderSomSkalSendesInn: Periode[];
    harUttaksplanBlittSlettet: boolean;
    brukerSvarteJaPåAutoJustering: boolean | undefined;
    søknadGjelderEtNyttBarn: boolean;
    harEksisterendeSak?: boolean;
    harAnnenPartEksisterendeSak?: boolean;
    annenPartEksisterendeSakSaksnummer?: string;
    uttaksplanInfo?: UttaksplanInfo;
    eksisterendeSak?: EksisterendeSak;
    endringstidspunkt?: Date;
    barnFraNesteSak?: BarnFraNesteSak;
}

export const foreldrepengesøknadInitialState: ForeldrepengesøknadContextState = {
    version: 5,
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
    uttaksplanInfo: undefined,
    antallUkerIUttaksplan: undefined!,
    kvittering: undefined!,
    endringstidspunkt: undefined,
    perioderSomSkalSendesInn: [],
    harUttaksplanBlittSlettet: false,
    brukerSvarteJaPåAutoJustering: undefined,
    søknadGjelderEtNyttBarn: undefined!,
    barnFraNesteSak: undefined,
};
