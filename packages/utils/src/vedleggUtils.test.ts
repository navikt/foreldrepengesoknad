import { describe, expect, it } from 'vitest';

import { vedleggNedlastingsnavn } from './vedleggUtils';

describe('vedleggNedlastingsnavn', () => {
    it('byter ut png-ending med pdf', () => {
        expect(vedleggNedlastingsnavn('bilde.png')).toBe('bilde.pdf');
    });

    it('byter ut jpg-ending med pdf', () => {
        expect(vedleggNedlastingsnavn('skann.JPG')).toBe('skann.pdf');
    });

    it('beheld pdf-ending', () => {
        expect(vedleggNedlastingsnavn('dokument.pdf')).toBe('dokument.pdf');
    });

    it('legg på pdf når filnamnet manglar ending', () => {
        expect(vedleggNedlastingsnavn('terminbekreftelse')).toBe('terminbekreftelse.pdf');
    });

    it('byter berre ut siste ending og beheld punktum i namnet', () => {
        expect(vedleggNedlastingsnavn('min.fil.2024.png')).toBe('min.fil.2024.pdf');
    });
});
