import { AnnenForelderVisibilityFunctions as f } from './visibilityFunctions';
import { AppState } from '../../../../redux/reducers';
import { AnnenForelderDataFunctions as df } from './dataFunctions';

export interface AnnenForelderStegPersonaliaVisibility {
    annenForelderKanIkkeOppgisValg: boolean;
    fødselsnummerInput: boolean;
}

export interface AnnenForelderOppfølgingVisibility {
    skalFarEllerMedmorHaForeldrepengerSpørsmål: boolean;
    harRettPåForeldrepengerSpørsmål: boolean;
    skalAnnenForelderHaForeldrepengerSpørsmål: boolean;
    erMorUførSpørsmål: boolean;
    erDenAndreForelderenInformertSpørsmål: boolean;
    omsorgsovertakelseDatoSpørsmål: boolean;
    farEllerMedmorBolk: boolean;
    omsorgsovertakelseVedleggSpørsmål: boolean;
    infoOmOmsorgsovertakelse: boolean;
}

export interface AnnenForelderStegVisibility {
    registrertAnnenForelderBolk: boolean;
    annenForelderPersonaliaSkjema: boolean;
    annenForelderOppfølgingPartial: boolean;
    personalia: AnnenForelderStegPersonaliaVisibility;
    annenForelderOppfølging: AnnenForelderOppfølgingVisibility;
}

export const getAnnenForelderVisibility = (state: AppState): AnnenForelderStegVisibility => {
    const { søknad } = state;
    const { søkerinfo } = state.api;
    const { annenForelder, søker, barn } = søknad;
    const { registrertAnnenForelder } = søknad.temp;

    const { person } = søkerinfo!;
    const erFarEllerMedmor = df.getErFarEllerMedmor(søker, person);
    const andreForelderHarOpplystOmPågåendeSag = df.getHarDenAndreForelderenOpplystOmSinPågåendeSak(
        registrertAnnenForelder!
    );
    const gjelderAdopsjonAvEktefellesBarn = df.getGjelderAdopsjonAvEktefellesBarn(barn);

    const farEllerMedmorBolk = f.visFarEllerMedmorBolk(erFarEllerMedmor);
    return {
        registrertAnnenForelderBolk: f.visRegistrertAnnenForelderBolk(registrertAnnenForelder),
        annenForelderPersonaliaSkjema: f.visAnnenForelderPersonaliaPart(registrertAnnenForelder),
        annenForelderOppfølgingPartial: f.visAnnenForelderOppfølgingPart(annenForelder, registrertAnnenForelder),

        personalia: {
            annenForelderKanIkkeOppgisValg: f.visAnnenForelderKanIkkeOppgisValg(gjelderAdopsjonAvEktefellesBarn),
            fødselsnummerInput: f.visFødselsnummerInput(annenForelder)
        },
        annenForelderOppfølging: {
            skalFarEllerMedmorHaForeldrepengerSpørsmål: f.visSkalFarEllerMedmorHaForeldrepengerSpørsmål(
                søker,
                erFarEllerMedmor
            ),
            harRettPåForeldrepengerSpørsmål: f.visHarRettPåForeldrepengerSpørsmål(
                annenForelder,
                søker,
                andreForelderHarOpplystOmPågåendeSag
            ),
            skalAnnenForelderHaForeldrepengerSpørsmål: f.visSkalAnnenForelderHaForeldrepengerSpørsmål(
                annenForelder,
                søker,
                andreForelderHarOpplystOmPågåendeSag
            ),
            erMorUførSpørsmål: f.visErMorUførSpørsmål(annenForelder, erFarEllerMedmor),
            erDenAndreForelderenInformertSpørsmål: f.visErDenAndreForelderenInformertSpørsmål(
                søker,
                annenForelder,
                andreForelderHarOpplystOmPågåendeSag,
                erFarEllerMedmor
            ),
            farEllerMedmorBolk,
            omsorgsovertakelseDatoSpørsmål: f.visOmsorgsovertakelseDatoSpørsmål(farEllerMedmorBolk, søker),
            omsorgsovertakelseVedleggSpørsmål: f.visOmsorgsovertakelseVedleggSpørsmål(farEllerMedmorBolk, søker, barn),
            infoOmOmsorgsovertakelse: f.visInfoOmOmsorgsovertakelse(barn)
        }
    };
};
