import { NæringsrelasjonPartial } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';

export const tlfnrVisible = (næringsrelasjon: NæringsrelasjonPartial) => {
    const { navn } = næringsrelasjon;
    return navn !== undefined;
};

export const erNærVennEllerFamilieVisible = (
    næringsrelasjon: NæringsrelasjonPartial
) => {
    const { telefonnummer } = næringsrelasjon;
    return tlfnrVisible(næringsrelasjon) && telefonnummer !== undefined;
};
