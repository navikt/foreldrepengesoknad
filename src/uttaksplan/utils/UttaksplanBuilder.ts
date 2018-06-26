import { isBefore, isSameDay, addDays } from 'date-fns';
import { guid } from 'nav-frontend-js-utils';
import { Periodetype, Periode, Oppholdsperiode } from 'uttaksplan/types';
import {
    Tidsperioden,
    sorterPerioder,
    Uttaksdagen,
    Periodene,
    Perioden,
    getTidsperiode
} from 'uttaksplan/utils/dataUtils';

/**
 *
 * TODO: når en periode legges over en utsettelse så splittes ikke denne
 *
 */

export const UttaksplanBuilder = (perioder: Periode[]) => {
    return new UttaksplanAutoBuilder(perioder);
};

/**
 * Holder kontroll på uttaksperioder, utsettelser og opphold
 */
class UttaksplanAutoBuilder {
    public constructor(public perioder: Periode[]) {
        this.perioder = perioder;
    }

    /**
     * Bygger opp hele uttaksplanen på nytt
     */
    buildUttaksplan() {
        const utsettelser = Periodene(this.perioder).getUtsettelser();
        const opphold = Periodene(this.perioder).getOpphold();
        const uttaksperioder = Periodene(this.perioder).getUttak();
        this.perioder = resetTidsperioder(uttaksperioder);
        /** Perioder med faste tidsperioder */
        const fastePerioder: Periode[] = [...opphold, ...utsettelser].sort(
            sorterPerioder
        );

        this.perioder = settInnPerioder(this.perioder, fastePerioder);
        this.slåSammenLikePerioder();
        this.sort();
        return this;
    }

    /**
     * Proxy for om en skal oppdatere eller legge til ny
     * @param periode
     */
    leggTilEllerOppdaterPeriode(periode: Periode) {
        if (periode.id) {
            this.oppdaterPeriodeOgBuild(periode);
        } else {
            this.leggTilPeriodeOgBuild(periode);
        }
        return this;
    }

    /**
     * Legger til periode og oppdaterer uttaksplanen
     * @param periode
     */
    leggTilPeriodeOgBuild(periode: Periode) {
        this.slåSammenLikePerioder();
        this.tilpassOppholdRundtPeriode(periode);
        this.perioder = settInnPeriode(this.perioder, {
            ...periode,
            id: guid(),
            endret: new Date()
        });
        this.buildUttaksplan();
        return this;
    }

    /**
     * Oppdaterer periode og uttaksplanen
     * @param periode
     */
    oppdaterPeriodeOgBuild(periode: Periode, skip = false) {
        const oldPeriode = periode.id
            ? Periodene(this.perioder).getPeriode(periode.id)
            : undefined;

        if (!oldPeriode) {
            throw new Error('Periode for endring ikke funnet');
        }

        this.oppdaterPerioderVedEndretPeriode(periode, oldPeriode)
            .erstattPeriode(periode)
            .buildUttaksplan();

        return this;
    }

    /**
     * Sletter periode og oppdaterer uttaksplanen
     * @param periode
     */
    slettPeriodeOgBuild(periode: Periode) {
        this.slettPeriode(
            periode,
            periode.type === Periodetype.Uttak
        ).buildUttaksplan();
        return this;
    }

    /**
     * Fjerner en periode fra perioder
     * @param periode
     */
    private slettPeriode(periode: Periode, erstattMedOpphold?: boolean) {
        this.perioder = this.perioder.filter((p) => p.id !== periode.id);
        if (erstattMedOpphold) {
            this.perioder.push({
                id: guid(),
                type: Periodetype.Opphold,
                tidsperiode: { ...periode.tidsperiode }
            });
        }
        return this;
    }

    /**
     * Fjerner periode for deretter å sette den inn igjen,
     * gjennbruker da logikk for å justere kolliderende
     * perioder
     * @param periode
     */
    private erstattPeriode(periode: Periode) {
        this.perioder = this.perioder.map(
            (p) => (p.id === periode.id ? periode : p)
        );
        return this;
    }

    /**
     * Oppdaterer andre perioder ut fra om tidsperiode er endret eller ikke
     * @param periode
     * @param oldPeriode
     */
    private oppdaterPerioderVedEndretPeriode(
        periode: Periode,
        oldPeriode: Periode
    ) {
        if (Tidsperioden(periode.tidsperiode).erLik(oldPeriode.tidsperiode)) {
            return this;
        }
        this.tilpassOppholdRundtPeriode(periode);
        const nyeOpphold = finnOppholdVedEndretTidsperiode(oldPeriode, periode);
        if (nyeOpphold) {
            this.perioder = this.perioder.concat(nyeOpphold);
            this.sort();
        }
        return this;
    }

    /**
     * Fjern alle opphold som ligger innenfor samme tidsrom som perioden
     * @param periode
     */
    private tilpassOppholdRundtPeriode(periode: Periode) {
        this.perioder = fjernOppholdsperioderIPeriodetidsrom(
            this.perioder,
            periode
        );
        return this;
    }

    /** Slår sammen perioder som er like og er sammenhengende */
    private slåSammenLikePerioder() {
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
        if (Tidsperioden(o.tidsperiode).erOmsluttetAv(periode.tidsperiode)) {
            return;
        } else if (Tidsperioden(o.tidsperiode).erUtenfor(periode.tidsperiode)) {
            nyePerioder.push(o);
        } else if (
            isBefore(o.tidsperiode.startdato, periode.tidsperiode.startdato)
        ) {
            nyePerioder.push({
                ...o,
                tidsperiode: {
                    startdato: o.tidsperiode.startdato,
                    sluttdato: Uttaksdagen(
                        periode.tidsperiode.startdato
                    ).forrige()
                }
            });
        } else {
            nyePerioder.push({
                ...o,
                tidsperiode: {
                    startdato: Uttaksdagen(
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
    if (perioder.length === 0) {
        return [nyPeriode];
    }
    const berørtePerioder = Periodene(perioder).finnOverlappendePerioder(
        nyPeriode
    );
    const periodeSomMåSplittes = Periodene(perioder).finnPeriodeMedDato(
        nyPeriode.tidsperiode.startdato
    );
    if (berørtePerioder.length === 0 && !periodeSomMåSplittes) {
        return [...perioder, nyPeriode];
    }

    if (!periodeSomMåSplittes) {
        const foregåendePeriode = Periodene(perioder)
            .finnAlleForegåendePerioder(nyPeriode)
            .pop();
        if (foregåendePeriode) {
            return leggTilPeriodeEtterPeriode(
                perioder,
                foregåendePeriode,
                nyPeriode
            );
        }
        return leggTilPeriodeFørPeriode(perioder, perioder[0], nyPeriode);
    }

    if (Perioden(periodeSomMåSplittes).erUtsettelse()) {
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
// function finnOppholdsperioder(
//     perioder: Array<Uttaksperiode | Utsettelsesperiode>
// ): Oppholdsperiode[] {
//     const opphold: Oppholdsperiode[] = [];
//     const len = perioder.length;
//     perioder.forEach((periode, idx) => {
//         if (idx === len - 1) {
//             return;
//         }
//         const nestePeriode = perioder[idx + 1];

//         const tidsperiodeMellomPerioder = {
//             startdato: uttaksdagUtil(periode.tidsperiode.sluttdato).neste(),
//             sluttdato: uttaksdagUtil(
//                 nestePeriode.tidsperiode.startdato
//             ).forrige()
//         };
//         if (
//             isBefore(
//                 tidsperiodeMellomPerioder.sluttdato,
//                 tidsperiodeMellomPerioder.startdato
//             )
//         ) {
//             return;
//         }

//         const uttaksdagerITidsperiode = tidsperioden(
//             tidsperiodeMellomPerioder
//         ).getAntallUttaksdager();
//         if (uttaksdagerITidsperiode > 0) {
//             opphold.push({
//                 id: guid(),
//                 type: Periodetype.Opphold,
//                 tidsperiode: tidsperiodeMellomPerioder,
//                 årsak: OppholdÅrsakType.ManglendeSøktPeriode,
//                 forelder: 'forelder1' // TODO ikke hardkodet
//             });
//         }
//     });
//     return opphold;
// }

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
                Uttaksdagen(forrigePeriode.tidsperiode.sluttdato).neste(),
                Tidsperioden(periode.tidsperiode).getAntallUttaksdager()
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
export function slåSammenLikePerioder(perioder: Periode[]): Periode[] {
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
            Perioden(forrigePeriode).erLik(periode) &&
            Perioden(forrigePeriode).erSammenhengende(periode)
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
    const perioderFør = Periodene(perioder).finnAlleForegåendePerioder(periode);
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(
        periode
    );
    const uttaksdagerIUtsettelse: number = Tidsperioden(
        nyPeriode.tidsperiode
    ).getAntallUttaksdager();
    return [
        ...perioderFør,
        ...[nyPeriode],
        ...Periodene([periode, ...perioderEtter]).forskyvPerioder(
            uttaksdagerIUtsettelse
        )
    ];
}

/**
 * Legger inn nyPeriode og forskyver periode og påfølgende perioder
 * @param perioder
 * @param periode
 * @param nyPeriode
 */
function leggTilPeriodeFørPeriode(
    perioder: Periode[],
    periode: Periode,
    nyPeriode: Periode
): Periode[] {
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(
        periode
    );
    const uttaksdagerIUtsettelse: number = Tidsperioden(
        nyPeriode.tidsperiode
    ).getAntallUttaksdager();
    return [
        ...[nyPeriode],
        ...Periodene([periode, ...perioderEtter]).forskyvPerioder(
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
    const perioderFør = Periodene(perioder).finnAlleForegåendePerioder(periode);
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(
        periode
    );
    const splittetPeriode = splittPeriodeMedPeriode(periode, nyPeriode);
    const opprinneligVarighet = Perioden(periode).getAntallUttaksdager();
    const nyVarighet = Tidsperioden({
        startdato: splittetPeriode[0].tidsperiode.startdato,
        sluttdato: splittetPeriode[2].tidsperiode.sluttdato // Ta høyde for at split inneholdt opphold
    }).getAntallUttaksdager();
    const uttaksdager = nyVarighet - opprinneligVarighet;
    return [
        ...perioderFør,
        ...splittetPeriode,
        ...Periodene(perioderEtter).forskyvPerioder(uttaksdager)
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
    const dagerIPeriode = Tidsperioden(
        periode.tidsperiode
    ).getAntallUttaksdager();
    const dagerForsteDel = Tidsperioden({
        startdato: periode.tidsperiode.startdato,
        sluttdato: addDays(nyPeriode.tidsperiode.startdato, -1)
    }).getAntallUttaksdager();
    let dagerSisteDel = dagerIPeriode - dagerForsteDel;
    const forste: Periode = {
        ...periode,
        tidsperiode: {
            startdato: periode.tidsperiode.startdato,
            sluttdato: Uttaksdagen(nyPeriode.tidsperiode.startdato).forrige()
        }
    };
    const midt: Periode = {
        ...nyPeriode,
        tidsperiode: {
            startdato: Uttaksdagen(
                nyPeriode.tidsperiode.startdato
            ).denneEllerNeste(),
            sluttdato: Uttaksdagen(
                nyPeriode.tidsperiode.sluttdato
            ).denneEllerNeste()
        }
    };
    const startSisteDel: Date = Uttaksdagen(midt.tidsperiode.sluttdato).neste();

    if (Perioden(periode).erOpphold()) {
        dagerSisteDel = dagerSisteDel - Perioden(midt).getAntallUttaksdager();
    }

    const siste: Periode = {
        ...periode,
        id: guid(),
        tidsperiode: getTidsperiode(startSisteDel, dagerSisteDel)
    };
    return [forste, midt, siste];
}

/**
 * Finner oppholdsperioder før og etter periode når tidsperiode
 * for en periode endres
 * @param oldPeriode Opprinnelig periode
 * @param periode Endret periode
 * @param opphav Hvor endringen kommer fra - settes på oppholdet
 */
function finnOppholdVedEndretTidsperiode(
    oldPeriode: Periode,
    periode: Periode
): Oppholdsperiode[] | undefined {
    /*
     TODO - sjekk at ikke opphold kolliderer med andre perioder
     */
    const opphold: Oppholdsperiode[] = [];
    const diffStartdato = Uttaksdagen(
        oldPeriode.tidsperiode.startdato
    ).getUttaksdagerFremTilDato(periode.tidsperiode.startdato);
    if (diffStartdato > 0) {
        opphold.push({
            type: Periodetype.Opphold,
            tidsperiode: getTidsperiode(
                oldPeriode.tidsperiode.startdato,
                diffStartdato
            )
        });
    }
    const diffSluttdato = Uttaksdagen(
        oldPeriode.tidsperiode.sluttdato
    ).getUttaksdagerFremTilDato(periode.tidsperiode.sluttdato);
    if (diffSluttdato < 0) {
        opphold.push({
            type: Periodetype.Opphold,
            tidsperiode: {
                startdato: Uttaksdagen(periode.tidsperiode.sluttdato).neste(),
                sluttdato: oldPeriode.tidsperiode.sluttdato
            }
        });
    }
    return opphold.length > 0 ? opphold : undefined;
}
