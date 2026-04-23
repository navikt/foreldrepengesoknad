import { Tidsperiode } from '@navikt/fp-types';

export type DokumentereMorsArbeidParams = {
    annenPartFødselsnummer: string;
    barnFødselsnummer?: string;
    familiehendelse: string;
    perioder: Array<Tidsperiode & { periodeType: 'UTSETTELSE' | 'UTTAK' }>;
};
