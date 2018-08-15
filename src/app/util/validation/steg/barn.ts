import Barn, {
    Adopsjonsbarn,
    ForeldreansvarBarn,
    FødtBarn,
    UfødtBarn
} from '../../../types/søknad/Barn';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { fødselsdatoerErFyltUt } from '../fields/f\u00F8dselsdato';

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

const stebarnsadopsjonsbarnErGyldig = (barn: Adopsjonsbarn): boolean => {
    const { fødselsdatoer, adopsjonsdato } = barn;
    return fødselsdatoer.length > 0 && adopsjonsdato !== undefined;
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

    return (
        (termindato !== undefined && skalLasteOppTerminbekreftelse === false) ||
        (skalLasteOppTerminbekreftelse && terminbekreftelseDato !== undefined)
    );
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
        case Søkersituasjon.STEBARN:
            return stebarnsadopsjonsbarnErGyldig(barn as Adopsjonsbarn);
        case Søkersituasjon.FORELDREANSVAR:
            return foreldreansvarBarnErGyldig(barn as ForeldreansvarBarn);
        default:
            return false;
    }
};
