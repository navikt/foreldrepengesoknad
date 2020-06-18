import cleanupRelasjonTilBarnFødselSteg from '../cleanupRelasjonTilBarnFødselSteg';
import { Barn } from '../../../../types/søknad/Barn';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';

let dirtyBarn: Partial<Barn>;
describe('cleanupRelasjonTIlBarnFødselSteg', () => {
    beforeEach(() => {
        const fødselsattest: Partial<Attachment> = { file: new File([''], 'filename.pdf') };
        dirtyBarn = {
            antallBarn: 1,
            erBarnetFødt: true,
            termindato: new Date(),
            terminbekreftelse: [],
            terminbekreftelseDato: new Date(),
            fødselsattest: [fødselsattest as Attachment],
            fødselsdatoer: [new Date()],
        };
    });

    it('should remove irrelevant properties when child is born', () => {
        dirtyBarn.erBarnetFødt = true;
        const cleanedFødtBarn = cleanupRelasjonTilBarnFødselSteg(dirtyBarn) as any;
        expect(cleanedFødtBarn.terminbekreftelse).toBeUndefined();
        expect(cleanedFødtBarn.terminbekreftelseDato).toBeUndefined();
    });

    it('should remove redundant properties when child is unborn', () => {
        dirtyBarn.erBarnetFødt = false;
        const cleanedUfødtBarn = cleanupRelasjonTilBarnFødselSteg(dirtyBarn) as any;
        expect(cleanedUfødtBarn.fødselsdatoer).toBeUndefined();
        expect(cleanedUfødtBarn.fødselsattest).toBeUndefined();
    });
});
