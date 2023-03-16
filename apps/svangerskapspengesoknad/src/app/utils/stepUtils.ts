import { Location } from 'history';
import { isEmpty } from 'lodash';

import { appIsRunningInDevEnvironment } from './envUtils';
import { SøknadRoute, AppRoute } from 'app/types/Routes';
import { Søknadsgrunnlag, UferdigSøknad } from 'app/types/Søknad';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import validateSøknad from './validation/validateSøknad';

export const getSøknadStepPath = (step: StepID, subStep?: string) => {
    const path = `${AppRoute.SØKNAD}/${step}`;
    return subStep ? path + `/${subStep}` : path;
};

function pureSplice<T>(array: T[], start: number, deleteCount: number, ...substitutes: T[]): T[] {
    const newArray = [...array];
    newArray.splice(start, deleteCount, ...substitutes);

    return newArray;
}

const mainSteps = [
    StepID.TERMIN,
    StepID.ARBEIDSFORHOLD,
    StepID.TILRETTELEGGING,
    StepID.UTENLANDSOPPHOLD,
    StepID.OPPSUMMERING,
];

export const getAllSteps = (søknadsgrunnlag: Søknadsgrunnlag[]): SøknadStep[] => {
    const tilretteleggingSteps = søknadsgrunnlag.map((tilrettelegging) => ({
        step: StepID.TILRETTELEGGING,
        subStep: tilrettelegging.id,
    }));

    return pureSplice(
        mainSteps.map((step) => ({ step })),
        mainSteps.indexOf(StepID.TILRETTELEGGING),
        1,
        ...tilretteleggingSteps
    );
};

export const getAdjacentSteps = (currentStep: SøknadStep, allSteps: SøknadStep[]): [SøknadStep, SøknadStep] => {
    const invalidStep = { step: StepID.INGEN };
    const indexOfCurrentStep = allSteps.findIndex(
        ({ step, subStep }) => step === currentStep.step && subStep === currentStep.subStep
    );

    if (indexOfCurrentStep === -1) {
        return [invalidStep, invalidStep];
    }

    const isFirstStep = indexOfCurrentStep === 0;
    const isLastStep = indexOfCurrentStep === allSteps.length - 1;
    const previousStep = isFirstStep ? invalidStep : allSteps[indexOfCurrentStep - 1];
    const nextStep = isLastStep ? invalidStep : allSteps[indexOfCurrentStep + 1];

    return [previousStep, nextStep];
};

export const parsePathFromLocation = (location: Location): SøknadRoute => {
    if (!location) {
        return {
            path: AppRoute.INTRO,
        };
    }

    const [path, step, subStep] = location.pathname.split('/').slice(1);
    return {
        path: `/${path}` as AppRoute,
        step: step as StepID,
        subStep: subStep as string,
    };
};

export const finnArbeidsforholdNavn = (arbeidsgiverId: string, arbeidsforhold: Arbeidsforhold[]): string => {
    const matchingArbeidsforhold = arbeidsforhold.find((forhold) => forhold.guid === arbeidsgiverId);
    if (matchingArbeidsforhold) {
        return matchingArbeidsforhold.arbeidsgiverNavn || matchingArbeidsforhold.guid;
    }
    return arbeidsgiverId;
};

export const isNextStepAvailable = (route: SøknadRoute, values: UferdigSøknad): boolean =>
    appIsRunningInDevEnvironment() || isEmpty(validateSøknad(route)(values));
