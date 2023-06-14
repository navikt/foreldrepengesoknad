import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import validateIntro from './validateIntro';
import validateTermin from './validateTermin';
import { StepID } from 'app/types/SøknadStep';
import { SøknadRoute, AppRoute } from 'app/types/Routes';
import validateTilrettelegging from './validateTilrettelegging';
import validateOppsummering from './validateOppsummering';

const validateSøknad =
    (route: SøknadRoute) =>
    (values: UferdigSøknad): Søknadfeil => {
        switch (route.path) {
            case AppRoute.INTRO:
                return validateIntro(values);

            case AppRoute.SØKNAD:
                return validateUntilStep(values, route.step, route.subStep);

            default:
                return {};
        }
    };

const validateUntilStep = (values: UferdigSøknad, step: StepID = StepID.INGEN, subStep?: string): Søknadfeil => {
    switch (step) {
        case StepID.TERMIN:
            return {
                ...validateIntro(values),
                ...validateTermin(values),
            };

        case StepID.ARBEIDSFORHOLD:
            return validateUntilStep(values, StepID.TERMIN);

        case StepID.TILRETTELEGGING:
            return {
                ...validateUntilStep(values, StepID.ARBEIDSFORHOLD),
                ...validateTilrettelegging(values, subStep),
            };

        case StepID.UTENLANDSOPPHOLD:
            return validateUntilStep(values, StepID.TILRETTELEGGING);

        case StepID.OPPSUMMERING:
            return {
                ...validateUntilStep(values, StepID.UTENLANDSOPPHOLD),
                ...validateOppsummering(values),
            };

        case StepID.INGEN:
            return {};
    }
};

export default validateSøknad;
