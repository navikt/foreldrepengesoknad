import { AnnenForelderVisibilityFunctions as f } from './visibilityFunctions';
import { AnnenForelderDataFunctions as df } from './dataFunctions';
import Søknad from '../../../../types/søknad/Søknad';
import { Søkerinfo } from '../../../../types/søkerinfo';

export interface AnnenForelderStegPersonaliaVisibility {
    annenForelderKanIkkeOppgisValg: boolean;
    fødselsnummerInput: boolean;
}

export interface AnnenForelderOppfølgingVisibility {
    skalFarEllerMedmorHaForeldrepengerSpørsmål: boolean;
    harRettPåForeldrepengerSpørsmål: boolean;
    erMorUførSpørsmål: boolean;
    erAnnenForelderInformertSpørsmål: boolean;
    omsorgsovertakelseDatoSpørsmål: boolean;
    farEllerMedmorBolk: boolean;
    omsorgsovertakelseVedleggSpørsmål: boolean;
    infoOmOmsorgsovertakelse: boolean;
}

export interface AnnenForelderStegVisibility {
    registrertAnnenForelderBolk: boolean;
    annenForelderPersonaliaPart: boolean;
    annenForelderOppfølgingPart: boolean;
    personalia: AnnenForelderStegPersonaliaVisibility;
    annenForelderOppfølging: AnnenForelderOppfølgingVisibility;
}

export const getAnnenForelderVisibility = (
    søknad: Partial<Søknad>,
    søkerinfo: Søkerinfo
): AnnenForelderStegVisibility | undefined => {
    const { annenForelder, søker, barn } = søknad;
    const registrertAnnenForelder = søknad.temp ? søknad.temp.registrertAnnenForelder : undefined;
    const { person } = søkerinfo;

    if (!søker || !barn || !annenForelder) {
        return;
    }

    /* Data */
    const erFarEllerMedmor = df.getErFarEllerMedmor(søker, person);
    const annenForelderHarOpplystOmPågåendeSak = df.getHarAnnenForelderOpplystOmSinPågåendeSak(
        registrertAnnenForelder!
    );
    const gjelderAdopsjonAvEktefellesBarn = df.getGjelderAdopsjonAvEktefellesBarn(barn);

    /* Visibility */
    const farEllerMedmorBolk = f.visFarEllerMedmorBolk(erFarEllerMedmor);

    const registrertAnnenForelderBolk = f.visRegistrertAnnenForelderBolk(registrertAnnenForelder);

    const annenForelderPersonaliaPart = f.visAnnenForelderPersonaliaPart(registrertAnnenForelder);

    const annenForelderKanIkkeOppgisValg = f.visAnnenForelderKanIkkeOppgisValg(
        annenForelderPersonaliaPart,
        gjelderAdopsjonAvEktefellesBarn
    );

    const annenForelderOppfølgingPart = f.visAnnenForelderOppfølgingPart(annenForelder, registrertAnnenForelder);
    const fødselsnummerInput = f.visFødselsnummerInput(annenForelderPersonaliaPart, annenForelder);
    const skalFarEllerMedmorHaForeldrepengerSpørsmål = f.visSkalFarEllerMedmorHaForeldrepengerSpørsmål(
        søker,
        erFarEllerMedmor
    );
    const harRettPåForeldrepengerSpørsmål = f.visHarRettPåForeldrepengerSpørsmål(
        annenForelder,
        søker,
        annenForelderHarOpplystOmPågåendeSak
    );
    const erMorUførSpørsmål = f.visErMorUførSpørsmål(annenForelder, erFarEllerMedmor);
    const erAnnenForelderInformertSpørsmål = f.visErAnnenForelderInformertSpørsmål(
        søker,
        annenForelder,
        annenForelderHarOpplystOmPågåendeSak,
        erFarEllerMedmor
    );
    const omsorgsovertakelseDatoSpørsmål = f.visOmsorgsovertakelseDatoSpørsmål(farEllerMedmorBolk, søker);
    const omsorgsovertakelseVedleggSpørsmål = f.visOmsorgsovertakelseVedleggSpørsmål(farEllerMedmorBolk, søker, barn);
    const infoOmOmsorgsovertakelse = f.visInfoOmOmsorgsovertakelse(barn);

    return {
        registrertAnnenForelderBolk,
        annenForelderPersonaliaPart,
        annenForelderOppfølgingPart,
        personalia: {
            annenForelderKanIkkeOppgisValg,
            fødselsnummerInput
        },
        annenForelderOppfølging: {
            skalFarEllerMedmorHaForeldrepengerSpørsmål,
            harRettPåForeldrepengerSpørsmål,
            erMorUførSpørsmål,
            farEllerMedmorBolk,
            erAnnenForelderInformertSpørsmål,
            omsorgsovertakelseDatoSpørsmål,
            omsorgsovertakelseVedleggSpørsmål,
            infoOmOmsorgsovertakelse
        }
    };
};
