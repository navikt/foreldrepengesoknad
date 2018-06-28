import {
    StønadskontoType,
    StønadskontoUttak
} from 'uttaksplan/types/periodetyper';
import { Permisjonsregler } from 'uttaksplan/types';
import { SøkerRolle, Søkersituasjon } from 'app/types/søknad/Søknad';
import { Kjønn } from 'app/types/common';
import { Dekningsgrad } from 'common/types';
import { Tidsperiode } from 'nav-datovelger';

export interface SøkerGrunnlag {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    kjønn: Kjønn;
    erAleneOmOmsorg: boolean;
    rolle: SøkerRolle;
    situasjon: Søkersituasjon;
}
export interface AnnenForelderGrunnlag {
    fornavn: string;
    etternavn: string;
}

export interface UttaksplanAppProps {
    termindato: Date;
    søker: SøkerGrunnlag;
    annenForelder?: AnnenForelderGrunnlag;
    antallBarn: number;
    erBarnetFødt: boolean;
    erDeltPermisjon: boolean;
}

export interface Uttaksgrunnlag extends UttaksplanAppProps {
    dekningsgrad: Dekningsgrad;
    permisjonsregler: Permisjonsregler;
    tilgjengeligeStønadskontoer: StønadskontoType[];
    tilgjengeligeUttak: StønadskontoUttak[];
    antallUttaksdagerTilgjengelig: number;
}

export interface Uttaksdatoer {
    /** Siste mulige uttaksdag gitt fødsel/termin */
    førsteMuligeUttaksdag: Date;
    /** Siste mulige uttaksdag gitt fødsel/termin */
    sisteMuligeUttaksdag: Date;
    /** Siste uttaksdag som er før fødsel/termin */
    sisteUttaksdagFørFødsel: Date;
    /** Første uttaksdag på/etter fødsel/termin */
    førsteUttaksdagEtterFødsel: Date;
}

export interface Uttaksinfo {
    /** Tidsperiode ut fra første og siste registrerte uttak eller utsettelse */
    registrertTidsperiode: Tidsperiode;
    /** Tidsperiode ut fra første og siste registrerte uttak, utsettelse eller opphold */
    registrertTidsperiodeInkludertOpphold: Tidsperiode;
    /** Siste permisjonsdag ut fra registrerte perioder  */
    sluttdatoGittUttaksdager: Date;
    /** Antall dager som er registrert som uttak */
    antallDagerUttak: number;
    /** Antall uttaksdagerdager som er registrert som utsettelser */
    antallDagerUtsettelser: number;
    /** Antall uttaksdager som ikke er registrert som uttak eller utsettelse i permisjonsperioden */
    antallDagerOpphold: number;
    /** Antall dager som er registrert som uttak, utsettelse eller opphold */
    antallDagerTotalt: number;
}
