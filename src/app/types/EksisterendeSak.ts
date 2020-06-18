import { Dekningsgrad, Tidsperiode } from 'common/types';
import {
    StønadskontoType,
    SaksperiodeUtsettelseÅrsakType,
    Periode,
    MorsAktivitet,
    OverføringÅrsakType,
} from './uttaksplan/periodetyper';

export enum FamiliehendelsesType {
    'ADOPSJON' = 'ADPSJN',
    'OMSORGSOVERTAKELSE' = 'OMSRGO',
    'FØDSEL' = 'FODSL',
    'TERM' = 'TERM',
}

export enum PeriodeResultatType {
    'INNVILGET' = 'INNVILGET',
    'AVSLÅTT' = 'AVSLÅTT',
    'IKKE_FASTSATT' = 'IKKE_FASTSATT',
    'MANUELL_BEHANDLING' = 'MANUELL_BEHANDLING',
}

export enum ArbeidsgiverInfoType {
    'ORGANISASJON' = 'ORGANISASJON',
    'PRIVAT' = 'PRIVAT',
}

export enum UttakArbeidType {
    'ORDINÆRT_ARBEID' = 'ORDINÆRT_ARBEID',
    'SELVSTENDIG_NÆRINGSDRIVENDE' = 'SELVSTENDIG_NÆRINGSDRIVENDE',
    'FRILANS' = 'FRILANS',
    'ANNET' = 'ANNET',
}

export interface ArbeidsgiverInfo {
    id: string;
    type: ArbeidsgiverInfoType;
    navn: string;
}

export interface Saksgrunnlag {
    familieHendelseType: FamiliehendelsesType;
    familieHendelseDato: Date;
    dekningsgrad: Dekningsgrad;
    antallBarn: number;
    søkerErFarEllerMedmor: boolean;
    morErAleneOmOmsorg: boolean;
    morErUfør: boolean;
    morHarRett: boolean;
    farMedmorErAleneOmOmsorg: boolean;
    farMedmorHarRett: boolean;
    erDeltUttak: boolean;
    erBarnetFødt: boolean; // Utledet fra familieHendelseType
    termindato?: Date;
    fødselsdato?: Date;
}

export interface Saksperiode {
    guid: string;
    periodeResultatType: PeriodeResultatType;
    utsettelsePeriodeType?: SaksperiodeUtsettelseÅrsakType;
    graderingInnvilget: boolean;
    samtidigUttak: boolean;
    samtidigUttaksprosent: number;
    stønadskontotype: StønadskontoType;
    flerbarnsdager: boolean;
    trekkDager: number;
    arbeidstidprosent: number;
    utbetalingsprosent: number;
    gjelderAnnenPart: boolean;
    tidsperiode: Tidsperiode;
    uttakArbeidType: UttakArbeidType[];
    arbeidsgiverInfo: ArbeidsgiverInfo;
    morsAktivitetIPerioden?: MorsAktivitet;
    overfoeringAarsak?: OverføringÅrsakType;
    angittAvAnnenPart?: boolean;
}

export interface EksisterendeSak {
    erAnnenPartsSak: boolean;
    grunnlag: Saksgrunnlag;
    saksperioder: Saksperiode[];
    uttaksplan: Periode[] | undefined;
}
