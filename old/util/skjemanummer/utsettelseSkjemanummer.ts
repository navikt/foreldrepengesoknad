import { Utsettelsesperiode } from '../../types/uttaksplan/periodetyper';
import { Skjemanummer } from '../../types/søknad/Søknad';

export const getUtsettelseSkjemanummer = (periode: Utsettelsesperiode): Skjemanummer => {
    if (periode.morsAktivitetIPerioden) {
        return Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM;
    }
    return Skjemanummer.ANNET;
};
