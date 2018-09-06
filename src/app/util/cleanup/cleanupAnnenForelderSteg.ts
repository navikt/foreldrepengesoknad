import AnnenForelder from '../../types/søknad/AnnenForelder';
import { getAnnenForelderVisibility } from '../../connected-components/steg/annen-forelder/visibility/annenForelderVisibility';
import { Barn, ForeldreansvarBarn } from '../../types/søknad/Barn';
import { Søkerinfo } from '../../types/søkerinfo';
import Søknad from '../../types/søknad/Søknad';

interface CleanedAnnenForelderSteg {
    annenForelder: Partial<AnnenForelder>;
    barn: Partial<Barn>;
}

export const cleanupAnnenForelder = (søknad: Partial<Søknad>, søkerinfo: Søkerinfo): Partial<AnnenForelder> => {
    const { annenForelder } = søknad;
    if (!annenForelder) {
        return {};
    }

    const vis = getAnnenForelderVisibility(søknad, søkerinfo!);
    if (!vis) {
        return {};
    }
    const {
        navn,
        fnr,
        bostedsland,
        utenlandskFnr,
        harRettPåForeldrepenger,
        erInformertOmSøknaden,
        skalHaForeldrepenger,
        erUfør,
        kanIkkeOppgis,
        ...rest
    } = annenForelder;

    const kanOppgis = (visProp: boolean) => {
        if (kanIkkeOppgis) {
            return false;
        }
        return visProp;
    };

    return {
        ...rest,
        kanIkkeOppgis: vis.personalia.annenForelderKanIkkeOppgisValg ? kanIkkeOppgis : undefined,
        navn: kanOppgis(vis.personalia.fødselsnummerInput) ? navn : undefined,
        fnr: kanOppgis(vis.personalia.fødselsnummerInput) ? fnr : undefined,
        utenlandskFnr: kanOppgis(annenForelder.utenlandskFnr) ? utenlandskFnr : undefined,
        bostedsland: kanOppgis(annenForelder.utenlandskFnr) ? bostedsland : undefined,
        skalHaForeldrepenger: kanOppgis(vis.annenForelderOppfølging.skalFarEllerMedmorHaForeldrepengerSpørsmål)
            ? skalHaForeldrepenger
            : undefined,
        harRettPåForeldrepenger: kanOppgis(vis.annenForelderOppfølging.harRettPåForeldrepengerSpørsmål)
            ? harRettPåForeldrepenger
            : undefined,
        erInformertOmSøknaden: kanOppgis(vis.annenForelderOppfølging.erAnnenForelderInformertSpørsmål)
            ? erInformertOmSøknaden
            : undefined,
        erUfør: kanOppgis(vis.annenForelderOppfølging.erMorUførSpørsmål) ? erUfør : undefined
    };
};

export const cleanupAnnenForelderBarn = (søknad: Partial<Søknad>, søkerinfo: Søkerinfo): Partial<Barn> => {
    const vis = getAnnenForelderVisibility(søknad, søkerinfo!);
    if (!vis) {
        return søknad.barn!;
    }
    const { barn } = søknad;
    if (!vis.annenForelderOppfølging.omsorgsovertakelseDatoSpørsmål) {
        return {
            ...barn,
            foreldreansvarsdato: undefined
        };
    }
    return {
        ...barn,
        foreldreansvarsdato: (barn as ForeldreansvarBarn).foreldreansvarsdato
    };
};

const cleanupAnnenForelderSteg = (søknad: Partial<Søknad>, søkerinfo: Søkerinfo): CleanedAnnenForelderSteg => {
    return {
        annenForelder: cleanupAnnenForelder(søknad, søkerinfo!),
        barn: cleanupAnnenForelderBarn(søknad, søkerinfo!)
    };
};

export default cleanupAnnenForelderSteg;
