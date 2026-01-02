import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

dayjs.extend(utc);

type Saksperiode = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

export class SaksperiodeBuilder {
    private saksperioder: Saksperiode[];
    private skalErstatteEksisterendePerioder: boolean = true;

    constructor(saksperioder: Saksperiode[]) {
        this.saksperioder = [...saksperioder].sort(sorterSaksperioder);
    }

    medForskyvningAvEksisterendePerioder(): SaksperiodeBuilder {
        this.skalErstatteEksisterendePerioder = false;
        return this;
    }

    leggTilSaksperioder(nyeSaksperioder: Saksperiode[]): SaksperiodeBuilder {
        if (this.skalErstatteEksisterendePerioder) {
            // Grupper for å håndtera at ein legg til to periodar når ein har samtidig uttak.
            // Bruk ein av dei nye periodane for å justera andre periodar, og legg så til den andre på slutten
            const grupperPerFomTom = new Map<string, Saksperiode[]>();

            for (const periode of nyeSaksperioder) {
                const key = `${periode.fom}-${periode.tom}`;
                grupperPerFomTom.set(key, [...(grupperPerFomTom.get(key) ?? []), periode]);
            }

            for (const [, gruppe] of grupperPerFomTom) {
                this.saksperioder = erstattEksisterendeSaksperioder(this.saksperioder, gruppe[0]!);

                for (let i = 1; i < gruppe.length; i++) {
                    this.saksperioder.push(gruppe[i]!);
                }
            }
        } else {
            for (const nySaksperiode of nyeSaksperioder) {
                this.saksperioder = forskyvEksisterendePerioder(this.saksperioder, nySaksperiode);
            }
        }

        this.saksperioder.sort(sorterSaksperioder);

        return this;
    }

    fjernSaksperioder(saksperioderSomSkalFjernes: Saksperiode[]): SaksperiodeBuilder {
        for (const saksperiodeSomSkalFjernes of saksperioderSomSkalFjernes) {
            const nFom = toDay(saksperiodeSomSkalFjernes.fom);
            const nTom = toDay(saksperiodeSomSkalFjernes.tom);

            const nyeSaksperioder: Saksperiode[] = [];

            for (const eksisterendePeriode of this.saksperioder) {
                const eFom = toDay(eksisterendePeriode.fom);
                const eTom = toDay(eksisterendePeriode.tom);

                if (erOverlappende(eFom, eTom, nFom, nTom)) {
                    // Ikkje legg til eksisterande periode om den er eksakt lik den som skal fjernes

                    // Overlappende, behold del før sletta periode
                    if (eFom.isBefore(nFom)) {
                        nyeSaksperioder.push({
                            ...eksisterendePeriode,
                            tom: fromDay(justerSluttdato(nFom.subtract(1, 'day'))),
                        });
                    }

                    // Overlappende, behold del etter sletta periode
                    if (eTom.isAfter(nTom)) {
                        nyeSaksperioder.push({
                            ...eksisterendePeriode,
                            fom: fromDay(justerStartdato(nTom.add(1, 'day'))),
                            tom: fromDay(eTom),
                        });
                    }
                } else {
                    // Ingen overlapp, behold eksisterande periode
                    nyeSaksperioder.push(eksisterendePeriode);
                }
            }

            this.saksperioder = nyeSaksperioder.sort(sorterSaksperioder);
        }

        return this;
    }

    getSaksperioder(): Saksperiode[] {
        return [...this.saksperioder];
    }
}

const erstattEksisterendeSaksperioder = (
    eksisterendeSaksperioder: Saksperiode[],
    nySaksperiode: Saksperiode,
): Saksperiode[] => {
    const nFom = toDay(nySaksperiode.fom);
    const nTom = toDay(nySaksperiode.tom);

    const nyeSaksperioder: Saksperiode[] = [];

    for (const eksisterendeSaksperiode of eksisterendeSaksperioder) {
        const eFom = toDay(eksisterendeSaksperiode.fom);
        const eTom = toDay(eksisterendeSaksperiode.tom);

        if (erOverlappende(eFom, eTom, nFom, nTom)) {
            // Starter eksisterende periode før overlappende ny periode
            if (eFom.isBefore(nFom)) {
                nyeSaksperioder.push({
                    ...eksisterendeSaksperiode,
                    tom: fromDay(justerSluttdato(nFom.subtract(1, 'day'))),
                });
            }

            // Starter eksisterende periode etter overlappende ny periode
            if (eTom.isAfter(nTom)) {
                nyeSaksperioder.push({
                    ...eksisterendeSaksperiode,
                    fom: fromDay(justerStartdato(nTom.add(1, 'day'))),
                });
            }
        } else {
            nyeSaksperioder.push(eksisterendeSaksperiode);
        }
    }

    nyeSaksperioder.push(nySaksperiode);

    return nyeSaksperioder;
};

const forskyvEksisterendePerioder = (
    eksisterendePerioder: Saksperiode[],
    nySaksperiode: Saksperiode,
): Saksperiode[] => {
    const nFom = toDay(nySaksperiode.fom);
    const nTom = toDay(nySaksperiode.tom);
    const antallUkedager = finnLengdeIUkedager(nFom, nTom);

    const nyeSaksperioder: Saksperiode[] = [];

    for (const eksisterendePeriode of eksisterendePerioder) {
        const eFom = toDay(eksisterendePeriode.fom);
        const eTom = toDay(eksisterendePeriode.tom);

        // Eksisterende periode ligg før ny periode
        if (eTom.isBefore(nFom)) {
            nyeSaksperioder.push(eksisterendePeriode);
            continue;
        }

        // Eksisterende periode ligg etter ny periode eller ny periode begynner før og slutter inni
        if (eFom.isAfter(nFom) && nTom.isBefore(eTom)) {
            nyeSaksperioder.push({
                ...eksisterendePeriode,
                fom: fromDay(leggTilUkedager(eFom, antallUkedager)),
                tom: fromDay(leggTilUkedager(eTom, antallUkedager)),
            });
            continue;
        }

        // Legg til evt del av eksistrande periode som ligg før den nye
        if (eFom.isBefore(nFom)) {
            nyeSaksperioder.push({
                ...eksisterendePeriode,
                tom: fromDay(justerSluttdato(nFom.subtract(1, 'day'))),
            });
        }

        nyeSaksperioder.push({
            ...eksisterendePeriode,
            fom: fromDay(justerStartdato(nTom.add(1, 'day'))),
            tom: fromDay(leggTilUkedager(eTom, antallUkedager)),
        });
    }

    nyeSaksperioder.push(nySaksperiode);

    return nyeSaksperioder.sort(sorterSaksperioder);
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

const sorterSaksperioder = (a: Saksperiode, b: Saksperiode): number => {
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
