import { Gradering, KontoTypeUttak } from '@navikt/fp-types';

import { MorsAktivitet } from './MorsAktivitet';
import { OppholdÅrsakTypeDTO } from './OppholdÅrsakTypeDTO';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeResultatDTO } from './PeriodeResultatDTO';
import { UtsettelseÅrsakTypeDTO } from './UtsettelseÅrsakTypeDTO';

export interface SaksperiodeDTO {
    fom: string;
    tom: string;
    resultat: PeriodeResultatDTO;
    flerbarnsdager?: boolean;
    kontoType?: KontoTypeUttak;
    gradering?: Gradering;
    oppholdÅrsak?: OppholdÅrsakTypeDTO;
    utsettelseÅrsak?: UtsettelseÅrsakTypeDTO;
    overføringÅrsak?: OverføringÅrsakType;
    samtidigUttak?: number;
    morsAktivitet?: MorsAktivitet;
}
