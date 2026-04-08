import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { getDatoForAleneomsorg, getErMorUfør } from 'utils/annenForelderUtils';
import { getErSøkerFarEllerMedmor, getKjønnFromFnr } from 'utils/personUtils';

import {
    Barn,
    KontoBeregningDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertAnnetBarn,
} from '@navikt/fp-types';
import { UttaksdagenString, getFamiliehendelsedato } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { Fordeling, OppstartValg } from '../../../types/Fordeling';
import { getTermindato } from '../../../utils/barnUtils';
import { deltUttak } from './forslag/deltUttak';
import { ikkeDeltUttak } from './forslag/ikkeDeltUttak';

// TODO (TOR) deltUttak og ikkeDeltUttak er kopiert og tilpassa fra planleggaren. Prøv å slå desse saman når denne er heilt ferdig

export const useUttaksplanForslag = (
    valgtStønadskonto?: KontoBeregningDto,
    annenPartsPerioder?: UttakPeriode_fpoversikt[],
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const familiehendelsedato = getFamiliehendelsedato(barn);

    if ((annenPartsPerioder !== undefined && annenPartsPerioder.length > 0) || !valgtStønadskonto || !fordeling) {
        return [];
    }

    // TODO (Andreas) - Må finne ut av hvordan man skal gjøre ting når annen part har perioder
    // const annenPartsSistePeriode = annenPartsPerioder?.at(-1);
    // const annenPartsSisteDag = annenPartsSistePeriode
    //     ? UttaksdagenString.denneEllerForrige(annenPartsSistePeriode.tom).getDato()
    //     : undefined;

    // TODO (TOR) Burde denne sjekka mot erMorUfør og erAleneomsorg òg?
    const erDeltUttak =
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true);

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const erMorUfør = getErMorUfør(annenForelder, erSøkerFarEllerMedmor);

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;

    const oppstartsdato = getOppstartsdatoFromFordelingValg(
        fordeling,
        barn,
        getDatoForAleneomsorg(annenForelder),
        undefined, // TODO (Andreas) - Må finne ut av hvordan man skal gjøre ting når annen part har perioder
    );

    if (erDeltUttak) {
        return deltUttak(
            familiehendelsedato,
            valgtStønadskonto.kontoer,
            erSøkerFarEllerMedmor,
            oppstartsdato,
            fordeling,
        );
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
        oppstartsdato,
    );
};

const getFørsteUttaksdagPåEllerEtterFødsel = (familiehendelsesdato: string) => {
    return UttaksdagenString.denneEllerNeste(familiehendelsesdato).getDato();
};

const getNesteUttaksdagEtterAnnenForelder = (sisteDagAnnenForelder: string | undefined) => {
    if (!sisteDagAnnenForelder) {
        throw new Error('Mangler informasjon om annen forelders siste dag.');
    }
    const sisteUttaksdagAnnenForelder = UttaksdagenString.denneEllerForrige(sisteDagAnnenForelder).getDato();
    return UttaksdagenString.neste(sisteUttaksdagAnnenForelder).getDato();
};

function getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato: string | undefined): string {
    if (!familiehendelsesdato) {
        throw new Error('Mangler informasjon om familiehendelsesdato.');
    }
    return UttaksdagenString.denne(
        getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato),
    ).getDatoAntallUttaksdagerTidligere(15);
}

function getFørsteUttaksdagAnkomstdatoNorge(anksomstdatoNorge: string | undefined): string {
    if (!anksomstdatoNorge) {
        throw new Error('Mangler informasjon om ankomstdato til Norge.');
    }
    return UttaksdagenString.denneEllerNeste(anksomstdatoNorge).getDato();
}

function getFørsteUttaksdagDatoForAleneomsorg(datoForAleneomsorg: string | undefined): string {
    if (!datoForAleneomsorg) {
        throw new Error('Mangler informasjon om dato for aleneomsorg.');
    }
    return UttaksdagenString.denneEllerNeste(datoForAleneomsorg).getDato();
}

const getOppstartsdatoFromFordelingValg = (
    fordeling: Fordeling,
    barn: Barn,
    datoForAleneomsorg: string | undefined,
    sisteDagAnnenForelder: string | undefined,
): string => {
    const oppstartValg = fordeling.oppstartAvForeldrepengerValg;
    const oppstartDato = fordeling.oppstartDato;
    const termindato = getTermindato(barn);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const ankomstDatoNorge = isAdoptertAnnetBarn(barn) && barn.adoptertIUtlandet ? barn.ankomstdato : undefined;

    if ((!oppstartValg || oppstartValg === OppstartValg.ANNEN_DATO) && oppstartDato) {
        return oppstartDato;
    }
    switch (oppstartValg) {
        case OppstartValg.TRE_UKER_FØR_TERMIN:
            return getFørsteUttaksdagForeldrepengerFørFødsel(termindato);
        case OppstartValg.TRE_UKER_FØR_FØDSEL:
            return getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
        case OppstartValg.FAMILIEHENDELSESDATO:
            return familiehendelsesdato;
        case OppstartValg.ANKOMSTDATO_NORGE:
            return getFørsteUttaksdagAnkomstdatoNorge(ankomstDatoNorge);
        case OppstartValg.DAGEN_ETTER_ANNEN_FORELDER:
            return getNesteUttaksdagEtterAnnenForelder(sisteDagAnnenForelder ?? familiehendelsesdato); // TODO (Andreas) - Default verdi for øyeblikket
        case OppstartValg.DATO_FOR_ALENEOMSORG:
            return getFørsteUttaksdagDatoForAleneomsorg(datoForAleneomsorg);
        default:
            throw new Error('Ukjent verdi på oppstartValg.');
    }
};
