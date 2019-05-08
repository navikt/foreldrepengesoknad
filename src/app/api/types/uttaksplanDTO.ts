export interface UttaksplanDTO {
    grunnlag: {
        familieHendelseType: string;
        familieHendelseDato: string;
        dekningsgrad: number;
        antallBarn: number;
        søkerErFarEllerMedmor: boolean;
        morErAleneOmOmsorg: boolean;
        morHarRett: boolean;
        morErUfør: boolean;
        farMedmorErAleneOmOmsorg: boolean;
        farMedmorHarRett: boolean;
        søkerKjønn: string;
        /** Mangler */
        annenForelderKjønn: string | undefined;
        /** Utledet */
        erBarnetFødt: boolean;
    };
    perioder: [
        {
            periodeResultatType: string;
            utsettelsePeriodeType: string;
            graderingInnvilget: boolean;
            samtidigUttak: boolean;
            samtidigUttaksprosent: number;
            stønadskontotype: string;
            trekkDager: number;
            arbeidstidprosent: number;
            utbetalingprosent: number;
            gjelderAnnenPart: boolean;
            flerbarnsdager: boolean;
            periode: {
                fom: string;
                tom: string;
            };
        }
    ];
}
