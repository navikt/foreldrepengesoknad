import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';

const validateIntro = (søknad: UferdigSøknad): Søknadfeil => {
    const errors: Søknadfeil = {};

    if (søknad.harGodkjentVilkår === false) {
        errors.harGodkjentVilkår = 'valideringsfeil.vilkårMåGodkjennes';
    }

    return errors;
};

export default validateIntro;
