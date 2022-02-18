import { InfoPeriode, Periodetype } from 'uttaksplan/types/Periode';
import { Søknadsinfo } from 'uttaksplan/validering/utils/types/Søknadsinfo';
import { shouldPeriodeHaveAttachment } from './manglendeVedleggUtils';

describe('manglendeVedleggUtil', () => {
    describe('shouldPeriodeHaveAttachment', () => {
        it('infoperioder skal ikke behøve vedlegg', () => {
            const infoperiode = {
                type: Periodetype.Info,
            } as InfoPeriode;
            expect(shouldPeriodeHaveAttachment(infoperiode, {} as Søknadsinfo)).toBeFalsy();
        });
    });
});
