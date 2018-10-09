import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import { fødselsdatoerErFyltUt } from '../../../util/validation/fødselsdato';

export const utfyltAdoptertIUtlandet = (barn: Partial<Adopsjonsbarn>): boolean => {
    return (
        module.spørsmålOmAdoptertIUtlandet(barn) &&
        ((barn.adoptertIUtlandet && barn.ankomstdato !== undefined) || barn.adoptertIUtlandet === false)
    );
};

const spørsmålOmAdopsjonsdatoVisible = (barn: Partial<Adopsjonsbarn>): boolean => {
    return barn.adopsjonAvEktefellesBarn !== undefined;
};

const spørsmålOmAntallBarnVisible = (barn: Partial<Adopsjonsbarn>): boolean => {
    return barn.adopsjonsdato !== undefined;
};

const spørsmålOmFødselsdatoerVisible = (barn: Partial<Adopsjonsbarn>): boolean => {
    return module.spørsmålOmAntallBarn(barn) && barn.antallBarn !== undefined;
};

const spørsmålOmAdoptertIUtlandetVisible = (barn: Partial<Adopsjonsbarn>): boolean => {
    return (
        !barn.adopsjonAvEktefellesBarn &&
        module.spørsmålOmFødselsdatoer(barn) &&
        fødselsdatoerErFyltUt(barn.fødselsdatoer)
    );
};

const spørsmålOmAnkomstdatoVisible = (barn: Partial<Adopsjonsbarn>): boolean => {
    return barn.adopsjonAvEktefellesBarn === false && barn.adoptertIUtlandet === true;
};

const spørsmålOmVedleggVisible = (barn: Partial<Adopsjonsbarn>): boolean => {
    return (
        utfyltAdoptertIUtlandet(barn) ||
        (barn.adopsjonAvEktefellesBarn === true && fødselsdatoerErFyltUt(barn.fødselsdatoer))
    );
};

const module = {
    spørsmålOmAdopsjonsdato: spørsmålOmAdopsjonsdatoVisible,
    spørsmålOmAntallBarn: spørsmålOmAntallBarnVisible,
    spørsmålOmFødselsdatoer: spørsmålOmFødselsdatoerVisible,
    spørsmålOmAdoptertIUtlandet: spørsmålOmAdoptertIUtlandetVisible,
    spørsmålOmAnkomstdato: spørsmålOmAnkomstdatoVisible,
    spørsmålOmVedlegg: spørsmålOmVedleggVisible
};

export default module;
