import { NæringDto } from './apiDtoGenerert';

export const EGEN_NÆRING_ID = 'naering';

/**
 * Helst ville vi brukt NæringDto direkte, men i skjema er det nyttig å ha en ekstra "pågående" sjekkboks.
 * I Dto til backend er pågående det samme som at tom ikke er satt
 */
export type NæringFormValues = NæringDto & { pågående: boolean };
