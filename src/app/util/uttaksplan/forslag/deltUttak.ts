import { Søkersituasjon } from '../../../types/søknad/Søknad';

const deltUttakAdopsjon = (erFarEllerMedmor: boolean) => {
    if (!erFarEllerMedmor) {
        return [];
    } else {
        return [];    
    }
}

const deltUttakFødsel = (erFarEllerMedmor: boolean) => {
    if (!erFarEllerMedmor) {
        return [];
    } else {
        return [];    
    }
};

export const deltUttak = (situasjon: Søkersituasjon, famDato: Date, erFarEllerMedmor: boolean) => {
    if (situasjon === Søkersituasjon.ADOPSJON) {
        return deltUttakAdopsjon(erFarEllerMedmor);
    }

    if (situasjon === Søkersituasjon.FØDSEL) {
        return deltUttakFødsel(erFarEllerMedmor);
    }

    return [];
}