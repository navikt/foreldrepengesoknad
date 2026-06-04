import { describe, expect, it } from 'vitest';

import { compressToUrl, decodeBase64, decompressFromUrl, encodeToBase64 } from './urlEncodingUtils';

describe('urlEncodingUtils', () => {
    const json = JSON.stringify({
        OM_BARNET: { erFødsel: true, antallBarn: '1', termindato: '2025-07-24' },
        UTTAKSPLAN: [
            { forelder: 'MOR', kontoType: 'MØDREKVOTE', fom: '2025-07-24', tom: '2025-11-05', flerbarnsdager: false },
            { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', fom: '2025-11-06', tom: '2026-02-25', flerbarnsdager: false },
        ],
    });

    it('round-trips komprimert data', () => {
        expect(decompressFromUrl(compressToUrl(json))).toBe(json);
    });

    it('gir kortere streng enn base64 for typiske data', () => {
        expect(compressToUrl(json).length).toBeLessThan(encodeToBase64(json).length);
    });

    it('produserer URL-trygg output (ingen tegn som endres av URLSearchParams)', () => {
        const compressed = compressToUrl(json);
        const params = new URLSearchParams(`data=${compressed}`);
        // Selv om "+" tolkes som mellomrom av URLSearchParams, skal dekomprimeringen håndtere det
        expect(decompressFromUrl(params.get('data') ?? '')).toBe(json);
    });

    it('faller tilbake til base64 for gamle lenker (bakoverkompatibilitet)', () => {
        const gammelBase64 = encodeToBase64(json);
        expect(decompressFromUrl(gammelBase64)).toBe(json);
    });

    it('tolker ikke gammelt base64 feilaktig som komprimert', () => {
        const gammelBase64 = encodeToBase64(json);
        expect(decompressFromUrl(gammelBase64)).toBe(decodeBase64(gammelBase64));
    });
});
