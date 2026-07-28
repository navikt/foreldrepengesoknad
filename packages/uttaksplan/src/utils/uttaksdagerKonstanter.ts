/**
 * Felles domenekonstantar for uttaksdagar (verkedagar) rundt familiehendinga.
 *
 * Ei veke = 5 uttaksdagar, sidan laurdag og søndag ikkje er uttaksdagar. Verdiane
 * her er derfor _uttaksdagar_, ikkje kalenderdagar – 60 uttaksdagar er 12 veker
 * (~84 kalenderdagar), ikkje 60 kalenderdagar.
 *
 * Konstantane låg tidlegare definert kvar for seg i fleire filer under ulike namn,
 * noko som gjorde det lett for grensene å koma i utakt. Legg nye grenser her.
 */

export const ANTALL_UTTAKSDAGER_TO_UKER = 10;
export const ANTALL_UTTAKSDAGER_TRE_UKER = 15;
export const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;
export const ANTALL_UTTAKSDAGER_SYV_UKER = 35;
export const ANTALL_UTTAKSDAGER_TOLV_UKER = 60;
