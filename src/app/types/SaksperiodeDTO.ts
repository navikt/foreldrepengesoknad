import { Tidsperiode } from '@navikt/fp-common';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { ArbeidsgiverInfo } from './ArbeidsgiverInfo';
import { UttakArbeidType } from './UttakArbeidType';

export interface SaksperiodeDTO {
    angittAvAnnenPart?: boolean;
    arbeidsgiverInfo: ArbeidsgiverInfo;
    arbeidstidprosent: number;
    flerbarnsdager: boolean;
    gjelderAnnenPart: boolean;
    graderingInnvilget: boolean;
    morsAktivitet?: MorsAktivitet;
    oppholdAarsak: OppholdÅrsakType;
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
