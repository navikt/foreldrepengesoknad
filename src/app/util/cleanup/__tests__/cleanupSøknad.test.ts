import { Periode, Periodetype } from '../../../types/uttaksplan/periodetyper';
import { removePeriodetypeHullFromUttaksplan } from '../cleanupSøknad';

const uttaksplan: Periode[] = [
    {
        id: 'asd',
        type: Periodetype.Utsettelse
    },
    {
        id: 'asd',
        type: Periodetype.Uttak
    },
    {
        id: 'asd',
        type: Periodetype.Opphold
    },
    {
        id: 'asd',
        type: Periodetype.Overføring
    }
] as Periode[];

const uttaksplanMedHull: Periode[] = [
    ...uttaksplan,
    {
        id: 'asd',
        type: Periodetype.Hull
    }
] as Periode[];

describe('cleanupSøknad', () => {
    it('cleans uttaksplan', () => {
        const cleandUttaksplan = removePeriodetypeHullFromUttaksplan(uttaksplanMedHull);
        expect(JSON.stringify(cleandUttaksplan)).toEqual(JSON.stringify(uttaksplan));
    });
});
