import Barn, {
    Adopsjonsbarn,
    ForeldreansvarBarn,
    FødtBarn,
    UfødtBarn
} from '../../../types/søknad/Barn';
import { Søkersituasjon } from '../../../types/søknad/Søknad';

const fødtBarnErGyldig = (barn: FødtBarn) => {
    return barn.fødselsdatoer !== undefined && barn.fødselsdatoer.length > 0;
};

const adopsjonsbarnErGyldig = (barn: Adopsjonsbarn) => {
    const { fødselsdatoer, adopsjonsdato, adoptertIUtlandet } = barn;

    return (
        fødselsdatoer.length > 0 &&
        adopsjonsdato &&
        adoptertIUtlandet !== undefined
    );
};

const stebarnsadopsjonsbarnErGyldig = (barn: Adopsjonsbarn): boolean => {
    const { fødselsdatoer, adopsjonsdato } = barn;
    return fødselsdatoer.length > 0 && adopsjonsdato !== undefined;
};

const foreldreansvarBarnErGyldig = (barn: ForeldreansvarBarn) => {
    const { fødselsdatoer, foreldreansvarsdato } = barn;

    return foreldreansvarsdato && fødselsdatoer.length > 0;
};

const ufødtBarnErGyldig = (barn: UfødtBarn) => {
    const { termindato } = barn;
    return termindato !== undefined;
};

export const barnErGyldig = (
    barn: Barn,
    situasjon: Søkersituasjon
): boolean => {
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
            return (
                fødtBarnErGyldig(barn as FødtBarn) ||
                ufødtBarnErGyldig(barn as UfødtBarn)
            );
        case Søkersituasjon.ADOPSJON:
            return adopsjonsbarnErGyldig(barn as Adopsjonsbarn);
        case Søkersituasjon.STEBARN:
            return stebarnsadopsjonsbarnErGyldig(barn as Adopsjonsbarn);
        case Søkersituasjon.FORELDREANSVAR:
            return foreldreansvarBarnErGyldig(barn as ForeldreansvarBarn);
        default:
            return false;
    }
};
