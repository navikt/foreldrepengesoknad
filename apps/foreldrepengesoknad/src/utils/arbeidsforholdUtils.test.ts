import { getFørsteUttaksdag2UkerFørFødsel } from './arbeidsforholdUtils';

describe('arbeidsforholdUtils', () => {
    describe('getFørsteUttaksdag2UkerFørFødsel', () => {
        it('skal gi to uker før termin når fødsel skjer på termindato', () => {
            // Mandag 8. januar er nærmeste ukedag på/etter søndag 7. januar (termin 21.01 - 2 uker).
            expect(getFørsteUttaksdag2UkerFørFødsel('2024-01-21', '2024-01-21')).toEqual('2024-01-08');
        });

        it('skal gi to uker før termin når fødsel skjer etter termin', () => {
            const termindato = '2024-01-21';
            const fødselsdato = '2024-02-04';
            expect(getFørsteUttaksdag2UkerFørFødsel(fødselsdato, termindato)).toEqual('2024-01-08');
        });

        it('skal gi to uker før fødsel når barnet er født mer enn to uker før termin', () => {
            // Regression test for TFP-5892: fødsel skjer 6 uker før termin. Da skal far/medmor
            // kunne starte to uker før fødselsdatoen, ikke først fra fødselsdatoen.
            const termindato = '2024-03-03';
            const fødselsdato = '2024-01-21';
            expect(getFørsteUttaksdag2UkerFørFødsel(fødselsdato, termindato)).toEqual('2024-01-08');
        });

        it('skal falle tilbake til to uker før fødsel når termindato mangler', () => {
            expect(getFørsteUttaksdag2UkerFørFødsel('2024-01-21', undefined)).toEqual('2024-01-08');
        });
    });
});
