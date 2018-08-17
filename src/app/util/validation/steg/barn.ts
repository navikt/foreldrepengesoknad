import Barn, {
    Adopsjonsbarn,
    ForeldreansvarBarn,
    FødtBarn,
    UfødtBarn
} from '../../../types/søknad/Barn';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { fødselsdatoerErFyltUt } from '../fields/fødselsdato';

const fødtBarnErGyldig = (barn: FødtBarn) => {
    return (
        barn.fødselsdatoer !== undefined &&
        barn.fødselsdatoer.length > 0 &&
        fødselsdatoerErFyltUt(barn.fødselsdatoer)
    );
};

const adopsjonsbarnErGyldig = (barn: Adopsjonsbarn) => {
    const {
        fødselsdatoer,
        adopsjonsdato,
        adoptertIUtlandet,
        ankomstdato
    } = barn;

    return (
        fødselsdatoer.length > 0 &&
        adopsjonsdato &&
        (adoptertIUtlandet === false ||
            (adoptertIUtlandet === true && ankomstdato !== undefined))
    );
};

const foreldreansvarBarnErGyldig = (barn: ForeldreansvarBarn) => {
    const { fødselsdatoer, foreldreansvarsdato } = barn;

    return foreldreansvarsdato && fødselsdatoer.length > 0;
};

const ufødtBarnErGyldig = (
    barn: UfødtBarn,
    skalLasteOppTerminbekreftelse: boolean
) => {
    const { termindato, terminbekreftelseDato } = barn;
    if (!termindato) {
        return false;
    }
    if (
        skalLasteOppTerminbekreftelse &&
        barn.terminbekreftelse &&
        barn.terminbekreftelse.length > 0 &&
        terminbekreftelseDato === undefined
    ) {
        return false;
    }
    return true;
};

export const barnErGyldig = (
    barn: Barn,
    situasjon: Søkersituasjon,
    skalLasteOppTerminbekreftelse?: boolean
): boolean => {
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
            return barn.erBarnetFødt
                ? fødtBarnErGyldig(barn as FødtBarn)
                : ufødtBarnErGyldig(
                      barn as UfødtBarn,
                      skalLasteOppTerminbekreftelse || false
                  );

        case Søkersituasjon.ADOPSJON:
            return adopsjonsbarnErGyldig(barn as Adopsjonsbarn);
        case Søkersituasjon.FORELDREANSVAR:
            return foreldreansvarBarnErGyldig(barn as ForeldreansvarBarn);
        default:
            return false;
    }
};
