import VisibilityFunction from '../../../types/dom/Visibility';
import { ForeldreansvarBarnPartial } from '../../../types/søknad/Barn';
import { getAlderFraDato } from '../../../util/dates/dates';

const antallBarnVisible: VisibilityFunction<ForeldreansvarBarnPartial> = (barn: ForeldreansvarBarnPartial) => {
    const { foreldreansvarsdato } = barn;
    return foreldreansvarsdato !== undefined;
};

const fødselsdatoerVisible: VisibilityFunction<ForeldreansvarBarnPartial> = (barn: ForeldreansvarBarnPartial) => {
    const { antallBarn } = barn;
    return module.antallBarn(barn) && antallBarn !== undefined;
};

const harBarnOver15ÅrMeldingVisible: VisibilityFunction<ForeldreansvarBarnPartial> = (
    barn: ForeldreansvarBarnPartial
) => {
    const { fødselsdatoer } = barn;
    const harBarnOver15År = (fødselsdatoer || []).some((dato) => {
        if (dato) {
            return getAlderFraDato(dato).år > 15;
        }
        return false;
    });
    return module.fødselsdatoer(barn) && harBarnOver15År && fødselsdatoer !== undefined && fødselsdatoer.length > 0;
};

const vedleggVisible: VisibilityFunction<ForeldreansvarBarnPartial> = (barn: ForeldreansvarBarnPartial) => {
    const { fødselsdatoer } = barn;
    const manglerFødselsdatoer =
        (fødselsdatoer || []).some((dato) => dato === undefined) || (fødselsdatoer || []).length === 0;
    return !manglerFødselsdatoer && module.fødselsdatoer(barn);
};

const module = {
    antallBarn: antallBarnVisible,
    fødselsdatoer: fødselsdatoerVisible,
    harBarnOver15ÅrMelding: harBarnOver15ÅrMeldingVisible,
    vedlegg: vedleggVisible
};

export default module;
