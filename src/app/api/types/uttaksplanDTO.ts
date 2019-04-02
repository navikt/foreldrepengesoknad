export interface UttaksplanDTO {
    grunnlag: {
        familieHendelseType: string;
        familieHendelseDato: string;
        dekningsgrad: string;
        antallBarn: number;
        søkerErFarEllerMedmor: boolean;
        morErAleneOmOmsorg: boolean;
        morHarRett: boolean;
        morErUfør: boolean;
        farMedmorErAleneOmOmsorg: boolean;
        farMedmorHarRett: boolean;
    };
    perioder: [
        {
            periodeResultatType: string;
            graderingInnvilget: boolean;
            samtidigUttak: boolean;
            stønadskontotype: string;
            trekkDager: number;
            arbeidstidprosent: number;
            utbetalingprosent: number;
            gjelderAnnenPart: boolean;
            periode: {
                fom: string;
                tom: string;
            };
        }
    ];
}
