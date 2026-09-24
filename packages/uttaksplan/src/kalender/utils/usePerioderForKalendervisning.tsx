import { ExclamationmarkTriangleFillIcon, HeartFillIcon, TeddyBearFillIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

import {
    Barn,
    BrukerRolleSak_fpoversikt,
    EøsUttakDto_fpoversikt,
    NavnPåForeldre,
    PeriodeDto_fpoversikt,
    RettighetType_fpoversikt,
    UttakDto_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
} from '@navikt/fp-types';
import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { Tidsperioden, Uttaksdagen, formaterDatoUtenDag, getFamiliehendelsedato } from '@navikt/fp-utils';
import { assertUnreachable } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { UttaksplanperiodeMedKunTapteDager, erPeriodeDto, erTapteDagerHull } from '../../types/UttaksplanPeriode';
import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';
import {
    erAvslåttPeriode,
    erUttaksperiode,
    finnPartForForelder,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
} from '../../utils/periodeUtils';

// Éin merga periode kan ha inntil tre partar (søker/annenPart/annenPartEøs) samtidig – t.d. ved
// samtidig uttak (begge partar har eit uttak) eller opphald (kun annenPart har eit uttak). Denne
// hjelparen vel ut kva EIN part som skal styra tekst/farge når vi ikkje treng begge samtidig,
// med prioritet søker > annenPart > annenPartEøs (matchar tidlegare deduplisering som alltid
// beheldt søkjar sin flate rad når to rader fanst for same intervall).
type VisningsPart = { type: 'UTTAK'; part: UttakDto_fpoversikt } | { type: 'EØS'; part: EøsUttakDto_fpoversikt };

const finnVisningsPart = (periode: UttaksplanperiodeMedKunTapteDager): VisningsPart | undefined => {
    if (!erPeriodeDto(periode)) {
        return undefined;
    }
    if (periode.søker) {
        return { type: 'UTTAK', part: periode.søker };
    }
    if (periode.annenPart) {
        return { type: 'UTTAK', part: periode.annenPart };
    }
    if (periode.annenPartEøs) {
        return { type: 'EØS', part: periode.annenPartEøs };
    }
    return undefined;
};

export const usePerioderForKalendervisning = (
    endredePerioder: Array<{ fom: string; tom: string }>,
    barnehagestartdato?: string,
): CalendarPeriod[] => {
    const intl = useIntl();

    const {
        barn,
        foreldreInfo: { søker, navnPåForeldre, rettighetType, erIkkeSøkerSpesifisert, erFarOgFar },
        familiehendelsedato,
        perioder,
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();

    const saksperioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    const erFarEllerMedmor = søker === 'FAR_MEDMOR';

    const kalenderPerioder = saksperioderInkludertTapteDager.reduce<CalendarPeriod[]>((acc, periode) => {
        const color = getKalenderFargeForPeriode(periode, erFarEllerMedmor);
        const isUpdated = endredePerioder.some((p) => p.fom === periode.fom && p.tom === periode.tom);

        const perioderMedBarnehageOgFamiliehendelse = lagBarnehageOgfamiliehendelsePeriode(
            intl,
            barn,
            color,
            familiehendelsedato,
            barnehagestartdato,
            periode,
        );

        if (dayjs(familiehendelsedato).isBetween(periode.fom, periode.tom, 'day', '[]')) {
            return [
                ...acc,
                ...perioderMedBarnehageOgFamiliehendelse,
                ...splittPeriodeITo(
                    periode,
                    familiehendelsedato,
                    color,
                    navnPåForeldre,
                    intl,
                    isUpdated,
                    rettighetType,
                    perioder,
                    kanVelgeArbeidsgiver,
                    søker,
                    erIkkeSøkerSpesifisert ?? false,
                    erFarOgFar,
                ),
            ];
        }

        if (
            barnehagestartdato !== undefined &&
            dayjs(barnehagestartdato).isBetween(periode.fom, periode.tom, 'day', '[]')
        ) {
            return [
                ...acc,
                ...perioderMedBarnehageOgFamiliehendelse,
                ...splittPeriodeITo(
                    periode,
                    barnehagestartdato,
                    color,
                    navnPåForeldre,
                    intl,
                    isUpdated,
                    rettighetType,
                    perioder,
                    kanVelgeArbeidsgiver,
                    søker,
                    erIkkeSøkerSpesifisert ?? false,
                    erFarOgFar,
                ),
            ];
        }

        return [
            ...acc,
            ...perioderMedBarnehageOgFamiliehendelse,
            {
                fom: periode.fom,
                tom: periode.tom,
                color,
                srText: getKalenderSkjermlesertekstForPeriode(periode, navnPåForeldre, intl),
                isUpdated,
                ...leggTilVarselikonVedManglendeObligatoriskeValg(
                    rettighetType,
                    periode,
                    perioder,
                    kanVelgeArbeidsgiver,
                    søker,
                    erIkkeSøkerSpesifisert ?? false,
                    erFarOgFar,
                ),
            } satisfies CalendarPeriod,
        ];
    }, []);

    if (!saksperioderInkludertTapteDager.some((p) => Tidsperioden.forPeriode(p).inneholderDato(familiehendelsedato))) {
        kalenderPerioder.push(lagFamiliehendelseDato(familiehendelsedato, 'NONE', barn, intl));
    }
    if (
        barnehagestartdato &&
        !saksperioderInkludertTapteDager.some((p) => Tidsperioden.forPeriode(p).inneholderDato(barnehagestartdato))
    ) {
        kalenderPerioder.push(lagBarnehagedatoPeriode(barnehagestartdato, 'NONE', intl));
    }

    kalenderPerioder.sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)));

    return kalenderPerioder;
};

const lagBarnehageOgfamiliehendelsePeriode = (
    intl: IntlShape,
    barn: Barn,
    color: CalendarPeriodColor,
    familiehendelsedato: string,
    barnehagedato?: string,
    periode?: UttaksplanperiodeMedKunTapteDager,
): CalendarPeriod[] => {
    const perioder: CalendarPeriod[] = [];
    if (barnehagedato !== undefined && (!periode || Tidsperioden.forPeriode(periode).inneholderDato(barnehagedato))) {
        perioder.push(lagBarnehagedatoPeriode(barnehagedato, color, intl));
    }

    if (!periode || Tidsperioden.forPeriode(periode).inneholderDato(familiehendelsedato)) {
        perioder.push(lagFamiliehendelseDato(familiehendelsedato, color, barn, intl));
    }

    return perioder;
};

export const getKalenderFargeForPeriode = (
    periode: UttaksplanperiodeMedKunTapteDager,
    erFarEllerMedmor: boolean,
): CalendarPeriodColor => {
    if (erTapteDagerHull(periode)) {
        return 'BLACK';
    }

    if (!erPeriodeDto(periode)) {
        return 'NONE';
    }

    if (erAvslåttPeriode(periode)) {
        const avslåttPart = periode.søker ?? periode.annenPart;
        if (avslåttPart?.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
            return 'DARKGRAY';
        }
        return 'BLACKOUTLINE';
    }

    // Samtidig uttak kjem no ferdig utfylt på begge partar frå backend, ingen kryss-oppslag mot
    // andre rader trengst lenger (jf. Uttaksperioden.erSamtidigUttak).
    if (
        erUttaksperiode(periode) &&
        (periode.søker?.samtidigUttak !== undefined || periode.annenPart?.samtidigUttak !== undefined)
    ) {
        return erFarEllerMedmor ? 'LIGHTBLUEGREEN' : 'LIGHTGREENBLUE';
    }

    if (periode.annenPartEøs) {
        return erFarEllerMedmor ? 'BLUE_WITH_BLACK_OUTLINE' : 'GREEN_WITH_BLACK_OUTLINE';
    }

    // Opphald (kun annenPart har uttak, søkjar har «pause») treng ingen eigen fargelogikk her –
    // annenPart sin eigen farge (under) blir brukt akkurat som om det var søkjar sin periode.
    const part = periode.søker ?? periode.annenPart;
    if (!part) {
        return 'NONE';
    }

    if (part.utsettelseÅrsak) {
        if (part.utsettelseÅrsak === 'FERIE') {
            return 'BLUEOUTLINE';
        }
        return 'BEIGEOUTLINE';
    }

    if (part.forelder === 'MOR') {
        if (part.gradering && part.gradering.arbeidstidprosent > 0) {
            return 'BLUESTRIPED';
        }

        return 'BLUE';
    }

    if (part.forelder === 'FAR_MEDMOR') {
        if (part.gradering && part.gradering.arbeidstidprosent > 0) {
            return 'GREENSTRIPED';
        }
        if (part.kontoType === 'FORELDREPENGER' && part.morsAktivitet === 'IKKE_OPPGITT') {
            return 'GREENOUTLINE';
        }

        return 'GREEN';
    }

    return 'NONE';
};

const getFamiliehendelseKalendarLabelForSkjermleser = (barn: Barn, intl: IntlShape): string => {
    if (!isAdoptertBarn(barn)) {
        return isFødtBarn(barn)
            ? intl.formatMessage({ id: 'kalender.fødsel' })
            : intl.formatMessage({ id: 'kalender.termin' });
    }
    return intl.formatMessage({ id: 'kalender.adopsjon' });
};

const getSkjermlesertekstForFamiliehendelse = (barn: Barn, intl: IntlShape): string => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsenavn = getFamiliehendelseKalendarLabelForSkjermleser(barn, intl);
    return intl.formatMessage(
        { id: 'kalender.skjermleser.familiehendelse' },
        { familiehendelsenavn, dato: formaterDatoUtenDag(familiehendelsesdato) },
    );
};

const getKalenderSkjermlesertekstForPeriode = (
    periode: UttaksplanperiodeMedKunTapteDager,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
): string => {
    const periodeNavn = getKalenderSkjermleserPeriodetekst(periode, navnPåForeldre, intl);
    return intl.formatMessage(
        { id: 'kalender.skjermleser.periode' },
        {
            periodeNavn,
            fraDato: formaterDatoUtenDag(periode.fom),
            tilDato: formaterDatoUtenDag(periode.tom),
        },
    );
};

const getKalenderSkjermleserPeriodetekst = (
    periode: UttaksplanperiodeMedKunTapteDager,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
): string => {
    const visning = finnVisningsPart(periode);
    const erEøs = visning?.type === 'EØS';

    // NB: EØS-sida har ikkje noko eige `forelder`-felt i DTO-en (ho gjeld alltid annenPart, men
    // ikkje kva rolle annenPart har) – held difor same forenkling som før migreringa og syner
    // farMedmor sitt namn for EØS-periodar. Sjå oppsummeringa for meir kontekst.
    const navn = erEøs || visning?.part.forelder === 'FAR_MEDMOR' ? navnPåForeldre.farMedmor : navnPåForeldre.mor;

    const periodenTilhører = intl.formatMessage({ id: 'kalender.srText.PeriodenTil' }, { navn });

    if (erAvslåttPeriode(periode)) {
        const avslåttPart = visning?.type === 'UTTAK' ? visning.part : undefined;
        if (avslåttPart?.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
            return periodenTilhører + intl.formatMessage({ id: 'kalender.avslagFratrekkPleiepenger' });
        }
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AvslåttPeriode' });
    }

    if (erTapteDagerHull(periode)) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.TapteDager' });
    }

    const kontoType = visning?.part.kontoType;
    if (kontoType) {
        switch (kontoType) {
            case 'FORELDREPENGER_FØR_FØDSEL':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerFørFødsel' });
            case 'MØDREKVOTE':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Mødrekvote' });
            case 'FEDREKVOTE':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Fedrekvote' });
            case 'FELLESPERIODE':
                return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Fellesperiode' });
            case 'FORELDREPENGER':
                return finnSkjermleserTekstForKvoteForeldrepenger(visning, periodenTilhører, intl);
            default:
                return assertUnreachable('Error: ukjent kontoType i getKalenderSkjermleserPeriodetekst');
        }
    }

    if (erPeriodeDto(periode) && periode.søker?.utsettelseÅrsak === 'FERIE') {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.LovbestemtFerie' });
    }

    return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.Utsettelse' });
};

const finnSkjermleserTekstForKvoteForeldrepenger = (
    visning: VisningsPart,
    periodenTilhører: string,
    intl: IntlShape,
): string => {
    if (visning.type === 'EØS') {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerIkkeGradert' });
    }

    const { part } = visning;

    if (part.morsAktivitet === 'IKKE_OPPGITT') {
        if (part.gradering?.arbeidstidprosent) {
            return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AktivitetsfrieDelGradert' });
        }

        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.AktivitetsfrieIkkeGradert' });
    }

    if (part.samtidigUttak && part.samtidigUttak > 0) {
        return intl.formatMessage({ id: 'kalender.srText.SamtidigUttaksperiode' });
    }

    if (part.gradering?.arbeidstidprosent) {
        return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerGradert' });
    }

    return periodenTilhører + intl.formatMessage({ id: 'kalender.srText.ForeldrepengerIkkeGradert' });
};

const splittPeriodeITo = (
    periode: UttaksplanperiodeMedKunTapteDager,
    dato: string,
    color: CalendarPeriodColor,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
    isUpdated: boolean,
    rettighetType: RettighetType_fpoversikt,
    allePerioder: PeriodeDto_fpoversikt[],
    kanVelgeArbeidsgiver: boolean,
    søker: BrukerRolleSak_fpoversikt,
    erIkkeSøkerSpesifisert: boolean,
    erFarOgFar: boolean | undefined,
): CalendarPeriod[] => {
    const forrige = Uttaksdagen.forrige(dato).getDato();
    const neste = Uttaksdagen.neste(dato).getDato();
    const ikonProps = leggTilVarselikonVedManglendeObligatoriskeValg(
        rettighetType,
        periode,
        allePerioder,
        kanVelgeArbeidsgiver,
        søker,
        erIkkeSøkerSpesifisert,
        erFarOgFar,
    );

    const lagPeriode = (fom: string, tom: string): CalendarPeriod => ({
        fom,
        tom,
        color,
        srText: getKalenderSkjermlesertekstForPeriode({ ...periode, fom, tom }, navnPåForeldre, intl),
        isUpdated,
        ...ikonProps,
    });

    if (dato === periode.fom) {
        return [lagPeriode(neste, periode.tom)];
    }

    if (dato === periode.tom) {
        return [lagPeriode(periode.fom, forrige)];
    }

    return [lagPeriode(periode.fom, forrige), lagPeriode(neste, periode.tom)];
};

const leggTilVarselikonVedManglendeObligatoriskeValg = (
    rettighetType: RettighetType_fpoversikt,
    periode: UttaksplanperiodeMedKunTapteDager,
    allePerioder: PeriodeDto_fpoversikt[],
    kanVelgeArbeidsgiver: boolean,
    søker: BrukerRolleSak_fpoversikt,
    erIkkeSøkerSpesifisert: boolean,
    erFarOgFar?: boolean,
) => {
    // Byggjer syntetiske periodar med KUN mors part, slik at den delte sjekk-funksjonen ikkje
    // ved eit uhell finn far/medmor sine data frå ei anna, urelatert (t.d. samtidig uttak-)rad.
    const morsPerioder: PeriodeDto_fpoversikt[] = allePerioder.flatMap((p) => {
        const morsPart = finnPartForForelder(p, 'MOR');
        return morsPart ? [{ fom: p.fom, tom: p.tom, søker: morsPart }] : [];
    });

    if (
        harPeriodeDerMorsAktivitetIkkeErValgt(
            rettighetType,
            søker,
            erIkkeSøkerSpesifisert,
            [periode, ...morsPerioder],
            erFarOgFar,
        ) ||
        (kanVelgeArbeidsgiver && harPeriodeMedUkjentGraderingsaktivitet([periode], søker))
    ) {
        return {
            icon: <ExclamationmarkTriangleFillIcon aria-hidden color="var(--ax-warning-600)" />,
            iconFull: false,
        };
    }
    return {};
};

const lagFamiliehendelseDato = (
    familiehendelsedato: string,
    color: CalendarPeriodColor,
    barn: Barn,
    intl: IntlShape,
): CalendarPeriod => {
    return {
        fom: familiehendelsedato,
        tom: familiehendelsedato,
        color,
        srText: getSkjermlesertekstForFamiliehendelse(barn, intl),
        icon: <HeartFillIcon aria-hidden color="var(--ax-bg-brand-magenta-strong)" width={25} height={25} />,
        iconFull: true,
    };
};

const lagBarnehagedatoPeriode = (
    barnehagedato: string,
    color: CalendarPeriodColor,
    intl: IntlShape,
): CalendarPeriod => {
    return {
        fom: barnehagedato,
        tom: barnehagedato,
        color,
        srText: intl.formatMessage({ id: 'kalender.barnehageplass' }),
        icon: <TeddyBearFillIcon aria-hidden color="var(--ax-brand-beige-800)" width={25} height={25} />,
        iconFull: true,
    };
};
