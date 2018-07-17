import Barn, {
    Adopsjonsbarn,
    ForeldreansvarBarn,
    FødtBarn,
    UfødtBarn
} from '../../types/søknad/Barn';
import { Søkersituasjon } from '../../types/søknad/Søknad';

const fødtBarnErGyldig = (barn: FødtBarn) => {
    return barn.fødselsdatoer.length > 0 && barn.fødselsattest.length > 0;
};

const adopsjonsbarnErGyldig = (barn: Adopsjonsbarn) => {
    const {
        fødselsdatoer,
        adopsjonsdato,
        adoptertIUtlandet,
        omsorgsovertakelse,
        adopsjonsvedtak
    } = barn;

    return (
        fødselsdatoer.length > 0 &&
        adopsjonsdato &&
        adoptertIUtlandet !== undefined &&
        omsorgsovertakelse.length > 0 &&
        adopsjonsvedtak.length > 0
    );
};

const foreldreansvarBarnErGyldig = (barn: ForeldreansvarBarn) => {
    const {
        fødselsdatoer,
        foreldreansvarsdato,
        omsorgsovertakelse,
        adopsjonsvedtak
    } = barn;

    return (
        fødselsdatoer.length > 0 &&
        foreldreansvarsdato &&
        omsorgsovertakelse.length > 0 &&
        adopsjonsvedtak.length > 0
    );
};

const ufødtBarnErGyldig = (barn: UfødtBarn) => {
    const { termindato, terminbekreftelseDato, terminbekreftelse } = barn;

    return termindato && terminbekreftelseDato && terminbekreftelse.length > 0;
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
