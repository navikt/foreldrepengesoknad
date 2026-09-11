import { PeriodeDto_fpoversikt, UttakDto_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

/**
 * Fleire endepunkt (/saker, /annenPart) returnerer framleis den gamle, flate periodemodellen
 * (éin array-rad per forelder), sidan dei ikkje er migrerte til det nye intervall-baserte
 * PeriodeDto_fpoversikt-formatet. Desse hjelparane mappar kvar rad om til sitt eige
 * PeriodeDto_fpoversikt-intervall. slåSammenPeriodeDtoerPåIntervall (under) slår så saman
 * element med heilt likt fom/tom, slik at samtidig uttak (søkjar og annan part i same
 * tidsrom) blir eitt element med begge sider sett. Periodar med ulike grenser for same
 * tidsrom vert framleis ikkje slått saman — sjå kommentar der.
 */
const mapTilUttakDto = (periode: UttakPeriode_fpoversikt): UttakDto_fpoversikt => ({
    forelder: periode.forelder,
    kontoType: periode.kontoType,
    utsettelseÅrsak: periode.utsettelseÅrsak,
    overføringÅrsak: periode.overføringÅrsak,
    gradering: periode.gradering,
    morsAktivitet: periode.morsAktivitet,
    samtidigUttak: periode.samtidigUttak,
    flerbarnsdager: periode.flerbarnsdager,
    resultat: periode.resultat,
});

export const mapSøkersPeriodeTilPeriodeDto = (periode: UttakPeriode_fpoversikt): PeriodeDto_fpoversikt => ({
    fom: periode.fom,
    tom: periode.tom,
    søker: mapTilUttakDto(periode),
});

export const mapAnnenPartsPeriodeTilPeriodeDto = (periode: UttakPeriode_fpoversikt): PeriodeDto_fpoversikt => ({
    fom: periode.fom,
    tom: periode.tom,
    annenPart: mapTilUttakDto(periode),
});

/**
 * Slår saman PeriodeDto_fpoversikt-element som har heilt likt fom/tom-intervall, slik at t.d.
 * søkjar sin periode og annan part sin periode for same tidsrom (samtidig uttak) endar opp som
 * eitt element med begge sider sett, i staden for to overlappande element. Dette gjer at det
 * strukturelle opphaldssjekket (!søker && !!annenPart) berre slår til for reelle hol i søkjar
 * sin plan, ikkje for periodar der søkjar òg har eit eige uttak i same intervall.
 *
 * Periodar der grensene IKKJE er heilt like (t.d. søkjar tek dag 1–10, annan part dag 5–15)
 * blir framleis ikkje slått saman, sidan det ville kravd den no fjerna
 * prosesserPerioderForVisning-samanslåingslogikken. Dette er ei kjend, gjenverande forenkling
 * for prototypen.
 */
export const slåSammenPeriodeDtoerPåIntervall = (perioder: PeriodeDto_fpoversikt[]): PeriodeDto_fpoversikt[] => {
    const perIntervall = new Map<string, PeriodeDto_fpoversikt>();
    perioder.forEach((periode) => {
        const nøkkel = `${periode.fom}-${periode.tom}`;
        const eksisterande = perIntervall.get(nøkkel);
        perIntervall.set(nøkkel, {
            fom: periode.fom,
            tom: periode.tom,
            søker: eksisterande?.søker ?? periode.søker,
            annenPart: eksisterande?.annenPart ?? periode.annenPart,
            annenPartEøs: eksisterande?.annenPartEøs ?? periode.annenPartEøs,
        });
    });
    return Array.from(perIntervall.values());
};
