import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { getErMorUfør } from 'utils/annenForelderUtils';
import { getErSøkerFarEllerMedmor, getKjønnFromFnr } from 'utils/personUtils';

import { isAnnenForelderOppgitt } from '@navikt/fp-common';
import { KontoBeregningDto, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { UttaksdagenString, getFamiliehendelsedato } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { deltUttak } from './forslag/deltUttak';
import { ikkeDeltUttak } from './forslag/ikkeDeltUttak';

// TODO (TOR) deltUttak og ikkeDeltUttak er kopiert og tilpassa fra planleggaren. Prøv å slå desse saman når denne er heilt ferdig

export const useUttaksplanForslag = (
    valgtStønadskonto?: KontoBeregningDto,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const familiehendelsedato = getFamiliehendelsedato(barn);

    // TODO (TOR) Burde denne sjekka mot erMorUfør og erAleneomsorg òg?
    const erDeltUttak =
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true);

    if (!valgtStønadskonto || !fordeling) {
        return [];
    }

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const erMorUfør = getErMorUfør(annenForelder, erSøkerFarEllerMedmor);

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;

    const startdato =
        erSøkerFarEllerMedmor && (!erDeltUttak || erMorUfør || erAleneOmOmsorg)
            ? UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30)
            : undefined;

    if (erDeltUttak) {
        const antallDager = fordeling.antallDagerFellesperiodeTilSøker
            ? Number.parseInt(fordeling.antallDagerFellesperiodeTilSøker)
            : 0;

        const antallUker = fordeling.antallUkerFellesperiodeTilSøker
            ? Number.parseInt(fordeling.antallUkerFellesperiodeTilSøker)
            : 0;

        const antallDagerOgUkerSøker = antallUker * 5 + antallDager;

        const antallDagerFellesperiodeMor = erSøkerFarEllerMedmor
            ? valgtStønadskonto.kontoer.reduce((acc, p) => (p.konto === 'FELLESPERIODE' ? p.dager : acc), 0) -
              antallDagerOgUkerSøker
            : antallDagerOgUkerSøker;

        return deltUttak(familiehendelsedato, valgtStønadskonto.kontoer, antallDagerFellesperiodeMor, startdato);
    }

    const erFarOgFar = getKjønnFromFnr(annenForelder) === 'M' && søkersituasjon.rolle === 'far';

    const bareFarMedmorHarRett =
        søkersituasjon.rolle !== 'mor' &&
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.erAleneOmOmsorg ||
            (!annenForelder.harRettPåForeldrepengerINorge && !annenForelder.harRettPåForeldrepengerIEØS));

    return ikkeDeltUttak(
        søkersituasjon,
        familiehendelsedato,
        erSøkerFarEllerMedmor,
        valgtStønadskonto.kontoer,
        erMorUfør,
        bareFarMedmorHarRett,
        erAleneOmOmsorg,
        erFarOgFar,
        startdato,
    );
};
