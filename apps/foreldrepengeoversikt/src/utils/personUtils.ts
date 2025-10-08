import { BarnDto_fpoversikt } from '@navikt/fp-types';

import { Foreldrepengesak } from '../types/Sak';

interface NavnPåForeldre {
    farMedmor: string;
    mor: string;
}

export const getNavnPåForeldre = (
    sak: Foreldrepengesak,
    navnPåSøker: string,
    navnAnnenForelder: string,
): NavnPåForeldre => {
    const søkerErFarEllerMedmor = !sak.sakTilhørerMor;
    return {
        farMedmor: søkerErFarEllerMedmor ? navnPåSøker : navnAnnenForelder,
        mor: søkerErFarEllerMedmor ? navnAnnenForelder : navnPåSøker,
    };
};

export const getLeverPerson = (person: BarnDto_fpoversikt) => {
    return !person.dødsdato;
};
