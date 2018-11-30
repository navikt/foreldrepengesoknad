import { Uttaksperiode } from '../../types/uttaksplan/periodetyper';
import { Skjemanummer } from '../../types/søknad/Søknad';
import { getMorsAktivitetSkjemanummer } from './morsAktivitetSkjemanummer';

export const getUttakperiodeSkjemanummer = (periode: Uttaksperiode): Skjemanummer => {
    if (periode.morsAktivitetIPerioden !== undefined) {
        return getMorsAktivitetSkjemanummer(periode.morsAktivitetIPerioden);
    }
    return Skjemanummer.ANNET;
};
