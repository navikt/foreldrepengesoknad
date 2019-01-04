import { UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';
import { dateIsTodayOrInFuture } from '../../dates/dates';

export const erUtsettelseÅrsakTypeGyldigForStartdato = (årsak: UtsettelseÅrsakType, startdato: Date): boolean => {
    switch (årsak) {
        case UtsettelseÅrsakType.Arbeid:
        case UtsettelseÅrsakType.Ferie:
            return dateIsTodayOrInFuture(startdato);
        default:
            return true;
    }
};
