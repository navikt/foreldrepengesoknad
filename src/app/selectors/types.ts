import { Navn, Kjønn } from '../types/common';
import { NavnPåForeldre, Dekningsgrad, Forelder } from 'common/types';
import { Søkersituasjon, SøkerRolle } from '../types/søknad/Søknad';
import { Saksgrunnlag } from 'app/types/EksisterendeSak';

export interface Søknadsinfo {
    søknaden: OmSøknaden;
    navn: NavnISøknaden;
    annenForelder: OmAnnenForelder;
    søker: OmSøker;
    mor: OmMor;
    farMedmor: OmFarMedmor;
    uttaksdatoer: Uttaksdatoer;
    saksgrunnlag: Saksgrunnlag | undefined;
}

export interface Uttaksdatoer {
    førsteUttaksdag: Date;
    førFødsel: {
        førsteMuligeUttaksdag: Date;
        førsteUttaksdagForeldrepengerFørFødsel: Date;
        sisteUttaksdagFørFødsel: Date;
    };
    etterFødsel: {
        sisteUttaksdagInnenforSeksUker: Date;
        førsteUttaksdagEtterSeksUker: Date;
        sisteMuligeUttaksdag: Date;
    };
}

export interface NavnISøknaden {
    mor: Navn;
    søker: Navn;
    annenForelder: Navn;
    farMedmor: Navn;
    navnPåForeldre: NavnPåForeldre;
}

export interface OmSøknaden {
    situasjon: Søkersituasjon;
    familiehendelsesdato: Date;
    dekningsgrad: Dekningsgrad | undefined;
    erFødsel: boolean;
    erDeltUttak: boolean;
    erFlerbarnssøknad: boolean;
    erEndringssøknad: boolean;
    erEnkelEndringssøknad: boolean;
    harKomplettUttaksplan: boolean;
    antallBarn: number;
    erBarnFødt?: boolean;
    erAdopsjon?: boolean;
    ønskerTomPlan?: boolean;
    harGjenskaptUttaksplanFraEkisterendeSak: boolean;
}

export interface OmSøker {
    forelder: Forelder;
    erMor: boolean;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    rolle: SøkerRolle;
    kjønn: Kjønn;
}

export interface OmAnnenForelder {
    harRett: boolean;
    erMor: boolean;
    erFarEllerMedmor: boolean;
    erUfør: boolean;
    kanIkkeOppgis: boolean;
    kjønn?: Kjønn;
}

export interface OmMor {
    erUfør: boolean;
    harRett: boolean;
    erAleneOmOmsorg: boolean;
}

export interface OmFarMedmor {
    harRett: boolean;
    erAleneOmOmsorg: boolean;
}
