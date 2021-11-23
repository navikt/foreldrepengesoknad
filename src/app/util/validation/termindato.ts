import moment from 'moment';
import { IntlShape } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { date21DaysAgo, attenUkerPluss3, attenUkerPluss3Number, today, date9MonthsAgo } from './values';
import { erGyldigDato, hasValueRule } from './common';
import { Avgrensninger } from 'common/types';

export const termindatoAvgrensninger: Avgrensninger = {
    minDato: date21DaysAgo.toDate(),
    maksDato: attenUkerPluss3.subtract(24, 'hours').toDate(),
};

export const termindatoAvgrensningerFodsel: Avgrensninger = {
    minDato: date9MonthsAgo.toDate(),
    maksDato: attenUkerPluss3.subtract(24, 'hours').toDate(),
};

export const getTermindatoRegler = (dato: string | undefined, intl: IntlShape): Validator[] => {
    const intlKey = 'valideringsfeil.termindato';

    return [
        hasValueRule(dato, getMessage(intl, `${intlKey}.duMåOppgi`)),
        erGyldigDato(dato, getMessage(intl, 'valideringsfeil.termindato.ugyldigDatoFormat')),
        {
            test: () => {
                const wrappedTermindato = moment(dato);
                return moment.max(wrappedTermindato, date21DaysAgo).isSame(wrappedTermindato, 'day');
            },
            failText: getMessage(intl, `${intlKey}.forTidlig`),
        },
        {
            test: () => {
                const uke22 = moment(dato).subtract((attenUkerPluss3Number - 1) * 24, 'hours');
                return moment.max(today, uke22).isSame(today, 'day');
            },
            failText: getMessage(intl, `${intlKey}.duMåVæreIUke22`),
        },
    ];
};

export const getTermindatoReglerForFødsel = (termindato: string | undefined, intl: IntlShape): Validator[] => {
    const forLangtFremITidRegel: Validator = {
        test: () => {
            return moment().add(9, 'months').isSameOrAfter(moment(termindato), 'day');
        },
        failText: getMessage(intl, 'valideringsfeil.termindato.forLangtFremITid'),
    };

    const forLangtTilbakeITidRegel: Validator = {
        test: () => {
            return moment().subtract(9, 'months').isSameOrBefore(moment(termindato), 'day');
        },
        failText: getMessage(intl, 'valideringsfeil.termindato.forLangtTilbakeITidFødsel'),
    };

    return [
        hasValueRule(termindato, getMessage(intl, 'valideringsfeil.termindato.duMåOppgi')),
        erGyldigDato(termindato, getMessage(intl, 'valideringsfeil.termindato.ugyldigDatoFormat')),
        forLangtFremITidRegel,
        forLangtTilbakeITidRegel,
    ];
};
