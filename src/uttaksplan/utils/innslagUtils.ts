import {
    InnslagPeriodetype,
    InnslagHendelsetype,
    Tidslinjeinnslag,
    TidslinjeinnslagType
} from 'uttaksplan/components/tidslinje/types';
import {
    Periodetype,
    UtsettelseÅrsakType,
    StønadskontoType
} from 'uttaksplan/types';
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
import { tidsperioden, uttaksdagUtil } from 'uttaksplan/utils/dataUtils';
import { isBefore, isSameDay } from 'date-fns';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

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
            return [UttaksplanIkonKeys.termin];
        }
    } else if (innslag.type === 'periode') {
        const { periode } = innslag;
        if (periode.type === Periodetype.Utsettelse) {
            if (periode.årsak === UtsettelseÅrsakType.Ferie) {
                return [UttaksplanIkonKeys.ferie];
            }
            if (periode.årsak === UtsettelseÅrsakType.Arbeid) {
                return [UttaksplanIkonKeys.arbeid];
            }
        } else if (periode.type === Periodetype.Uttak) {
            return [UttaksplanIkonKeys.uttak];
        } else if (periode.type === Periodetype.Opphold) {
            return [UttaksplanIkonKeys.advarsel];
        }
    }
    return undefined;
};

export const mapInnslagToEvent = (
    innslag: InnslagPeriodetype,
    intl: InjectedIntl,
    uttaksgrunnlag: Uttaksgrunnlag
): TimelineEvent | TimelineGap => {
    const { periode } = innslag;
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
        innslag.periode.type === Periodetype.Uttak ||
        innslag.periode.type === Periodetype.Utsettelse
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
            days: tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
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
    title: innslag.hendelse === 'termin' ? 'Termin' : 'Siste permisjonsdag',
    startDate: innslag.dato,
    icons: getTimelineIconsFromInnslag(innslag),
    data: innslag
});

export const mapInnslagToTimelineItem = (
    innslag: Tidslinjeinnslag,
    intl: InjectedIntl,
    uttaksgrunnlag: Uttaksgrunnlag
): TimelineItem => {
    switch (innslag.type) {
        case TidslinjeinnslagType.hendelse:
            return mapInnslagToMarker(innslag);
        case TidslinjeinnslagType.periode:
            return mapInnslagToEvent(innslag, intl, uttaksgrunnlag);
    }
};

export const getTimelineItemsFromInnslag = (
    innslag: Tidslinjeinnslag[],
    intl: InjectedIntl,
    uttaksgrunnlag: Uttaksgrunnlag
) => {
    const mappedItems: TimelineItem[] = [];
    const items = innslag.map((i) =>
        mapInnslagToTimelineItem(i, intl, uttaksgrunnlag)
    );

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
                (isBefore(item.startDate, prevEndDate) ||
                    (isSameDay(item.startDate, prevEndDate) &&
                        prevItem.type !== TimelineItemType.marker)) &&
                prevItem.type !== TimelineItemType.marker
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
