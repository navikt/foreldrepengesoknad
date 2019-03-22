import { FødtBarn, UfødtBarn, Barn } from '../../../types/søknad/Barn';

const cleanupRelasjonTilBarnFødselSteg = (barn: Partial<Barn>, gjelderAnnentBarn?: boolean): Partial<Barn> => {
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
export default cleanupRelasjonTilBarnFødselSteg;
