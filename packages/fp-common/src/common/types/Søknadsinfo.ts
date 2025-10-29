import { EksternArbeidsforholdDto_fpoversikt, KontoBeregningDto_fpoversikt } from '@navikt/fp-types';

import { AnnenForelder } from './AnnenForelder';
import { Barn } from './Barn';
import { Dekningsgrad } from './Dekningsgrad';
import { EksisterendeSak } from './EksisterendeSak';
import { NavnPåForeldre } from './NavnPåForeldre';
import { Periode } from './Periode';
import { Søkersituasjon } from './Søkersituasjon';

export interface Søknadsinfo {
    søkersituasjon: Søkersituasjon;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
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
    stønadskontoer: KontoBeregningDto_fpoversikt;
    perioder: Periode[];
    harKomplettUttaksplan: boolean;
    eksisterendeSak: EksisterendeSak | undefined;
    perioderSomSkalSendesInn: Periode[];
    barn: Barn;
    familiehendelsesdatoNesteSak: Date | undefined;
    førsteUttaksdagNesteBarnsSak: Date | undefined;
    minsterettUkerToTette: number | undefined;
}
