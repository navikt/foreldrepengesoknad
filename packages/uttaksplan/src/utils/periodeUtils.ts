import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isoWeekday from 'dayjs/plugin/isoWeek';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';

import {
    BrukerRolleSak_fpoversikt,
    MorsAktivitet,
    RettighetType_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Tidsperioden, Uttaksdagen, Uttaksperioden } from '@navikt/fp-utils';

import {
    Uttaksplanperiode,
    UttaksplanperiodeMedKunTapteDager,
    erEøsUttakPeriode,
    erVanligUttakPeriode,
} from '../types/UttaksplanPeriode';

dayjs.extend(isSameOrAfter);
dayjs.extend(minMax);
dayjs.extend(isoWeekday);

const ANTALL_UTTAKSDAGER_TRE_UKER = 15;
const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;

// Vinduet er [familiehendelsesdato - 15 uttaksdager, familiehendelsesdato + 30 uttaksdager] –
// dvs. 3 veker før og 6 veker etter (matchar UI-validatoren).
export const getAntallUttaksdagerIVinduRundtFødsel = (
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
    const tekst = verdi.toString().includes('e') ? fjernAvsluttendeNullerFraDesimal(verdi.toFixed(10)) : verdi.toString();
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
 * Reknar talet på trekkdagar for ein periode i *tideler* (heiltal).
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
export const finnAntallTidelerÅTrekke = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    erFødsel: boolean,
    familiehendelsedato: string,
): number => {
    if (erEøsUttakPeriode(periode)) {
        // EØS-trekkdagar kjem ferdig utrekna (maks 1 desimal) frå fp-sak.
        return Math.round(periode.trekkdager * 10);
    }

    const arbeidstidprosent = periode.gradering?.arbeidstidprosent;
    const samtidigUttak = periode.samtidigUttak;
    const dager = Uttaksperioden.getAntallUttaksdager(periode);

    if (arbeidstidprosent) {
        const utbetalingsgrad = 100 - arbeidstidprosent;
        // Mor sin gradering i tidsrommet 3 veker før / 6 veker etter familiehendinga
        // gir ikkje forlenging av stønadsperioden – dagane i vinduet trekkjast som heile.
        if (erFødsel && periode.forelder === 'MOR') {
            const dagerIVindu = getAntallUttaksdagerIVinduRundtFødsel(periode.fom, periode.tom, familiehendelsedato);
            const dagerUtenforVindu = dager - dagerIVindu;
            return dagerIVindu * 10 + tidelerNedrundet(dagerUtenforVindu, utbetalingsgrad);
        }
        return tidelerNedrundet(dager, utbetalingsgrad);
    }
    if (samtidigUttak) {
        return tidelerNedrundet(dager, samtidigUttak);
    }
    return dager * 10;
};

export const erUttaksperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.utsettelseÅrsak === undefined;
};

export const erPrematuruker = (periode: Uttaksplanperiode) => {
    return (
        erVanligUttakPeriode(periode) &&
        periode.kontoType !== undefined &&
        periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

export const erUtsettelsesperiode = (periode: Uttaksplanperiode) => {
    return (
        erVanligUttakPeriode(periode) &&
        periode.utsettelseÅrsak !== undefined &&
        periode.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

export const erOverføringsperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.overføringÅrsak !== undefined;
};

export const erOppholdsperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.oppholdÅrsak !== undefined;
};

export const erAvslåttPeriode = (periode: Uttaksplanperiode) => {
    return 'resultat' in periode && periode.resultat && periode.resultat.innvilget !== true;
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

export const sorterUttakPerioder = (
    p1: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    p2: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
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
    perioder?: UttaksplanperiodeMedKunTapteDager[] | Uttaksplanperiode[],
) => {
    if (rettighetType === 'ALENEOMSORG' || !perioder) {
        return false;
    }

    const morHar100ProsentUttakOgGradering = (farPeriode: UttakPeriode_fpoversikt) =>
        perioder.some((morPeriode) => {
            if (!erVanligUttakPeriode(morPeriode) || morPeriode.forelder !== 'MOR') {
                return false;
            }

            const overlapper = Tidsperioden.forPeriode({ fom: farPeriode.fom, tom: farPeriode.tom }).overlapper({
                fom: morPeriode.fom,
                tom: morPeriode.tom,
            });

            const morsTotalprosent = (morPeriode.samtidigUttak ?? 0) + (morPeriode.gradering?.arbeidstidprosent ?? 0);

            return overlapper && morsTotalprosent === 100;
        });

    return perioder.some((periode) => {
        if (!erVanligUttakPeriode(periode)) {
            return false;
        }

        const erFarMedmorsKvote =
            periode.forelder === 'FAR_MEDMOR' &&
            (periode.kontoType === 'FELLESPERIODE' || periode.kontoType === 'FORELDREPENGER');

        const erInnvilgetUtenMorsAktivitet =
            periode.resultat?.innvilget !== false &&
            periode.morsAktivitet === undefined &&
            periode.flerbarnsdager === false;

        return erFarMedmorsKvote && erInnvilgetUtenMorsAktivitet && !morHar100ProsentUttakOgGradering(periode);
    });
};

/**
 * Sjekker om noken periode har gradering der aktivitet-typen er ORDINÆRT_ARBEID, men
 * arbeidsgiver manglar. Dette skjer typisk når ein plan kjem inn frå planleggar-appen
 * (som ikkje veit om søkjar sine arbeidsforhold) – då blir aktivitetstypen brukt som
 * orgnummer, noko som er ugyldig. Brukar må velje konkret arbeidsgiver/frilans/sjølvst.
 * før planen kan sendast inn.
 */
export const harPeriodeMedUkjentGraderingsaktivitet = (
    perioder: UttaksplanperiodeMedKunTapteDager[] | Uttaksplanperiode[],
) => {
    return perioder.some((periode) => {
        if (!erVanligUttakPeriode(periode)) {
            return false;
        }
        const aktivitet = periode.gradering?.aktivitet;
        if (aktivitet?.type !== 'ORDINÆRT_ARBEID') {
            return false;
        }
        const arbeidsgiverId = aktivitet.arbeidsgiver?.id;
        return !arbeidsgiverId || arbeidsgiverId === aktivitet.type;
    });
};

export const erPerioderEkslFomTomLike = (
    periode1: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    periode2: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    if (
        (erEøsUttakPeriode(periode1) && !erEøsUttakPeriode(periode2)) ||
        (!erEøsUttakPeriode(periode1) && erEøsUttakPeriode(periode2))
    ) {
        return false;
    }

    if (erEøsUttakPeriode(periode1) && erEøsUttakPeriode(periode2)) {
        return periode1.kontoType === periode2.kontoType && periode1.trekkdager === periode2.trekkdager;
    }

    if (erVanligUttakPeriode(periode1) && erVanligUttakPeriode(periode2)) {
        return (
            periode1.flerbarnsdager === periode2.flerbarnsdager &&
            periode1.kontoType === periode2.kontoType &&
            periode1.forelder === periode2.forelder &&
            periode1.gradering?.arbeidstidprosent === periode2.gradering?.arbeidstidprosent &&
            periode1.gradering?.aktivitet === periode2.gradering?.aktivitet &&
            periode1.morsAktivitet === periode2.morsAktivitet &&
            periode1.oppholdÅrsak === periode2.oppholdÅrsak &&
            periode1.utsettelseÅrsak === periode2.utsettelseÅrsak &&
            periode1.overføringÅrsak === periode2.overføringÅrsak &&
            periode1.resultat?.innvilget === periode2.resultat?.innvilget &&
            periode1.resultat?.trekkerDager === periode2.resultat?.trekkerDager &&
            periode1.resultat?.trekkerMinsterett === periode2.resultat?.trekkerMinsterett &&
            periode1.resultat?.årsak === periode2.resultat?.årsak &&
            periode1.samtidigUttak === periode2.samtidigUttak
        );
    }

    return false;
};

export const erDetEksisterendePerioderEtterValgtePerioder = (
    allePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    valgtePerioder: Array<{ fom: string; tom: string }>,
) => {
    const sisteValgteDag = dayjs.max(valgtePerioder.map((p) => dayjs(p.tom)));
    const perioderEtterValgte = allePerioder.filter((p) => dayjs(p.tom).isAfter(sisteValgteDag));
    return perioderEtterValgte.length > 0;
};

export const erDetReadonlyPerioderEtterValgtePerioder = (
    allePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    valgtePerioder: Array<{ fom: string; tom: string }>,
    forelderSomHarLåstePerioder: BrukerRolleSak_fpoversikt | undefined,
) => {
    const sisteValgteDag = dayjs.max(valgtePerioder.map((p) => dayjs(p.tom)));
    const perioderEtterValgte = allePerioder.filter((p) => dayjs(p.tom).isAfter(sisteValgteDag));

    const harEøsEllerPleiepenger = perioderEtterValgte.some(
        (p) => erEøsUttakPeriode(p) || (erVanligUttakPeriode(p) && p.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER'),
    );
    const harAnnenPartSomErLåst = forelderSomHarLåstePerioder
        ? perioderEtterValgte.some((p) => erVanligUttakPeriode(p) && p.forelder === forelderSomHarLåstePerioder)
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
