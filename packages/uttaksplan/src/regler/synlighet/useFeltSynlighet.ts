import type { KontoTypeUttak } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { synlighetForFelter } from './feltSynlighet';

type ForelderValg = 'MOR' | 'FAR_MEDMOR' | 'BEGGE' | undefined;

type FormVerdier = {
    forelder: ForelderValg;
    kontoTypeMor: KontoTypeUttak | undefined;
    kontoTypeFarMedmor: KontoTypeUttak | undefined;
    ønskerFlerbarnsdager: boolean | undefined;
    samtidigUttaksprosentMor: string | undefined;
    stillingsprosentMor: string | undefined;
};

export const useFeltSynlighet = (valgtePerioder: Array<{ fom: string; tom: string }>, formVerdier: FormVerdier) => {
    const {
        foreldreInfo: { rettighetType, søker },
        familiehendelsedato,
        familiesituasjon,
        barn,
    } = useUttaksplanData();

    return synlighetForFelter({
        ...formVerdier,
        søker,
        rettighetType,
        antallBarn: barn.antallBarn,
        familiesituasjon,
        valgtePerioder,
        familiehendelsedato,
    });
};
