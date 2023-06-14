import isEmpty from 'lodash/isEmpty';

import { appIsRunningInDevEnvironment } from './envUtils';
import { Søknadfeil } from 'app/types/Søknad';
import { SøknadRoute } from 'app/types/Routes';
import Environment from 'app/Environment';

export const logValidationErrors = (currentRoute: SøknadRoute, errors: Søknadfeil) => {
    if (appIsRunningInDevEnvironment() && Environment.LOG_VALIDATION) {
        const path = `${currentRoute.path}/${currentRoute.step || ''}`;

        if (isEmpty(errors)) {
            // tslint:disable-next-line
            console.log(`✅ No validation errors for ${path}!`);
        } else {
            // tslint:disable-next-line
            console.log(`❌ Validation errors for ${path}:`, errors);
        }
    }
};
