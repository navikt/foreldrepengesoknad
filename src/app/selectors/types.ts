import { Navn } from '../types/common';
import { NavnPåForeldre, Dekningsgrad } from 'common/types';
import { Søkersituasjon, SøkerRolle } from '../types/søknad/Søknad';

export interface Søknadsinfo {
    søknaden: OmSøknaden;
    navn: NavnISøknaden;
    annenForelder: OmAnnenForelder;
    søker: OmSøker;
    mor: OmMor;
    farMedmor: OmFarMedmor;
    uttaksdatoer: Uttaksdatoer;
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
    saksnummer?: string;
    situasjon: Søkersituasjon;
    familiehendelsesdato: Date;
    dekningsgrad: Dekningsgrad | undefined;
    erFødsel: boolean;
    erDeltUttak: boolean;
    erFlerbarnssøknad: boolean;
    erEndringssøknad: boolean;
    antallBarn: number;
    erBarnFødt?: boolean;
    erAdopsjon?: boolean;
}

export interface OmSøker {
    erMor: boolean;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    rolle: SøkerRolle;
}

export interface OmAnnenForelder {
    harRett: boolean;
    erMor: boolean;
    erFarEllerMedmor: boolean;
    erUfør: boolean;
    kanIkkeOppgis: boolean;
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
