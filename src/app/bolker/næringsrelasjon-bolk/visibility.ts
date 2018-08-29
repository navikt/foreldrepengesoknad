import { NæringsrelasjonPartial } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import VisibilityFunction from '../../types/dom/Visibility';

export const tlfnrVisible: VisibilityFunction<NæringsrelasjonPartial> = (næringsrelasjon: NæringsrelasjonPartial) => {
    const { navn } = næringsrelasjon;
    return navn !== undefined;
};

export const erNærVennEllerFamilieVisible: VisibilityFunction<NæringsrelasjonPartial> = (
    næringsrelasjon: NæringsrelasjonPartial
) => {
    const { telefonnummer } = næringsrelasjon;
    return tlfnrVisible(næringsrelasjon) && telefonnummer !== undefined;
};

export default {
    tlfnr: tlfnrVisible,
    erNærVennEllerFamilie: erNærVennEllerFamilieVisible
};
