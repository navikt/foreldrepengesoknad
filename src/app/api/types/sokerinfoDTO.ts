import { Kjønn } from '../../types/common';

export interface SøkerinfoDTO {
    søker: {
        fnr: string;
        fornavn: string;
        etternavn: string;
        mellomnavn?: string;
        fødselsdato: string;
        kjønn: Kjønn;
        ikkeNordiskEøsLand?: boolean;
        barn?: Array<{
            fnr: string;
            fornavn: string;
            etternavn: string;
            mellomnavn?: string;
            fødselsdato: string;
            kjønn: Kjønn;
            annenForelder?: {
                fnr: string;
                fornavn: string;
                etternavn: string;
                mellomnavn?: string;
                fødselsdato: string;
                kjønn: Kjønn;
                harOpplystOmSinPågåendeSak?: boolean;
            };
        }>;
    };
    arbeidsforhold?: Array<{
        arbeidsgiverId: string;
        arbeidsgiverIdType: string;
        arbeidsgiverNavn: string;
        stillingsprosent: number;
        fom: string;
        tom?: string;
    }>;
}
