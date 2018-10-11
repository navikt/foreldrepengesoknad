import { InjectedIntl } from 'react-intl';
import moment from 'moment';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import { getPermisjonsregler } from '../../uttaksplan/permisjonsregler';
import { uttaksplanDatoavgrensninger } from './uttaksplanDatoavgrensninger';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { DateValue } from '../../../types/common';

const startdatoFørTerminValidators = (
    intl: InjectedIntl,
    dato: DateValue,
    familiehendelsesdato: Date,
    ingenUttakFørTermin: boolean | undefined
): Validator[] => {
    const validators: Validator[] = [
        {
            test: () => dato === undefined || ingenUttakFørTermin !== true,
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoFørTermin')
        },
        {
            test: () => dato !== undefined && Uttaksdagen(dato).erUttaksdag(),
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoHelg')
        }
    ];
    if (ingenUttakFørTermin !== true) {
        const avgrensninger = uttaksplanDatoavgrensninger.startdatoFørTermin(familiehendelsesdato);
        validators.push({
            test: () =>
                moment(dato).isSameOrAfter(avgrensninger.minDato, 'day') &&
                moment(dato).isSameOrBefore(avgrensninger.maksDato, 'day'),
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoUtenforGyldigTidsrom', {
                uker: getPermisjonsregler().maksAntallUkerForeldrepengerFørFødsel
            })
        });
    }
    return validators;
};

export default startdatoFørTerminValidators;
