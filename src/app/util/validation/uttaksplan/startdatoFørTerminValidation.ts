import { InjectedIntl } from 'react-intl';
import moment from 'moment';
import { Validator } from 'common/lib/validation/types';
import { Avgrensninger } from 'nav-datovelger';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import getMessage from 'common/util/i18nUtils';
import { getPermisjonsregler } from '../../uttaksplan/permisjonsregler';

const getDatoavgrensninger = (familiehendelsesdato: Date): Avgrensninger => {
    const maksDato = Uttaksdagen(familiehendelsesdato).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(getPermisjonsregler().maksAntallUkerForeldrepengerFørFødsel * 5);
    return {
        minDato,
        maksDato
    };
};

const getValidators = (
    intl: InjectedIntl,
    dato: Date | undefined,
    familiehendelsesdato: Date,
    ingenUttakFørTermin: boolean | undefined
): Validator[] => {
    const validators: Validator[] = [
        {
            test: () => dato === undefined || ingenUttakFørTermin !== true,
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoFørTermin')
        }
    ];
    if (ingenUttakFørTermin !== true) {
        const avgrensninger = getDatoavgrensninger(familiehendelsesdato);
        validators.push({
            test: () =>
                moment(dato).isSameOrAfter(avgrensninger.minDato) &&
                moment(dato).isSameOrBefore(avgrensninger.maksDato),
            failText: getMessage(intl, 'uttaksplan.skjema.validering.startdatoUtenforGyldigTidsrom', {
                uker: getPermisjonsregler().maksAntallUkerForeldrepengerFørFødsel
            })
        });
    }
    return validators;
};

const StartdatoFørTerminValidation = {
    getValidators,
    getDatoavgrensninger
};

export default StartdatoFørTerminValidation;
