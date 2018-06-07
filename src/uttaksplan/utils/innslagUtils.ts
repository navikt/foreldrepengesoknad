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
import { getAntallUttaksdagerITidsperiode } from 'uttaksplan/utils/uttaksdagerUtils';
import { UttaksplanIkonKeys } from 'uttaksplan/components/uttaksplanIkon/UttaksplanIkon';
import { InjectedIntl } from 'react-intl';

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
        if (innslag.periode.årsak === UtsettelseÅrsakType.SykdomSkade) {
            return [
                {
                    text: 'Krav på dokumentasjon',
                    type: 'fokus'
                }
            ];
        } else if (innslag.periode.årsak === UtsettelseÅrsakType.Ferie) {
            return [
                {
                    text: 'Krever dokumentasjon',
                    type: 'fokus'
                }
            ];
        }
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
        } else if (periode.type === Periodetype.Stønadsperiode) {
            return ['uttak'];
        } else if (periode.type === Periodetype.TaptPeriode) {
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
        if (periode.type === Periodetype.Stønadsperiode) {
            return `Stønadsperiode (${intl
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
        innslag.periode.type === Periodetype.Stønadsperiode ||
        innslag.periode.type === Periodetype.Utsettelse
    ) {
        return {
            type: TimelineItemType.event,
            title: getTittel(),
            from: periode.tidsperiode.startdato,
            to: periode.tidsperiode.sluttdato,
            personName: periode.forelder,
            days: getAntallUttaksdagerITidsperiode(periode.tidsperiode),
            color: mapForelderTilInnslagfarge(innslag),
            labels: getLabelsForInnslag(innslag),
            icons: getTimelineIconsFromInnslag(innslag),
            data: periode
        };
    } else {
        const gapItem: TimelineGap = {
            type: TimelineItemType.gap,
            from: periode.tidsperiode.startdato,
            to: periode.tidsperiode.sluttdato,
            title: 'Opphold',
            days: getAntallUttaksdagerITidsperiode(periode.tidsperiode),
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
    date: innslag.dato,
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
