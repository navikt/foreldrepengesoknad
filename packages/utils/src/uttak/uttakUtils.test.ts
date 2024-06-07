import { getSisteUttaksdag6UkerEtterFødsel } from './uttakUtils';

describe('uttakUtils', () => {
    it('skal returnere riktig sluttdato for seks ukers perioden etter fødsel hvis familiehendelsesdato er på en søndag', () => {
        const result = getSisteUttaksdag6UkerEtterFødsel(new Date('2022-05-29'));
        expect(result).toEqual(new Date('2022-07-08'));
    });

    it('skal returnere riktig sluttdato for seks ukers perioden etter fødsel hvis familiehendelsesdato er på en lørdag', () => {
        const result = getSisteUttaksdag6UkerEtterFødsel(new Date('2022-05-28'));
        expect(result).toEqual(new Date('2022-07-08'));
    });

    it('skal returnere riktig sluttdato for seks ukers perioden etter fødsel hvis familiehendelsesdato er på en fredag', () => {
        const result = getSisteUttaksdag6UkerEtterFødsel(new Date('2022-05-27'));
        expect(result).toEqual(new Date('2022-07-07'));
    });

    it('skal returnere riktig sluttdato for seks ukers perioden etter fødsel hvis familiehendelsesdato er på en mandag', () => {
        const result = getSisteUttaksdag6UkerEtterFødsel(new Date('2022-05-30'));
        expect(result).toEqual(new Date('2022-07-08'));
    });
});
