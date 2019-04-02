import { Dekningsgrad, Tidsperiode } from 'common/types';
import { StønadskontoType } from '../uttaksplan/periodetyper';

export enum SaksgrunnlagFamiliehendelsesType {
    'ADOPSJON' = 'ADPSJN',
    'OMSORGSOVERTAKELSE' = 'OMSRGO',
    'FØDSEL' = 'FODSL',
    'TERM' = 'TERM'
}

export enum PeriodeResultatType {
    'INNVILGET' = 'innvilget',
    'AVSLÅTT' = 'AVSLÅTT',
    'IKKE_FASTSATT' = 'IKKE_FASTSATT',
    'MANUELL_BEHANDLING' = 'MANUELL_BEHANDLING'
}

export interface Saksgrunnlag {
    familieHendelseType: SaksgrunnlagFamiliehendelsesType;
    familieHendelseDato: Date;
    dekningsgrad: Dekningsgrad;
    antallBarn: number;
    søkerErFarEllerMedmor: boolean;
    morErAleneOmOmsorg: boolean;
    morErUfør: boolean;
    morHarRett: boolean;
    farMedmorErAleneOmOmsorg: boolean;
    farMedmorHarRett: boolean;
}

export interface Saksperiode {
    periodeResultatType: PeriodeResultatType;
    graderingInnvilget: boolean;
    samtidigUttak: boolean;
    stønadskontotype: StønadskontoType;
    trekkDager: number;
    arbeidstidprosent: number;
    utbetalingprosent: number;
    gjelderAnnenPart: boolean;
    tidsperiode: Tidsperiode;
}

export interface SakForEndring {
    grunnlag: Saksgrunnlag;
    perioder: Saksperiode[];
}
