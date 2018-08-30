import Søknad from '../../../types/s\u00F8knad/S\u00F8knad';
import { createSelector } from 'reselect';
import { AppState } from '../../../redux/reducers';
import AnnenForelder from '../../../types/s\u00F8knad/AnnenForelder';
import Person, { RegistrertAnnenForelder } from '../../../types/Person';
import { Barn, ForeldreansvarBarn, Adopsjonsbarn } from '../../../types/s\u00F8knad/Barn';
import { Søker } from '../../../types/s\u00F8knad/S\u00F8ker';
import { Søkerinfo } from '../../../types/s\u00F8kerinfo';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';

export interface AnnenForelderStegPersonaliaVisibility {
    annenForelderKanIkkeOppgisValg: boolean;
    fødselsnummerInput: boolean;
}

export interface AnnenForelderErKjentVisibility {
    skalFarEllerMedmorHaForeldrepengerSpørsmål: boolean;
    harRettPåForeldrepengerSpørsmål: boolean;
}

export interface AnnenForelderStegVisibility {
    registrertAnnenForelderBolk: boolean;
    annenForelderPersonaliaSkjema: boolean;
    annenForelderErKjentPartial: boolean;
    informasjonOmOmsorgsovertakelse: boolean;
    personalia: AnnenForelderStegPersonaliaVisibility;
    annenForelderErKjent: AnnenForelderErKjentVisibility;
}

/** Data selectors */
const søknadSelector = (state: AppState) => state.søknad;
const søkerinfoSelector = (state: AppState) => state.api.søkerinfo;

export const getAnnenForelder = createSelector(søknadSelector, (søknad: Søknad): Partial<AnnenForelder> => {
    return søknad.annenForelder;
});

export const getBarn = createSelector(søknadSelector, (søknad: Søknad): Partial<Barn> => {
    return søknad.barn;
});

export const getSøker = createSelector(søknadSelector, (søknad: Søknad): Partial<Søker> => {
    return søknad.søker;
});

export const getPerson = createSelector(søkerinfoSelector, (søkerinfo: Søkerinfo): Person => {
    return søkerinfo.person;
});

export const getRegistrertAnnenForelder = createSelector(søknadSelector, (søknad: Søknad):
    | RegistrertAnnenForelder
    | undefined => {
    return søknad.temp.registrertAnnenForelder;
});

export const getHarDenAndreForelderenOpplystOmSinPågåendeSak = createSelector(
    getRegistrertAnnenForelder,
    (registrertAnnenForelder: RegistrertAnnenForelder) => {
        return registrertAnnenForelder !== undefined && registrertAnnenForelder.harOpplystOmSinPågåendeSak;
    }
);

export const getErFarEllerMedmor = createSelector(getSøker, getPerson, (søker: Søker, person: Person) => {
    return erFarEllerMedmor(person.kjønn, søker.rolle);
});

/** Visibility selectors */

export const visRegistrertAnnenForelderBolk = createSelector(
    getRegistrertAnnenForelder,
    (registrertAnnenForelder: RegistrertAnnenForelder): boolean => registrertAnnenForelder !== undefined
);

export const visAnnenForelderPersonaliaSkjema = createSelector(
    getRegistrertAnnenForelder,
    (registrertAnnenForelder: RegistrertAnnenForelder): boolean => registrertAnnenForelder === undefined
);

export const visAnnenForelderErKjentPartial = createSelector(
    getAnnenForelder,
    getRegistrertAnnenForelder,
    (annenForelder: AnnenForelder, registrertAnnenForelder) =>
        ((annenForelder.navn && annenForelder.fnr) || registrertAnnenForelder) !== undefined
);

export const visOmsorgsovertakelse = createSelector(getBarn, (barn: Barn) => {
    const omsorgsovertakelse = (barn as ForeldreansvarBarn).omsorgsovertakelse;
    return omsorgsovertakelse !== undefined && omsorgsovertakelse.length > 0;
});

export const gjelderAdopsjonAvEktefellesBarn = createSelector(getBarn, (barn: Barn) => {
    return (barn as Adopsjonsbarn).adopsjonAvEktefellesBarn === true;
});

export const visAnnenForelderKanIkkeOppgisValg = createSelector(
    gjelderAdopsjonAvEktefellesBarn,
    (adopsjonAvEktefellesBarn: boolean) => {
        return !adopsjonAvEktefellesBarn;
    }
);

export const visFødselsnummerInput = createSelector(getAnnenForelder, (annenForelder: AnnenForelder) => {
    return annenForelder.navn !== undefined && annenForelder.navn !== '';
});

export const visSkalFarEllerMedmorHaForeldrepengerSpørsmål = createSelector(
    getSøker,
    getErFarEllerMedmor,
    (søker: Søker, farEllerMedmor) => {
        return !farEllerMedmor && søker.erAleneOmOmsorg === true;
    }
);

export const visHarRettPåForeldrepengerSpørsmål = createSelector(
    getAnnenForelder,
    getSøker,
    getHarDenAndreForelderenOpplystOmSinPågåendeSak,
    (annenForelder, søker, harDenAndreForelderenOpplystOmSinPågåendeSak) => {
        return (
            annenForelder.skalHaForeldrepenger === true ||
            (søker.erAleneOmOmsorg === false && !harDenAndreForelderenOpplystOmSinPågåendeSak)
        );
    }
);

export const getAnnenForelderVisibility = createSelector(
    visRegistrertAnnenForelderBolk,
    visAnnenForelderPersonaliaSkjema,
    visAnnenForelderErKjentPartial,
    visOmsorgsovertakelse,
    visAnnenForelderKanIkkeOppgisValg,
    visFødselsnummerInput,
    visSkalFarEllerMedmorHaForeldrepengerSpørsmål,
    visHarRettPåForeldrepengerSpørsmål,
    (
        registrertAnnenForelderBolk,
        annenForelderPersonaliaSkjema,
        annenForelderErKjentPartial,
        informasjonOmOmsorgsovertakelse,
        annenForelderKanIkkeOppgisValg,
        fødselsnummerInput,
        skalFarEllerMedmorHaForeldrepengerSpørsmål,
        harRettPåForeldrepengerSpørsmål
    ): AnnenForelderStegVisibility => ({
        registrertAnnenForelderBolk,
        annenForelderPersonaliaSkjema,
        annenForelderErKjentPartial,
        informasjonOmOmsorgsovertakelse,
        personalia: {
            annenForelderKanIkkeOppgisValg,
            fødselsnummerInput
        },
        annenForelderErKjent: {
            skalFarEllerMedmorHaForeldrepengerSpørsmål,
            harRettPåForeldrepengerSpørsmål
        }
    })
);

export default AnnenForelderStegVisibility;
