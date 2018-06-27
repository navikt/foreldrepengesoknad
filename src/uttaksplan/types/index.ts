export * from './periodetyper';
export * from '../../common/types';

export interface Permisjonsregler {
    /** Totalt antall uker ved 80% */
    antallUkerTotalt80: number;
    /** Totalt antall uker ved 100% */
    antallUkerTotalt100: number;
    /** Antall uker som er forbeholdt mor før fødsel */
    maksAntallUkerForeldrepengerFørFødsel: number;
    /** Antall uker som er forbeholdt mor etter fødsel */
    /** Antall uker som er forbeholdt mor før fødsel */
    antallUkerForeldrepengerFørFødsel: number;
    /** Antall uker som er forbeholdt mor etter fødsel */
    antallUkerMødrekvoteEtterFødsel: number;
    /** Mødrekvote */
    antallUkerMødrekvote: number;
    /** Fedrekvote */
    antallUkerFedrekvote: number;
    /** Antall uker som kan fordeles ved 80% */
    antallUkerFellesperiode80: number;
    /** Antall uker som kan fordeles ved 100% */
    antallUkerFellesperiode100: number;
    /** Frist for når en må ta ut siste permisjonsdag */
    maksPermisjonslengdeIÅr: number;
    /** Maks feriedager i ett år */
    maksFeriedagerEttÅr: number;
    /** Maks feriedager med overføring fra foregående år og forskudd fra nest år */
    maksFeriedagerMedOverføring: number;
}

export interface FellesperiodeFordeling {
    ukerForelder1: number;
    ukerForelder2: number;
}
