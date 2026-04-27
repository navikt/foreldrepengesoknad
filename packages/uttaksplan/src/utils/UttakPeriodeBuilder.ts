import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { captureMessage, withScope } from '@navikt/fp-observability';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { erPerioderEkslFomTomLike } from './periodeUtils';

dayjs.extend(utc);

type AlleUttakPerioder = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

type Builderkilde = 'liste' | 'kalender' | 'validator' | 'ukjent';

export class UttakPeriodeBuilder {
    private alleUttakPerioder: AlleUttakPerioder[];
    private readonly opprinneligPerioder: AlleUttakPerioder[];
    private readonly kilde: Builderkilde;
    private readonly operasjonsLogg: Array<{
        operasjon: string;
        nyePerioder?: AlleUttakPerioder[];
        perioderSomSkalFjernes?: Array<{ fom: string; tom: string }>;
        forskyvPerioder: boolean;
    }> = [];

    constructor(alleUttakPerioder: AlleUttakPerioder[], kilde: Builderkilde = 'ukjent') {
        this.alleUttakPerioder = [...alleUttakPerioder].sort(sorterUttakPerioder);
        this.opprinneligPerioder = [...this.alleUttakPerioder];
        this.kilde = kilde;
    }

    leggTilUttakPerioder(nyeUttakPerioder: AlleUttakPerioder[], forskyvPerioder: boolean): this {
        this.operasjonsLogg.push({ operasjon: 'leggTilUttakPerioder', nyePerioder: nyeUttakPerioder, forskyvPerioder });
        // Grupper for å håndtera at ein legg til to periodar når ein har samtidig uttak.
        // Bruk ein av dei nye periodane for å justera andre periodar, og legg så til den andre på slutten
        const grupperPerFomTom = new Map<string, AlleUttakPerioder[]>();

        for (const periode of nyeUttakPerioder) {
            const key = `${periode.fom}-${periode.tom}`;
            const eksisterende = grupperPerFomTom.get(key);
            if (eksisterende) {
                eksisterende.push(periode);
            } else {
                grupperPerFomTom.set(key, [periode]);
            }
        }

        if (forskyvPerioder) {
            for (const [, gruppe] of grupperPerFomTom) {
                this.alleUttakPerioder = forskyvEksisterendePerioder(this.alleUttakPerioder, gruppe[0]!);

                for (let i = 1; i < gruppe.length; i++) {
                    this.alleUttakPerioder.push(gruppe[i]!);
                }
            }
        } else {
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
        this.operasjonsLogg.push({ operasjon: 'fjernUttakPerioder', perioderSomSkalFjernes, forskyvPerioder });
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
                                tom: Uttaksdagen.forrige(periodeSomSkalFjernes.fom).getDato(),
                            });
                        }

                        // Overlappende, behold del etter sletta periode
                        if (eTom.isAfter(nTom)) {
                            nyeUttakPerioder.push({
                                ...eksisterendePeriode,
                                fom: Uttaksdagen.neste(periodeSomSkalFjernes.tom).getDato(),
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
        const resultat = slåSammenLikeTilstøtendePerioder(this.alleUttakPerioder);
        validerOgLoggOverlapp(resultat, this.opprinneligPerioder, this.operasjonsLogg, this.kilde);
        return resultat;
    }
}

const erOverlappendeIDato = (a: { fom: string; tom: string }, b: { fom: string; tom: string }): boolean =>
    dayjs(a.fom).isSameOrBefore(b.tom, 'day') && dayjs(b.fom).isSameOrBefore(a.tom, 'day');

const erEøsPeriode = (p: AlleUttakPerioder): p is UttakPeriodeAnnenpartEøs_fpoversikt => 'trekkdager' in p;

export const finnUgyldigeOverlapp = (perioder: AlleUttakPerioder[]): Array<[AlleUttakPerioder, AlleUttakPerioder]> => {
    const ugyldigeOverlapp: Array<[AlleUttakPerioder, AlleUttakPerioder]> = [];
    for (let i = 0; i < perioder.length; i++) {
        for (let j = i + 1; j < perioder.length; j++) {
            const a = perioder[i]!;
            const b = perioder[j]!;
            if (erOverlappendeIDato(a, b) && !erGyldigSamtidigUttak(a, b)) {
                ugyldigeOverlapp.push([a, b]);
            }
        }
    }
    return ugyldigeOverlapp;
};

export const periodeTilLoggObjekt = (p: AlleUttakPerioder) => {
    if (erEøsPeriode(p)) {
        return { fom: p.fom, tom: p.tom, eøs: true, kontoType: p.kontoType };
    }
    return {
        fom: p.fom,
        tom: p.tom,
        forelder: p.forelder,
        kontoType: p.kontoType,
        utsettelseÅrsak: p.utsettelseÅrsak,
        oppholdÅrsak: p.oppholdÅrsak,
        overføringÅrsak: p.overføringÅrsak,
        samtidigUttak: p.samtidigUttak,
    };
};

const erGyldigSamtidigUttak = (a: AlleUttakPerioder, b: AlleUttakPerioder): boolean => {
    if (erEøsPeriode(a) || erEøsPeriode(b)) {
        // EØS-periodar er annen-part og kan eksistere parallelt med søkers periodar
        return true;
    }
    return (
        a.utsettelseÅrsak === undefined &&
        b.utsettelseÅrsak === undefined &&
        a.oppholdÅrsak === undefined &&
        b.oppholdÅrsak === undefined &&
        a.samtidigUttak !== undefined &&
        b.samtidigUttak !== undefined &&
        a.forelder !== b.forelder
    );
};

const validerOgLoggOverlapp = (
    resultat: AlleUttakPerioder[],
    opprinneligPerioder: AlleUttakPerioder[],
    operasjonsLogg: Array<{
        operasjon: string;
        nyePerioder?: AlleUttakPerioder[];
        perioderSomSkalFjernes?: Array<{ fom: string; tom: string }>;
        forskyvPerioder: boolean;
    }>,
    kilde: Builderkilde,
): void => {
    const ugyldigeOverlapp = finnUgyldigeOverlapp(resultat);

    if (ugyldigeOverlapp.length === 0) {
        return;
    }

    withScope((scope) => {
        scope.setLevel('warning');
        scope.setTag('feiltype', 'uttaksplan-builder-overlapp');
        scope.setTag('builderKilde', kilde);
        scope.setExtra('builderKilde', kilde);
        scope.setExtra('antallUgyldigeOverlapp', ugyldigeOverlapp.length);
        scope.setExtra(
            'ugyldigeOverlappPar',
            ugyldigeOverlapp.slice(0, 20).map(([a, b]) => ({
                a: periodeTilLoggObjekt(a),
                b: periodeTilLoggObjekt(b),
            })),
        );
        scope.setExtra('opprinneligPerioder', opprinneligPerioder.map(periodeTilLoggObjekt));
        scope.setExtra('resultatPerioder', resultat.map(periodeTilLoggObjekt));
        scope.setExtra(
            'operasjonsLogg',
            operasjonsLogg.map((op) => ({
                operasjon: op.operasjon,
                forskyvPerioder: op.forskyvPerioder,
                nyePerioder: op.nyePerioder?.map(periodeTilLoggObjekt),
                perioderSomSkalFjernes: op.perioderSomSkalFjernes,
            })),
        );
        captureMessage('UttakPeriodeBuilder produserte ugyldig overlappende perioder', 'warning');
    });
};

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
                fom: Uttaksdagen.denne(eksisterendePeriode.fom).getDatoAntallUttaksdagerTidligere(antallUkedager),
                tom: Uttaksdagen.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerTidligere(antallUkedager),
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
                    tom: Uttaksdagen.forrige(nyUttakPeriode.fom).getDato(),
                });
            }

            // Starter eksisterende periode etter overlappende ny periode
            if (eTom.isAfter(nTom)) {
                nyeUttakPerioder.push({
                    ...eksisterendeUttakPeriode,
                    fom: Uttaksdagen.neste(nyUttakPeriode.tom).getDato(),
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
                fom: Uttaksdagen.denne(eksisterendePeriode.fom).getDatoAntallUttaksdagerSenere(antallUkedager),
                tom: Uttaksdagen.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerSenere(antallUkedager),
            });
            continue;
        }

        // Legg til evt del av eksistrande periode som ligg før den nye
        if (eFom.isBefore(nFom)) {
            nyeUttakPerioder.push({
                ...eksisterendePeriode,
                tom: Uttaksdagen.forrige(nyUttakPeriode.fom).getDato(),
            });
        }

        nyeUttakPerioder.push({
            ...eksisterendePeriode,
            fom: Uttaksdagen.neste(nyUttakPeriode.tom).getDato(),
            tom: Uttaksdagen.denne(eksisterendePeriode.tom).getDatoAntallUttaksdagerSenere(antallUkedager),
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
