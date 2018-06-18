import { Barn, UfødtBarn, FødtBarn } from '../types/søknad/Barn';

const getSisteFødselsdato = (fødselsdatoer: Date[]): Date | undefined => {
    if (fødselsdatoer && fødselsdatoer.length >= 1) {
        return fødselsdatoer[fødselsdatoer.length - 1];
    }
    return undefined;
};

export function getFamiliehendelsesdato(barn: Barn): Date | undefined {
    if (!barn.erBarnetFødt) {
        return (barn as UfødtBarn).termindato;
    } else {
        return getSisteFødselsdato((barn as FødtBarn).fødselsdatoer);
    }
}
