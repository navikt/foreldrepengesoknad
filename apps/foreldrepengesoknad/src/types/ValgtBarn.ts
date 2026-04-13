import { AnnenForelderDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';

export enum ValgtBarnType {
    FØDT = 'født',
    UFØDT = 'ufødt',
    ADOPTERT = 'adoptert',
    IKKE_UTFYLT = 'ikkeUtfylt',
}

export type ValgtBarn = {
    id: string;
    type: ValgtBarnType;
    antallBarn: number;
    sortableDato: string;
    fnr?: string[];
    termindato?: string;
    fødselsdatoer?: string[];
    omsorgsovertagelse?: string;
    fornavn?: string[];
    kanSøkeOmEndring?: boolean;
    sak?: FpSak_fpoversikt;
    annenForelder?: AnnenForelderDto_fpoversikt;
    familiehendelsesdato?: string;
    startdatoFørsteStønadsperiode?: string;
    alleBarnaLever: boolean;
};
