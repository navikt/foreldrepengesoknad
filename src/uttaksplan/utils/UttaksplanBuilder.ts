import { isBefore, isSameDay, addDays } from 'date-fns';
import { guid } from 'nav-frontend-js-utils';
import {
    Oppholdsperiode,
    Periodetype,
    OppholdÅrsakType,
    Uttaksperiode,
    Utsettelsesperiode,
    Periode,
    Tidsperiode
} from 'uttaksplan/types';
import {
    tidsperiodeUtil,
    sorterPerioder,
    uttaksdagUtil,
    perioderUtil,
    periodeUtil
} from 'uttaksplan/utils/dataUtils';

export const Uttaksplan = (perioder: Periode[]) => {
    return new UttaksplanBuilder(perioder);
};

/**
 * Holder kontroll på uttaksperioder, utsettelser og opphold
 */
class UttaksplanBuilder {
    public constructor(protected perioder: Periode[]) {}

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
        const prevPeriode = this.perioder.find((p) => p.id === periode.id);
        if (!prevPeriode) {
            return;
        }
        const updatedPeriode = { ...periode };
        if (
            !tidsperiodeUtil(prevPeriode.tidsperiode).erLik(periode.tidsperiode)
        ) {
            const opphold: Oppholdsperiode[] = periodeUtil(
                prevPeriode
            ).oppholdsperioderVedEndretTidsperiode(periode);
            this.perioder = [...this.perioder, ...opphold];
        }
        this.perioder = this.perioder.map(
            (p, idx) => (p.id === periode.id ? updatedPeriode : p)
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
        const utsettelser = perioderUtil(this.perioder).utsettelser();
        // const opphold = perioderUtil(this.perioder).opphold();
        // console.log(opphold);
        const uttaksperioder = resetUttaksperioder(
            perioderUtil(this.perioder)
                .uttaksperioder()
                .sort(sorterPerioder)
        );
        this.perioder = settInnUtsettelser(uttaksperioder, utsettelser);
        this.sort();
        return this;
    }

    /**
     * Lokaliserer og setter inn oppholdsperioder
     */
    private settInnOpphold() {
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

/**
 * Finner periode som er berørt av utsettelsens startdato, splitter den i to og
 * legger inn utsettelse mellom dem. Forskyver påfølgende uttaksperioder
 * @param perioder
 * @param nyPeriode
 */
const leggTilPeriode = (perioder: Periode[], nyPeriode: Periode): Periode[] => {
    const berørtePerioder = perioderUtil(perioder).finnPerioderITidsrom(
        nyPeriode.tidsperiode
    );
    const periode = perioderUtil(perioder).finnPeriodeMedDato(
        nyPeriode.tidsperiode.startdato
    );
    if (berørtePerioder.length === 0 && !periode) {
        return [...perioder, nyPeriode];
    }

    if (!periode) {
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
    if (periode.type === Periodetype.Utsettelse) {
        throw new Error('Ny utsettelse overlapper eksisterende utsettelse');
    }
    if (
        isSameDay(
            periode.tidsperiode.startdato,
            nyPeriode.tidsperiode.startdato
        )
    ) {
        return leggTilPeriodeEtterPeriode(perioder, periode, nyPeriode);
    } else {
        return leggTilPeriodeIPeriode(perioder, periode, nyPeriode);
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
        const uttaksdager = tidsperiodeUtil(
            periode.tidsperiode
        ).antallUttaksdager();
        const startdato = uttaksdagUtil(
            forrigePeriode.tidsperiode.sluttdato
        ).neste();
        const tidsperiode: Tidsperiode = {
            startdato,
            sluttdato: uttaksdagUtil(startdato).periodeslutt(uttaksdager)
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
 * Legger utsettelser inn i periodene og flytter perioder som er etter utsettelsene
 * @param stønadsperioder
 * @param utsettelser
 */
const settInnUtsettelser = (
    perioder: Periode[],
    utsettelser: Utsettelsesperiode[]
): Periode[] => {
    if (utsettelser.length === 0) {
        return perioder;
    }
    let nyePerioder: Periode[] = [...perioder];
    utsettelser.sort(sorterPerioder).forEach((utsettelse) => {
        nyePerioder = leggTilPeriode(nyePerioder, utsettelse);
    });
    return nyePerioder;
};

/**
 * Legger inn en periode etter en periode, og forskyver påfølgende perioder
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
        tidsperiode: {
            startdato: startSisteDel,
            sluttdato: uttaksdagUtil(startSisteDel).periodeslutt(dagerSisteDel)
        }
    };
    return [forste, midt, siste];
};
