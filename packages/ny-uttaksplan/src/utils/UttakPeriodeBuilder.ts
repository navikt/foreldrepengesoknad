import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';

import { erPerioderEkslFomTomLike } from './periodeUtils';

dayjs.extend(utc);

type AlleUttakPerioder = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

export class UttakPeriodeBuilder {
    private alleUttakPerioder: AlleUttakPerioder[];

    constructor(alleUttakPerioder: AlleUttakPerioder[]) {
        this.alleUttakPerioder = [...alleUttakPerioder].sort(sorterUttakPerioder);
    }

    leggTilUttakPerioder(nyeUttakPerioder: AlleUttakPerioder[], forskyvPerioder: boolean): this {
        if (forskyvPerioder) {
            for (const nyUttakPeriode of nyeUttakPerioder) {
                this.alleUttakPerioder = forskyvEksisterendePerioder(this.alleUttakPerioder, nyUttakPeriode);
            }
        } else {
            // Grupper for å håndtera at ein legg til to periodar når ein har samtidig uttak.
            // Bruk ein av dei nye periodane for å justera andre periodar, og legg så til den andre på slutten
            const grupperPerFomTom = new Map<string, AlleUttakPerioder[]>();

            for (const periode of nyeUttakPerioder) {
                const key = `${periode.fom}-${periode.tom}`;
                grupperPerFomTom.set(key, [...(grupperPerFomTom.get(key) ?? []), periode]);
            }

            for (const [, gruppe] of grupperPerFomTom) {
                this.alleUttakPerioder = erstattEksisterendeUttakPerioder(this.alleUttakPerioder, gruppe[0]!);

                for (let i = 1; i < gruppe.length; i++) {
                    this.alleUttakPerioder.push(gruppe[i]!);
                }
            }
        }

        this.alleUttakPerioder.sort(sorterUttakPerioder);

        return this;
    }

    fjernUttakPerioder(perioderSomSkalFjernes: Array<{ fom: string; tom: string }>, forskyvPerioder: boolean): this {
        if (forskyvPerioder) {
            for (const periodeSomSkalFjernes of perioderSomSkalFjernes) {
                this.alleUttakPerioder = fjernOgForskyvUttakPerioderBakover(
                    this.alleUttakPerioder,
                    periodeSomSkalFjernes,
                );
            }
        } else {
            for (const periodeSomSkalFjernes of perioderSomSkalFjernes) {
                const nFom = toDay(periodeSomSkalFjernes.fom);
                const nTom = toDay(periodeSomSkalFjernes.tom);

                const nyeUttakPerioder: AlleUttakPerioder[] = [];

                for (const eksisterendePeriode of this.alleUttakPerioder) {
                    const eFom = toDay(eksisterendePeriode.fom);
                    const eTom = toDay(eksisterendePeriode.tom);

                    if (erOverlappende(eFom, eTom, nFom, nTom)) {
                        // Ikkje legg til eksisterande periode om den er eksakt lik den som skal fjernes

                        // Overlappende, behold del før sletta periode
                        if (eFom.isBefore(nFom)) {
                            nyeUttakPerioder.push({
                                ...eksisterendePeriode,
                                tom: UttaksdagenString.forrige(periodeSomSkalFjernes.fom).getDato(),
                            });
                        }

                        // Overlappende, behold del etter sletta periode
                        if (eTom.isAfter(nTom)) {
                            nyeUttakPerioder.push({
                                ...eksisterendePeriode,
                                fom: UttaksdagenString.neste(periodeSomSkalFjernes.tom).getDato(),
                                tom: eksisterendePeriode.tom,
                            });
                        }
                    } else {
                        // Ingen overlapp, behold eksisterande periode
                        nyeUttakPerioder.push(eksisterendePeriode);
                    }
                }

                this.alleUttakPerioder = nyeUttakPerioder;
            }
        }

        this.alleUttakPerioder.sort(sorterUttakPerioder);

        return this;
    }

    getUttakPerioder(): AlleUttakPerioder[] {
        return slåSammenLikeTilstøtendePerioder(this.alleUttakPerioder);
    }
}

const fjernOgForskyvUttakPerioderBakover = (
    alleUttakPerioder: AlleUttakPerioder[],
    periodeSomSkalFjernes: { fom: string; tom: string },
): AlleUttakPerioder[] => {
    const nFom = toDay(periodeSomSkalFjernes.fom);
    const nTom = toDay(periodeSomSkalFjernes.tom);
    const antallUkedager = finnLengdeIUkedager(nFom, nTom);

    const nyeUttakPerioder: AlleUttakPerioder[] = [];

    for (const eksisterendePeriode of alleUttakPerioder) {
        const eFom = toDay(eksisterendePeriode.fom);
        const eTom = toDay(eksisterendePeriode.tom);

        // Overlappende periode
        if (erOverlappende(eFom, eTom, nFom, nTom)) {
            // Del før slettet periode
            if (eFom.isBefore(nFom)) {
                nyeUttakPerioder.push({
                    ...eksisterendePeriode,
                    tom: UttaksdagenString.forrige(periodeSomSkalFjernes.fom).getDato(),
                });
            }

            // Del etter slettet periode
            if (eTom.isAfter(nTom)) {
                const nyFom = UttaksdagenString.neste(periodeSomSkalFjernes.tom).getDatoAntallUttaksdagerTidligere(
                    antallUkedager,
                );

                const nyTom = UttaksdagenString.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerTidligere(
                    antallUkedager,
                );

                nyeUttakPerioder.push({
                    ...eksisterendePeriode,
                    fom: nyFom,
                    tom: nyTom,
                });
            }

            continue;
        }

        // Periode helt etter slettet periode
        if (eFom.isAfter(nTom)) {
            nyeUttakPerioder.push({
                ...eksisterendePeriode,
                fom: UttaksdagenString.denne(eksisterendePeriode.fom).getDatoAntallUttaksdagerTidligere(antallUkedager),
                tom: UttaksdagenString.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerTidligere(antallUkedager),
            });
            continue;
        }

        // Periode før slettet periode -> behold uendret
        nyeUttakPerioder.push(eksisterendePeriode);
    }

    return nyeUttakPerioder.sort(sorterUttakPerioder);
};

const erstattEksisterendeUttakPerioder = (
    eksisterendeUttakPerioder: AlleUttakPerioder[],
    nyUttakPeriode: AlleUttakPerioder,
): AlleUttakPerioder[] => {
    const nFom = toDay(nyUttakPeriode.fom);
    const nTom = toDay(nyUttakPeriode.tom);

    const nyeUttakPerioder: AlleUttakPerioder[] = [];

    for (const eksisterendeUttakPeriode of eksisterendeUttakPerioder) {
        const eFom = toDay(eksisterendeUttakPeriode.fom);
        const eTom = toDay(eksisterendeUttakPeriode.tom);

        if (erOverlappende(eFom, eTom, nFom, nTom)) {
            // Starter eksisterende periode før overlappende ny periode
            if (eFom.isBefore(nFom)) {
                nyeUttakPerioder.push({
                    ...eksisterendeUttakPeriode,
                    tom: UttaksdagenString.forrige(nyUttakPeriode.fom).getDato(),
                });
            }

            // Starter eksisterende periode etter overlappende ny periode
            if (eTom.isAfter(nTom)) {
                nyeUttakPerioder.push({
                    ...eksisterendeUttakPeriode,
                    fom: UttaksdagenString.neste(nyUttakPeriode.tom).getDato(),
                });
            }
        } else {
            nyeUttakPerioder.push(eksisterendeUttakPeriode);
        }
    }

    nyeUttakPerioder.push(nyUttakPeriode);

    return nyeUttakPerioder;
};

const forskyvEksisterendePerioder = (
    eksisterendePerioder: AlleUttakPerioder[],
    nyUttakPeriode: AlleUttakPerioder,
): AlleUttakPerioder[] => {
    const nFom = toDay(nyUttakPeriode.fom);
    const nTom = toDay(nyUttakPeriode.tom);
    const antallUkedager = finnLengdeIUkedager(nFom, nTom);

    const nyeUttakPerioder: AlleUttakPerioder[] = [];

    for (const eksisterendePeriode of eksisterendePerioder) {
        const eFom = toDay(eksisterendePeriode.fom);
        const eTom = toDay(eksisterendePeriode.tom);

        // Eksisterende periode ligg før ny periode => Ta vare på hele perioden
        if (eTom.isBefore(nFom)) {
            nyeUttakPerioder.push(eksisterendePeriode);
            continue;
        }

        const nyPeriodeStarterFørOgSlutterFørEksisterende = eFom.isAfter(nFom) && nTom.isBefore(eTom);
        const nyPeriodeStarterSamtidigOgSlutterEtterEksisterende = nFom.isSame(eFom) && nTom.isAfter(eTom);
        if (nyPeriodeStarterFørOgSlutterFørEksisterende || nyPeriodeStarterSamtidigOgSlutterEtterEksisterende) {
            nyeUttakPerioder.push({
                ...eksisterendePeriode,
                fom: UttaksdagenString.denne(eksisterendePeriode.fom).getDatoAntallUttaksdagerSenere(antallUkedager),
                tom: UttaksdagenString.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerSenere(antallUkedager),
            });
            continue;
        }

        // Legg til evt del av eksistrande periode som ligg før den nye
        if (eFom.isBefore(nFom)) {
            nyeUttakPerioder.push({
                ...eksisterendePeriode,
                tom: UttaksdagenString.forrige(nyUttakPeriode.fom).getDato(),
            });
        }

        nyeUttakPerioder.push({
            ...eksisterendePeriode,
            fom: UttaksdagenString.neste(nyUttakPeriode.tom).getDato(),
            tom: UttaksdagenString.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerSenere(antallUkedager),
        });
    }

    nyeUttakPerioder.push(nyUttakPeriode);

    return nyeUttakPerioder.sort(sorterUttakPerioder);
};

const slåSammenLikeTilstøtendePerioder = (sortertePerioder: AlleUttakPerioder[]): AlleUttakPerioder[] => {
    if (sortertePerioder.length === 0) {
        return [];
    }

    return sortertePerioder.reduce<AlleUttakPerioder[]>((acc, periode) => {
        if (acc.length === 0) {
            return acc.concat(periode);
        }

        const forrigePeriode = acc.at(-1)!;

        const erTilstøtende = dayjs(forrigePeriode.tom).add(1, 'day').isSame(dayjs(periode.fom), 'day');

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

const sorterUttakPerioder = (a: AlleUttakPerioder, b: AlleUttakPerioder): number => {
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
