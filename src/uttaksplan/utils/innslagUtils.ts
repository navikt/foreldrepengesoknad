import {
    InnslagPeriodetype,
    InnslagHendelsetype,
    Tidslinjeinnslag,
    TidslinjeinnslagType
} from 'uttaksplan/components/tidslinje/types';
import { Periodetype, UtsettelseÅrsakType } from 'uttaksplan/types';
import {
    TimelineEvent,
    TimelineMarker,
    TimelineItem,
    TimelineLabel,
    TimelineItemColor,
    TimelineItemType,
    TimelineGap
} from 'uttaksplan/components/timeline/types';
import { UttaksplanIkonKeys } from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';
import { InjectedIntl } from 'react-intl';
import { tidsperiodeUtil, uttaksdagUtil } from 'uttaksplan/utils/dataUtils';
import { isBefore, isSameDay } from 'date-fns';

export const mapForelderTilInnslagfarge = (
    innslag: InnslagPeriodetype
): TimelineItemColor => {
    if (innslag.periode.type === Periodetype.Utsettelse) {
        return 'green';
    }
    return innslag.periode.forelder === 'forelder1' ? 'blue' : 'purple';
};

export const getLabelsForInnslag = (
    innslag: InnslagPeriodetype
): TimelineLabel[] | undefined => {
    if (innslag.periode.type === Periodetype.Utsettelse) {
        if (innslag.periode.årsak === UtsettelseÅrsakType.Sykdom) {
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

export const getTimelineIconsFromInnslag = (
    innslag: Tidslinjeinnslag
): UttaksplanIkonKeys[] | undefined => {
    if (innslag.type === 'hendelse') {
        if (innslag.hendelse === 'termin') {
            return ['termin'];
        }
    } else if (innslag.type === 'periode') {
        const { periode } = innslag;
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
    }
    return undefined;
};

export const mapInnslagToEvent = (
    innslag: InnslagPeriodetype,
    intl: InjectedIntl
): TimelineEvent | TimelineGap => {
    const { periode } = innslag;
    const getTittel = () => {
        if (periode.type === Periodetype.Uttak) {
            return `Uttaksperiode (${intl
                .formatMessage({
                    id: `stønadskontotype.${periode.konto}`
                })
                .toLowerCase()})`;
        } else if (periode.type === Periodetype.Utsettelse) {
            return `Utsettelse (${intl
                .formatMessage({
                    id: `utsettelsesårsak.${periode.årsak}`
                })
                .toLowerCase()})`;
        }
        return periode.type;
    };
    if (
        innslag.periode.type === Periodetype.Uttak ||
        innslag.periode.type === Periodetype.Utsettelse
    ) {
        return {
            type: TimelineItemType.event,
            title: getTittel(),
            startDate: periode.tidsperiode.startdato,
            endDate: periode.tidsperiode.sluttdato,
            personName: periode.forelder,
            days: tidsperiodeUtil(periode.tidsperiode).getAntallUttaksdager(),
            color: mapForelderTilInnslagfarge(innslag),
            labels: getLabelsForInnslag(innslag),
            icons: getTimelineIconsFromInnslag(innslag),
            data: periode
        };
    } else {
        const gapItem: TimelineGap = {
            type: TimelineItemType.gap,
            startDate: periode.tidsperiode.startdato,
            endDate: periode.tidsperiode.sluttdato,
            title: 'Opphold',
            days: tidsperiodeUtil(periode.tidsperiode).getAntallUttaksdager(),
            icons: getTimelineIconsFromInnslag(innslag),
            data: periode
        };
        return gapItem;
    }
};

export const mapInnslagToMarker = (
    innslag: InnslagHendelsetype
): TimelineMarker => ({
    type: TimelineItemType.marker,
    title: innslag.hendelse,
    startDate: innslag.dato,
    icons: getTimelineIconsFromInnslag(innslag),
    data: innslag
});

export const mapInnslagToTimelineItem = (
    innslag: Tidslinjeinnslag,
    intl: InjectedIntl
): TimelineItem => {
    switch (innslag.type) {
        case TidslinjeinnslagType.hendelse:
            return mapInnslagToMarker(innslag);
        case TidslinjeinnslagType.periode:
            return mapInnslagToEvent(innslag, intl);
    }
};

export const getTimelineItemsFromInnslag = (
    innslag: Tidslinjeinnslag[],
    intl: InjectedIntl
) => {
    const mappedItems: TimelineItem[] = [];
    const items = innslag.map((i) => mapInnslagToTimelineItem(i, intl));

    items.forEach((item, idx, arr) => {
        if (idx > 0 && item.type === TimelineItemType.event) {
            const prevItem = arr[idx - 1];
            const prevEndDate: Date =
                prevItem.type === TimelineItemType.marker
                    ? prevItem.startDate
                    : prevItem.endDate;

            const dager =
                uttaksdagUtil(prevEndDate).uttaksdagerFremTilDato(
                    item.startDate
                ) - (prevItem.type === TimelineItemType.marker ? 0 : 1);
            if (dager > 0) {
                const gap: TimelineGap = {
                    type: TimelineItemType.gap,
                    startDate: uttaksdagUtil(prevEndDate).neste(),
                    endDate: uttaksdagUtil(item.startDate).forrige(),
                    days: dager,
                    data: {},
                    title: 'Opphold'
                };
                mappedItems.push(gap);
            }
            if (
                isBefore(item.startDate, prevEndDate) ||
                (isSameDay(item.startDate, prevEndDate) &&
                    prevItem.type !== TimelineItemType.marker)
            ) {
                mappedItems.push({
                    ...item,
                    error: {
                        title: 'Datokonflikt'
                    }
                });
                return;
            }
        }

        mappedItems.push(item);
    });
    return mappedItems; // [...items, ...opphold].sort(sortItems);
};
