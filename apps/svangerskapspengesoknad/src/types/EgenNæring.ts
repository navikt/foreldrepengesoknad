import { EgenNæring, Næringstype } from '@navikt/fp-types';

export const egenNæringId = 'næring';

export interface EndringAvNæringsinntektInformasjonDTO {
    dato: string;
    næringsinntektEtterEndring: number;
    forklaring: string;
}

export interface EgenNæringDTO
    extends Omit<
        EgenNæring,
        | 'pågående'
        | 'fomDato'
        | 'tomDato'
        | 'næringsinntekt'
        | 'endringAvNæringsinntektInformasjon'
        | 'varigEndringDato'
        | 'varigEndringInntektEtterEndring'
        | 'varigEndringBeskrivelse'
        | 'næringstype'
    > {
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjonDTO;
    næringsinntekt?: number;
    tidsperiode: {
        fom: string;
        tom: string;
    };
    næringstyper: Næringstype[];
}
