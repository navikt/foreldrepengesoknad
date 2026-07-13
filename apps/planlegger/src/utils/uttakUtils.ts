import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { HvemPlanlegger, HvemPlanleggerType } from 'types/HvemPlanlegger';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { KontoBeregningDto, KontoDto, OmBarnetPlanlegger, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen, treUkerSiden } from '@navikt/fp-utils';
import { deltUttak, ikkeDeltUttak } from '@navikt/fp-uttaksplan';

import { erFarSøker2, erMedmorDelAvSøknaden } from './HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from './barnetUtils';
import { HvemHarRett } from './hvemHarRettUtils';
import {
    getAntallDagerAktivitetsfriKvote,
    getAntallDagerFedrekvote,
    getAntallDagerForeldrepengerFørFødsel,
    getAntallDagerMødrekvote,
    getAntallUkerOgDagerFellesperiode,
    getAntallUkerOgDagerForeldrepenger,
    getUkerOgDager,
} from './stønadskvoterUtils';

export interface PlanForslag {
    søker1: UttakPeriode_fpoversikt[];
    søker2: UttakPeriode_fpoversikt[];
}

dayjs.extend(isoWeek);

const ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL = 3;

const getUkedag = (dato: string): number => {
    return dayjs(dato).isoWeekday();
};

const erUttaksdag = (dato: string): boolean => {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
};

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den nærmeste påfølgende mandag
 * @param dato
 */
const getUttaksdagFraOgMedDato = (dato: string): string => {
    const d = dayjs(dato).toDate();
    const newDate = dato ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12) : dato;
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(newDate).add(48, 'hours').format(ISO_DATE_FORMAT);
        case 7:
            return dayjs.utc(newDate).add(24, 'hours').format(ISO_DATE_FORMAT);
        default:
            return dato;
    }
};

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den foregående fredag.
 * Tar hensyn til stilling av klokken ved å gjøre om klokka til kl 12 før antall timer trekkes fra.
 * @param dato
 */
const getUttaksdagTilOgMedDato = (dato: string): string => {
    const d = dayjs(dato).toDate();
    const newDate = dato ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12) : dato;
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(newDate).subtract(24, 'hours').format(ISO_DATE_FORMAT);
        case 7:
            return dayjs.utc(newDate).subtract(48, 'hours').format(ISO_DATE_FORMAT);
        default:
            return dato;
    }
};

/**
 * Trekker uttaksdager fra en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
const trekkUttaksdagerFraDato = (dato: string, uttaksdager: number): string => {
    if (erUttaksdag(dato) === false) {
        throw new Error('trekkUttaksdagerFraDato: Dato må være uttaksdag');
    }
    let nyDato = dato;
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller < Math.abs(uttaksdager)) {
        const tellerdato = dayjs
            .utc(dato)
            .add(--dagteller * 24, 'hours')
            .format(ISO_DATE_FORMAT);
        if (erUttaksdag(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato;
};

export const getFamiliehendelsedato = (barnet: OmBarnetPlanlegger) => {
    if (erBarnetAdoptert(barnet)) {
        return barnet.overtakelsesdato;
    }
    return erBarnetUFødt(barnet) ? barnet.termindato : barnet.fødselsdato;
};

const getFørsteUttaksdagForeldrepengerFørFødsel = (barnet: OmBarnetPlanlegger): string => {
    if (erBarnetAdoptert(barnet)) {
        throw new Error('Kan ikke være adoptert');
    }

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    if (
        erBarnetFødt(barnet) &&
        barnet.termindato &&
        dayjs(familiehendelsedato).isBefore(dayjs(treUkerSiden(barnet.termindato)))
    ) {
        return getUttaksdagFraOgMedDato(familiehendelsedato);
    }

    return trekkUttaksdagerFraDato(
        getUttaksdagFraOgMedDato(familiehendelsedato),
        ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
};

/**
 * Første uttaksdag med foreldrepenger før fødsel, lagt 3 uker (15 uttaksdager) før
 * familiehendelsedatoen. I motsetning til {@link getFørsteUttaksdagForeldrepengerFørFødsel} har
 * denne ingen spesialhåndtering når barnet er født mer enn 3 uker før termin. Dette samsvarer med
 * hvordan selve uttaksplanen (`deltUttak`) plasserer foreldrepenger-før-fødsel-perioden, slik at
 * fordelingssliderens datoer blir like kalender- og listevisningen.
 */
const getStartdatoForeldrepengerFørFødsel = (familiehendelsedato: string): string => {
    return trekkUttaksdagerFraDato(
        getUttaksdagFraOgMedDato(familiehendelsedato),
        ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
};

export type Uttaksdata = {
    familiehendelsedato: string;
    startdatoPeriode1: string;
    sluttdatoPeriode1: string;
    startdatoPeriode2?: string;
    sluttdatoPeriode2?: string;
};

const finnDeltUttaksdata = (
    hvemPlanlegger: HvemPlanlegger,
    valgtStønadskvote: KontoBeregningDto,
    barnet: OmBarnetPlanlegger,
    antallDagerFellesperiodeSøker1: number = 0,
): Uttaksdata => {
    const totaltAntallDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskvote).totaltAntallDager;
    const antallUkerOgDagerFellesperiodeForSøker1 = getUkerOgDager(antallDagerFellesperiodeSøker1);
    const antallUkerOgDagerFellesperiodeForSøker2 = getUkerOgDager(
        totaltAntallDagerFellesperiode - antallDagerFellesperiodeSøker1,
    );

    const antallDagerForeldrepengerFørFødsel = getAntallDagerForeldrepengerFørFødsel(valgtStønadskvote);
    const antallDagerMødrekvote = getAntallDagerMødrekvote(valgtStønadskvote);
    const antallDagerFedrekvote = getAntallDagerFedrekvote(valgtStønadskvote);

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    const startdatoPeriode1 =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR
            ? getUttaksdagFraOgMedDato(getUttaksdagFraOgMedDato(familiehendelsedato))
            : getStartdatoForeldrepengerFørFødsel(familiehendelsedato);

    const sluttdatoPeriode1 =
        hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR
            ? Uttaksdagen.denne(startdatoPeriode1).getDatoAntallUttaksdagerSenere(
                  antallDagerMødrekvote + antallUkerOgDagerFellesperiodeForSøker1.totaltAntallDager - 1,
              )
            : Uttaksdagen.denne(startdatoPeriode1).getDatoAntallUttaksdagerSenere(
                  antallDagerForeldrepengerFørFødsel +
                      antallDagerMødrekvote +
                      antallUkerOgDagerFellesperiodeForSøker1.totaltAntallDager -
                      1,
              );

    const startdatoPeriode2 = getUttaksdagFraOgMedDato(dayjs(sluttdatoPeriode1).add(1, 'day').format(ISO_DATE_FORMAT));

    const sluttdatoPeriode2 = Uttaksdagen.denne(startdatoPeriode2).getDatoAntallUttaksdagerSenere(
        antallUkerOgDagerFellesperiodeForSøker2.totaltAntallDager + antallDagerFedrekvote - 1,
    );

    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR && !erBarnetAdoptert(barnet)) {
        return {
            familiehendelsedato,
            startdatoPeriode1,
            sluttdatoPeriode1: dayjs(sluttdatoPeriode2).format(ISO_DATE_FORMAT),
            startdatoPeriode2: undefined,
            sluttdatoPeriode2: undefined,
        };
    }

    return {
        familiehendelsedato,
        startdatoPeriode1,
        startdatoPeriode2,
        sluttdatoPeriode1: dayjs(sluttdatoPeriode1).format(ISO_DATE_FORMAT),
        sluttdatoPeriode2: dayjs(sluttdatoPeriode2).format(ISO_DATE_FORMAT),
    };
};

const finnEnsligUttaksdata = (
    hvemPlanlegger: HvemPlanlegger,
    valgtStønadskvote: KontoBeregningDto,
    barnet: OmBarnetPlanlegger,
    hvemHarRett: HvemHarRett,
): Uttaksdata => {
    const familiehendelsedato = getFamiliehendelsedato(barnet);

    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR) {
        const aktivitetsfriDager = getAntallDagerAktivitetsfriKvote(valgtStønadskvote);
        const aktivitetskravUkerOgDager = getAntallUkerOgDagerForeldrepenger(valgtStønadskvote);
        const sluttAktivitetsfri = Uttaksdagen.denne(
            getUttaksdagTilOgMedDato(familiehendelsedato),
        ).getDatoAntallUttaksdagerSenere(aktivitetsfriDager + (erBarnetAdoptert(barnet) ? 0 : 6 * 5 - 1));

        const startdatoSøker1 = erBarnetAdoptert(barnet)
            ? dayjs(familiehendelsedato)
            : dayjs(familiehendelsedato).add(6, 'weeks');

        return {
            familiehendelsedato,
            startdatoPeriode1: getUttaksdagFraOgMedDato(startdatoSøker1.format(ISO_DATE_FORMAT)),
            sluttdatoPeriode1: getUttaksdagTilOgMedDato(dayjs(sluttAktivitetsfri).format(ISO_DATE_FORMAT)),
            startdatoPeriode2: getUttaksdagFraOgMedDato(
                dayjs(sluttAktivitetsfri).add(1, 'day').format(ISO_DATE_FORMAT),
            ),
            sluttdatoPeriode2: dayjs(
                Uttaksdagen.denne(sluttAktivitetsfri).getDatoAntallUttaksdagerSenere(
                    aktivitetskravUkerOgDager.totaltAntallDager,
                ),
            ).format(ISO_DATE_FORMAT),
        };
    }

    if (hvemHarRett === 'kunSøker2HarRett' && (erFarSøker2(hvemPlanlegger) || erMedmorDelAvSøknaden(hvemPlanlegger))) {
        const aktivitetsfriDager = getAntallDagerAktivitetsfriKvote(valgtStønadskvote);
        const aktivitetskravUkerOgDager = getAntallUkerOgDagerForeldrepenger(valgtStønadskvote);
        const sluttAktivitetsfri = Uttaksdagen.denne(
            getUttaksdagTilOgMedDato(familiehendelsedato),
        ).getDatoAntallUttaksdagerSenere(aktivitetsfriDager + (erBarnetAdoptert(barnet) ? 0 : 6 * 5 - 1));

        const startdatoSøker1 = erBarnetAdoptert(barnet)
            ? dayjs(familiehendelsedato)
            : dayjs(familiehendelsedato).add(6, 'weeks');

        return {
            familiehendelsedato,
            startdatoPeriode1: getUttaksdagFraOgMedDato(startdatoSøker1.format(ISO_DATE_FORMAT)),
            sluttdatoPeriode1: dayjs(sluttAktivitetsfri).format(ISO_DATE_FORMAT),
            startdatoPeriode2: getUttaksdagFraOgMedDato(
                dayjs(sluttAktivitetsfri).add(1, 'day').format(ISO_DATE_FORMAT),
            ),
            sluttdatoPeriode2: dayjs(
                Uttaksdagen.denne(sluttAktivitetsfri).getDatoAntallUttaksdagerSenere(
                    aktivitetskravUkerOgDager.totaltAntallDager,
                ),
            ).format(ISO_DATE_FORMAT),
        };
    }

    const aktivitetskravUkerOgDager = getAntallUkerOgDagerForeldrepenger(valgtStønadskvote);
    const dagerAktivitetsfriKvote = getAntallDagerAktivitetsfriKvote(valgtStønadskvote);
    const antallDagerForeldrepengerFørFødsel = getAntallDagerForeldrepengerFørFødsel(valgtStønadskvote);

    const startdatoSøker =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === HvemPlanleggerType.FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    const sluttdatoSøker = Uttaksdagen.denne(startdatoSøker).getDatoAntallUttaksdagerSenere(
        aktivitetskravUkerOgDager.totaltAntallDager + dagerAktivitetsfriKvote + antallDagerForeldrepengerFørFødsel - 1,
    );

    return {
        familiehendelsedato,
        startdatoPeriode1: startdatoSøker,
        sluttdatoPeriode1: dayjs(sluttdatoSøker).format(ISO_DATE_FORMAT),
        startdatoPeriode2: undefined,
        sluttdatoPeriode2: undefined,
    };
};

export const finnUttaksdata = (
    hvemHarRett: HvemHarRett,
    hvemPlanlegger: HvemPlanlegger,
    valgtStønadskvote: KontoBeregningDto,
    barnet: OmBarnetPlanlegger,
    antallDagerFellesperiodeSøker1?: number,
): Uttaksdata => {
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR && !erBarnetAdoptert(barnet)) {
        return finnEnsligUttaksdata(hvemPlanlegger, valgtStønadskvote, barnet, hvemHarRett);
    }

    return hvemHarRett === 'beggeHarRett'
        ? finnDeltUttaksdata(hvemPlanlegger, valgtStønadskvote, barnet, antallDagerFellesperiodeSøker1)
        : finnEnsligUttaksdata(hvemPlanlegger, valgtStønadskvote, barnet, hvemHarRett);
};
export type UttakUkerOgDager = {
    uker: number;
    dager: number;
};

export const finnAntallUkerOgDagerMedForeldrepenger = (stønadskvote: KontoBeregningDto): UttakUkerOgDager => {
    const { kontoer } = stønadskvote;
    return {
        uker: kontoer.reduce((prev: number, current: KontoDto) => {
            return Math.round(current.dager / 5) + prev;
        }, 0),
        dager: kontoer.reduce((prev: number, current: KontoDto, index: number) => {
            const result = current.dager + prev;

            if (index === kontoer.length - 1) {
                return result % 5;
            }

            return result;
        }, 0),
    };
};

interface LagForslagProps {
    erDeltUttak: boolean;
    famDato: string;
    tilgjengeligeStønadskvoter: KontoDto[];
    fellesperiodeDagerFørsteForelder: number | undefined;
    starterForelder?: 'MOR' | 'FAR_MEDMOR';
    erAdopsjon: boolean;
    erFarEllerMedmor: boolean;
    erMorUfør: boolean;
    bareFarMedmorHarRett: boolean;
    erAleneOmOmsorg: boolean;
    farOgFar: boolean;
    startdato?: string;
}

export const lagForslagTilPlan = ({
    erDeltUttak,
    famDato,
    tilgjengeligeStønadskvoter,
    fellesperiodeDagerFørsteForelder,
    starterForelder,
    erAdopsjon,
    erFarEllerMedmor,
    erMorUfør,
    bareFarMedmorHarRett,
    erAleneOmOmsorg,
    startdato,
    farOgFar,
}: LagForslagProps): PlanForslag => {
    if (erDeltUttak) {
        const perioder = deltUttak({
            famDato,
            tilgjengeligeStønadskvoter,
            fellesperiodeDagerFørsteForelder,
            starterForelder,
            startdato,
        });
        // søker1 = den valgte starteren (effektiv søker1), slik at splitten matcher effektiv-baserte navn og
        // fellesperiodedager i oppsummeringen. starterForelder styrer også genereringsrekkefølgen i deltUttak.
        const søker1Forelder = starterForelder ?? 'MOR';
        const søker2Forelder = søker1Forelder === 'MOR' ? 'FAR_MEDMOR' : 'MOR';
        return {
            søker1: perioder.filter((p) => p.forelder === søker1Forelder),
            søker2: perioder.filter((p) => p.forelder === søker2Forelder),
        };
    }

    const perioder = ikkeDeltUttak({
        situasjon: erAdopsjon ? 'adopsjon' : 'fødsel',
        famDato,
        erFarEllerMedmor,
        tilgjengeligeStønadskvoter,
        erMorUfør,
        bareFarMedmorHarRett,
        erAleneOmOmsorg,
        startdato,
        farOgFar,
    });
    return { søker1: perioder, søker2: [] };
};

export const getSøkersPerioder = (
    erDeltUttak: boolean,
    gjeldendeUttaksplan: UttakPeriode_fpoversikt[],
    erFarEllerMedmor: boolean,
    starterForelder?: 'MOR' | 'FAR_MEDMOR',
) => {
    const søkersForelder = starterForelder ?? (erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR');
    return erDeltUttak ? gjeldendeUttaksplan.filter((p) => p.forelder === søkersForelder) : gjeldendeUttaksplan;
};

export const getAnnenpartsPerioder = (
    erDeltUttak: boolean,
    gjeldendeUttaksplan: UttakPeriode_fpoversikt[],
    erFarEllerMedmor: boolean,
    starterForelder?: 'MOR' | 'FAR_MEDMOR',
) => {
    const søkersForelder = starterForelder ?? (erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR');
    const annenpartsForelder = søkersForelder === 'MOR' ? 'FAR_MEDMOR' : 'MOR';
    return erDeltUttak ? gjeldendeUttaksplan.filter((p) => p.forelder === annenpartsForelder) : [];
};
