import { Feil } from 'common/components/skjema-input-element/types';

export type Skjemaelement =
    | 'årsak'
    | 'forelder'
    | 'startdato'
    | 'sluttdato'
    | 'feriedager'
    | 'tidsperiode';

export type Valideringsfeil = Map<Skjemaelement, Feil>;
