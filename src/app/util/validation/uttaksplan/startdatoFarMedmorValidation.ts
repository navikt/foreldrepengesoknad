import { IntlShape } from 'react-intl';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { DateValue } from '../../../types/common';
import { hasValueRule } from '../common';

const startdatoFarMedmorValidation = (intl: IntlShape, dato: DateValue): Validator[] => {
    const validators: Validator[] = [
        hasValueRule(dato, getMessage(intl, 'uttaksplan.skjema.validering.startdatoFarMedmor')),
        {
            test: () => dato !== undefined && Uttaksdagen(dato).erUttaksdag(),
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoHelg'),
        },
    ];
    return validators;
};

export default startdatoFarMedmorValidation;
