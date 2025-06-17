import { NæringDto } from './apiDtoGenerert';

/**
 * Helst ville vi brukt NæringDto direkte, men i skjema er det nyttig å ha en ekstra "pågående" sjekkboks.
 * I Dto til backend er pågående det samme som at tom ikke er satt
 */
export type NæringFormValues = NæringDto & { pågående: boolean };
