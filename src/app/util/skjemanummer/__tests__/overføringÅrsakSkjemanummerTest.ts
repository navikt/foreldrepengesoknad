import { getOverføringÅrsakSkjemanummer } from '../overføringÅrsakSkjemanummer';
import { Skjemanummer } from '../../../types/søknad/Søknad';
import { OverføringÅrsakType } from '../../../types/uttaksplan/periodetyper';

describe('getOverføringÅrsakSkjemanummer', () => {
    it('should require Skjemanummer.DOK_INNLEGGELSE if årsak is institusjonsoppholdAnnenForelder', () => {
        expect(getOverføringÅrsakSkjemanummer(OverføringÅrsakType.institusjonsoppholdAnnenForelder)).toBe(
            Skjemanummer.DOK_INNLEGGELSE
        );
    });

    it('should require Skjemanummer.DOK_OVERFØRING_FOR_SYK if årsak is sykdomAnnenForelder', () => {
        expect(getOverføringÅrsakSkjemanummer(OverføringÅrsakType.sykdomAnnenForelder)).toBe(
            Skjemanummer.DOK_OVERFØRING_FOR_SYK
        );
    });

    it('should require Skjemanummer.ANNET if årsak is aleneomsorg', () => {
        expect(getOverføringÅrsakSkjemanummer(OverføringÅrsakType.aleneomsorg)).toBe(Skjemanummer.ANNET);
    });
});
