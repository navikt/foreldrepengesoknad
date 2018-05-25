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
    TimelineItemType
} from 'uttaksplan/components/timeline/types';
import { getAntallUttaksdagerITidsperiode } from 'uttaksplan/utils/uttaksdagerUtils';
import { UttaksplanIkonKeys } from 'uttaksplan/components/uttaksplan/UttaksplanIkon';

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
        } else if (periode.type === Periodetype.Stonadsperiode) {
            return ['uttak'];
        }
    }
    return undefined;
};

export const mapInnslagToEvent = (
    innslag: InnslagPeriodetype
): TimelineEvent => ({
    type: TimelineItemType.event,
    title:
        innslag.periode.type === Periodetype.Stonadsperiode
            ? 'Uttaksperiode'
            : 'Utsettelse',
    from: innslag.periode.tidsperiode.startdato,
    to: innslag.periode.tidsperiode.sluttdato,
    personName: innslag.periode.forelder,
    days: getAntallUttaksdagerITidsperiode(innslag.periode.tidsperiode),
    color: mapForelderTilInnslagfarge(innslag),
    labels: getLabelsForInnslag(innslag),
    icons: getTimelineIconsFromInnslag(innslag),
    data: innslag.periode
});

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
    innslag: Tidslinjeinnslag
): TimelineItem => {
    switch (innslag.type) {
        case TidslinjeinnslagType.hendelse:
            return mapInnslagToMarker(innslag);
        case TidslinjeinnslagType.periode:
            return mapInnslagToEvent(innslag);
    }
};
