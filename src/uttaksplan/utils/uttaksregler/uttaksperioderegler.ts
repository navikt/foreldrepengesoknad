import {
    StønadskontoType,
    Permisjonsregler,
    Dekningsgrad
} from 'uttaksplan/types';
import { Uttaksdagen } from 'uttaksplan/utils/dataUtils';

export interface StønadskontoRegler {
    stønadskontotype: StønadskontoType;
    tidligsteUttaksdato: Date;
    sisteUttaksdato: Date;
    maksUttaksdager: number;
}

export const getForeldrepengerFørFødselRegler = (
    termindato: Date,
    permisjonsregler: Permisjonsregler
): StønadskontoRegler => {
    const uttaksdager = permisjonsregler.antallUkerForeldrepengerFørFødsel * 5;
    return {
        stønadskontotype: StønadskontoType.ForeldrepengerFørFødsel,
        tidligsteUttaksdato: Uttaksdagen(termindato).leggTil(-uttaksdager),
        sisteUttaksdato: Uttaksdagen(termindato).forrige(),
        maksUttaksdager: uttaksdager
    };
};

export const getStønadskontoRegler = (
    konto: StønadskontoType,
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    permisjonsregler: Permisjonsregler
): StønadskontoRegler | undefined => {
    switch (konto) {
        case StønadskontoType.ForeldrepengerFørFødsel:
            return getForeldrepengerFørFødselRegler(
                termindato,
                permisjonsregler
            );
        default:
            return undefined;
    }
};
