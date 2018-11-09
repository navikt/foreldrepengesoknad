import { Dekningsgrad } from 'common/types';
import { Søkersituasjon } from '../types/s\u00F8knad/S\u00F8knad';

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

export interface Søknadsinfo {
    familiehendelsesdato: Date;
    dekningsgrad: Dekningsgrad;
    antallBarn: number;
    morHarRett: boolean;
    morHarAleneomsorg: boolean;
    farEllerMedmorHarRett: boolean;
    farEllerMedmorHarAleneomsorg: boolean;
    situasjon: Søkersituasjon;
    erDeltUttak: boolean;
    søkerErMor: boolean;
    søkerErFarEllerMedmor: boolean;
    søkerErAleneOmOmsorgen: boolean;
    uttaksdatoer: Uttaksdatoer;
}
