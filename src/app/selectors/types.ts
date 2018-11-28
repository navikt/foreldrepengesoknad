// import { Dekningsgrad } from 'common/types';
// import { Søkersituasjon } from '../types/søknad/Søknad';
// import { TilgjengeligStønadskonto } from '../types/uttaksplan/periodetyper';

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

// export interface Søknadsinfo {
//     situasjon: Søkersituasjon;
//     familiehendelsesdato: Date;
//     dekningsgrad: Dekningsgrad;
//     antallBarn: number;
//     morHarRett: boolean;
//     morHarAleneomsorg: boolean;
//     farEllerMedmorHarRett: boolean;
//     farEllerMedmorHarAleneomsorg: boolean;
//     erDeltUttak: boolean;
//     søkerErMor: boolean;
//     søkerErFarEllerMedmor: boolean;
//     søkerErAleneOmOmsorgen: boolean;
// }
// // uttaksdatoer: Uttaksdatoer;
// // tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
