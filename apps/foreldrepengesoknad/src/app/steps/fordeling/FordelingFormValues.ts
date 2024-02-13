export enum FellesperiodeFordelingValg {
    LIKT = 'LIKT',
    VIL_VELGE = 'VIL_VELGE',
    VIL_IKKE_FORDELE_NÅ = 'VIL_IKKE_FORDELE_NÅ',
}

export enum OppstartValg {
    TRE_UKER_FØR_TERMIN = 'TRE_UKER_FØR_TERMIN',
    FAMILIEHENDELSESDATO = 'FAMILIEHENDELSESDATO',
    RUNDT_FØDSEL = 'RUNDT_FØDSEL',
    DAGEN_ETTER_ANNEN_FORELDER = 'DAGEN_ETTER_ANNEN_FORELDER',
    ANNEN_DATO = 'ANNEN_DATO',
    ANKOMSTDATO_NORGE = 'ANKOMSTDATO_NORGE',
}

export type FordelingFormValues = {
    fordelingValg?: FellesperiodeFordelingValg;
    antallUkerFellesperiodeTilSøker?: number;
    oppstartAvForeldrepenger?: OppstartValg;
    oppstartDato?: string;
    //TODO GR: Spør om disse beholdes:
    harAnnenForelderForeldrepenger?: boolean;
    annenForelderSisteDag?: string;
};

export default FordelingFormValues;
