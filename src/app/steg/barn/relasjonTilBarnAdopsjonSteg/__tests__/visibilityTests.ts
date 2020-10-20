import fns from '../visibility';
import * as util from '../../../../util/validation/fødselsdato';
import {
    createDatoInputVerdi,
    createDatoInputVerdiFromDate,
} from '../../../../../common/components/skjema/elements/dato-input/datoInputUtils';

describe('Relasjon til barn adopsjon', () => {
    it('Skal vise felt om adopsjonsdato gitt valg om type adopsjon', () => {
        expect(fns.spørsmålOmAdopsjonsdato({ adopsjonAvEktefellesBarn: true })).toBe(true);
        expect(fns.spørsmålOmAdopsjonsdato({ adopsjonAvEktefellesBarn: false })).toBe(true);
        expect(fns.spørsmålOmAdopsjonsdato({ adopsjonAvEktefellesBarn: undefined })).toBe(false);
    });

    it('Skal vise valg om antall barn som adopteres gitt en adopsjonsdato', () => {
        expect(fns.spørsmålOmAntallBarn({ adopsjonsdato: createDatoInputVerdiFromDate(new Date('2018-01-01')) })).toBe(
            true
        );
        expect(fns.spørsmålOmAntallBarn({ adopsjonsdato: createDatoInputVerdi(undefined) })).toBe(false);
    });

    it('Skal vise felt for fødselsdatoer gitt at et antall barn er valgt', () => {
        fns.spørsmålOmAntallBarn = jest.fn(() => false);

        expect(fns.spørsmålOmFødselsdatoer({ antallBarn: 1 })).toBe(false);
        expect(fns.spørsmålOmFødselsdatoer({ antallBarn: undefined })).toBe(false);

        fns.spørsmålOmAntallBarn = jest.fn(() => true);

        expect(fns.spørsmålOmFødselsdatoer({ antallBarn: 1 })).toBe(true);
        expect(fns.spørsmålOmFødselsdatoer({ antallBarn: undefined })).toBe(false);
    });

    it('Skal vise spørsmål om barnet er adoptert i utlandet gitt foregående opplysninger', () => {
        fns.spørsmålOmAntallBarn = jest.fn(() => false);
        fns.spørsmålOmFødselsdatoer = jest.fn(() => false);

        expect(
            fns.spørsmålOmAdoptertIUtlandet({
                adopsjonAvEktefellesBarn: false,
                fødselsdatoer: [createDatoInputVerdiFromDate(new Date('2018-01-01'))],
            })
        ).toBe(false);
        expect(
            fns.spørsmålOmAdoptertIUtlandet({
                adopsjonAvEktefellesBarn: true,
                fødselsdatoer: [createDatoInputVerdiFromDate(new Date('2018-01-01'))],
            })
        ).toBe(false);

        fns.spørsmålOmAntallBarn = jest.fn(() => true);
        fns.spørsmålOmFødselsdatoer = jest.fn(() => true);

        expect(
            fns.spørsmålOmAdoptertIUtlandet({
                adopsjonAvEktefellesBarn: false,
                fødselsdatoer: [createDatoInputVerdiFromDate(new Date('2018-01-01'))],
            })
        ).toBe(true);
        expect(
            fns.spørsmålOmAdoptertIUtlandet({
                adopsjonAvEktefellesBarn: true,
                fødselsdatoer: [createDatoInputVerdiFromDate(new Date('2018-01-01'))],
            })
        ).toBe(false);
    });

    it('Skal vise ankomstdato gitt søker har sagt at barnet er adoptert i utlandet', () => {
        expect(fns.spørsmålOmAnkomstdato({ adopsjonAvEktefellesBarn: true, adoptertIUtlandet: true })).toBe(false);
        expect(fns.spørsmålOmAnkomstdato({ adopsjonAvEktefellesBarn: true, adoptertIUtlandet: false })).toBe(false);

        expect(fns.spørsmålOmAnkomstdato({ adopsjonAvEktefellesBarn: false, adoptertIUtlandet: true })).toBe(true);
        expect(fns.spørsmålOmAnkomstdato({ adopsjonAvEktefellesBarn: false, adoptertIUtlandet: false })).toBe(false);
    });

    it('Skal vise "Last opp vedlegg" dersom all annen info for adopsjon av ektefelles barn er fylt ut og det er førstegangssøknad', () => {
        (util as any).fødselsdatoerErFyltUt = jest.fn(() => true);

        expect(fns.spørsmålOmVedlegg({ adopsjonAvEktefellesBarn: true }, false)).toBe(true);
        expect(fns.spørsmålOmVedlegg({ adopsjonAvEktefellesBarn: false }, false)).toBe(false);

        (util as any).fødselsdatoerErFyltUt = jest.fn(() => false);

        expect(fns.spørsmålOmVedlegg({ adopsjonAvEktefellesBarn: true }, false)).toBe(false);
        expect(fns.spørsmålOmVedlegg({ adopsjonAvEktefellesBarn: false }, false)).toBe(false);
    });

    it('Skal ikke vise "Last opp vedlegg" dersom det er endringssøknad', () => {
        (util as any).fødselsdatoerErFyltUt = jest.fn(() => true);

        expect(fns.spørsmålOmVedlegg({ adopsjonAvEktefellesBarn: true }, true)).toBe(false);
        expect(fns.spørsmålOmVedlegg({ adopsjonAvEktefellesBarn: false }, true)).toBe(false);
    });
});
