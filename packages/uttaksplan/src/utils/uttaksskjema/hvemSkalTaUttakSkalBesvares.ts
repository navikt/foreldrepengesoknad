import { TidsperiodeDate } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';
import { erSamtidigUttakFarMedmorFørFørsteSeksUkerWLB } from 'components/uttaks-forms/periode-uttak-form/periodeUttakFormQuestionsConfig';

const hvemSkalTaUttakSkalBesvares = (
    tidsperiode: TidsperiodeDate,
    erDeltUttakINorge: boolean,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    situasjon: Situasjon,
): boolean => {
    if (erFarEllerMedmor) {
        if (
            erSamtidigUttakFarMedmorFørFørsteSeksUkerWLB(
                { fom: tidsperiode.fom },
                familiehendelsesdato,
                erFarEllerMedmor,
                erDeltUttakINorge,
                situasjon,
            )
        ) {
            return false;
        }
    }
    return erDeltUttakINorge;
};

export default hvemSkalTaUttakSkalBesvares;
