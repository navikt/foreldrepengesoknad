import { Tidsperiode } from '@navikt/fp-common';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { ArbeidsgiverInfo } from './ArbeidsgiverInfo';
import { UtsettelseÅrsakTypeDTO } from './UtsettelseÅrsakTypeDTO';

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
    uttakArbeidType: string;
    utsettelsePeriodeType?: UtsettelseÅrsakTypeDTO;
    periodeResultatÅrsak: string;
}
