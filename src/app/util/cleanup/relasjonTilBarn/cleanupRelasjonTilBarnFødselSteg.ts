import { BarnPartial, FødtBarn, UfødtBarn } from '../../../types/søknad/Barn';

const cleanup = (barn: BarnPartial, gjelderAnnentBarn?: boolean): BarnPartial => {
    const { termindato, terminbekreftelse, terminbekreftelseDato } = barn as UfødtBarn;
    const { fødselsdatoer, fødselsattest } = barn as FødtBarn;

    return {
        ...barn,
        termindato: barn.erBarnetFødt === false ? termindato : undefined,
        terminbekreftelse: barn.erBarnetFødt === false ? terminbekreftelse : undefined,
        terminbekreftelseDato: barn.erBarnetFødt === false ? terminbekreftelseDato : undefined,
        fødselsdatoer:
            barn.erBarnetFødt || (gjelderAnnentBarn === true && barn.erBarnetFødt) ? fødselsdatoer : undefined,
        fødselsattest: barn.erBarnetFødt ? fødselsattest : undefined
    };
};

const cleanupRelasjonTilBarnFødselSteg = (barn: BarnPartial, gjelderAnnentBarn?: boolean): BarnPartial => {
    return {
        ...cleanup(barn, gjelderAnnentBarn)
    };
};
export default cleanupRelasjonTilBarnFødselSteg;
