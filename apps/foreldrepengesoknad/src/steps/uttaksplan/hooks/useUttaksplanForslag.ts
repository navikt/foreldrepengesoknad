import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { getDatoForAleneomsorg, getErMorUfør } from 'utils/annenForelderUtils';
import { getErSøkerFarEllerMedmor, getKjønnFromFnr } from 'utils/personUtils';

import {
    Barn,
    KontoBeregningDto,
    KontoDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertAnnetBarn,
} from '@navikt/fp-types';
import { UttaksdagenString, getFamiliehendelsedato } from '@navikt/fp-utils';
import { deltUttak, getTidsperiodeString, ikkeDeltUttak } from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

import { FellesperiodeFordelingValg, Fordeling, OppstartValg } from '../../../types/Fordeling';
import { getTermindato } from '../../../utils/barnUtils';

const getFellesperioderDagerFordeling = (fordeling: Fordeling, fellesperiodeDagerTilgjengelig: number) => {
    if (fordeling.fordelingValg === FellesperiodeFordelingValg.ALT) {
        return { fellesperiodeDagerMor: fellesperiodeDagerTilgjengelig, fellesperiodeDagerFarMedmor: 0 };
    } else if (fordeling.fordelingValg === FellesperiodeFordelingValg.VIL_VELGE) {
        const antallDager = fordeling.antallDagerFellesperiodeTilSøker
            ? Number.parseInt(fordeling.antallDagerFellesperiodeTilSøker, 10)
            : 0;
        const antallUker = fordeling.antallUkerFellesperiodeTilSøker
            ? Number.parseInt(fordeling.antallUkerFellesperiodeTilSøker, 10)
            : 0;
        const fellesperiodeDagerMor = antallUker * 5 + antallDager;
        return {
            fellesperiodeDagerMor,
            fellesperiodeDagerFarMedmor: fellesperiodeDagerTilgjengelig - fellesperiodeDagerMor,
        };
    } else {
        return { fellesperiodeDagerMor: 0, fellesperiodeDagerFarMedmor: 0 };
    }
};

const lagDeltUttakForFarMedmor = (
    helgejustertFamDato: string,
    stønadskontoer: KontoDto[],
    startdato: string,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const harFødselspermisjon = helgejustertFamDato === UttaksdagenString.denneEllerNeste(startdato).getDato();
    const forslag: UttakPeriode_fpoversikt[] = [];

    const foreldrepengerFørFødsel = stønadskontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødrekvote = stønadskontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fedrekvote = stønadskontoer.find((k) => k.konto === 'FEDREKVOTE');
    const fellesperiode = stønadskontoer.find((k) => k.konto === 'FELLESPERIODE');
    const gjenståendreFedrekvote = fedrekvote && harFødselspermisjon ? fedrekvote.dager - 10 : undefined;

    let currentFomDate = UttaksdagenString.denneEllerNeste(startdato).getDato();

    let tidsperiode = getTidsperiodeString(
        UttaksdagenString.denne(currentFomDate).getDatoAntallUttaksdagerTidligere(15),
        foreldrepengerFørFødsel ? foreldrepengerFørFødsel.dager : 15,
    );

    forslag.push({
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    if (harFødselspermisjon) {
        tidsperiode = getTidsperiodeString(currentFomDate, 10);

        forslag.push(
            {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: tidsperiode.fom,
                tom: tidsperiode.tom,
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: tidsperiode.fom,
                tom: tidsperiode.tom,
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
        );

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

        tidsperiode = getTidsperiodeString(currentFomDate, mødrekvote ? mødrekvote.dager - 10 : 0);

        forslag.push({
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();
    } else {
        tidsperiode = getTidsperiodeString(currentFomDate, mødrekvote ? mødrekvote.dager : 0);

        forslag.push({
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
            flerbarnsdager: false,
        });

        currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();
    }

    tidsperiode = getTidsperiodeString(currentFomDate, fellesperiode ? fellesperiode.dager : 0);

    forslag.push({
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    currentFomDate = UttaksdagenString.neste(tidsperiode.tom).getDato();

    tidsperiode = getTidsperiodeString(
        currentFomDate,
        gjenståendreFedrekvote !== undefined ? gjenståendreFedrekvote : fedrekvote ? fedrekvote.dager : 0,
    );

    forslag.push({
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        fom: tidsperiode.fom,
        tom: tidsperiode.tom,
        flerbarnsdager: false,
    });

    return forslag;
};

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
        if (erSøkerFarEllerMedmor) {
            return lagDeltUttakForFarMedmor(
                UttaksdagenString.denneEllerNeste(familiehendelsedato).getDato(),
                valgtStønadskonto.kontoer,
                oppstartsdato,
            );
        }

        const helgejustertFamDato = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDato();
        const dagerMellomFamDatoOgStartdato =
            UttaksdagenString.denne(oppstartsdato).getUttaksdagerFremTilDato(helgejustertFamDato);
        const dagerMedFellesperiodeFørFødsel =
            dagerMellomFamDatoOgStartdato > 15 ? dagerMellomFamDatoOgStartdato - 15 : 0;
        const fellesperiodeKonto = valgtStønadskonto.kontoer.find((k) => k.konto === 'FELLESPERIODE');
        const fellesperiodeDagerTilgjengelig = fellesperiodeKonto
            ? fellesperiodeKonto.dager - dagerMedFellesperiodeFørFødsel
            : 0;
        const { fellesperiodeDagerMor } = getFellesperioderDagerFordeling(fordeling, fellesperiodeDagerTilgjengelig);

        return deltUttak({
            famDato: familiehendelsedato,
            tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
            fellesperiodeDagerMor,
            startdato: oppstartsdato,
        });
    }

    const erFarOgFar = getKjønnFromFnr(annenForelder) === 'M' && søkersituasjon.rolle === 'far';

    const bareFarMedmorHarRett =
        søkersituasjon.rolle !== 'mor' &&
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.erAleneOmOmsorg ||
            (!annenForelder.harRettPåForeldrepengerINorge && !annenForelder.harRettPåForeldrepengerIEØS));

    return ikkeDeltUttak({
        situasjon: søkersituasjon.situasjon,
        famDato: familiehendelsedato,
        erFarEllerMedmor: erSøkerFarEllerMedmor,
        tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
        erMorUfør,
        bareFarMedmorHarRett,
        erAleneOmOmsorg,
        farOgFar: erFarOgFar,
        startdato: oppstartsdato,
    });
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
