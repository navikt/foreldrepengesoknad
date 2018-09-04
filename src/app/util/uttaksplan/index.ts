import { Forelder } from 'common/types';
import { Periode, Periodetype, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { InjectedIntl } from 'react-intl';

export const getForelderNavn = (forelder: Forelder, navnForelder1: string, navnForelder2?: string): string => {
    if (navnForelder2) {
        return forelder === 'forelder1' ? navnForelder1 : navnForelder2;
    }
    return forelder === 'forelder1' ? navnForelder1 : forelder;
};

export const getPeriodeForelderNavn = (periode: Periode, navnForelder1: string, navnForelder2?: string): string => {
    if (periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Uttak) {
        return getForelderNavn(periode.forelder, navnForelder1, navnForelder2);
    }
    return 'Ingen forelder registrert';
};

export const getStønadskontoNavn = (konto: StønadskontoType, intl: InjectedIntl) =>
    intl.formatMessage({ id: `stønadskontotype.${konto}` });
