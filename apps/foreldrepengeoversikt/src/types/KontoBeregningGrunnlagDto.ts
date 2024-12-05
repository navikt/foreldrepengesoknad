import { RettighetType } from '@navikt/fp-common';

export type KontoBeregningGrunnlagDto = {
    rettighetstype: RettighetType;
    brukerrolle: 'MOR' | 'FAR' | 'MEDMOR' | 'UKJENT';
    antallBarn: number;
    fødselsdato?: string;
    termindato?: string;
    omsorgsovertakelseDato?: string;
    morHarUføretrygd: boolean;
    familieHendelseDatoNesteSak?: string;
};
