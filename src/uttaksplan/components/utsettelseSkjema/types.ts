import { Feil } from 'app/components/skjema-input-element/types';

export type Skjemaelement =
    | 'arsak'
    | 'forelder'
    | 'startdato'
    | 'sluttdato'
    | 'feriedager'
    | 'tidsperiode';

export type Valideringsfeil = Map<Skjemaelement, Feil>;
