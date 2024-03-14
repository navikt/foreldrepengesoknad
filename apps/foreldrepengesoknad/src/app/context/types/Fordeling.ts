export enum FellesperiodeFordelingValg {
    LIKT = 'LIKT',
    VIL_VELGE = 'VIL_VELGE',
    VIL_IKKE_FORDELE_NÅ = 'VIL_IKKE_FORDELE_NÅ',
}

export enum OppstartValg {
    TRE_UKER_FØR_TERMIN = 'TRE_UKER_FØR_TERMIN',
    FAMILIEHENDELSESDATO = 'FAMILIEHENDELSESDATO',
    DAGEN_ETTER_ANNEN_FORELDER = 'DAGEN_ETTER_ANNEN_FORELDER',
    ANNEN_DATO = 'ANNEN_DATO',
    ANKOMSTDATO_NORGE = 'ANKOMSTDATO_NORGE',
    OMSORGSOVERTAKELSE = 'OMSORGSOVERTAKELSE',
}

export type Fordeling = {
    fordelingValg?: FellesperiodeFordelingValg;
    antallUkerFellesperiodeTilSøker?: number;
    oppstartAvForeldrepengerValg?: OppstartValg;
    oppstartDato?: string;
};

export default Fordeling;
