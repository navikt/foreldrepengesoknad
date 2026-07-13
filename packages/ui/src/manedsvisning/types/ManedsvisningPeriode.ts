/**
 * Dei fire kategoriane månadsvisninga skil visuelt mellom. Ulikt Calendar (som tek imot ein
 * open `CalendarPeriodColor`), brukar månadsvisninga ein snever, semantisk type som styrer både
 * farge og «micro card»-forma i cella.
 */
export type ManedsvisningPeriodeType = 'MOR' | 'FAR' | 'FELLES' | 'FERIE';

export type ManedsvisningPeriode = {
    fom: string;
    tom: string;
    type: ManedsvisningPeriodeType;
    srText: string;
    /** Viser eit lite varselmerke på perioden, t.d. når motparten manglar aktivitet. */
    harAdvarsel?: boolean;
};
