import { Foreldrepengesak } from 'app/types/Foreldrepengesak';
import { Person } from 'app/types/Person';

export interface NavnPåForeldre {
    farMedmor: string;
    mor: string;
}

const navnSlutterPåSLyd = (navn: string): boolean => {
    const sisteBokstav = navn.charAt(navn.length - 1).toLowerCase();
    return sisteBokstav === 's' || sisteBokstav === 'x' || sisteBokstav === 'z';
};

export const getNavnGenitivEierform = (navn: string, locale: string): string => {
    if (locale !== 'nb') {
        return navn;
    }
    if (navnSlutterPåSLyd(navn)) {
        return `${navn}'`;
    }
    return `${navn}s`;
};

export const getNavnPåForeldre = (
    sak: Foreldrepengesak,
    navnPåSøker: string,
    navnAnnenForelder: string
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
