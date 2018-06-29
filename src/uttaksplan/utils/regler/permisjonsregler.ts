import { Permisjonsregler } from '../../types';

const reglerFomJuli2018: Permisjonsregler = {
    antallUkerTotalt100: 49,
    antallUkerFellesperiode100: 18,
    antallUkerTotalt80: 59,
    antallUkerFellesperiode80: 28,
    antallUkerForeldrepengerFørFødsel: 3,
    antallUkerMødrekvoteEtterFødsel: 6,
    antallUkerFedrekvote: 15,
    antallUkerMødrekvote: 15,
    maksAntallUkerForeldrepengerFørFødsel: 12,
    maksPermisjonslengdeIÅr: 3,
    maksFeriedagerEttÅr: 21,
    maksFeriedagerMedOverføring: 52
};

export const getPermisjonsregler = (): Permisjonsregler => {
    return reglerFomJuli2018;
};
