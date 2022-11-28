import AnnenForelder from 'app/context/types/AnnenForelder';
import Barn from 'app/context/types/Barn';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { Tilleggsopplysninger } from 'app/context/types/Tilleggsopplysninger';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Periode } from 'uttaksplan/types/Periode';

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
