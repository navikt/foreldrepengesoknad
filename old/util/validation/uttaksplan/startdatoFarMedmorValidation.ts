import { IntlShape } from 'react-intl';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { erGyldigDato, hasValueRule } from '../common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';

const startdatoFarMedmorValidation = (intl: IntlShape, dato: string | undefined): Validator[] => {
    const validators: Validator[] = [
        hasValueRule(dato, getMessage(intl, 'uttaksplan.skjema.validering.startdatoFarMedmor')),
        erGyldigDato(dato, getMessage(intl, 'valideringsfeil.startdatoFarMedmor.gyldigDato')),
        {
            test: () => ISOStringToDate(dato) !== undefined && Uttaksdagen(ISOStringToDate(dato)!).erUttaksdag(),
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoHelg'),
        },
    ];
    return validators;
};

export default startdatoFarMedmorValidation;
