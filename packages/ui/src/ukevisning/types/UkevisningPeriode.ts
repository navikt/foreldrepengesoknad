import { ReactElement } from 'react';

/**
 * Dei fire kategoriane vekevisninga skil visuelt mellom. Same sett som i Manedsvisning, men her
 * har kvart kort nok plass til ikon, ei eiga typetekst (`label`) og ein metalinje – ikkje berre farge.
 */
export type UkevisningPeriodeType = 'MOR' | 'FAR' | 'FELLES' | 'FERIE';

export type UkevisningPeriode = {
    fom: string;
    tom: string;
    type: UkevisningPeriodeType;
    /** Ikon vist i den vesle sirkelen øvst i kortet, t.d. eit person- eller ferie-ikon. */
    ikon: ReactElement;
    /** Typetekst, t.d. «Mors periode» eller «Fellesperiode». */
    label: string;
    /** Kort metadatalinje under typeteksten, t.d. «Mødrekvote · 100 %». */
    meta: string;
    srText: string;
    /**
     * Tekst for eit lite varsel på kortet, t.d. «Mor mangler aktivitet». Vises berre på det
     * første kortet i ein samanhengande periode (sjå merge-logikken i Ukevisning.tsx).
     */
    advarsel?: string;
};
