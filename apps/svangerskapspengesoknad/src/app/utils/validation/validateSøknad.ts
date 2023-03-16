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
                return validateUntilStep(route.step, values, route.subStep);

            default:
                return {};
        }
    };

const validateUntilStep = (step: StepID = StepID.INGEN, values: UferdigSøknad, subStep?: string): Søknadfeil => {
    switch (step) {
        case StepID.TERMIN:
            return {
                ...validateIntro(values),
                ...validateTermin(values),
            };

        case StepID.ARBEIDSFORHOLD:
            return validateUntilStep(StepID.TERMIN, values);

        case StepID.TILRETTELEGGING:
            return {
                ...validateUntilStep(StepID.ARBEIDSFORHOLD, values),
                ...validateTilrettelegging(values, subStep),
            };

        case StepID.UTENLANDSOPPHOLD:
            return validateUntilStep(StepID.TILRETTELEGGING, values);

        case StepID.OPPSUMMERING:
            return {
                ...validateUntilStep(StepID.UTENLANDSOPPHOLD, values),
                ...validateOppsummering(values),
            };

        case StepID.INGEN:
            return {};
    }
};

export default validateSøknad;
