import {
    erMindreEnn3UkerSiden,
    etterDagensDato,
    hasValue,
    sisteDatoBarnetKanVæreFødt,
    sisteMuligeTermindato,
    utstedtDatoErIUke22,
    sisteMuligeDatoForOvertaOmsorg,
    intlUtils,
} from '@navikt/fp-common';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { IntlShape } from 'react-intl';

export const validateEktefellensBarnAdopsjonDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.adopsjonDato.ektefellensBarn.duMåOppgi');
    }

    if (!datepickerUtils.isValidFormattedDateString(dato)) {
        return intlUtils(intl, 'invalidFormatErrorKey.adopsjonsdato');
    }

    if (sisteMuligeDatoForOvertaOmsorg(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.adopsjonDato.forLangtFremITid');
    }

    return undefined;
};

export const validateOvertaOmsorgAdopsjonDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.adopsjonDato.overtaOmsorg.duMåOppgi');
    }
    if (sisteMuligeDatoForOvertaOmsorg(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.adopsjonDato.forLangtFremITid');
    }
    return undefined;
};

export const validateNårKommerBarnetDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.nårKommerBarnetDato.duMåOppgi');
    }
    return undefined;
};

export const validateFødselDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fodselsdato.duMåOppgi');
    }
    if (etterDagensDato(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fodselsdato.måVæreIdagEllerTidligere');
    }
    if (sisteDatoBarnetKanVæreFødt(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fodselsdato.ikkeMerEnn6MånederTilbake');
    }
    return undefined;
};

export const validateAdopsjonFødselDate = (
    dato: string | undefined,
    adopsjonsdato: string | undefined,
    intl: IntlShape
) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fodselsdato.duMåOppgi');
    }

    if (!datepickerUtils.isValidFormattedDateString(dato)) {
        return intlUtils(intl, 'invalidFormatErrorKey.fødselsdato');
    }

    if (!dato || !adopsjonsdato) {
        return undefined;
    }
    if (etterDagensDato(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fodselsdato.måVæreIdagEllerTidligere');
    }
    // if (!barnetErMerEnn15årPåSøknadsDato(dato, adopsjonsdato)) {
    //     if (sisteDatoAdoptertBarnKanVæreFødt(dato, adopsjonsdato)) {
    //         return intlUtils(intl, 'valideringsfeil.omBarnet.fodselsdato.ikkeMerEnn15ÅrTilbake');
    //     }
    //     if (barnetErIkkeFødtFørAdopsjonsDato(dato, adopsjonsdato)) {
    //         return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.barnetErIkkeFødtFørAdopsjonsDato');
    //     }
    //     return undefined;
    // }
    return undefined;
};

export const validateTerminDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.duMåOppgi');
    }
    if (!datepickerUtils.isValidFormattedDateString(dato)) {
        return intlUtils(intl, 'invalidFormatErrorKey.termindato');
    }
    if (!erMindreEnn3UkerSiden(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.termindatoKanIkkeVære3UkerFraIdag');
    }
    if (sisteMuligeTermindato(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.duMåVæreIUke22');
    }
    return undefined;
};

export const valideringAvTerminbekreftelsesdato = (
    dato: string | undefined,
    termindato: string | undefined,
    intl: IntlShape
) => {
    if (!hasValue(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi');
    }
    if (!dato || !termindato) {
        return undefined;
    }

    if (!datepickerUtils.isValidFormattedDateString(dato)) {
        return intlUtils(intl, 'invalidFormatErrorKey.terminBekreftelsedato');
    }

    if (etterDagensDato(dato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.terminbekreftelseDato.måVæreIdagEllerTidligere');
    }
    if (!utstedtDatoErIUke22(dato, termindato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.terminbekreftelseDato.duMåVæreIUke22');
    }
    return undefined;
};
