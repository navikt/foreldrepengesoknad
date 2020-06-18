import Søknad from '../../../types/søknad/Søknad';
import { Periodetype } from '../../../types/uttaksplan/periodetyper';
import { cleanInvalidSøknadData } from '../../../util/storageCleanup/storageCleanup';

const dummyPeriode: any = {
    ønskerFlerbarnsdager: true,
};

const søknad: Partial<Søknad> = {
    uttaksplan: [
        {
            ...dummyPeriode,
            type: Periodetype.Overføring,
        },
        {
            ...dummyPeriode,
            type: Periodetype.Utsettelse,
        },
        {
            ...dummyPeriode,
            type: Periodetype.Uttak,
        },
        {
            ...dummyPeriode,
            type: Periodetype.Opphold,
        },
    ],
};

describe('Fjern ønskerFlerbarnsdager fra alle periode untatt uttak', () => {
    it('fjerner ønskerFlerbarnsdager fra perioder', () => {
        const { uttaksplan } = cleanInvalidSøknadData(søknad as Søknad);
        uttaksplan.forEach((periode) => {
            if (periode.type === Periodetype.Uttak) {
                expect(periode.ønskerFlerbarnsdager).toBeDefined();
            } else {
                expect((periode as any).ønskerFlerbarnsdager).toBeUndefined();
            }
        });
    });
});
