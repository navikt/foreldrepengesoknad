import { isBefore, isSameDay, addDays } from 'date-fns';
import { guid } from 'nav-frontend-js-utils';
import {
    Oppholdsperiode,
    Periodetype,
    OppholdÅrsakType,
    Uttaksperiode,
    Utsettelsesperiode,
    Periode
} from 'uttaksplan/types';
import {
    tidsperiodeUtil,
    sorterPerioder,
    uttaksdagUtil,
    perioderUtil,
    periodeUtil,
    getTidsperiode
} from 'uttaksplan/utils/dataUtils';

export const Uttaksplan = (perioder: Periode[]) => {
    return new UttaksplanBuilder(perioder);
};

/**
 * Holder kontroll på uttaksperioder, utsettelser og opphold
 */
class UttaksplanBuilder {
    public constructor(public perioder: Periode[]) {
        this.perioder = perioder;
    }

    /**
     * Legger til @periode og oppdaterer uttaksplanen
     * @param periode
     */
    leggTilPeriode(periode: Periode) {
        this.perioder = [
            ...this.perioder,
            {
                ...periode,
                id: guid()
            }
        ];
        this.oppdaterUttaksplan();
        return this;
    }

    /**
     * Oppdaterer @periode og uttaksplanen
     * @param periode
     */
    oppdaterPeriode(periode: Periode) {
        const prevPeriode = periode.id
            ? perioderUtil(this.perioder).getPeriode(periode.id)
            : undefined;
        if (!prevPeriode) {
            throw new Error('Periode for endring ikke funnet');
        }

        this.perioder = fjernOppholdsperioderIPeriodetidsrom(
            this.perioder,
            periode
        );

        const opphold = periodeUtil(
            prevPeriode
        ).oppholdsperioderVedEndretTidsperiode(periode);
        this.perioder = [...this.perioder, ...opphold]
            .map((p) => (p.id === periode.id ? periode : p))
            .sort(sorterPerioder);
        this.oppdaterUttaksplan();
        return this;
    }

    /**
     * Sletter @periode og oppdaterer uttaksplanen
     * @param periode
     */
    slettPeriode(periode: Periode) {
        this.perioder = this.perioder.filter((p) => p.id !== periode.id);
        this.oppdaterUttaksplan();
        return this;
    }

    /**
     * Bygger hele uttaksplanen på nytt, gitt uttaksperioder og utsettelser
     */
    private oppdaterUttaksplan() {
        this.reset()
            .finnOgSettInnOpphold()
            .normaliser();
        return this;
    }

    /**
     * Nullstiller uttaksperioder og legger utsettelser inn på nytt
     */
    private reset() {
        let uttaksperioder = resetTidsperioder(
            perioderUtil(this.perioder).uttaksperioder()
        );
        const opphold = perioderUtil(this.perioder).opphold();
        uttaksperioder = slåSammenLikePerioder(uttaksperioder);
        const utsettelser = perioderUtil(this.perioder)
            .utsettelser()
            .sort(sorterPerioder);

        this.perioder = uttaksperioder;
        this.perioder = settInnPerioder(this.perioder, opphold);
        this.perioder = settInnPerioder(this.perioder, utsettelser);
        this.sort();
        return this;
    }

    /**
     * Lokaliserer og setter inn oppholdsperioder
     */
    private finnOgSettInnOpphold() {
        const uttakOgUtsetteler = perioderUtil(
            this.perioder
        ).uttakOgUtsettelser();
        const opphold = finnOppholdsperioder(uttakOgUtsetteler);
        this.perioder = [];
        this.perioder = this.perioder.concat(uttakOgUtsetteler, opphold);
        this.sort();
        return this;
    }

    /** Slår sammen perioder som er like og er sammenhengende */
    private normaliser() {
        this.perioder = slåSammenLikePerioder(this.perioder);
        return this;
    }

    private sort() {
        this.perioder.sort(sorterPerioder);
        return this;
    }
}

const fjernOppholdsperioderIPeriodetidsrom = (
    perioder: Periode[],
    periode: Periode
): Periode[] => {
    let nyePerioder: Periode[] = [...perioder];
    const opphold = perioderUtil(perioder.filter((p) => p.id !== periode.id))
        .finnOverlappendePerioder(periode.tidsperiode)
        .filter((p) => p.type === Periodetype.Opphold) as Oppholdsperiode[];

    const oppholdSomMåBeholdes: Oppholdsperiode[] = [];
    const oppholdSomKanFjernesHelt: Oppholdsperiode[] = []; // Helt omsluttet av periode
    opphold.forEach((o) => {
        if (tidsperiodeUtil(o.tidsperiode).erOmsluttetAv(periode.tidsperiode)) {
            oppholdSomKanFjernesHelt.push(o);
        } else if (
            isBefore(o.tidsperiode.startdato, periode.tidsperiode.startdato)
        ) {
            const justertOpphold: Oppholdsperiode = {
                ...o,
                tidsperiode: {
                    startdato: o.tidsperiode.startdato,
                    sluttdato: uttaksdagUtil(
                        periode.tidsperiode.startdato
                    ).forrige()
                }
            };
            oppholdSomMåBeholdes.push(justertOpphold);
        } else {
            const justertOpphold: Oppholdsperiode = {
                ...o,
                tidsperiode: {
                    startdato: uttaksdagUtil(
                        periode.tidsperiode.sluttdato
                    ).neste(),
                    sluttdato: o.tidsperiode.sluttdato
                }
            };
            oppholdSomMåBeholdes.push(justertOpphold);
        }
    });
    nyePerioder = nyePerioder.filter(
        (p) =>
            oppholdSomKanFjernesHelt.findIndex((o) => p.id === o.id) >= 0
                ? false
                : true
    );
    oppholdSomMåBeholdes.forEach((o) => {
        nyePerioder = nyePerioder.map((p) => (p.id === o.id ? o : p));
    });
    return [...nyePerioder];
};

/**
 * Legger utsettelser inn i periodene og flytter perioder som er etter utsettelsene
 * @param perioder
 * @param nyPerioder
 */
const settInnPerioder = (
    perioder: Periode[],
    perioder2: Periode[]
): Periode[] => {
    if (perioder.length === 0) {
        return perioder;
    }
    let nyePerioder: Periode[] = [...perioder];
    perioder2.sort(sorterPerioder).forEach((periode) => {
        nyePerioder = settInnPeriode(nyePerioder, periode);
    });
    return nyePerioder.sort(sorterPerioder);
};

/**
 * Finner periode som er berørt av utsettelsens startdato, splitter den i to og
 * legger inn utsettelse mellom dem. Forskyver påfølgende uttaksperioder
 * @param perioder
 * @param nyPeriode
 */
const settInnPeriode = (perioder: Periode[], nyPeriode: Periode): Periode[] => {
    const berørtePerioder = perioderUtil(perioder).finnOverlappendePerioder(
        nyPeriode.tidsperiode
    );
    const periodeSomMåSplittes = perioderUtil(perioder).finnPeriodeMedDato(
        nyPeriode.tidsperiode.startdato
    );
    if (berørtePerioder.length === 0 && !periodeSomMåSplittes) {
        return [...perioder, nyPeriode];
    }

    if (!periodeSomMåSplittes) {
        const foregåendePeriode = perioderUtil(perioder)
            .foregåendePerioder(nyPeriode)
            .pop();
        if (!foregåendePeriode) {
            throw new Error(
                'Ugyldig plassering av periode. Ingen perioder funnet før denne perioden.'
            );
        }
        return leggTilPeriodeEtterPeriode(
            perioder,
            foregåendePeriode,
            nyPeriode
        );
    }
    if (periodeSomMåSplittes.type === Periodetype.Utsettelse) {
        throw new Error('Kan ikke dele opp en utsettelse');
    }
    if (
        isSameDay(
            periodeSomMåSplittes.tidsperiode.startdato,
            nyPeriode.tidsperiode.startdato
        )
    ) {
        return leggTilPeriodeEtterPeriode(
            perioder,
            periodeSomMåSplittes,
            nyPeriode
        );
    } else {
        return leggTilPeriodeIPeriode(
            perioder,
            periodeSomMåSplittes,
            nyPeriode
        );
    }
};

/**
 * Går gjennom alle perioder og finner opphold
 * @param perioder
 */
const finnOppholdsperioder = (
    perioder: Array<Uttaksperiode | Utsettelsesperiode>
): Oppholdsperiode[] => {
    const opphold: Oppholdsperiode[] = [];
    const len = perioder.length;
    perioder.forEach((periode, idx) => {
        if (idx === len - 1) {
            return;
        }
        const nestePeriode = perioder[idx + 1];

        const tidsperiodeMellomPerioder = {
            startdato: uttaksdagUtil(periode.tidsperiode.sluttdato).neste(),
            sluttdato: uttaksdagUtil(
                nestePeriode.tidsperiode.startdato
            ).forrige()
        };
        if (
            isBefore(
                tidsperiodeMellomPerioder.sluttdato,
                tidsperiodeMellomPerioder.startdato
            )
        ) {
            return;
        }

        const uttaksdagerITidsperiode = tidsperiodeUtil(
            tidsperiodeMellomPerioder
        ).antallUttaksdager();
        if (uttaksdagerITidsperiode > 0) {
            opphold.push({
                id: guid(),
                type: Periodetype.Opphold,
                tidsperiode: tidsperiodeMellomPerioder,
                årsak: OppholdÅrsakType.ManglendeSøktPeriode,
                forelder: 'forelder1' // TODO ikke hardkodet
            });
        }
    });
    return opphold;
};

/**
 * Går gjennom alle uttaksperioder og resetter tidsperioder gitt
 * hver enkelt periodes varighet. Tar hensyn perioder hvor tidsperiode
 * er låst av bruker
 * @param perioder
 */
export const resetTidsperioder = (perioder: Periode[]): Periode[] => {
    let forrigePeriode: Periode;
    const sammenslåttePerioder = slåSammenLikePerioder(
        perioder.sort(sorterPerioder)
    ) as Periode[];
    const resattePerioder = sammenslåttePerioder.map((periode) => {
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return periode;
        }
        forrigePeriode = {
            ...periode,
            tidsperiode: getTidsperiode(
                uttaksdagUtil(forrigePeriode.tidsperiode.sluttdato).neste(),
                tidsperiodeUtil(periode.tidsperiode).antallUttaksdager()
            )
        };
        return {
            ...periode,
            tidsperiode: { ...forrigePeriode.tidsperiode }
        };
    });

    return resattePerioder;
};

/**
 * Går gjennom periodene og finner perioder som er sammenhengende og
 * har samme nøkkeldata, og slår disse sammen til en periode dersom
 * dette er tilfelle
 * @param perioder Alle perioder som sjekkes
 */
const slåSammenLikePerioder = (perioder: Periode[]): Periode[] => {
    if (perioder.length <= 1) {
        return perioder;
    }
    const nyePerioder: Periode[] = [];
    let forrigePeriode: Periode | undefined = { ...perioder[0] };
    perioder.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return;
        }
        if (
            periodeUtil(forrigePeriode).erLik(periode) &&
            periodeUtil(forrigePeriode).erSammenhengende(periode)
        ) {
            forrigePeriode.tidsperiode.sluttdato =
                periode.tidsperiode.sluttdato;
            return;
        } else {
            nyePerioder.push(forrigePeriode);
            forrigePeriode = undefined;
        }
        forrigePeriode = periode;
    });
    nyePerioder.push(forrigePeriode);

    return nyePerioder;
};

/**
 * Legger inn @nyPeriode og forskyver @periode og påfølgende perioder
 * @param perioder
 * @param periode
 * @param nyPeriode
 */
const leggTilPeriodeEtterPeriode = (
    perioder: Periode[],
    periode: Periode,
    nyPeriode: Periode
): Periode[] => {
    const perioderFør = perioderUtil(perioder).foregåendePerioder(periode);
    const perioderEtter = perioderUtil(perioder).påfølgendePerioder(periode);
    const uttaksdagerIUtsettelse: number = tidsperiodeUtil(
        nyPeriode.tidsperiode
    ).antallUttaksdager();
    return [
        ...perioderFør,
        ...[nyPeriode],
        ...perioderUtil([periode, ...perioderEtter]).forskyv(
            uttaksdagerIUtsettelse
        )
    ];
};

/**
 * Legger en periode inn i en periode og forskyver påfølgende perioder
 * @param perioder
 * @param periode
 * @param nyPeriode
 */
const leggTilPeriodeIPeriode = (
    perioder: Periode[],
    periode: Periode,
    nyPeriode: Periode
): Periode[] => {
    const perioderFør = perioderUtil(perioder).foregåendePerioder(periode);
    const perioderEtter = perioderUtil(perioder).påfølgendePerioder(periode);
    const splittetPeriode = splittPeriodeMedPeriode(periode, nyPeriode);
    const uttaksdager = tidsperiodeUtil(
        nyPeriode.tidsperiode
    ).antallUttaksdager();
    return [
        ...perioderFør,
        ...splittetPeriode,
        ...perioderUtil(perioderEtter).forskyv(uttaksdager)
    ];
};

/**
 * Legger en periode inn i en periode og forskyver sluttdatoen for perioden
 * tilsvarende ny periodes varighet
 * @param periode
 * @param nyPeriode
 */
const splittPeriodeMedPeriode = (
    periode: Periode,
    nyPeriode: Periode
): Periode[] => {
    const dagerIPeriode = tidsperiodeUtil(
        periode.tidsperiode
    ).antallUttaksdager();
    const dagerForsteDel = tidsperiodeUtil({
        startdato: periode.tidsperiode.startdato,
        sluttdato: addDays(nyPeriode.tidsperiode.startdato, -1)
    }).antallUttaksdager();
    const dagerSisteDel = dagerIPeriode - dagerForsteDel;
    const forste: Periode = {
        ...periode,
        tidsperiode: {
            startdato: periode.tidsperiode.startdato,
            sluttdato: uttaksdagUtil(nyPeriode.tidsperiode.startdato).forrige()
        }
    };
    const midt: Periode = {
        ...nyPeriode,
        tidsperiode: {
            startdato: uttaksdagUtil(
                nyPeriode.tidsperiode.startdato
            ).denneEllerNeste(),
            sluttdato: uttaksdagUtil(
                nyPeriode.tidsperiode.sluttdato
            ).denneEllerNeste()
        }
    };
    const startSisteDel: Date = uttaksdagUtil(
        midt.tidsperiode.sluttdato
    ).neste();
    const siste: Periode = {
        ...periode,
        id: guid(),
        tidsperiode: getTidsperiode(startSisteDel, dagerSisteDel)
    };
    return [forste, midt, siste];
};
