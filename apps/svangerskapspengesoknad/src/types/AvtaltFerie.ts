import { AvtaltFerieDto } from '@navikt/fp-types';

export type AvtaltFeriePerArbeidsgiver = {
    [arbeidsgiverId: string]: {
        skalHaFerie?: boolean;
        feriePerioder: AvtaltFerieDto[];
    };
};
