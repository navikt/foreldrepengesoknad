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

const foreldreansvarBarnErGyldig = (barn: ForeldreansvarBarn) => {
    const { fødselsdatoer, foreldreansvarsdato } = barn;

    return foreldreansvarsdato && fødselsdatoer.length > 0;
};

const ufødtBarnErGyldig = (barn: UfødtBarn) => {
    const { termindato, terminbekreftelseDato } = barn;

    return termindato !== undefined && terminbekreftelseDato !== undefined;
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
            return adopsjonsbarnErGyldig(barn as Adopsjonsbarn);
        case Søkersituasjon.FORELDREANSVAR:
            return foreldreansvarBarnErGyldig(barn as ForeldreansvarBarn);
        default:
            return false;
    }
};
