export enum FellesperiodeFordelingValg {
    ALT = 'ALT',
    VIL_VELGE = 'VIL_VELGE',
    HOPP_OVER_FORDELING = 'HOPP_OVER_FORDELING',
}

export enum OppstartValg {
    TRE_UKER_FØR_TERMIN = 'TRE_UKER_FØR_TERMIN',
    TRE_UKER_FØR_FØDSEL = 'TRE_UKER_FØR_FØDSEL',
    FAMILIEHENDELSESDATO = 'FAMILIEHENDELSESDATO',
    DAGEN_ETTER_ANNEN_FORELDER = 'DAGEN_ETTER_ANNEN_FORELDER',
    ANKOMSTDATO_NORGE = 'ANKOMSTDATO_NORGE',
    DATO_FOR_ALENEOMSORG = 'DATO_FOR_ALENEOMSORG',
    ANNEN_DATO = 'ANNEN_DATO',
}

export type Fordeling = {
    fordelingValg?: FellesperiodeFordelingValg;
    antallUkerFellesperiodeTilSøker?: string;
    oppstartAvForeldrepengerValg?: OppstartValg;
    oppstartDato?: string;
};

export default Fordeling;
