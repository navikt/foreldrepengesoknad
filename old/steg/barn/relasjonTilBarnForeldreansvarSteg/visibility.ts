import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import VisibilityFunction from '../../../types/dom/Visibility';
import { ForeldreansvarBarn } from '../../../types/søknad/Barn';
import { getAlderFraDato } from '../../../util/dates/dates';

const antallBarnVisible: VisibilityFunction<Partial<ForeldreansvarBarn>> = (barn: Partial<ForeldreansvarBarn>) => {
    const { foreldreansvarsdato } = barn;
    return foreldreansvarsdato !== undefined;
};

const fødselsdatoerVisible: VisibilityFunction<Partial<ForeldreansvarBarn>> = (barn: Partial<ForeldreansvarBarn>) => {
    const { antallBarn } = barn;
    return module.antallBarn(barn) && antallBarn !== undefined;
};

const harBarnOver15ÅrMeldingVisible: VisibilityFunction<Partial<ForeldreansvarBarn>> = (
    barn: Partial<ForeldreansvarBarn>
) => {
    const { fødselsdatoer } = barn;
    const harBarnOver15År = (fødselsdatoer || []).some((dato) => {
        const date = ISOStringToDate(dato);
        if (date) {
            return getAlderFraDato(date).år > 15;
        }
        return false;
    });
    return module.fødselsdatoer(barn) && harBarnOver15År && fødselsdatoer !== undefined && fødselsdatoer.length > 0;
};

const vedleggVisible: VisibilityFunction<Partial<ForeldreansvarBarn>> = (barn: Partial<ForeldreansvarBarn>) => {
    const { fødselsdatoer } = barn;
    const manglerFødselsdatoer =
        (fødselsdatoer || []).some((dato) => dato === undefined) || (fødselsdatoer || []).length === 0;
    return !manglerFødselsdatoer && module.fødselsdatoer(barn);
};

const module = {
    antallBarn: antallBarnVisible,
    fødselsdatoer: fødselsdatoerVisible,
    harBarnOver15ÅrMelding: harBarnOver15ÅrMeldingVisible,
    vedlegg: vedleggVisible,
};

export default module;
