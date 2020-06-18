export interface UttaksplanPeriodeDTO {
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
    uttakArbeidType: string;
    arbeidsgiverInfo: {
        id: string;
        type: string;
        navn: string;
    };
    periode: {
        fom: string;
        tom: string;
    };
    morsAktivitet: MorsAktivitetDto;
    oppholdAarsak: OppholdsÅrsak;
}

export interface UttaksplanDTO {
    grunnlag: {
        dekningsgrad: number;
        antallBarn: number;
        søkerErFarEllerMedmor: boolean;
        morErAleneOmOmsorg: boolean;
        morHarRett: boolean;
        morErUfør: boolean;
        farMedmorErAleneOmOmsorg: boolean;
        farMedmorHarRett: boolean;
        søkerKjønn: string;
        termindato?: string;
        fødselsdato?: string;
        omsorgsovertakelsesdato: string;
    };
    perioder: UttaksplanPeriodeDTO[];
}

export enum OppholdsÅrsak {
    'INGEN' = 'INGEN',
    'UTTAK_MØDREKVOTE_ANNEN_FORELDER' = 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
    'UTTAK_FEDREKVOTE_ANNEN_FORELDER' = 'UTTAK_FEDREKVOTE_ANNEN_FORELDER',
    'UTTAK_FELLESP_ANNEN_FORELDER' = 'UTTAK_FELLESP_ANNEN_FORELDER',
}

export enum MorsAktivitetDto {
    'Arbeid' = 'ARBEID',
    'Utdanning' = 'UTDANNING',
    'Kvalifiseringsprogrammet' = 'KVALPROG',
    'Introduksjonsprogrammet' = 'INTROPROG',
    'TrengerHjelp' = 'TRENGER_HJELP',
    'Innlagt' = 'INNLAGT',
    'ArbeidOgUtdanning' = 'ARBEID_OG_UTDANNING',
    'Uføre' = 'UFØRE',
    'samtidigUttak' = 'SAMTIDIGUTTAK',
}
