import { DatoValidatorer } from '../../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Tidsperiode } from 'common/types';
import { InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';

const erUtfyltTest = (dato: Date | undefined, intl: InjectedIntl) => ({
    test: () => dato !== undefined,
    failText: getMessage(intl, 'påkrevd')
});

const erUttaksdagTest = (dato: Date | undefined, intl: InjectedIntl) => ({
    test: () => dato !== undefined && Uttaksdagen(dato).erUttaksdag(),
    failText: getMessage(intl, 'uttaksplan.validering.måVæreUttaksdag')
});

export const getUttakTidsperiodeValidatorer = (
    skalIkkeHaUttak: boolean,
    tidsperiode: Partial<Tidsperiode>,
    intl: InjectedIntl
): DatoValidatorer | undefined => {
    if (skalIkkeHaUttak) {
        return undefined;
    }
    return {
        fra: [erUtfyltTest(tidsperiode.fom, intl), erUttaksdagTest(tidsperiode.fom, intl)],
        til: [erUtfyltTest(tidsperiode.tom, intl), erUttaksdagTest(tidsperiode.tom, intl)]
    };
};
