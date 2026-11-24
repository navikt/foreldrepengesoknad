import type { EventPropertiesMap } from '@navikt/nav-dekoratoren-moduler';

import { AppName } from '@navikt/fp-types';

// Ambient global variable provided by dekoratoren runtime script. Declared inline so consuming packages see it when this file is compiled.
declare global {
    var dekoratorenAnalytics:
        | ((params?: { origin: string; eventName: string; eventData?: Record<string, unknown> }) => Promise<unknown>)
        | undefined;
}

type StandardEvents = Pick<
    EventPropertiesMap,
    | 'utvidbart kort åpnet'
    | 'utvidbart kort lukket'
    | 'les mer åpnet'
    | 'les mer lukket'
    | 'knapp klikket'
    | 'kopier-lenke'
    | 'fane byttet'
    | 'besøk'
>;

// Egne domenehendelser uten en tilsvarende hendelse i felles taksonomi.
type CustomEvents = {
    'skjema fortsett senere': undefined;
    'skjema avbrutt': undefined;
    'uttaksplan endret': { visning: 'kalender' | 'liste' };
    'registerdata utdatert': { avvik?: string };
};

type EventDataMap = StandardEvents & CustomEvents;
type UmamiEvent = {
    [Name in keyof EventDataMap]: {
        origin: AppName;
        eventName: Name;
    } & (undefined extends EventDataMap[Name]
        ? { eventData?: never }
        : Record<string, never> extends EventDataMap[Name]
          ? { eventData?: EventDataMap[Name] }
          : { eventData: EventDataMap[Name] });
}[keyof EventDataMap];

export const loggUmamiEvent = ({ origin, eventName, eventData }: UmamiEvent) => {
    if (import.meta.env.MODE === 'production') {
        const analytics = typeof dekoratorenAnalytics === 'function' ? dekoratorenAnalytics : undefined;
        if (analytics) {
            void analytics({
                origin,
                eventName,
                eventData: { ...eventData, seksjon: 'ytelse' },
            });
        }
    }
};
