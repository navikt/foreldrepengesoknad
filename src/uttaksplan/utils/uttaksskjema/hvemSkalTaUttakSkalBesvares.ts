import { TidsperiodeDate } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';
import { erSamtidigUttakFarMedmorFørFørsteSeksUkerWLB } from 'uttaksplan/components/uttaks-forms/periode-uttak-form/periodeUttakFormQuestionsConfig';

const hvemSkalTaUttakSkalBesvares = (
    tidsperiode: TidsperiodeDate,
    erDeltUttak: boolean,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    situasjon: Situasjon
): boolean => {
    if (erFarEllerMedmor) {
        if (
            erSamtidigUttakFarMedmorFørFørsteSeksUkerWLB(
                { fom: tidsperiode.fom },
                familiehendelsesdato,
                erFarEllerMedmor,
                erDeltUttak,
                situasjon
            )
        ) {
            return false;
        }
    }
    return erDeltUttak;
};

export default hvemSkalTaUttakSkalBesvares;
