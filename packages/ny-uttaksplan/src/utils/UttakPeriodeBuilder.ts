import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

dayjs.extend(utc);

type AlleUttakPerioder = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

export class UttakPeriodeBuilder {
    private alleUttakPerioder: AlleUttakPerioder[];
    private skalErstatteEksisterendePerioder: boolean = true;

    constructor(alleUttakPerioder: AlleUttakPerioder[]) {
        this.alleUttakPerioder = [...alleUttakPerioder].sort(sorterUttakPerioder);
    }

    medForskyvningAvEksisterendePerioder(): this {
        this.skalErstatteEksisterendePerioder = false;
        return this;
    }

    leggTilUttakPerioder(nyeUttakPerioder: AlleUttakPerioder[]): this {
        if (this.skalErstatteEksisterendePerioder) {
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
        } else {
            for (const nyUttakPeriode of nyeUttakPerioder) {
                this.alleUttakPerioder = forskyvEksisterendePerioder(this.alleUttakPerioder, nyUttakPeriode);
            }
        }

        this.alleUttakPerioder.sort(sorterUttakPerioder);

        return this;
    }

    fjernUttakPerioder(perioderSomSkalFjernes: Array<{ fom: string; tom: string }>): this {
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
                            tom: fromDay(justerSluttdato(nFom.subtract(1, 'day'))),
                        });
                    }

                    // Overlappende, behold del etter sletta periode
                    if (eTom.isAfter(nTom)) {
                        nyeUttakPerioder.push({
                            ...eksisterendePeriode,
                            fom: fromDay(justerStartdato(nTom.add(1, 'day'))),
                            tom: fromDay(eTom),
                        });
                    }
                } else {
                    // Ingen overlapp, behold eksisterande periode
                    nyeUttakPerioder.push(eksisterendePeriode);
                }
            }

            this.alleUttakPerioder = nyeUttakPerioder;
        }

        this.alleUttakPerioder.sort(sorterUttakPerioder);

        return this;
    }

    getUttakPerioder(): AlleUttakPerioder[] {
        return [...this.alleUttakPerioder];
    }
}

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
                    tom: fromDay(justerSluttdato(nFom.subtract(1, 'day'))),
                });
            }

            // Starter eksisterende periode etter overlappende ny periode
            if (eTom.isAfter(nTom)) {
                nyeUttakPerioder.push({
                    ...eksisterendeUttakPeriode,
                    fom: fromDay(justerStartdato(nTom.add(1, 'day'))),
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

        // Eksisterende periode ligg før ny periode
        if (eTom.isBefore(nFom)) {
            nyeUttakPerioder.push(eksisterendePeriode);
            continue;
        }

        // Eksisterende periode ligg etter ny periode eller ny periode begynner før og slutter inni
        if (eFom.isAfter(nFom) && nTom.isBefore(eTom)) {
            nyeUttakPerioder.push({
                ...eksisterendePeriode,
                fom: fromDay(leggTilUkedager(eFom, antallUkedager)),
                tom: fromDay(leggTilUkedager(eTom, antallUkedager)),
            });
            continue;
        }

        // Legg til evt del av eksistrande periode som ligg før den nye
        if (eFom.isBefore(nFom)) {
            nyeUttakPerioder.push({
                ...eksisterendePeriode,
                tom: fromDay(justerSluttdato(nFom.subtract(1, 'day'))),
            });
        }

        nyeUttakPerioder.push({
            ...eksisterendePeriode,
            fom: fromDay(justerStartdato(nTom.add(1, 'day'))),
            tom: fromDay(leggTilUkedager(eTom, antallUkedager)),
        });
    }

    nyeUttakPerioder.push(nyUttakPeriode);

    return nyeUttakPerioder.sort(sorterUttakPerioder);
};

const toDay = (iso: string): Dayjs => dayjs.utc(iso).startOf('day');

const fromDay = (day: Dayjs): string => day.format('YYYY-MM-DD');

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

const justerStartdato = (dato: dayjs.Dayjs): dayjs.Dayjs => {
    // Om dato er helgedag, endre til mandag
    if (dato.day() === 6) {
        return dato.add(2, 'day');
    }
    if (dato.day() === 0) {
        return dato.add(1, 'day');
    }
    return dato;
};

const justerSluttdato = (dato: dayjs.Dayjs): dayjs.Dayjs => {
    // Om dato er helgedag, endre til fredag
    if (dato.day() === 6) {
        return dato.subtract(1, 'day');
    }
    if (dato.day() === 0) {
        return dato.subtract(2, 'day');
    }
    return dato;
};

const leggTilUkedager = (startdato: Dayjs, antallDager: number): Dayjs => {
    let currentDato = startdato.clone();
    let dagerLagtTil = 0;

    while (dagerLagtTil < antallDager) {
        currentDato = currentDato.add(1, 'day');
        if (currentDato.day() !== 0 && currentDato.day() !== 6) {
            dagerLagtTil += 1;
        }
    }

    return currentDato;
};
