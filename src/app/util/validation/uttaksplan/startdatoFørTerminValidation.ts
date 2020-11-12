import { IntlShape } from 'react-intl';
import moment from 'moment';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import { uttaksplanDatoavgrensninger } from './uttaksplanDatoavgrensninger';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import uttaksConstants from 'app/constants';
import { erGyldigDato } from '../common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';

const startdatoFørTerminValidators = (
    intl: IntlShape,
    dato: string | undefined,
    familiehendelsesdato: Date,
    ingenUttakFørTermin: boolean | undefined
): Validator[] => {
    const validators: Validator[] = [
        erGyldigDato(dato, getMessage(intl, 'valideringsfeil.startdatoPermisjon.gyldigDato'), ingenUttakFørTermin),
        {
            test: () => dato === undefined || ingenUttakFørTermin !== true,
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoFørTermin'),
        },
        {
            test: () => dato === undefined || Uttaksdagen(ISOStringToDate(dato)!).erUttaksdag(),
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
