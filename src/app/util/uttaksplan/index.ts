import { Forelder, NavnPåForeldre } from 'common/types';
import { Periode, Periodetype, StønadskontoType, OppholdÅrsakType } from '../../types/uttaksplan/periodetyper';
import { InjectedIntl } from 'react-intl';
import Søknad, { Søkersituasjon } from '../../types/søknad/Søknad';
import { findOldestDate } from '../dates/dates';
import { UfødtBarn, FødtBarn, Adopsjonsbarn, ForeldreansvarBarn, Barn } from '../../types/søknad/Barn';
import { erFarEllerMedmor } from '../domain/personUtil';
import Person from '../../types/Person';
import getMessage from 'common/util/i18nUtils';

export const getForelderNavn = (forelder: Forelder, navnPåForeldre: NavnPåForeldre): string => {
    if (navnPåForeldre.farMedmor) {
        return forelder === Forelder.MOR ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    }
    return forelder === Forelder.MOR ? navnPåForeldre.mor : forelder;
};

export const getPeriodeForelderNavn = (periode: Periode, navnPåForeldre: NavnPåForeldre): string => {
    if (
        periode.type === Periodetype.Utsettelse ||
        periode.type === Periodetype.Uttak ||
        periode.type === Periodetype.Overføring ||
        periode.type === Periodetype.Opphold
    ) {
        return getForelderNavn(periode.forelder, navnPåForeldre);
    }
    return 'Ingen forelder registrert';
};

export const getStønadskontoNavn = (intl: InjectedIntl, konto: StønadskontoType, navnPåForeldre: NavnPåForeldre) => {
    let navn;
    switch (konto) {
        case StønadskontoType.Mødrekvote:
            navn = navnPåForeldre.mor;
            break;
        case StønadskontoType.Fedrekvote:
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }
    if (navn) {
        return intl.formatMessage({ id: `stønadskontotype.foreldernavn.kvote` }, { navn });
    }
    return intl.formatMessage({ id: `stønadskontotype.${konto}` });
};

export const getOppholdskontoNavn = (intl: InjectedIntl, årsak: OppholdÅrsakType, foreldernavn: string) => {
    return getMessage(intl, `oppholdsårsaktype.foreldernavn.${årsak}`, { foreldernavn });
};

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

export const getNavnPåForeldre = (søknad: Søknad, søker: Person): NavnPåForeldre => {
    const erFarMedmor = erFarEllerMedmor(søker.kjønn, søknad.søker.rolle);
    return {
        mor: erFarMedmor ? søknad.annenForelder.fornavn : søker.fornavn,
        farMedmor: erFarMedmor ? søker.fornavn : søknad.annenForelder.fornavn
    };
};
