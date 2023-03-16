import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';

const validateOppsummering = (søknad: UferdigSøknad): Søknadfeil => {
    const errors: Søknadfeil = {};

    if (søknad.harGodkjentOppsummering !== true) {
        errors.harGodkjentOppsummering = 'valideringsfeil.oppsummeringMåGodkjennes';
    }

    return errors;
};

export default validateOppsummering;
