import {
    Periode,
    Periodetype,
    StønadskontoType,
    UtsettelseÅrsakType
} from 'uttaksplan/types';
import { InjectedIntl } from 'react-intl';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';
import {
    TimelineEvent,
    TimelineGap,
    TimelineItemType,
    TimelineItemColor,
    TimelineLabel,
    TimelineMarker,
    TimelineItem
} from 'uttaksplan/components/timeline/types';
import { tidsperioden, uttaksdagUtil } from 'uttaksplan/utils/dataUtils';
import { UttaksplanIkonKeys } from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';
import { isBefore, isSameDay } from 'date-fns';

export const mapPeriodeToTimelineEvent = (
    periode: Periode,
    intl: InjectedIntl,
    uttaksgrunnlag: Uttaksgrunnlag
): TimelineEvent | TimelineGap | TimelineMarker => {
    const { søker, annenForelder } = uttaksgrunnlag;
    const getTittel = () => {
        if (periode.type === Periodetype.Uttak) {
            if (periode.konto === StønadskontoType.ForeldrepengerFørFødsel) {
                if (søker.erAleneOmOmsorg) {
                    return intl.formatMessage({
                        id: `stønadskontotype.${
                            StønadskontoType.Foreldrepenger
                        }`
                    });
                } else {
                    if (annenForelder === undefined) {
                        return intl.formatMessage({
                            id: `stønadskontotype.${
                                StønadskontoType.Foreldrepenger
                            }`
                        });
                    }
                }
                return intl.formatMessage({
                    id: `stønadskontotype.${periode.konto}`
                });
            }
            return intl.formatMessage({
                id: `stønadskontotype.${periode.konto}`
            });
        } else if (periode.type === Periodetype.Utsettelse) {
            return `${intl.formatMessage({
                id: `utsettelsesårsak.${periode.årsak}`
            })}`;
        }
        return periode.type;
    };
    if (
        periode.type === Periodetype.Uttak ||
        periode.type === Periodetype.Utsettelse
    ) {
        return {
            type: TimelineItemType.event,
            title: getTittel(),
            startDate: periode.tidsperiode.startdato,
            endDate: periode.tidsperiode.sluttdato,
            personName:
                periode.forelder === 'forelder2' && annenForelder
                    ? annenForelder.fornavn
                    : søker.fornavn,
            days: tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
            color: getColorsForPeriode(periode),
            labels: getLabelsForPeriode(periode),
            icons: getTimelineIconsForPeriode(periode),
            data: periode
        };
    } else {
        const gapItem: TimelineGap = {
            type: TimelineItemType.gap,
            startDate: periode.tidsperiode.startdato,
            endDate: periode.tidsperiode.sluttdato,
            title: 'Opphold',
            days: tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
            icons: getTimelineIconsForPeriode(periode),
            data: periode
        };
        return gapItem;
    }
};

const getColorsForPeriode = (periode: Periode): TimelineItemColor => {
    if (periode.type === Periodetype.Utsettelse) {
        return 'green';
    }
    return periode.forelder === 'forelder1' ? 'blue' : 'purple';
};

const getLabelsForPeriode = (periode: Periode): TimelineLabel[] | undefined => {
    if (periode.type === Periodetype.Utsettelse) {
        if (periode.årsak === UtsettelseÅrsakType.Sykdom) {
            return [
                {
                    text: 'Krav på dokumentasjon',
                    type: 'fokus'
                }
            ];
        }
        return undefined;
    }
    return undefined;
};

export const getTimelineIconsForPeriode = (
    periode: Periode
): UttaksplanIkonKeys[] | undefined => {
    if (periode.type === Periodetype.Utsettelse) {
        if (periode.årsak === UtsettelseÅrsakType.Ferie) {
            return ['ferie'];
        }
        if (periode.årsak === UtsettelseÅrsakType.Arbeid) {
            return ['arbeid'];
        }
    } else if (periode.type === Periodetype.Uttak) {
        return ['uttak'];
    } else if (periode.type === Periodetype.Opphold) {
        return ['advarsel'];
    }
    return undefined;
};

export function getTerminMarker(
    termindato: Date,
    erBarnetFødt: boolean
): TimelineMarker {
    return {
        type: TimelineItemType.marker,
        icons: ['termin'],
        title: erBarnetFødt ? 'Fødsel' : 'Termin',
        startDate: termindato,
        data: 'termin'
    };
}

export function getSistePermisjonsdagMarker(
    sistePermisjonsdag: Date
): TimelineMarker {
    return {
        type: TimelineItemType.marker,
        icons: [],
        title: 'Permisjonsslutt',
        startDate: sistePermisjonsdag
    };
}

export const sortTimelineItems = (item1: TimelineItem, item2: TimelineItem) => {
    if (isSameDay(item1.startDate, item2.startDate)) {
        if (item1.data === 'termin') {
            return -1;
        }
        return 1;
    }
    return isBefore(item1.startDate, item2.startDate) ? -1 : 1;
};

export function getGaps(items: TimelineItem[]) {
    const mappedItems: TimelineItem[] = [];
    const len = items.length;
    items.forEach((item, idx, arr) => {
        if (idx > 0) {
            const prevItem = arr[idx - 1];
            const prevEndDate: Date =
                prevItem.type === TimelineItemType.marker
                    ? prevItem.startDate
                    : prevItem.endDate;

            const dager =
                uttaksdagUtil(prevEndDate).uttaksdagerFremTilDato(
                    item.startDate
                ) -
                (prevItem.type === TimelineItemType.marker ||
                (item.type === TimelineItemType.marker && idx === len - 1)
                    ? 0
                    : 1);

            if (dager > 0) {
                const gap: TimelineGap = {
                    type: TimelineItemType.gap,
                    startDate: uttaksdagUtil(prevEndDate).neste(),
                    endDate: uttaksdagUtil(item.startDate).forrige(),
                    days:
                        dager +
                        (prevItem.type === TimelineItemType.marker ? 1 : 0),
                    data: {},
                    title: 'Opphold'
                };
                mappedItems.push(gap);
            }
            // if (
            //     (isBefore(item.startDate, prevEndDate) ||
            //         (isSameDay(item.startDate, prevEndDate) &&
            //             prevItem.type !== TimelineItemType.marker)) &&
            //     prevItem.type !== TimelineItemType.marker
            // ) {
            //     mappedItems.push({
            //         ...item,
            //         error: {
            //             title: 'Datokonflikt'
            //         }
            //     });
            //     return;
            // }
        }

        mappedItems.push(item);
    });
    return mappedItems;
}
