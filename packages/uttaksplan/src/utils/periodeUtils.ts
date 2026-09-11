import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isoWeekday from 'dayjs/plugin/isoWeek';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';

import {
    BrukerRolleSak_fpoversikt,
    EøsUttakDto_fpoversikt,
    MorsAktivitet,
    PeriodeDto_fpoversikt,
    RettighetType_fpoversikt,
    UttakDto_fpoversikt,
} from '@navikt/fp-types';
import { Tidsperioden, Uttaksdagen, Uttaksperioden } from '@navikt/fp-utils';

import { Uttaksplanperiode, erPeriodeDto } from '../types/UttaksplanPeriode';
import { ANTALL_UTTAKSDAGER_SEKS_UKER, ANTALL_UTTAKSDAGER_TRE_UKER } from './uttaksdagerKonstanter';

dayjs.extend(isSameOrAfter);
dayjs.extend(minMax);
dayjs.extend(isoWeekday);

// Vinduet er [familiehendelsesdato - 15 uttaksdager, familiehendelsesdato + 30 uttaksdager] –
// dvs. 3 veker før og 6 veker etter (matchar UI-validatoren).
const getAntallUttaksdagerIVinduRundtFødsel = (
    periodeFom: string,
    periodeTom: string,
    familiehendelsedato: string,
): number => {
    const familiehendelseSomUttaksdag = Uttaksdagen.denneEllerNeste(familiehendelsedato);
    const førsteDagIVindu = familiehendelseSomUttaksdag.getDatoAntallUttaksdagerTidligere(ANTALL_UTTAKSDAGER_TRE_UKER);
    // getDatoAntallUttaksdagerSenere(N) returnerer den (N+1)-te uttaksdagen frå familiehendelse,
    // så vi brukar (30 - 1) for å treffe den 30. (siste) uttaksdagen i seksvekersvinduet.
    const sisteDagIVindu = familiehendelseSomUttaksdag.getDatoAntallUttaksdagerSenere(ANTALL_UTTAKSDAGER_SEKS_UKER - 1);

    const overlappFom = dayjs(periodeFom).isAfter(førsteDagIVindu, 'day') ? periodeFom : førsteDagIVindu;
    const overlappTom = dayjs(periodeTom).isBefore(sisteDagIVindu, 'day') ? periodeTom : sisteDagIVindu;

    if (dayjs(overlappFom).isAfter(overlappTom, 'day')) {
        return 0;
    }

    return Uttaksdagen.denneEllerNeste(overlappFom).getUttaksdagerFremTilOgMedDato(overlappTom);
};

const fjernAvsluttendeNullerFraDesimal = (tekst: string): string => {
    if (!tekst.includes('.')) {
        return tekst;
    }

    let slutt = tekst.length;
    while (slutt > 0 && tekst[slutt - 1] === '0') {
        slutt -= 1;
    }

    return tekst[slutt - 1] === '.' ? tekst.slice(0, slutt - 1) : tekst.slice(0, slutt);
};

const getDesimalSomSkalertHeltall = (verdi: number): { verdi: bigint; skala: bigint } => {
    const tekst = verdi.toString().includes('e')
        ? fjernAvsluttendeNullerFraDesimal(verdi.toFixed(10))
        : verdi.toString();
    const [heltall, desimaler = ''] = tekst.split('.');

    return {
        verdi: BigInt(`${heltall}${desimaler}`),
        skala: 10n ** BigInt(desimaler.length),
    };
};

// virkedagar × prosent / 100, runda ned til 1 desimal og uttrykt i tideler (heiltal).
const tidelerNedrundet = (dager: number, prosent: number): number => {
    const { verdi, skala } = getDesimalSomSkalertHeltall(prosent);
    return Number((BigInt(dager) * verdi) / (skala * 10n));
};

/**
 * Reknar talet på trekkdagar for søkjar/annenPart si side av ein periode, i *tideler* (heiltal).
 *
 * Trekkdagar summerast i heiltal (tideler) i staden for desimaltal for å unngå
 * flyttalsfeil. Eit døme: ti graderte dagar à 0,6 dag gir i flyttal
 * 5,999999999999999 i staden for 6,0, og ein etterfølgjande `Math.floor` ville
 * då telje 5 dagar og late ein dag stå att som «ubrukt» i telleverket.
 *
 * Matchar fp-sak (`no.nav.foreldrepenger.regler.uttak ... TrekkdagerUtregningUtil`
 * / `Trekkdager`): trekkdagar = virkedagar × utbetalingsgrad / 100, runda *ned*
 * til 1 desimal (RoundingMode.DOWN) per periode.
 */
export const finnAntallTidelerÅTrekkeForSide = (
    periode: { fom: string; tom: string },
    side: UttakDto_fpoversikt,
    erFødsel: boolean,
    familiehendelsedato: string,
): number => {
    const arbeidstidprosent = side.gradering?.arbeidstidprosent;
    const samtidigUttak = side.samtidigUttak;
    const dager = Uttaksperioden.getAntallUttaksdager(periode);

    if (arbeidstidprosent) {
        const utbetalingsgrad = 100 - arbeidstidprosent;
        // Mor sin gradering i tidsrommet 3 veker før / 6 veker etter familiehendinga
        // gir ikkje forlenging av stønadsperioden – dagane i vinduet trekkjast som heile.
        if (erFødsel && side.forelder === 'MOR') {
            const dagerIVindu = getAntallUttaksdagerIVinduRundtFødsel(periode.fom, periode.tom, familiehendelsedato);
            const dagerUtenforVindu = dager - dagerIVindu;
            return dagerIVindu * 10 + tidelerNedrundet(dagerUtenforVindu, utbetalingsgrad);
        }
        return tidelerNedrundet(dager, utbetalingsgrad);
    }
    if (samtidigUttak !== undefined) {
        return tidelerNedrundet(dager, samtidigUttak);
    }
    return dager * 10;
};

// EØS-trekkdagar kjem ferdig utrekna (maks 1 desimal) frå fp-sak.
export const finnAntallTidelerÅTrekkeForEøs = (eøs: EøsUttakDto_fpoversikt): number => Math.round(eøs.trekkdager * 10);

export const erUttaksperiode = (periode: Uttaksplanperiode) =>
    erPeriodeDto(periode) && finnSider(periode).some((side) => Uttaksperioden.erUttaksperiode(side));

export const erPrematuruker = (periode: Uttaksplanperiode) =>
    erPeriodeDto(periode) && finnSider(periode).some((side) => Uttaksperioden.erPrematuruker(side));

export const erUtsettelsesperiode = (periode: Uttaksplanperiode) =>
    erPeriodeDto(periode) && finnSider(periode).some((side) => Uttaksperioden.erUtsettelsesperiode(side));

export const erOverføringsperiode = (periode: Uttaksplanperiode) =>
    erPeriodeDto(periode) && finnSider(periode).some((side) => Uttaksperioden.erOverføringsperiode(side));

export const erOppholdsperiode = (periode: Uttaksplanperiode) =>
    erPeriodeDto(periode) && Uttaksperioden.erOppholdsperiode(periode);

export const erAvslåttPeriode = (periode: Uttaksplanperiode) =>
    erPeriodeDto(periode) && finnSider(periode).some((side) => Uttaksperioden.erAvslåttPeriode(side));

// Dei to sidene (søker/annenPart) ein periode kan ha uttak for. EØS-sida er ikkje ei
// UttakDto_fpoversikt-side og handterast difor separat der det trengst (t.d. kvoteBeregning).
export const finnSider = (periode: PeriodeDto_fpoversikt): UttakDto_fpoversikt[] =>
    [periode.søker, periode.annenPart].filter((side): side is UttakDto_fpoversikt => side !== undefined);

export const finnSideForForelder = (
    periode: PeriodeDto_fpoversikt,
    forelder: BrukerRolleSak_fpoversikt,
): UttakDto_fpoversikt | undefined => {
    if (periode.søker?.forelder === forelder) {
        return periode.søker;
    }
    if (periode.annenPart?.forelder === forelder) {
        return periode.annenPart;
    }
    return undefined;
};

export const sorterPerioder = (a: { fom: string; tom: string }, b: { fom: string; tom: string }): number => {
    const aFom = dayjs(a.fom);
    const bFom = dayjs(b.fom);

    if (aFom.isBefore(bFom)) {
        return -1;
    }
    if (aFom.isAfter(bFom)) {
        return 1;
    }

    const aTom = dayjs(a.tom);
    const bTom = dayjs(b.tom);

    if (aTom.isBefore(bTom)) {
        return -1;
    }
    if (aTom.isAfter(bTom)) {
        return 1;
    }

    return 0;
};

export const sorterUttakPerioder = (p1: PeriodeDto_fpoversikt, p2: PeriodeDto_fpoversikt) => {
    const tidsperiode1 = { fom: p1.fom, tom: p1.tom };
    const tidsperiode2 = { fom: p2.fom, tom: p2.tom };

    const tidsperiode1String = Tidsperioden.forPeriode(tidsperiode1);
    const tidsperiode2String = Tidsperioden.forPeriode(tidsperiode2);

    if (tidsperiode1String.erGyldig() === false || tidsperiode2String.erGyldig() === false) {
        return tidsperiode1String.erGyldig() ? 1 : -1;
    }
    if (dayjs(tidsperiode1.fom).isSame(tidsperiode2.fom, 'day')) {
        return 1;
    }

    if (tidsperiode2String.erOmsluttetAv(tidsperiode1)) {
        return 1;
    }

    return dayjs(tidsperiode1.fom).isBefore(tidsperiode2.fom, 'day') ? -1 : 1;
};

export const harPeriodeDerMorsAktivitetIkkeErValgt = (
    rettighetType: RettighetType_fpoversikt,
    søker: BrukerRolleSak_fpoversikt,
    erIkkeSøkerSpesifisert: boolean,
    perioder?: ReadonlyArray<Uttaksplanperiode>,
    erFarOgFar?: boolean,
) => {
    if (erFarOgFar || rettighetType === 'ALENEOMSORG' || (søker === 'MOR' && !erIkkeSøkerSpesifisert) || !perioder) {
        return false;
    }

    const morHar100ProsentUttakOgGradering = (farPeriode: { fom: string; tom: string }) =>
        perioder.some((p) => {
            if (!erPeriodeDto(p)) {
                return false;
            }
            const morsSide = finnSideForForelder(p, 'MOR');
            if (!morsSide) {
                return false;
            }

            const overlapper = Tidsperioden.forPeriode({ fom: farPeriode.fom, tom: farPeriode.tom }).overlapper({
                fom: p.fom,
                tom: p.tom,
            });

            const morsTotalprosent = (morsSide.samtidigUttak ?? 0) + (morsSide.gradering?.arbeidstidprosent ?? 0);

            return overlapper && morsTotalprosent === 100;
        });

    return perioder.some((periode) => {
        if (!erPeriodeDto(periode)) {
            return false;
        }
        const farsSide = finnSideForForelder(periode, 'FAR_MEDMOR');
        if (!farsSide) {
            return false;
        }

        const erFarMedmorsKvote = farsSide.kontoType === 'FELLESPERIODE' || farsSide.kontoType === 'FORELDREPENGER';

        const erInnvilgetUtenMorsAktivitet =
            farsSide.resultat?.innvilget !== false &&
            farsSide.morsAktivitet === undefined &&
            farsSide.flerbarnsdager === false;

        return erFarMedmorsKvote && erInnvilgetUtenMorsAktivitet && !morHar100ProsentUttakOgGradering(periode);
    });
};

/**
 * Sjekker om innlogga brukar (søkjar) har ein periode med gradering der aktiviteten ikkje
 * er valt. Dette skjer typisk når ein plan kjem inn frå planleggar-appen (som ikkje veit om
 * søkjar sine arbeidsforhold) – då blir aktivitetstypen sett til 'ANNET' som markør.
 * Brukar må velje konkret arbeidsgiver/frilans/sjølvst. før planen kan sendast inn.
 *
 * Berre søkjar sine eigne periodar blir flagga – annen part sine periodar kan ein ikkje
 * oppgi aktivitet for i skjema, og dei skal difor ikkje blokkere innsending.
 */
export const harPeriodeMedUkjentGraderingsaktivitet = (
    perioder: ReadonlyArray<Uttaksplanperiode>,
    søker: BrukerRolleSak_fpoversikt,
) => {
    return perioder.some((periode) => {
        if (!erPeriodeDto(periode)) {
            return false;
        }
        const søkersSide = finnSideForForelder(periode, søker);
        const aktivitet = søkersSide?.gradering?.aktivitet;
        if (!aktivitet) {
            return false;
        }
        if (aktivitet.type === 'ANNET') {
            return true;
        }
        // Defensivt for eldre/innkomande planar: ORDINÆRT_ARBEID utan gyldig arbeidsgiver.
        if (aktivitet.type === 'ORDINÆRT_ARBEID') {
            const arbeidsgiverId = aktivitet.arbeidsgiver?.id;
            return !arbeidsgiverId || arbeidsgiverId === aktivitet.type;
        }
        return false;
    });
};

const erSiderLike = (a: UttakDto_fpoversikt | undefined, b: UttakDto_fpoversikt | undefined): boolean => {
    if (!a || !b) {
        return a === b;
    }
    return (
        a.flerbarnsdager === b.flerbarnsdager &&
        a.kontoType === b.kontoType &&
        a.forelder === b.forelder &&
        a.gradering?.arbeidstidprosent === b.gradering?.arbeidstidprosent &&
        a.gradering?.aktivitet === b.gradering?.aktivitet &&
        a.morsAktivitet === b.morsAktivitet &&
        a.utsettelseÅrsak === b.utsettelseÅrsak &&
        a.overføringÅrsak === b.overføringÅrsak &&
        a.resultat?.innvilget === b.resultat?.innvilget &&
        a.resultat?.trekkerDager === b.resultat?.trekkerDager &&
        a.resultat?.trekkerMinsterett === b.resultat?.trekkerMinsterett &&
        a.resultat?.årsak === b.resultat?.årsak &&
        a.samtidigUttak === b.samtidigUttak
    );
};

const erEøsSiderLike = (a: EøsUttakDto_fpoversikt | undefined, b: EøsUttakDto_fpoversikt | undefined): boolean => {
    if (!a || !b) {
        return a === b;
    }
    return a.kontoType === b.kontoType && a.trekkdager === b.trekkdager;
};

export const erPerioderEkslFomTomLike = (periode1: PeriodeDto_fpoversikt, periode2: PeriodeDto_fpoversikt) =>
    erSiderLike(periode1.søker, periode2.søker) &&
    erSiderLike(periode1.annenPart, periode2.annenPart) &&
    erEøsSiderLike(periode1.annenPartEøs, periode2.annenPartEøs);

export const erDetEksisterendePerioderEtterValgtePerioder = (
    allePerioder: PeriodeDto_fpoversikt[],
    valgtePerioder: Array<{ fom: string; tom: string }>,
) => {
    const sisteValgteDag = dayjs.max(valgtePerioder.map((p) => dayjs(p.tom)));
    const perioderEtterValgte = allePerioder.filter((p) => dayjs(p.tom).isAfter(sisteValgteDag));
    return perioderEtterValgte.length > 0;
};

export const erDetReadonlyPerioderEtterValgtePerioder = (
    allePerioder: PeriodeDto_fpoversikt[],
    valgtePerioder: Array<{ fom: string; tom: string }>,
    forelderSomHarLåstePerioder: BrukerRolleSak_fpoversikt | undefined,
) => {
    const sisteValgteDag = dayjs.max(valgtePerioder.map((p) => dayjs(p.tom)));
    const perioderEtterValgte = allePerioder.filter((p) => dayjs(p.tom).isAfter(sisteValgteDag));

    const harEøsEllerPleiepenger = perioderEtterValgte.some(
        (p) =>
            !!p.annenPartEøs ||
            p.søker?.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER' ||
            p.annenPart?.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER',
    );
    const harAnnenPartSomErLåst = forelderSomHarLåstePerioder
        ? perioderEtterValgte.some(
              (p) =>
                  p.søker?.forelder === forelderSomHarLåstePerioder ||
                  p.annenPart?.forelder === forelderSomHarLåstePerioder,
          )
        : false;

    return harEøsEllerPleiepenger || harAnnenPartSomErLåst;
};

export const getAktivitetskravOptions = (
    skalViseMorsAktivitetskravVedSamtidigUttak: boolean,
    erInnenforFørsteSeksUkerEtterFødsel = false,
): MorsAktivitet[] => {
    const aktivitetsKrav = [
        'ARBEID',
        'ARBEID_OG_UTDANNING',
        'TRENGER_HJELP',
        'INNLAGT',
        'INTROPROG',
        'KVALPROG',
        'UTDANNING',
    ] satisfies MorsAktivitet[];

    if (erInnenforFørsteSeksUkerEtterFødsel) {
        return aktivitetsKrav.filter((k) => k === 'INNLAGT' || k === 'TRENGER_HJELP');
    }

    return skalViseMorsAktivitetskravVedSamtidigUttak
        ? aktivitetsKrav.filter((k) => k !== 'INNLAGT' && k !== 'TRENGER_HJELP')
        : aktivitetsKrav;
};

export const getAktivitetskravTekst = (value: MorsAktivitet, intl: IntlShape) => {
    switch (value) {
        case 'ARBEID':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Arbeid' });
        case 'UTDANNING':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Utdanning' });
        case 'KVALPROG':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Kvalprog' });
        case 'INTROPROG':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Introprog' });
        case 'TRENGER_HJELP':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Trenger_hjelp' });
        case 'INNLAGT':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Innlagt' });
        case 'ARBEID_OG_UTDANNING':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Arbeid_og_utdanning' });
        default:
            return '';
    }
};
