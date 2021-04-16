import { Periode } from '../../../types/uttaksplan/periodetyper';
import { Periodene } from '../../uttaksplan/Periodene';
import { erUtsettelseÅrsakTypeGyldigForStartdato } from '../../uttaksplan/regler/erUtsettelseÅrsakGyldigForStartdato';
import { today } from '../values';

export const utsettelseFørDagensDato = (perioder: Periode[]): boolean => {
    const utsettelser = Periodene(perioder)
        .getUtsettelser()
        .filter((periode) => erUtsettelseÅrsakTypeGyldigForStartdato(periode.årsak, today.toDate()) === false);
    return utsettelser !== undefined && utsettelser.length > 0;
};
