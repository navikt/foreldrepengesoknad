import AnnenForelder from '../types/søknad/AnnenForelder';
import { Søker } from '../types/søknad/Søker';
import { SøkerRolle } from '../types/søknad/Søknad';
import { Kjønn } from '../types/common';
import Person from '../types/Person';

export const mockBruker: Person = {
    fornavn: 'Amalie',
    erMyndig: true,
    fnr: '1234123412',
    mellomnavn: '',
    etternavn: 'Skraam',
    adresse: 'Drammensveien 2',
    kjønn: Kjønn.KVINNE,
    fødselsdato: new Date(1998, 1, 16).toDateString(),
    ikkeNordiskEøsLand: false
};
export const mockAnnenForelder: AnnenForelder = {
    fnr: '1234123433',
    navn: 'Henrik Ibsen',
    utenlandskFnr: false,
    bostedsland: 'NO',
    erForSyk: false,
    erInformertOmSøknaden: false,
    erUfør: false,
    harRettPåForeldrepenger: true,
    skalHaForeldrepenger: true,
    kanIkkeOppgis: false
};

export const mockSøker: Søker = {
    andreInntekterSiste10Mnd: [],
    erFrilanser: false,
    erAleneOmOmsorg: false,
    harHattAnnenInntektSiste10Mnd: false,
    rolle: SøkerRolle.MOR,
    erSelvstendigNæringsdrivende: false
};
