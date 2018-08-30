import Søknad from '../../../types/søknad/Søknad';
import { createSelector } from 'reselect';
import { AppState } from '../../../redux/reducers';
import AnnenForelder from '../../../types/søknad/AnnenForelder';
import Person, { RegistrertAnnenForelder } from '../../../types/Person';
import { Barn, ForeldreansvarBarn, Adopsjonsbarn } from '../../../types/søknad/Barn';
import { Søker } from '../../../types/søknad/Søker';
import { Søkerinfo } from '../../../types/søkerinfo';
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

const getAnnenForelder = createSelector(søknadSelector, (søknad: Søknad): Partial<AnnenForelder> => {
    return søknad.annenForelder;
});
const getBarn = createSelector(søknadSelector, (søknad: Søknad): Partial<Barn> => {
    return søknad.barn;
});
const getSøker = createSelector(søknadSelector, (søknad: Søknad): Partial<Søker> => {
    return søknad.søker;
});
const getPerson = createSelector(søkerinfoSelector, (søkerinfo: Søkerinfo): Person => {
    return søkerinfo.person;
});
const getRegistrertAnnenForelder = createSelector(søknadSelector, (søknad: Søknad):
    | RegistrertAnnenForelder
    | undefined => {
    return søknad.temp.registrertAnnenForelder;
});
const getHarDenAndreForelderenOpplystOmSinPågåendeSak = createSelector(
    getRegistrertAnnenForelder,
    (registrertAnnenForelder: RegistrertAnnenForelder) => {
        return registrertAnnenForelder !== undefined && registrertAnnenForelder.harOpplystOmSinPågåendeSak;
    }
);
const getGjelderAdopsjonAvEktefellesBarn = createSelector(getBarn, (barn: Barn) => {
    return (barn as Adopsjonsbarn).adopsjonAvEktefellesBarn === true;
});

const getErFarEllerMedmor = createSelector(getSøker, getPerson, (søker: Søker, person: Person) => {
    return erFarEllerMedmor(person.kjønn, søker.rolle);
});

/** Visibility selectors */
export const AnnenForelderVisibilityFuncs = {
    visRegistrertAnnenForelderBolk: createSelector(
        getRegistrertAnnenForelder,
        (registrertAnnenForelder: RegistrertAnnenForelder): boolean => registrertAnnenForelder !== undefined
    ),

    visAnnenForelderPersonaliaSkjema: createSelector(
        getRegistrertAnnenForelder,
        (registrertAnnenForelder: RegistrertAnnenForelder): boolean => registrertAnnenForelder === undefined
    ),

    visAnnenForelderErKjentPartial: createSelector(
        getAnnenForelder,
        getRegistrertAnnenForelder,
        (annenForelder: AnnenForelder, registrertAnnenForelder) =>
            ((annenForelder.navn && annenForelder.fnr) || registrertAnnenForelder) !== undefined
    ),

    visOmsorgsovertakelse: createSelector(getBarn, (barn: Barn) => {
        const omsorgsovertakelse = (barn as ForeldreansvarBarn).omsorgsovertakelse;
        return omsorgsovertakelse !== undefined && omsorgsovertakelse.length > 0;
    }),

    visAnnenForelderKanIkkeOppgisValg: createSelector(
        getGjelderAdopsjonAvEktefellesBarn,
        (adopsjonAvEktefellesBarn: boolean) => {
            return !adopsjonAvEktefellesBarn;
        }
    ),

    visFødselsnummerInput: createSelector(getAnnenForelder, (annenForelder: AnnenForelder) => {
        return annenForelder.navn !== undefined && annenForelder.navn !== '';
    }),

    visSkalFarEllerMedmorHaForeldrepengerSpørsmål: createSelector(
        getSøker,
        getErFarEllerMedmor,
        (søker: Søker, farEllerMedmor) => {
            return !farEllerMedmor && søker.erAleneOmOmsorg === true;
        }
    ),

    visHarRettPåForeldrepengerSpørsmål: createSelector(
        getAnnenForelder,
        getSøker,
        getHarDenAndreForelderenOpplystOmSinPågåendeSak,
        (annenForelder, søker, harDenAndreForelderenOpplystOmSinPågåendeSak) => {
            return (
                annenForelder.skalHaForeldrepenger === true ||
                (søker.erAleneOmOmsorg === false && !harDenAndreForelderenOpplystOmSinPågåendeSak)
            );
        }
    )
};

export const getAnnenForelderVisibility = createSelector(
    AnnenForelderVisibilityFuncs.visRegistrertAnnenForelderBolk,
    AnnenForelderVisibilityFuncs.visAnnenForelderPersonaliaSkjema,
    AnnenForelderVisibilityFuncs.visAnnenForelderErKjentPartial,
    AnnenForelderVisibilityFuncs.visOmsorgsovertakelse,
    AnnenForelderVisibilityFuncs.visAnnenForelderKanIkkeOppgisValg,
    AnnenForelderVisibilityFuncs.visFødselsnummerInput,
    AnnenForelderVisibilityFuncs.visSkalFarEllerMedmorHaForeldrepengerSpørsmål,
    AnnenForelderVisibilityFuncs.visHarRettPåForeldrepengerSpørsmål,
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
