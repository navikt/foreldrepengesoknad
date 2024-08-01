import { Attachment } from '@navikt/fp-types';

import { bytesString, deleteAttachment } from './globalUtil';

describe('globalUtil', () => {
    it('skal konvertere bytes til megabytes', () => {
        const verdi = bytesString(2000000);
        expect(verdi).toBe('1.9 MB');
    });

    it('skal slette ett av vedleggene', () => {
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
