import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { getErMorUfør } from 'utils/annenForelderUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
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
    const fordeling = notEmpty(useContextGetData(ContextDataType.FORDELING));
    const familiehendelsedato = getFamiliehendelsedato(barn);

    const erDeltUttak =
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true);

    if (!valgtStønadskonto) {
        return [];
    }

    // FIXME (TOR) Sjekk kva dette blir brukt til og evt endre sånn som i planelegger
    const startdato = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30);

    if (erDeltUttak) {
        const antallDager = fordeling.antallDagerFellesperiodeTilSøker
            ? Number.parseInt(fordeling.antallDagerFellesperiodeTilSøker)
            : undefined;
        return deltUttak(familiehendelsedato, valgtStønadskonto.kontoer, antallDager, startdato);
    }

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;

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
