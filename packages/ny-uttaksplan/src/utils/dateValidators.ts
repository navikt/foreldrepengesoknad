import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { StønadskontoType } from '@navikt/fp-constants';
import { UttaksdagenString } from '@navikt/fp-utils';
import {
    isAfterDate,
    isBeforeOrSame,
    isDateWithinRange,
    isRequired,
    isValidDate,
    isWeekday,
} from '@navikt/fp-validation';
import { FormValidationResult } from '@navikt/fp-validation/src/form/generalFormValidation';

export const getFomValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    kontoType: StønadskontoType | undefined,
    tomValue: string | undefined,
) => {
    const validators = [
        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.påkrevd' })),
        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.gyldigDato' })),
        isBeforeOrSame(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.førTilDato' }), tomValue),
        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.foreldrepengerFørFødsel' })),
    ];

    leggTilForeldrepengerFørFødselValidering(intl, validators, kontoType, familiehendelsedato);
    leggTilFørFamdatoValideringOmNødvendig(validators, kontoType, familiehendelsedato);

    return validators;
};

export const getTomValidators = (
    intl: IntlShape,
    familiehendelsedato: string,
    kontoType: StønadskontoType | undefined,
) => {
    const validators = [
        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.påkrevd' })),
        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.gyldigDato' })),
        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.måVæreUkedag' })),
    ];

    leggTilForeldrepengerFørFødselValidering(intl, validators, kontoType, familiehendelsedato);
    leggTilFørFamdatoValideringOmNødvendig(validators, kontoType, familiehendelsedato);

    return validators;
};

const leggTilForeldrepengerFørFødselValidering = (
    intl: IntlShape,
    validators: ((date: string) => FormValidationResult)[],
    kontoType: StønadskontoType | undefined,
    familiehendelsedato: string,
) => {
    if (kontoType === StønadskontoType.ForeldrepengerFørFødsel) {
        validators.push(
            isDateWithinRange(
                intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.foreldrepengerFørFødsel' }),
                dayjs(
                    UttaksdagenString(UttaksdagenString(familiehendelsedato).denneEllerNeste()).trekkFra(15),
                ).toDate(),
                dayjs(UttaksdagenString(UttaksdagenString(familiehendelsedato).denneEllerNeste()).forrige()).toDate(),
            ),
        );
    }
};

const leggTilFørFamdatoValideringOmNødvendig = (
    validators: ((date: string) => FormValidationResult)[],
    kontoType: StønadskontoType | undefined,
    familiehendelsedato: string,
) => {
    if (
        kontoType === StønadskontoType.Mødrekvote ||
        kontoType === StønadskontoType.Fedrekvote ||
        kontoType === StønadskontoType.AktivitetsfriKvote ||
        kontoType === StønadskontoType.Foreldrepenger
    ) {
        validators.push(
            isAfterDate(
                'Kun fellesperiode og foreldrepenger før fødsel kan benyttes før familiehendelsedatoen',
                UttaksdagenString(familiehendelsedato).denneEllerForrige(),
            ),
        );
    }

    return validators;
};
