import AnnenForelder from 'app/context/types/AnnenForelder';
import { InfoPeriode, Periodetype } from 'uttaksplan/types/Periode';
import { shouldPeriodeHaveAttachment } from './manglendeVedleggUtils';

describe('manglendeVedleggUtil', () => {
    describe('shouldPeriodeHaveAttachment', () => {
        it('infoperioder skal ikke behøve vedlegg', () => {
            const infoperiode = {
                type: Periodetype.Info,
            } as InfoPeriode;
            expect(shouldPeriodeHaveAttachment(infoperiode, false, {} as AnnenForelder)).toBeFalsy();
        });
    });
});
