import { Foreldrepengesak } from 'types/Foreldrepengesak';
import { Person } from 'types/Person';

export interface NavnPåForeldre {
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

export const getLeverPerson = (person: Person) => {
    return !person.dødsdato;
};
