import {
    InnslagPeriodetype,
    InnslagHendelsetype,
    Tidslinjeinnslag,
    TidslinjeinnslagType
} from 'uttaksplan/components/tidslinje/types';
import { TimelineItemColor } from 'uttaksplan/components/timeline/items/TimelineItem';
import { Periodetype, UtsettelseArsakType } from 'uttaksplan/types';
import {
    TimelineEvent,
    TimelineMarker,
    TimelineItem,
    TimelineLabel
} from 'uttaksplan/components/timeline/types';
import { getAntallUttaksdagerITidsperiode } from 'uttaksplan/utils/uttaksdagerUtils';

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
        if (innslag.periode.arsak === UtsettelseArsakType.Sykdom) {
            return [
                {
                    text: 'Krav på dokumentasjon',
                    type: 'fokus'
                }
            ];
        }
    }
    return undefined;
};

export const mapInnslagToEvent = (
    innslag: InnslagPeriodetype
): TimelineEvent => ({
    type: 'event',
    title:
        innslag.periode.type === Periodetype.Stonadsperiode
            ? 'Uttaksperiode'
            : 'Utsettelse',
    from: innslag.periode.tidsperiode.startdato,
    to: innslag.periode.tidsperiode.sluttdato,
    personName: innslag.periode.forelder,
    days: getAntallUttaksdagerITidsperiode(innslag.periode.tidsperiode),
    color: mapForelderTilInnslagfarge(innslag),
    labels: getLabelsForInnslag(innslag)
});

export const mapInnslagToMarker = (
    innslag: InnslagHendelsetype
): TimelineMarker => ({
    type: 'marker',
    title: 'Marker',
    date: innslag.dato
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
