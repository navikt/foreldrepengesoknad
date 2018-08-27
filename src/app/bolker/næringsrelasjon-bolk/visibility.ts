import { NæringsrelasjonPartial } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';

type VisibilityFunction = (næringsrelasjon: NæringsrelasjonPartial) => boolean;
interface FieldVisibilityFunctions {
    tlfnr: VisibilityFunction;
    erNærVennEllerFamilie: VisibilityFunction;
}

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

const fieldVisibilityFunctions: FieldVisibilityFunctions = {
    tlfnr: tlfnrVisible,
    erNærVennEllerFamilie: erNærVennEllerFamilieVisible
};

export default fieldVisibilityFunctions;
