import {
    AnnenForelder,
    Arbeidsforhold,
    Barn,
    Dekningsgrad,
    NavnPåForeldre,
    Søkersituasjon,
    TilgjengeligStønadskonto,
    Tilleggsopplysninger,
} from '@navikt/fp-common';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Periode } from 'types/Periode';

export interface Søknadsinfo {
    søkersituasjon: Søkersituasjon;
    arbeidsforhold: Arbeidsforhold[];
    dekningsgrad: Dekningsgrad;
    erEndringssøknad: boolean;
    antallBarn: number;
    annenForelder: AnnenForelder;
    navnPåForeldre: NavnPåForeldre;
    søkerErFarEllerMedmor: boolean;
    søkerErAleneOmOmsorg: boolean;
    søkerHarMidlertidigOmsorg: boolean;
    erDeltUttak: boolean;
    morErUfør: boolean;
    morHarRett: boolean;
    erFlerbarnssøknad: boolean;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    stønadskontoer: TilgjengeligStønadskonto[];
    perioder: Periode[];
    harKomplettUttaksplan: boolean;
    tilleggsopplysninger: Tilleggsopplysninger;
    eksisterendeSak: EksisterendeSak | undefined;
    perioderSomSkalSendesInn: Periode[];
    barn: Barn;
    familiehendelsesdatoNesteSak: Date | undefined;
    førsteUttaksdagNesteBarnsSak: Date | undefined;
    minsterettUkerToTette: number | undefined;
}
