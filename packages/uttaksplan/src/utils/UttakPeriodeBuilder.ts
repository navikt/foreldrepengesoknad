import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { captureException } from '@navikt/fp-observability';
import { PeriodeDto_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { erPerioderEkslFomTomLike } from './periodeUtils';

dayjs.extend(utc);

type Builderkilde = 'liste' | 'kalender' | 'validator' | 'ukjent';

export class UttakPeriodeBuilder {
    private allePerioder: PeriodeDto_fpoversikt[];
    private readonly opprinneligPerioder: PeriodeDto_fpoversikt[];
    private readonly kilde: Builderkilde;
    private readonly operasjonsLogg: Array<{
        operasjon: string;
        nyePerioder?: PeriodeDto_fpoversikt[];
        perioderSomSkalFjernes?: Array<{ fom: string; tom: string }>;
        forskyvPerioder: boolean;
    }> = [];

    constructor(allePerioder: PeriodeDto_fpoversikt[], kilde: Builderkilde = 'ukjent') {
        this.allePerioder = [...allePerioder].sort(sorterPerioder);
        this.opprinneligPerioder = [...this.allePerioder];
        this.kilde = kilde;
    }

    /**
     * Ein ny periode dekker ALT som skal gjelde for tidsrommet sitt (søker, annenPart,
     * annenPartEøs kan settast samtidig for t.d. samtidig uttak). Det trengst difor ikkje
     * lenger nokon gruppering av fleire innkomande periodar med same fom/tom slik den flate
     * modellen krevde – kvar periode erstattar heile det overlappande tidsrommet sitt.
     */
    leggTilUttakPerioder(nyePerioder: PeriodeDto_fpoversikt[], forskyvPerioder: boolean): this {
        this.operasjonsLogg.push({ operasjon: 'leggTilUttakPerioder', nyePerioder, forskyvPerioder });

        for (const nyPeriode of nyePerioder) {
            this.allePerioder = forskyvPerioder
                ? forskyvEksisterendePerioder(this.allePerioder, nyPeriode)
                : erstattEksisterendePerioder(this.allePerioder, nyPeriode);
        }

        this.allePerioder.sort(sorterPerioder);

        return this;
    }

    fjernUttakPerioder(perioderSomSkalFjernes: Array<{ fom: string; tom: string }>, forskyvPerioder: boolean): this {
        this.operasjonsLogg.push({ operasjon: 'fjernUttakPerioder', perioderSomSkalFjernes, forskyvPerioder });
        if (forskyvPerioder) {
            for (const periodeSomSkalFjernes of perioderSomSkalFjernes) {
                this.allePerioder = fjernOgForskyvPerioderBakover(this.allePerioder, periodeSomSkalFjernes);
            }
        } else {
            for (const periodeSomSkalFjernes of perioderSomSkalFjernes) {
                const nFom = toDay(periodeSomSkalFjernes.fom);
                const nTom = toDay(periodeSomSkalFjernes.tom);

                const nyePerioder: PeriodeDto_fpoversikt[] = [];

                for (const eksisterendePeriode of this.allePerioder) {
                    const eFom = toDay(eksisterendePeriode.fom);
                    const eTom = toDay(eksisterendePeriode.tom);

                    if (erOverlappende(eFom, eTom, nFom, nTom)) {
                        // Ikkje legg til eksisterande periode om den er eksakt lik den som skal fjernes

                        // Overlappende, behold del før sletta periode
                        if (eFom.isBefore(nFom)) {
                            nyePerioder.push({
                                ...eksisterendePeriode,
                                tom: Uttaksdagen.forrige(periodeSomSkalFjernes.fom).getDato(),
                            });
                        }

                        // Overlappende, behold del etter sletta periode
                        if (eTom.isAfter(nTom)) {
                            nyePerioder.push({
                                ...eksisterendePeriode,
                                fom: Uttaksdagen.neste(periodeSomSkalFjernes.tom).getDato(),
                            });
                        }
                    } else {
                        // Ingen overlapp, behold eksisterande periode
                        nyePerioder.push(eksisterendePeriode);
                    }
                }

                this.allePerioder = nyePerioder;
            }
        }

        this.allePerioder.sort(sorterPerioder);

        return this;
    }

    getUttakPerioder(): PeriodeDto_fpoversikt[] {
        const resultat = slåSammenLikeTilstøtendePerioder(this.allePerioder);
        validerOgLoggOverlapp(resultat, this.opprinneligPerioder, this.operasjonsLogg, this.kilde);
        return resultat;
    }
}

const erOverlappendeIDato = (a: { fom: string; tom: string }, b: { fom: string; tom: string }): boolean =>
    dayjs(a.fom).isSameOrBefore(b.tom, 'day') && dayjs(b.fom).isSameOrBefore(a.tom, 'day');

/**
 * Med den nye periodemodellen dekker éin periode heile tidsrommet sitt (søker og annenPart
 * kan begge liggja på same periode ved samtidig uttak). To ULIKE periodar i lista skal difor
 * aldri overlappa i tid – gjer dei det, er det alltid ein feil i korleis planen er bygd opp.
 */
export const finnUgyldigeOverlapp = (
    perioder: PeriodeDto_fpoversikt[],
): Array<[PeriodeDto_fpoversikt, PeriodeDto_fpoversikt]> => {
    const ugyldigeOverlapp: Array<[PeriodeDto_fpoversikt, PeriodeDto_fpoversikt]> = [];
    for (let i = 0; i < perioder.length; i++) {
        for (let j = i + 1; j < perioder.length; j++) {
            const a = perioder[i]!;
            const b = perioder[j]!;
            if (erOverlappendeIDato(a, b)) {
                ugyldigeOverlapp.push([a, b]);
            }
        }
    }
    return ugyldigeOverlapp;
};

export const periodeTilLoggObjekt = (p: PeriodeDto_fpoversikt) => ({
    fom: p.fom,
    tom: p.tom,
    søker: p.søker && {
        forelder: p.søker.forelder,
        kontoType: p.søker.kontoType,
        utsettelseÅrsak: p.søker.utsettelseÅrsak,
        overføringÅrsak: p.søker.overføringÅrsak,
        samtidigUttak: p.søker.samtidigUttak,
    },
    annenPart: p.annenPart && {
        forelder: p.annenPart.forelder,
        kontoType: p.annenPart.kontoType,
        utsettelseÅrsak: p.annenPart.utsettelseÅrsak,
        overføringÅrsak: p.annenPart.overføringÅrsak,
        samtidigUttak: p.annenPart.samtidigUttak,
    },
    annenPartEøs: p.annenPartEøs && { kontoType: p.annenPartEøs.kontoType },
});

const validerOgLoggOverlapp = (
    resultat: PeriodeDto_fpoversikt[],
    opprinneligPerioder: PeriodeDto_fpoversikt[],
    operasjonsLogg: Array<{
        operasjon: string;
        nyePerioder?: PeriodeDto_fpoversikt[];
        perioderSomSkalFjernes?: Array<{ fom: string; tom: string }>;
        forskyvPerioder: boolean;
    }>,
    kilde: Builderkilde,
): void => {
    const ugyldigeOverlapp = finnUgyldigeOverlapp(resultat);

    if (ugyldigeOverlapp.length === 0) {
        return;
    }

    captureException(new Error('UttakPeriodeBuilder produserte ugyldig overlappende perioder'), {
        context: {
            feiltype: 'uttaksplan-builder-overlapp',
            builderKilde: kilde,
            antallUgyldigeOverlapp: ugyldigeOverlapp.length,
            ugyldigeOverlappPar: ugyldigeOverlapp.slice(0, 20).map(([a, b]) => ({
                a: periodeTilLoggObjekt(a),
                b: periodeTilLoggObjekt(b),
            })),
            opprinneligPerioder: opprinneligPerioder.map(periodeTilLoggObjekt),
            resultatPerioder: resultat.map(periodeTilLoggObjekt),
            operasjonsLogg: operasjonsLogg.map((op) => ({
                operasjon: op.operasjon,
                forskyvPerioder: op.forskyvPerioder,
                nyePerioder: op.nyePerioder?.map(periodeTilLoggObjekt),
                perioderSomSkalFjernes: op.perioderSomSkalFjernes,
            })),
        },
    });
};

const fjernOgForskyvPerioderBakover = (
    allePerioder: PeriodeDto_fpoversikt[],
    periodeSomSkalFjernes: { fom: string; tom: string },
): PeriodeDto_fpoversikt[] => {
    const nFom = toDay(periodeSomSkalFjernes.fom);
    const nTom = toDay(periodeSomSkalFjernes.tom);
    const antallUkedager = finnLengdeIUkedager(nFom, nTom);

    const nyePerioder: PeriodeDto_fpoversikt[] = [];

    for (const eksisterendePeriode of allePerioder) {
        const eFom = toDay(eksisterendePeriode.fom);
        const eTom = toDay(eksisterendePeriode.tom);

        // Overlappende periode
        if (erOverlappende(eFom, eTom, nFom, nTom)) {
            // Del før slettet periode
            if (eFom.isBefore(nFom)) {
                nyePerioder.push({
                    ...eksisterendePeriode,
                    tom: Uttaksdagen.forrige(periodeSomSkalFjernes.fom).getDato(),
                });
            }

            // Del etter slettet periode
            if (eTom.isAfter(nTom)) {
                const nyFom = Uttaksdagen.neste(periodeSomSkalFjernes.tom).getDatoAntallUttaksdagerTidligere(
                    antallUkedager,
                );

                const nyTom = Uttaksdagen.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerTidligere(
                    antallUkedager,
                );

                nyePerioder.push({
                    ...eksisterendePeriode,
                    fom: nyFom,
                    tom: nyTom,
                });
            }

            continue;
        }

        // Periode helt etter slettet periode
        if (eFom.isAfter(nTom)) {
            nyePerioder.push({
                ...eksisterendePeriode,
                fom: Uttaksdagen.denne(eksisterendePeriode.fom).getDatoAntallUttaksdagerTidligere(antallUkedager),
                tom: Uttaksdagen.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerTidligere(antallUkedager),
            });
            continue;
        }

        // Periode før slettet periode -> behold uendret
        nyePerioder.push(eksisterendePeriode);
    }

    return nyePerioder.sort(sorterPerioder);
};

const erstattEksisterendePerioder = (
    eksisterendePerioder: PeriodeDto_fpoversikt[],
    nyPeriode: PeriodeDto_fpoversikt,
): PeriodeDto_fpoversikt[] => {
    const nFom = toDay(nyPeriode.fom);
    const nTom = toDay(nyPeriode.tom);

    const nyePerioder: PeriodeDto_fpoversikt[] = [];

    for (const eksisterendePeriode of eksisterendePerioder) {
        const eFom = toDay(eksisterendePeriode.fom);
        const eTom = toDay(eksisterendePeriode.tom);

        if (erOverlappende(eFom, eTom, nFom, nTom)) {
            // Starter eksisterende periode før overlappende ny periode
            if (eFom.isBefore(nFom)) {
                nyePerioder.push({
                    ...eksisterendePeriode,
                    tom: Uttaksdagen.forrige(nyPeriode.fom).getDato(),
                });
            }

            // Starter eksisterende periode etter overlappende ny periode
            if (eTom.isAfter(nTom)) {
                nyePerioder.push({
                    ...eksisterendePeriode,
                    fom: Uttaksdagen.neste(nyPeriode.tom).getDato(),
                });
            }
        } else {
            nyePerioder.push(eksisterendePeriode);
        }
    }

    nyePerioder.push(nyPeriode);

    return nyePerioder;
};

const forskyvEksisterendePerioder = (
    eksisterendePerioder: PeriodeDto_fpoversikt[],
    nyPeriode: PeriodeDto_fpoversikt,
): PeriodeDto_fpoversikt[] => {
    const nFom = toDay(nyPeriode.fom);
    const nTom = toDay(nyPeriode.tom);
    const antallUkedager = finnLengdeIUkedager(nFom, nTom);

    const nyePerioder: PeriodeDto_fpoversikt[] = [];

    for (const eksisterendePeriode of eksisterendePerioder) {
        const eFom = toDay(eksisterendePeriode.fom);
        const eTom = toDay(eksisterendePeriode.tom);

        // Eksisterende periode ligg før ny periode => Ta vare på hele perioden
        if (eTom.isBefore(nFom)) {
            nyePerioder.push(eksisterendePeriode);
            continue;
        }

        const nyPeriodeStarterFørOgSlutterFørEksisterende = eFom.isAfter(nFom) && nTom.isBefore(eTom);
        const nyPeriodeStarterSamtidigOgSlutterEtterEksisterende = nFom.isSame(eFom) && nTom.isAfter(eTom);
        // Eksisterande periode ligg heilt inni den nye => flytt heile perioden framover
        const eksisterendeErHeltInniNy =
            (eFom.isAfter(nFom) || eFom.isSame(nFom)) && (eTom.isBefore(nTom) || eTom.isSame(nTom));
        if (
            nyPeriodeStarterFørOgSlutterFørEksisterende ||
            nyPeriodeStarterSamtidigOgSlutterEtterEksisterende ||
            eksisterendeErHeltInniNy
        ) {
            nyePerioder.push({
                ...eksisterendePeriode,
                fom: Uttaksdagen.denne(eksisterendePeriode.fom).getDatoAntallUttaksdagerSenere(antallUkedager),
                tom: Uttaksdagen.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerSenere(antallUkedager),
            });
            continue;
        }

        // Legg til evt del av eksistrande periode som ligg før den nye
        if (eFom.isBefore(nFom)) {
            nyePerioder.push({
                ...eksisterendePeriode,
                tom: Uttaksdagen.forrige(nyPeriode.fom).getDato(),
            });
        }

        nyePerioder.push({
            ...eksisterendePeriode,
            fom: Uttaksdagen.neste(nyPeriode.tom).getDato(),
            tom: Uttaksdagen.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerSenere(antallUkedager),
        });
    }

    nyePerioder.push(nyPeriode);

    return nyePerioder.sort(sorterPerioder);
};

const slåSammenLikeTilstøtendePerioder = (sortertePerioder: PeriodeDto_fpoversikt[]): PeriodeDto_fpoversikt[] => {
    if (sortertePerioder.length === 0) {
        return [];
    }

    return sortertePerioder.reduce<PeriodeDto_fpoversikt[]>((acc, periode) => {
        if (acc.length === 0) {
            return acc.concat(periode);
        }

        const forrigePeriode = acc.at(-1)!;

        const erTilstøtende = dayjs(Uttaksdagen.neste(forrigePeriode.tom).getDato()).isSame(dayjs(periode.fom), 'day');

        if (erTilstøtende && erPerioderEkslFomTomLike(forrigePeriode, periode)) {
            return [
                ...acc.slice(0, -1),
                {
                    ...forrigePeriode,
                    tom: periode.tom,
                },
            ];
        }

        return acc.concat(periode);
    }, []);
};

const toDay = (iso: string): Dayjs => dayjs.utc(iso).startOf('day');

const erOverlappende = (aFom: Dayjs, aTom: Dayjs, bFom: Dayjs, bTom: Dayjs): boolean =>
    aFom.isSameOrBefore(bTom) && bFom.isSameOrBefore(aTom);

const finnLengdeIUkedager = (fom: Dayjs, tom: Dayjs): number => {
    let count = 0;
    let d = fom;
    while (!d.isAfter(tom)) {
        if (d.day() !== 6 && d.day() !== 0) {
            count++;
        }
        d = d.add(1, 'day');
    }
    return count;
};

const sorterPerioder = (a: PeriodeDto_fpoversikt, b: PeriodeDto_fpoversikt): number => {
    const aFom = toDay(a.fom);
    const bFom = toDay(b.fom);

    if (aFom.isBefore(bFom)) {
        return -1;
    }
    if (aFom.isAfter(bFom)) {
        return 1;
    }
    return 0;
};
