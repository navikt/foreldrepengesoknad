export interface Permisjonsregler {
    /** Antall uker som er forbeholdt mor før fødsel */
    maksAntallUkerForeldrepengerFørFødsel: number;
    /** Antall uker som er forbeholdt mor etter fødsel */
    /** Antall uker som er forbeholdt mor før fødsel */
    antallUkerForeldrepengerFørFødsel: number;
    antallUkerMødrekvoteEtterFødsel: number;
    maksPermisjonslengdeIÅr: number;
    /** Maks feriedager i ett år */
    maksFeriedagerEttÅr: number;
    /** Maks feriedager med overføring fra foregående år og forskudd fra nest år */
    maksFeriedagerMedOverføring: number;
}
