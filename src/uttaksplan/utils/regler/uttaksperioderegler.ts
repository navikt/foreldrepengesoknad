import {
    StønadskontoType,
    Permisjonsregler,
    Dekningsgrad
} from 'uttaksplan/types';
import { Uttaksdagen } from 'uttaksplan/utils';

export interface StønadskontoRegler {
    stønadskontotype: StønadskontoType;
    tidligsteUttaksdato: Date;
    sisteUttaksdato: Date;
    maksUttaksdager: number;
}

export const getForeldrepengerFørFødselRegler = (
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler
): StønadskontoRegler => {
    const uttaksdager = permisjonsregler.antallUkerForeldrepengerFørFødsel * 5;
    return {
        stønadskontotype: StønadskontoType.ForeldrepengerFørFødsel,
        tidligsteUttaksdato: Uttaksdagen(familiehendelsedato).leggTil(
            -uttaksdager
        ),
        sisteUttaksdato: Uttaksdagen(familiehendelsedato).forrige(),
        maksUttaksdager: uttaksdager
    };
};

export const getStønadskontoRegler = (
    konto: StønadskontoType,
    familiehendelsedato: Date,
    dekningsgrad: Dekningsgrad,
    permisjonsregler: Permisjonsregler
): StønadskontoRegler | undefined => {
    switch (konto) {
        case StønadskontoType.ForeldrepengerFørFødsel:
            return getForeldrepengerFørFødselRegler(
                familiehendelsedato,
                permisjonsregler
            );
        default:
            return undefined;
    }
};
