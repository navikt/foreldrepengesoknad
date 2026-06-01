import { IntlShape } from 'react-intl';

import { BrukerRolleSak_fpoversikt, RettighetType_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, getNavnGenitivEierform } from '@navikt/fp-utils';
import { assertUnreachable } from '@navikt/fp-validation';

import { LegendLabel } from '../../types/LegendLabel';
import {
    UttaksplanperiodeMedKunTapteDager,
    erEøsUttakPeriode,
    erTapteDagerHull,
    erVanligUttakPeriode,
} from '../../types/UttaksplanPeriode';
import { erAvslåttPeriode } from '../../utils/periodeUtils';

export type UttaksplanKalenderLegendInfo = {
    calendarPeriod: CalendarPeriod;
    label: LegendLabel;
    forelder?: 'MOR' | 'FAR_MEDMOR';
};

export type LegendIkon = 'FAMILIEHENDELSE' | 'BARNEHAGE';

/**
 * Kontekst som kallstedet må oppgi for å bygge legend-teksten.
 * `erSøkersPeriode` og `forelder` utledes fra perioden inne i getCalendarLabel.
 */
export type LegendTekstKontekst = {
    intl: IntlShape;
    navnAnnenPart: string;
    søker: BrukerRolleSak_fpoversikt;
    erIkkeSøkerSpesifisert: boolean;
    erMedmorDelAvSøknaden: boolean;
    harAktivitetsfriKvote: boolean;
    rettighetType: RettighetType_fpoversikt;
};

type LegendTekstArgs = LegendTekstKontekst & {
    erSøkersPeriode: boolean;
    forelder?: 'MOR' | 'FAR_MEDMOR';
};

type LegendLabelKonfig = {
    /** Visningsrekkefølge i legend-listen. -1 sorteres først (beholder tidligere adferd). */
    rekkefølge: number;
    /** Om brukeren kan klikke på legend-elementet for å markere perioden i kalenderen. */
    klikkbar: boolean;
    /** Eget ikon som vises i stedet for den vanlige fargeruten. */
    ikon?: LegendIkon;
    /** Bygger den oversatte teksten for legend-elementet. */
    tekst: (args: LegendTekstArgs) => string;
};

/**
 * Én rad per legend-type. Samler alt som styrer en legend på ett sted:
 * rekkefølge, om den er klikkbar, eventuelt ikon og hvordan teksten bygges.
 * Tidligere lå dette spredt over et sorterings-array, et «unselectable»-sett,
 * ikon-betingelser i komponenten og en stor switch.
 */
const LEGEND_LABELS: Record<LegendLabel, LegendLabelKonfig> = {
    MORS_DEL: {
        rekkefølge: 0,
        klikkbar: true,
        tekst: ({ navnAnnenPart, erIkkeSøkerSpesifisert, erSøkersPeriode, intl }) =>
            getMorsDelLabel(navnAnnenPart, erIkkeSøkerSpesifisert, erSøkersPeriode, intl),
    },
    MORS_DEL_GRADERT: {
        rekkefølge: 1,
        klikkbar: true,
        tekst: ({ navnAnnenPart, erIkkeSøkerSpesifisert, erSøkersPeriode, intl }) =>
            getMorsDelGradertLabel(navnAnnenPart, erIkkeSøkerSpesifisert, erSøkersPeriode, intl),
    },
    FARS_DEL: {
        rekkefølge: 2,
        klikkbar: true,
        tekst: ({
            navnAnnenPart,
            erIkkeSøkerSpesifisert,
            erSøkersPeriode,
            erMedmorDelAvSøknaden,
            harAktivitetsfriKvote,
            intl,
        }) =>
            getFarsDelLabel(
                navnAnnenPart,
                erIkkeSøkerSpesifisert,
                erSøkersPeriode,
                erMedmorDelAvSøknaden,
                harAktivitetsfriKvote,
                intl,
            ),
    },
    FARS_DEL_GRADERT: {
        rekkefølge: 3,
        klikkbar: true,
        tekst: ({
            navnAnnenPart,
            erIkkeSøkerSpesifisert,
            erSøkersPeriode,
            erMedmorDelAvSøknaden,
            harAktivitetsfriKvote,
            intl,
        }) =>
            getFarsDelGradertLabel(
                navnAnnenPart,
                erIkkeSøkerSpesifisert,
                erSøkersPeriode,
                erMedmorDelAvSøknaden,
                harAktivitetsfriKvote,
                intl,
            ),
    },
    FARS_DEL_AKTIVITETSFRI: {
        rekkefølge: 4,
        klikkbar: true,
        tekst: ({ erSøkersPeriode, navnAnnenPart, intl }) =>
            intl.formatMessage(
                { id: 'kalender.dinPeriode.aktivitetsfri' },
                { erSokersPeriode: erSøkersPeriode, navnAnnenPart },
            ),
    },
    FARS_DEL_AKTIVITETSFRI_GRADERT: {
        rekkefølge: 5,
        klikkbar: true,
        tekst: ({ erSøkersPeriode, navnAnnenPart, intl }) =>
            intl.formatMessage(
                { id: 'kalender.dinPeriode.aktivitetsfri.gradert' },
                { erSokersPeriode: erSøkersPeriode, navnAnnenPart },
            ),
    },
    SAMTIDIG_UTTAK: {
        rekkefølge: 6,
        klikkbar: true,
        tekst: ({ navnAnnenPart, erIkkeSøkerSpesifisert, intl }) =>
            getSamtidigUttakLabel(navnAnnenPart, erIkkeSøkerSpesifisert, intl),
    },
    UTSETTELSE: {
        rekkefølge: 7,
        klikkbar: true,
        tekst: ({ søker, rettighetType, erSøkersPeriode, navnAnnenPart, intl }) =>
            søker === 'FAR_MEDMOR' && rettighetType === 'BARE_SØKER_RETT'
                ? intl.formatMessage(
                      { id: 'kalender.utsettelse.pause.label' },
                      { erSokersPeriode: erSøkersPeriode, navnAnnenPart },
                  )
                : intl.formatMessage(
                      { id: 'kalender.utsettelse.label' },
                      { erSokersPeriode: erSøkersPeriode, navnAnnenPart },
                  ),
    },
    TAPTE_DAGER: {
        rekkefølge: 8,
        klikkbar: true,
        tekst: ({ erIkkeSøkerSpesifisert, erSøkersPeriode, navnAnnenPart, forelder, erMedmorDelAvSøknaden, intl }) =>
            getTapteDagerLabel(
                erIkkeSøkerSpesifisert,
                erSøkersPeriode,
                navnAnnenPart,
                forelder,
                erMedmorDelAvSøknaden,
                intl,
            ),
    },
    TERMIN: {
        rekkefølge: 9,
        klikkbar: true,
        ikon: 'FAMILIEHENDELSE',
        tekst: ({ intl }) => intl.formatMessage({ id: 'kalender.termin' }),
    },
    FØDSEL: {
        rekkefølge: 10,
        klikkbar: false,
        ikon: 'FAMILIEHENDELSE',
        tekst: ({ intl }) => intl.formatMessage({ id: 'kalender.fødsel' }),
    },
    ADOPSJON: {
        rekkefølge: 11,
        klikkbar: true,
        tekst: ({ intl }) => intl.formatMessage({ id: 'kalender.adopsjon' }),
    },
    BARNEHAGEPLASS: {
        rekkefølge: 12,
        klikkbar: false,
        ikon: 'BARNEHAGE',
        tekst: ({ intl }) => intl.formatMessage({ id: 'kalender.barnehageplass' }),
    },
    HELG: {
        rekkefølge: 13,
        klikkbar: false,
        tekst: ({ intl }) => intl.formatMessage({ id: 'kalender.helg' }),
    },
    FERIE: {
        rekkefølge: -1,
        klikkbar: true,
        tekst: ({ erSøkersPeriode, navnAnnenPart, intl }) =>
            intl.formatMessage({ id: 'kalender.ferie' }, { erSokersPeriode: erSøkersPeriode, navnAnnenPart }),
    },
    MORS_DEL_EØS: {
        rekkefølge: -1,
        klikkbar: true,
        tekst: ({ navnAnnenPart, erIkkeSøkerSpesifisert, intl }) =>
            getMorsDelEøsLabel(navnAnnenPart, erIkkeSøkerSpesifisert, intl),
    },
    FARS_DEL_EØS: {
        rekkefølge: -1,
        klikkbar: true,
        tekst: ({ navnAnnenPart, erIkkeSøkerSpesifisert, erMedmorDelAvSøknaden, intl }) =>
            getFarsDelEøsLabel(navnAnnenPart, erIkkeSøkerSpesifisert, erMedmorDelAvSøknaden, intl),
    },
    PLEIEPENGER: {
        rekkefølge: -1,
        klikkbar: true,
        tekst: ({ intl }) => intl.formatMessage({ id: 'kalender.avslagFratrekkPleiepenger' }),
    },
    AVSLAG: {
        rekkefølge: -1,
        klikkbar: true,
        tekst: ({ intl }) => intl.formatMessage({ id: 'kalender.avslag' }),
    },
};

export const sortLegendInfoByLabel = (a: UttaksplanKalenderLegendInfo, b: UttaksplanKalenderLegendInfo): number =>
    LEGEND_LABELS[a.label].rekkefølge - LEGEND_LABELS[b.label].rekkefølge;

export const erLegendLabelKlikkbar = (label: LegendLabel): boolean => LEGEND_LABELS[label].klikkbar;

export const getLegendIkon = (label: LegendLabel): LegendIkon | undefined => LEGEND_LABELS[label].ikon;

export const getSelectableStyle = (selectable: boolean) => {
    return selectable ? 'cursor-pointer ' : '';
};

export const getSelectedStyle = (isSelected: boolean, color: CalendarPeriodColor) => {
    if (isSelected) {
        if (color === 'GREEN' || color === 'GREENSTRIPED' || color === 'LIGHTGREEN' || color === 'LIGHTGREENBLUE') {
            return 'outline-2 outline-offset-4 outline-ax-success-600';
        }
        if (color === 'BLUE' || color === 'BLUESTRIPED' || color === 'LIGHTBLUE' || color === 'LIGHTBLUEGREEN') {
            return 'outline-2 outline-offset-4 outline-ax-accent-600';
        }
        if (color === 'BLUEOUTLINE') {
            return 'outline-2 outline-offset-4 outline-ax-accent-500';
        }
        if (color === 'BLACK') {
            return 'outline-2 outline-offset-4 outline-ax-bg-neutral-strong';
        }

        if (color !== 'BLACKOUTLINE' && color !== 'GRAY') {
            return 'outline-2 outline-offset-4 outline-ax-success-600';
        }
    }

    return '';
};

export const getFocusStyle = (color: CalendarPeriodColor) => {
    if (color === 'GREEN' || color === 'GREENSTRIPED' || color === 'LIGHTGREEN' || color === 'LIGHTGREENBLUE') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-success-600';
    }
    if (color === 'BLUE' || color === 'BLUESTRIPED' || color === 'LIGHTBLUE' || color === 'LIGHTBLUEGREEN') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-accent-600';
    }
    if (color === 'BLUEOUTLINE') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-accent-500';
    }
    if (color === 'BLACK') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-bg-neutral-strong';
    }

    if (color !== 'BLACKOUTLINE' && color !== 'GRAY') {
        return 'focus:outline-2 focus:outline-offset-4 focus:outline-ax-success-600';
    }

    return '';
};

export const getCalendarLabel = (info: UttaksplanKalenderLegendInfo, kontekst: LegendTekstKontekst): string => {
    const erSøkersPeriode =
        (kontekst.søker === 'MOR' && info.forelder === 'MOR') ||
        (kontekst.søker === 'FAR_MEDMOR' && info.forelder === 'FAR_MEDMOR');

    return LEGEND_LABELS[info.label].tekst({ ...kontekst, erSøkersPeriode, forelder: info.forelder });
};

const getSamtidigUttakLabel = (navnAnnenPart: string, erIkkeSøkerSpesifisert: boolean, intl: IntlShape): string => {
    if (erIkkeSøkerSpesifisert) {
        return intl.formatMessage({ id: 'kalender.samtidigUttak.planlegger' });
    }
    return intl.formatMessage({ id: 'kalender.samtidigUttak' }, { navnAnnenPart });
};

const getTapteDagerLabel = (
    erIkkeSøkerSpesifisert: boolean,
    erSøkersPeriode: boolean,
    navnAnnenPart: string,
    forelder: 'MOR' | 'FAR_MEDMOR' | undefined,
    erMedmorDelAvSøknaden: boolean,
    intl: IntlShape,
): string => {
    if (erIkkeSøkerSpesifisert && !!forelder) {
        if (forelder === 'MOR') {
            return intl.formatMessage({ id: 'kalender.tapteDager.mor' });
        }
        if (forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden) {
            return intl.formatMessage({ id: 'kalender.tapteDager.medmor' });
        }
        return intl.formatMessage({ id: 'kalender.tapteDager.far' });
    }

    if (erSøkersPeriode) {
        return intl.formatMessage({ id: 'kalender.tapteDager.du' });
    }

    return intl.formatMessage(
        { id: 'kalender.tapteDager.annenPartPeriode' },
        { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
    );
};

const getMorsDelLabel = (
    navnAnnenPart: string,
    erIkkeSøkerSpesifisert: boolean,
    erSøkersPeriode: boolean,
    intl: IntlShape,
): string => {
    if (erIkkeSøkerSpesifisert) {
        return intl.formatMessage({ id: 'kalender.morsPeriode' });
    }

    if (erSøkersPeriode) {
        return intl.formatMessage({ id: 'kalender.dinPeriode' });
    }

    return intl.formatMessage(
        { id: 'kalender.annenPartPeriode' },
        { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
    );
};

const getMorsDelEøsLabel = (navnAnnenPart: string, erIkkeSøkerSpesifisert: boolean, intl: IntlShape): string => {
    if (erIkkeSøkerSpesifisert) {
        return intl.formatMessage({ id: 'kalender.morsEøsPeriode' });
    }

    return intl.formatMessage(
        { id: 'kalender.annenPartEøsPeriode' },
        { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
    );
};

const getMorsDelGradertLabel = (
    navnAnnenPart: string,
    erIkkeSøkerSpesifisert: boolean,
    erSøkersPeriode: boolean,
    intl: IntlShape,
): string => {
    if (erIkkeSøkerSpesifisert) {
        return intl.formatMessage({ id: 'kalender.morsPeriode.gradert' });
    }

    if (erSøkersPeriode) {
        return intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
    }

    return intl.formatMessage({ id: 'kalender.annenPartPeriode.gradert' }, { navnAnnenPart });
};

const getFarsDelLabel = (
    navnAnnenPart: string,
    erIkkeSøkerSpesifisert: boolean,
    erSøkersPeriode: boolean,
    erMedmorDelAvSøknaden: boolean,
    harAktivitetsfriKvote: boolean,
    intl: IntlShape,
): string => {
    if (erIkkeSøkerSpesifisert) {
        if (erMedmorDelAvSøknaden) {
            return intl.formatMessage({ id: 'kalender.medmorsPeriode' });
        }
        return intl.formatMessage({ id: 'kalender.farsPeriode' });
    }

    if (harAktivitetsfriKvote) {
        // TODO (TOR) Her er det kun "du"
        return intl.formatMessage({ id: 'kalender.dinPeriode.medAktivitetskrav' });
    }

    if (erSøkersPeriode) {
        return intl.formatMessage({ id: 'kalender.dinPeriode' });
    }

    return intl.formatMessage(
        { id: 'kalender.annenPartPeriode' },
        { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
    );
};

const getFarsDelEøsLabel = (
    navnAnnenPart: string,
    erIkkeSøkerSpesifisert: boolean,
    erMedmorDelAvSøknaden: boolean,
    intl: IntlShape,
): string => {
    if (erIkkeSøkerSpesifisert) {
        if (erMedmorDelAvSøknaden) {
            return intl.formatMessage({ id: 'kalender.medmorsEøsPeriode' });
        }
        return intl.formatMessage({ id: 'kalender.farsEøsPeriode' });
    }

    return intl.formatMessage(
        { id: 'kalender.annenPartEøsPeriode' },
        { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
    );
};

const getFarsDelGradertLabel = (
    navnAnnenPart: string,
    erIkkeSøkerSpesifisert: boolean,
    erSøkersPeriode: boolean,
    erMedmorDelAvSøknaden: boolean,
    harAktivitetsfriKvote: boolean,
    intl: IntlShape,
): string => {
    if (erIkkeSøkerSpesifisert) {
        if (erMedmorDelAvSøknaden) {
            return intl.formatMessage({ id: 'kalender.medmorsPeriode.gradert' });
        }

        return intl.formatMessage({ id: 'kalender.farsPeriode.gradert' });
    }

    if (harAktivitetsfriKvote) {
        return intl.formatMessage({ id: 'kalender.dinPeriode.medAktivitetskrav.gradert' });
    }

    if (erSøkersPeriode) {
        return intl.formatMessage({ id: 'kalender.dinPeriode.gradert' });
    }

    return intl.formatMessage({ id: 'kalender.annenPartPeriode.gradert' }, { navnAnnenPart });
};

export const getLegendLabelFromPeriode = (
    p: UttaksplanperiodeMedKunTapteDager,
    erFarEllerMedmor: boolean,
): LegendLabel | undefined => {
    if (erAvslåttPeriode(p)) {
        if (erVanligUttakPeriode(p) && p.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER') {
            return 'PLEIEPENGER';
        }
        return 'AVSLAG';
    }

    if ((erVanligUttakPeriode(p) || erEøsUttakPeriode(p)) && p.kontoType) {
        switch (p.kontoType) {
            case 'FORELDREPENGER_FØR_FØDSEL':
                return 'MORS_DEL';
            case 'MØDREKVOTE':
            case 'FEDREKVOTE':
            case 'FELLESPERIODE':
            case 'FORELDREPENGER':
                if (erEøsUttakPeriode(p)) {
                    return erFarEllerMedmor ? 'MORS_DEL_EØS' : 'FARS_DEL_EØS';
                }

                if (p.morsAktivitet === 'IKKE_OPPGITT') {
                    if (p.gradering?.arbeidstidprosent) {
                        return 'FARS_DEL_AKTIVITETSFRI_GRADERT';
                    }

                    return 'FARS_DEL_AKTIVITETSFRI';
                }

                if (p.forelder === 'FAR_MEDMOR') {
                    if (p.samtidigUttak && p.samtidigUttak > 0) {
                        return 'SAMTIDIG_UTTAK';
                    }

                    if (p.gradering?.arbeidstidprosent) {
                        return 'FARS_DEL_GRADERT';
                    }

                    return 'FARS_DEL';
                }

                if (p.samtidigUttak && p.samtidigUttak > 0) {
                    return 'SAMTIDIG_UTTAK';
                }

                if (p.gradering?.arbeidstidprosent) {
                    return 'MORS_DEL_GRADERT';
                }

                return 'MORS_DEL';
            default:
                return assertUnreachable('Error: ukjent kontoType i getLegendLabelFromPeriode');
        }
    }

    if (erTapteDagerHull(p)) {
        return 'TAPTE_DAGER';
    }

    if (p.utsettelseÅrsak && p.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
        return 'FERIE';
    }

    return 'UTSETTELSE';
};
