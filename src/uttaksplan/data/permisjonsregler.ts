import { Permisjonsregler } from '../types';
import { isBefore } from 'date-fns';

const reglerTomJuni: Permisjonsregler = {
    antallUkerTotalt100: 49,
    antallUkerFellesperiode100: 26,
    antallUkerTotalt80: 59,
    antallUkerFellesperiode80: 36,
    antallUkerForelder1FørFødsel: 3,
    antallUkerForelder1EtterFødsel: 6,
    antallUkerFedrekvote: 10,
    antallUkerMødrekvote: 10,
    maksPermisjonslengdeIÅr: 3,
    maksFeriedagerEttÅr: 21,
    maksFeriedagerMedOverføring: 52
};

const reglerFomJuli2018: Permisjonsregler = {
    antallUkerTotalt100: 49,
    antallUkerFellesperiode100: 18,
    antallUkerTotalt80: 59,
    antallUkerFellesperiode80: 28,
    antallUkerForelder1FørFødsel: 3,
    antallUkerForelder1EtterFødsel: 6,
    antallUkerFedrekvote: 15,
    antallUkerMødrekvote: 15,
    maksPermisjonslengdeIÅr: 3,
    maksFeriedagerEttÅr: 21,
    maksFeriedagerMedOverføring: 52
};

export const getPermisjonsregler = (termindato: Date): Permisjonsregler => {
    /** ny logikk skal tre i kraft fom 12. april 2018 */
    // if (isBefore(new Date(), new Date(2018, 3, 13))) {
    // return reglerTomJuni;
    // }
    return getPermisjonsreglerFom13April(termindato);
};

export const getPermisjonsreglerFom13April = (
    termindato: Date
): Permisjonsregler =>
    isBefore(termindato, new Date(2018, 6, 1))
        ? reglerTomJuni
        : reglerFomJuli2018;
