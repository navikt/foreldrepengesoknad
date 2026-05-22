/**
 * Re-eksporter frå underkatalogane slik at importar frå `../regler`
 * framleis fungerer utan endring for eksisterande konsumentar.
 */
export type { Regel, Regelgruppe, ValideringInput, Periode, RegelgruppeVisning } from './validering';
export { førsteBrutteRegel, ALLE_VALIDERINGSREGLER, valider } from './validering';
