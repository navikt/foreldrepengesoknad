import { isBefore, isSameDay, addDays, isAfter } from 'date-fns';
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
     * Legger til periode og oppdaterer uttaksplanen
     * @param periode
     */
    leggTilPeriodeOgOppdater(periode: Periode) {
        this.perioder = settInnPeriode(this.perioder, {
            ...periode,
            id: guid(),
            endret: new Date()
        });
        this.oppdaterUttaksplan();
        return this;
    }

    /**
     * Oppdaterer periode og uttaksplanen
     * @param periode
     */
    oppdaterPeriodeOgOppdater(periode: Periode) {
        const prevPeriode = periode.id
            ? perioderUtil(this.perioder).getPeriode(periode.id)
            : undefined;
        if (!prevPeriode) {
            throw new Error('Periode for endring ikke funnet');
        }
        /**
         * Finn hvor mye som skal forskyves pga endring: = periodens varighet?
         * - finn alle perioder som har starttidspunkt etter sluttdato
         * - finn opphold som har <= varighet enn endring, fjern/split disse
         * : forutsetning -> perioder er riktig linet opp, så endring blir riktig
         */
        let uttaksdager = periodeUtil(periode).getAntallUttaksdager();
        const senereOpphold: Oppholdsperiode[] = this.perioder.filter(
            (p) =>
                p.type === Periodetype.Opphold &&
                isAfter(p.tidsperiode.startdato, periode.tidsperiode.startdato)
        ) as Oppholdsperiode[];

        senereOpphold.forEach((opphold) => {
            const oppholdDager = periodeUtil(opphold).getAntallUttaksdager();
            if (oppholdDager <= uttaksdager) {
                // Hele oppholdet kan fjernes
                this.perioder = perioderUtil(this.perioder).fjernPerioder([
                    opphold
                ]);
                uttaksdager -= oppholdDager;
            } else {
                // Kutt dager i starten av oppholdet
                const kuttetOpphold: Oppholdsperiode = {
                    ...opphold,
                    tidsperiode: {
                        ...opphold.tidsperiode,
                        startdato: uttaksdagUtil(
                            opphold.tidsperiode.startdato
                        ).leggTil(uttaksdager)
                    }
                };
                this.erstattPeriode(kuttetOpphold);
                uttaksdager = 0;
            }
        });

        this.fjernOppholdOmsluttetAvPeriode(periode)
            .settInnOppholdVedEndretPeriode(prevPeriode, periode)
            .erstattPeriode(periode)
            .oppdaterUttaksplan();
        return this;
    }

    /**
     * Bygger opp hele uttaksplanen på nytt
     */
    oppdaterUttaksplan() {
        this.reset()
            .finnOgSettInnOpphold()
            .normaliser();
        return this;
    }

    /**
     * Sletter periode og oppdaterer uttaksplanen
     * @param periode
     */
    slettPeriodeOgOppdater(periode: Periode) {
        this.slettPeriode(periode);
        this.oppdaterUttaksplan();
        return this;
    }

    /**
     * Fjerner en periode fra perioder
     * @param periode
     */
    private slettPeriode(periode: Periode) {
        this.perioder = this.perioder.filter((p) => p.id !== periode.id);
        return this;
    }

    /** Setter inn periode i perioder */
    private settInnPeriode(periode: Periode) {
        this.perioder = settInnPeriode(this.perioder, periode);
        return this;
    }

    /**
     * Fjerner periode for deretter å sette den inn igjen,
     * gjennbruker da logikk for å justere kolliderende
     * perioder
     * @param periode
     */
    private erstattPeriode(periode: Periode) {
        this.slettPeriode(periode);
        this.oppdaterUttaksplan();
        this.settInnPeriode(periode);
        return this;
    }

    /**
     * Fjern alle opphold som ligger innenfor samme tidsrom som perioden
     * @param periode
     */
    private fjernOppholdOmsluttetAvPeriode(periode: Periode) {
        this.perioder = fjernOppholdsperioderIPeriodetidsrom(
            this.perioder,
            periode
        );
        return this;
    }

    /**
     * Finner opphold som oppstår når en setter startdato til
     * et senere tidspunkt, og legger til dette oppholdet
     * @param opprinneligPeriode
     * @param endretPeriode
     */
    private settInnOppholdVedEndretPeriode(
        opprinneligPeriode: Periode,
        endretPeriode: Periode
    ) {
        const oppholdPåGrunnAvEndretTidsperiode = periodeUtil(
            opprinneligPeriode
        ).finnOppholdsperioderVedEndretTidsperiode(endretPeriode);
        this.perioder = [
            ...this.perioder,
            ...oppholdPåGrunnAvEndretTidsperiode
        ];
        return this;
    }

    /**
     * Nullstiller uttaksperioder og legger utsettelser inn på nytt
     */
    private reset() {
        let uttaksperioder = resetTidsperioder(
            perioderUtil(this.perioder).getUttak()
        );
        const opphold = perioderUtil(this.perioder).getOpphold();
        uttaksperioder = slåSammenLikePerioder(uttaksperioder);
        const utsettelser = perioderUtil(this.perioder)
            .getUtsettelser()
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
        ).getUttakOgUtsettelser();
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
 * Finner alle Oppholdsperioder som er innenfor tidsrommet
 * til periode. Opphold som ligger innefor periode fjernes,
 * mens de som delvis overlapper får justert tidsrom.
 * @param perioder
 * @param periode
 * @returns Modifisert periodeliste med justert/fjernet opphold
 */
function fjernOppholdsperioderIPeriodetidsrom(
    perioder: Periode[],
    periode: Periode
): Periode[] {
    const nyePerioder: Periode[] = perioder.filter(
        (p) => p.type !== Periodetype.Opphold
    );
    const opphold = perioder.filter((p) => p.type === Periodetype.Opphold);
    opphold.forEach((o) => {
        if (tidsperiodeUtil(o.tidsperiode).erOmsluttetAv(periode.tidsperiode)) {
            return;
        } else if (
            tidsperiodeUtil(o.tidsperiode).erUtenfor(periode.tidsperiode)
        ) {
            nyePerioder.push(o);
        } else if (
            isBefore(o.tidsperiode.startdato, periode.tidsperiode.startdato)
        ) {
            nyePerioder.push({
                ...o,
                tidsperiode: {
                    startdato: o.tidsperiode.startdato,
                    sluttdato: uttaksdagUtil(
                        periode.tidsperiode.startdato
                    ).forrige()
                }
            });
        } else {
            nyePerioder.push({
                ...o,
                tidsperiode: {
                    startdato: uttaksdagUtil(
                        periode.tidsperiode.sluttdato
                    ).neste(),
                    sluttdato: o.tidsperiode.sluttdato
                }
            });
        }
    });
    return nyePerioder;
}

/**
 * Legger utsettelser inn i periodene og flytter perioder som er etter utsettelsene
 * @param perioder
 * @param nyPerioder
 */
function settInnPerioder(perioder: Periode[], perioder2: Periode[]): Periode[] {
    if (perioder.length === 0) {
        return perioder;
    }
    let nyePerioder: Periode[] = [...perioder];
    perioder2.sort(sorterPerioder).forEach((periode) => {
        nyePerioder = settInnPeriode(nyePerioder, periode);
    });
    return nyePerioder.sort(sorterPerioder);
}

/**
 * Finner periode som er berørt av utsettelsens startdato, splitter den i to og
 * legger inn utsettelse mellom dem. Forskyver påfølgende uttaksperioder
 * @param perioder
 * @param nyPeriode
 */
function settInnPeriode(perioder: Periode[], nyPeriode: Periode): Periode[] {
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
            .finnForegåendePerioder(nyPeriode)
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
}

/**
 * Går gjennom alle perioder og finner uttaksdager som
 * ikke tilhører en periode. Oppretter Opphold for disse
 * @param perioder
 */
function finnOppholdsperioder(
    perioder: Array<Uttaksperiode | Utsettelsesperiode>
): Oppholdsperiode[] {
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
        ).getAntallUttaksdager();
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
}

/**
 * Går gjennom alle uttaksperioder og resetter tidsperioder gitt
 * hver enkelt periodes varighet. Tar hensyn perioder hvor tidsperiode
 * er låst av bruker
 * @param perioder
 */
function resetTidsperioder(perioder: Periode[]): Periode[] {
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
                tidsperiodeUtil(periode.tidsperiode).getAntallUttaksdager()
            )
        };
        return {
            ...periode,
            tidsperiode: { ...forrigePeriode.tidsperiode }
        };
    });

    return resattePerioder;
}

/**
 * Går gjennom periodene og finner perioder som er sammenhengende og
 * har samme nøkkeldata, og slår disse sammen til en periode dersom
 * dette er tilfelle
 * @param perioder Alle perioder som sjekkes
 */
function slåSammenLikePerioder(perioder: Periode[]): Periode[] {
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
}

/**
 * Legger inn nyPeriode og forskyver periode og påfølgende perioder
 * @param perioder
 * @param periode
 * @param nyPeriode
 */
function leggTilPeriodeEtterPeriode(
    perioder: Periode[],
    periode: Periode,
    nyPeriode: Periode
): Periode[] {
    const perioderFør = perioderUtil(perioder).finnForegåendePerioder(periode);
    const perioderEtter = perioderUtil(perioder).finnPåfølgendePerioder(
        periode
    );
    const uttaksdagerIUtsettelse: number = tidsperiodeUtil(
        nyPeriode.tidsperiode
    ).getAntallUttaksdager();
    return [
        ...perioderFør,
        ...[nyPeriode],
        ...perioderUtil([periode, ...perioderEtter]).forskyvPerioder(
            uttaksdagerIUtsettelse
        )
    ];
}

/**
 * Legger en periode inn i en periode og forskyver påfølgende perioder
 * @param perioder
 * @param periode
 * @param nyPeriode
 */
function leggTilPeriodeIPeriode(
    perioder: Periode[],
    periode: Periode,
    nyPeriode: Periode
): Periode[] {
    const perioderFør = perioderUtil(perioder).finnForegåendePerioder(periode);
    const perioderEtter = perioderUtil(perioder).finnPåfølgendePerioder(
        periode
    );
    const splittetPeriode = splittPeriodeMedPeriode(periode, nyPeriode);
    const uttaksdager = tidsperiodeUtil(
        nyPeriode.tidsperiode
    ).getAntallUttaksdager();
    return [
        ...perioderFør,
        ...splittetPeriode,
        ...perioderUtil(perioderEtter).forskyvPerioder(uttaksdager)
    ];
}

/**
 * Legger en periode inn i en periode og forskyver sluttdatoen for perioden
 * tilsvarende ny periodes varighet
 * @param periode
 * @param nyPeriode
 */
function splittPeriodeMedPeriode(
    periode: Periode,
    nyPeriode: Periode
): Periode[] {
    const dagerIPeriode = tidsperiodeUtil(
        periode.tidsperiode
    ).getAntallUttaksdager();
    const dagerForsteDel = tidsperiodeUtil({
        startdato: periode.tidsperiode.startdato,
        sluttdato: addDays(nyPeriode.tidsperiode.startdato, -1)
    }).getAntallUttaksdager();
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
}
