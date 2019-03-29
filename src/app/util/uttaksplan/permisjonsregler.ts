import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';

const reglerFomJuli2018: Permisjonsregler = {
    antallUkerForeldrepengerFørFødsel: 3,
    antallUkerMødrekvoteEtterFødsel: 6,
    maksAntallUkerForeldrepengerFørFødsel: 12,
    maksPermisjonslengdeIÅr: 3,
    maksFeriedagerEttÅr: 21,
    maksFeriedagerMedOverføring: 52
};

export const getPermisjonsregler = (): Permisjonsregler => {
    return reglerFomJuli2018;
};
