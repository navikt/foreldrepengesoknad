import { Barn, BarnType } from '../types/søknad/Barn';

const getSisteFødselsdato = (fødselsdatoer: Date[]): Date | undefined => {
    if (fødselsdatoer && fødselsdatoer.length >= 1) {
        return fødselsdatoer[fødselsdatoer.length - 1];
    }
    return undefined;
};

export function getFamiliehendelsesdato(barn: Barn): Date | undefined {
    switch (barn.type) {
        case BarnType.UfødtBarn:
            return barn.termindato;
        default:
            return getSisteFødselsdato(barn.fødselsdatoer);
    }
}
