import dayjs from 'dayjs';

import { Periodetype, Situasjon, TidsperiodeDate } from '@navikt/fp-common';
import { KontoTypeUttak } from '@navikt/fp-types';

import { uttakRundtFødselÅrsakSpørsmålSkalBesvares } from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';

const samtidigUttakSkalBesvares = (
    periodetype: Periodetype,
    konto: KontoTypeUttak,
    erUttakInnenFørsteSeksUkerFødselFarMedmor: boolean,
    erUttakFørFødsel: boolean,
    erAleneOmsorg: boolean,
    erDeltUttakINorge: boolean,
    søkerHarMidlertidigOmsorg: boolean,
    erMorForSyk: boolean | undefined,
    ønskerFlerbarnsdager: boolean | undefined,
    tidsperiode: TidsperiodeDate,
    søkerErFarEllerMedmor: boolean,
    annenforelderKanIkkeOppgis: boolean,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon,
    bareFarMedmorHarRett: boolean,
): boolean => {
    if (erAleneOmsorg || !erDeltUttakINorge || søkerHarMidlertidigOmsorg) {
        return false;
    }
    if (dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'd')) {
        return false;
    }
    if (
        uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            periodetype,
            konto,
            tidsperiode,
            søkerErFarEllerMedmor,
            erAleneOmsorg,
            annenforelderKanIkkeOppgis,
            søkerHarMidlertidigOmsorg,
            familiehendelsesdato,
            termindato,
            situasjon,
            bareFarMedmorHarRett,
        )
    ) {
        return false;
    }

    if (periodetype === Periodetype.Uttak) {
        if (erMorForSyk) {
            return false;
        }

        const erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager: boolean =
            erUttakInnenFørsteSeksUkerFødselFarMedmor &&
            (konto === 'FEDREKVOTE' || konto === 'FORELDREPENGER') &&
            ønskerFlerbarnsdager !== true;

        return !(erUttakFørFødsel || erUttakEgenKvoteFarMedmorFørsteSeksUkerUtenFlerbarnsdager);
    }

    return false;
};
// eslint-disable-next-line import/no-default-export
export default samtidigUttakSkalBesvares;
