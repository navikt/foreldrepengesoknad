import { Tidsperiode } from '@navikt/fp-common';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { ArbeidsgiverInfo } from './ArbeidsgiverInfo';
import { UttakArbeidType } from './UttakArbeidType';

export interface Saksperiode {
    guid: string;
    angittAvAnnenPart?: boolean;
    arbeidsgiverInfo: ArbeidsgiverInfo;
    arbeidstidprosent: number;
    flerbarnsdager: boolean;
    gjelderAnnenPart: boolean;
    graderingInnvilget: boolean;
    morsAktivitetIPerioden?: MorsAktivitet;
    overfoeringAarsak?: OverføringÅrsakType;
    periode: Tidsperiode;
    periodeResultatType: PeriodeResultatType;
    samtidigUttak: boolean;
    samtidigUttaksprosent?: number;
    stønadskontotype: StønadskontoType;
    trekkDager: number;
    utbetalingsprosent: number;
    uttakArbeidType: UttakArbeidType[];
    utsettelsePeriodeType?: UtsettelseÅrsakType;
}
