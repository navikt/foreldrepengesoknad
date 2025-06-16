import { Planperiode } from './Planperiode';

export interface Søknadsinfo {
    perioder: Planperiode[];
    // søkersituasjon: Søkersituasjon;
    // arbeidsforhold: Arbeidsforhold[];
    // dekningsgrad: Dekningsgrad;
    // erEndringssøknad: boolean;
    // antallBarn: number;
    // annenForelder: AnnenForelder;
    // navnPåForeldre: NavnPåForeldre;
    // søkerErFarEllerMedmor: boolean;
    // søkerErAleneOmOmsorg: boolean;
    // søkerHarMidlertidigOmsorg: boolean;
    // erDeltUttak: boolean;
    // morErUfør: boolean;
    // morHarRett: boolean;
    // erFlerbarnssøknad: boolean;
    // familiehendelsesdato: Date;
    // termindato: Date | undefined;
    // stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad;
    // harKomplettUttaksplan: boolean;
    // eksisterendeSak: EksisterendeSak | undefined;
    // perioderSomSkalSendesInn: Periode[];
    // barn: Barn;
    // familiehendelsesdatoNesteSak: Date | undefined;
    // førsteUttaksdagNesteBarnsSak: Date | undefined;
    // minsterettUkerToTette: number | undefined;
}
