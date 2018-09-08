import { Forelder } from 'common/types';
import { Periode, Periodetype, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { InjectedIntl } from 'react-intl';
import { Søkersituasjon } from '../../types/s\u00F8knad/S\u00F8knad';
import { findOldestDate } from '../dates/dates';
import { UfødtBarn, FødtBarn, Adopsjonsbarn, ForeldreansvarBarn, Barn } from '../../types/s\u00F8knad/Barn';

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

export const getFamiliehendelsedato = (barn: Barn, situasjon: Søkersituasjon): Date => {
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
            if (barn.erBarnetFødt) {
                const datoer: Date[] = (barn as FødtBarn).fødselsdatoer.filter((d) => d !== undefined);
                return findOldestDate(datoer)!;
            }
            return (barn as UfødtBarn).termindato;
        case Søkersituasjon.ADOPSJON:
            return (barn as Adopsjonsbarn).adopsjonsdato;
        case Søkersituasjon.FORELDREANSVAR:
            return (barn as ForeldreansvarBarn).foreldreansvarsdato;
    }
};
