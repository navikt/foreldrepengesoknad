import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';

const startdatoFarMedmorValidation = (intl: InjectedIntl, dato: Date | undefined): Validator[] => {
    const validators: Validator[] = [
        {
            test: () => dato !== undefined,
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoFarMedmor')
        },
        {
            test: () => dato !== undefined && Uttaksdagen(dato).erUttaksdag(),
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoHelg')
        }
    ];
    return validators;
};

export default startdatoFarMedmorValidation;
