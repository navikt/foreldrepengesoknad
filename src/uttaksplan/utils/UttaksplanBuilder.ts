import { isBefore, isSameDay, addDays } from 'date-fns';
import { guid } from 'nav-frontend-js-utils';
import {
    Oppholdsperiode,
    Periodetype,
    OppholdÅrsakType,
    Uttaksperiode,
    Utsettelsesperiode,
    Periode,
    Tidsperiode,
    UttakEllerUtsettelseperiode
} from 'uttaksplan/types';
import { uttaksdag, uttakTidsperiode } from 'uttaksplan/utils/uttaksdagerUtils';
import {
    sorterPerioder,
    getUtsettelser,
    getUttaksperioder,
    finnPerioderITidsrom,
    finnPeriodeMedDato,
    finnPerioderFørPeriode,
    forskyvPerioder,
    erPerioderLike,
    erPerioderSammenhengende,
    getUttakOgUtsettelser,
    finnPerioderEtterPeriode
} from 'uttaksplan/utils/periodeUtils';

export const Uttaksplan = (perioder: Periode[]) => {
    return new UttaksplanBuilder(perioder);
};

/**
 * Holder kontroll på uttaksperioder, utsettelser og opphold
 */
class UttaksplanBuilder {
    public constructor(public perioder: Periode[]) {
        this.perioder = perioder;
        this.oppdaterUttaksplan();
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
        this.perioder = this.perioder.map(
            (p, idx) => (p.id === periode.id ? periode : p)
        );
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
            .settInnOpphold()
            .normaliser();
        return this;
    }

    /**
     * Nullstiller uttaksperioder og legger utsettelser inn på nytt
     */
    private reset() {
        const utsettelser = getUtsettelser(this.perioder);
        const uttaksperioder = resetUttaksperioder(
            getUttaksperioder(this.perioder).sort(sorterPerioder)
        );
        this.perioder = settInnUtsettelser(uttaksperioder, utsettelser);
        this.sort();
        return this;
    }

    /**
     * Lokaliserer og setter inn oppholdsperioder
     */
    private settInnOpphold() {
        const uttakOgUtsetteler = getUttakOgUtsettelser(this.perioder);
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

/**
 * Finner periode som er berørt av utsettelse, splitter den i to og
 * legger inn utsettelse mellom dem. Forskyver påfølgende uttaksperioder
 * @param perioder
 * @param utsettelse
 */
const leggTilUtsettelse = (
    perioder: Periode[],
    utsettelse: Utsettelsesperiode
): Periode[] => {
    const berørtePerioder = finnPerioderITidsrom(
        perioder,
        utsettelse.tidsperiode
    );
    const periode = finnPeriodeMedDato(
        perioder,
        utsettelse.tidsperiode.startdato
    );
    if (berørtePerioder.length === 0 && !periode) {
        return [...perioder, utsettelse];
    }

    if (!periode) {
        const foregåendePeriode = finnPerioderFørPeriode(
            perioder,
            utsettelse
        ).pop();
        if (!foregåendePeriode) {
            throw new Error(
                'Ugyldig plassering av utsettelse. Ingen perioder funnet før utsettelse.'
            );
        }
        return leggTilUtsettelseEtterPeriode(
            perioder,
            foregåendePeriode,
            utsettelse
        );
    }
    if (periode.type === Periodetype.Utsettelse) {
        throw new Error('Ny utsettelse overlapper eksisterende utsettelse');
    }
    if (
        isSameDay(
            periode.tidsperiode.startdato,
            utsettelse.tidsperiode.startdato
        )
    ) {
        return leggTilUtsettelseEtterPeriode(perioder, periode, utsettelse);
    } else {
        return leggTilUtsettelseIPeriode(perioder, periode, utsettelse);
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
            startdato: uttaksdag(periode.tidsperiode.sluttdato).neste(),
            sluttdato: uttaksdag(nestePeriode.tidsperiode.startdato).forrige()
        };
        if (
            isBefore(
                tidsperiodeMellomPerioder.sluttdato,
                tidsperiodeMellomPerioder.startdato
            )
        ) {
            return;
        }

        const uttaksdagerITidsperiode = uttakTidsperiode(
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
 * hver enkelt periodes varighet.
 * @param perioder
 */
const resetUttaksperioder = (perioder: Uttaksperiode[]): Uttaksperiode[] => {
    let forrigePeriode: Uttaksperiode;
    const sammenslåttePerioder = slåSammenLikePerioder(
        perioder
    ) as Uttaksperiode[];
    const resattePerioder = sammenslåttePerioder.map((periode) => {
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return periode;
        }
        const uttaksdager = uttakTidsperiode(
            periode.tidsperiode
        ).antallUttaksdager();
        const startdato = uttaksdag(
            forrigePeriode.tidsperiode.sluttdato
        ).neste();
        const tidsperiode: Tidsperiode = {
            startdato,
            sluttdato: uttaksdag(startdato).periodeslutt(uttaksdager)
        };

        forrigePeriode = {
            ...periode,
            tidsperiode
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
            erPerioderLike(forrigePeriode, periode) &&
            erPerioderSammenhengende(forrigePeriode, periode)
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
 * Legger utsettelser inn i periodene og flytter perioder som er etter utsettelsene
 * @param stønadsperioder
 * @param utsettelser
 */
const settInnUtsettelser = (
    uttaksperioder: Uttaksperiode[],
    utsettelser: Utsettelsesperiode[]
): UttakEllerUtsettelseperiode[] => {
    if (utsettelser.length === 0) {
        return uttaksperioder;
    }
    let perioder: UttakEllerUtsettelseperiode[] = [...uttaksperioder];
    utsettelser.sort(sorterPerioder).forEach((utsettelse) => {
        perioder = leggTilUtsettelse(
            perioder,
            utsettelse
        ) as UttakEllerUtsettelseperiode[];
    });
    return perioder;
};

/**
 * Legger inn en utsettelse etter en periode, og forskyver påfølgende perioder
 * @param perioder
 * @param periode
 * @param utsettelse
 */
const leggTilUtsettelseEtterPeriode = (
    perioder: Periode[],
    periode: Periode,
    utsettelse: Utsettelsesperiode
): Periode[] => {
    const perioderFør = finnPerioderFørPeriode(perioder, periode);
    const perioderEtter = finnPerioderEtterPeriode(perioder, periode);
    const uttaksdagerIUtsettelse: number = uttakTidsperiode(
        utsettelse.tidsperiode
    ).antallUttaksdager();
    return [
        ...perioderFør,
        ...[utsettelse],
        ...forskyvPerioder([periode, ...perioderEtter], uttaksdagerIUtsettelse)
    ];
};

/**
 * Legger en utsettelse inn i en periode og forskyver påfølgende perioder
 * @param perioder
 * @param periode
 * @param utsettelse
 */
const leggTilUtsettelseIPeriode = (
    perioder: Periode[],
    periode: Periode,
    utsettelse: Utsettelsesperiode
): Periode[] => {
    const perioderFør = finnPerioderFørPeriode(perioder, periode);
    const perioderEtter = finnPerioderEtterPeriode(perioder, periode);

    const periodeSplittetMedUtsettelse = leggUtsettelseInnIPeriode(
        periode,
        utsettelse
    );
    const uttaksdager = uttakTidsperiode(
        utsettelse.tidsperiode
    ).antallUttaksdager();
    return [
        ...perioderFør,
        ...periodeSplittetMedUtsettelse,
        ...forskyvPerioder(perioderEtter, uttaksdager)
    ];
};

/**
 * Legger en utsettelse inn i en periode og forskyver sluttdatoen for perioden
 * tilsvarende utsettelsens varighet
 * @param periode
 * @param utsettelse
 */
const leggUtsettelseInnIPeriode = (
    periode: Periode,
    utsettelse: Utsettelsesperiode
): Periode[] => {
    const dagerIPeriode = uttakTidsperiode(
        periode.tidsperiode
    ).antallUttaksdager();
    const dagerForsteDel = uttakTidsperiode({
        startdato: periode.tidsperiode.startdato,
        sluttdato: addDays(utsettelse.tidsperiode.startdato, -1)
    }).antallUttaksdager();
    const dagerSisteDel = dagerIPeriode - dagerForsteDel;
    const forste: Uttaksperiode = {
        ...(periode as Uttaksperiode),
        tidsperiode: {
            startdato: periode.tidsperiode.startdato,
            sluttdato: uttaksdag(utsettelse.tidsperiode.startdato).forrige()
        }
    };
    const midt: Utsettelsesperiode = {
        ...utsettelse,
        tidsperiode: {
            startdato: uttaksdag(
                utsettelse.tidsperiode.startdato
            ).denneEllerNeste(),
            sluttdato: uttaksdag(
                utsettelse.tidsperiode.sluttdato
            ).denneEllerNeste()
        }
    };
    const startSisteDel: Date = uttaksdag(midt.tidsperiode.sluttdato).neste();
    const siste: Uttaksperiode = {
        ...(periode as Uttaksperiode),
        tidsperiode: {
            startdato: startSisteDel,
            sluttdato: uttaksdag(startSisteDel).periodeslutt(dagerSisteDel)
        }
    };
    return [forste, midt, siste];
};
