import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import { fødselsdatoerErFyltUt } from '../../../util/validation/fields/fødselsdato';

const spørsmålOmAdopsjonsdatoVisible = (barn: Adopsjonsbarn): boolean => {
    return barn.adopsjonAvEktefellesBarn !== undefined;
};

const spørsmålOmAntallBarnVisible = (barn: Adopsjonsbarn): boolean => {
    return barn.adopsjonsdato !== undefined;
};

const spørsmålOmFødselsdatoerVisible = (barn: Adopsjonsbarn): boolean => {
    return spørsmålOmAntallBarnVisible(barn) && barn.antallBarn !== undefined;
};

const spørsmålOmAdoptertIUtlandetVisible = (barn: Adopsjonsbarn): boolean => {
    return (
        !barn.adopsjonAvEktefellesBarn &&
        spørsmålOmFødselsdatoerVisible(barn) &&
        fødselsdatoerErFyltUt(barn.fødselsdatoer)
    );
};

const spørsmålOmAnkomstdatoVisible = (barn: Adopsjonsbarn): boolean => {
    return barn.adopsjonAvEktefellesBarn === false && barn.adoptertIUtlandet === true;
};

const utfyltAdoptertIUtlandetVisible = (barn: Adopsjonsbarn): boolean => {
    return (
        spørsmålOmAdoptertIUtlandetVisible(barn) &&
        ((barn.adoptertIUtlandet && barn.ankomstdato !== undefined) || barn.adoptertIUtlandet === false)
    );
};

const spørsmålOmVedleggVisible = (barn: Adopsjonsbarn): boolean => {
    return (
        utfyltAdoptertIUtlandetVisible(barn) ||
        (barn.adopsjonAvEktefellesBarn === true && fødselsdatoerErFyltUt(barn.fødselsdatoer))
    );
};

export default {
    spørsmålOmAdopsjonsdato: spørsmålOmAdopsjonsdatoVisible,
    spørsmålOmAntallBarn: spørsmålOmAntallBarnVisible,
    spørsmålOmFødselsdatoer: spørsmålOmFødselsdatoerVisible,
    spørsmålOmAdoptertIUtlandet: spørsmålOmAdoptertIUtlandetVisible,
    spørsmålOmAnkomstdato: spørsmålOmAnkomstdatoVisible,
    utfyltAdoptertIUtlandet: utfyltAdoptertIUtlandetVisible,
    spørsmålOmVedlegg: spørsmålOmVedleggVisible
};
