import { Feil } from 'app/components/skjema-input-element/types';

export type Skjemaelement =
    | 'årsak'
    | 'forelder'
    | 'startdato'
    | 'sluttdato'
    | 'feriedager'
    | 'tidsperiode';

export type Valideringsfeil = Map<Skjemaelement, Feil>;
