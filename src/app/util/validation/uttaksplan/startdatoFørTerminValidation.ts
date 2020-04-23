import { IntlShape } from 'react-intl';
import moment from 'moment';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import { uttaksplanDatoavgrensninger } from './uttaksplanDatoavgrensninger';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { DateValue } from '../../../types/common';
import uttaksConstants from 'app/constants';

const startdatoFørTerminValidators = (
    intl: IntlShape,
    dato: DateValue,
    familiehendelsesdato: Date,
    ingenUttakFørTermin: boolean | undefined
): Validator[] => {
    const validators: Validator[] = [
        {
            test: () => dato === undefined || ingenUttakFørTermin !== true,
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoFørTermin'),
        },
        {
            test: () => dato === undefined || Uttaksdagen(dato).erUttaksdag(),
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoHelg'),
        },
    ];
    if (ingenUttakFørTermin !== true) {
        const avgrensninger = uttaksplanDatoavgrensninger.startdatoFørTermin(familiehendelsesdato);
        validators.push({
            test: () =>
                moment(dato).isSameOrAfter(avgrensninger.minDato, 'day') &&
                moment(dato).isSameOrBefore(avgrensninger.maksDato, 'day'),
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoUtenforGyldigTidsrom', {
                uker: uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
            }),
        });
    }
    return validators;
};

export default startdatoFørTerminValidators;
