import { Periode } from '@navikt/fp-common';

export const getSamtidigUttaksprosent = (
    gradertPeriode: boolean | undefined,
    stillingsprosent: string | undefined,
): string => {
    return gradertPeriode && stillingsprosent ? (100 - Number.parseInt(stillingsprosent, 10)).toString() : '100';
};

export const getRelevantePerioder = (
    perioder: Periode[],
    endringssøknadPerioder: Periode[] | undefined,
    erEndringssøknad: boolean,
) => {
    if (erEndringssøknad && endringssøknadPerioder !== undefined) {
        return endringssøknadPerioder;
    }

    return perioder;
};
