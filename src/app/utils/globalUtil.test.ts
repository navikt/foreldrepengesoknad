import { Attachment } from 'app/types/Attachment';
import { bytesString, deleteAttachment } from './globalUtil';

describe('<globalUtil>', () => {
    it('skal konvertere bytes til megabytes', () => {
        const verdi = bytesString(2000000);
        expect(verdi).toBe('1.9 MB');
    });

    it('skal konvertere bytes til megabytes', () => {
        const vedlegg = [
            {
                id: '1',
            },
            {
                id: '2',
            },
        ] as Attachment[];

        const resultat = deleteAttachment(vedlegg, vedlegg[0]);
        expect(resultat).toEqual([vedlegg[1]]);
    });
});
