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
    if (!søknad.annenForelder) {
        return {};
    }
    const vis = getAnnenForelderVisibility(søknad, søkerinfo!);
    if (!vis) {
        return {};
    }

    const {
        bostedsland,
        harRettPåForeldrepenger,
        erInformertOmSøknaden,
        skalHaForeldrepenger,
        erUfør,
        kanIkkeOppgis,
        utenlandskFnr,
        ...rest
    } = søknad.annenForelder;

    const annenForelder: Partial<AnnenForelder> = { ...rest };

    if (vis.annenForelderPersonaliaPart && utenlandskFnr) {
        annenForelder.utenlandskFnr = utenlandskFnr;
        annenForelder.bostedsland = bostedsland;
    }

    if (vis.annenForelderOppfølging.harRettPåForeldrepengerSpørsmål) {
        annenForelder.harRettPåForeldrepenger = harRettPåForeldrepenger;
    }

    if (vis.personalia.annenForelderKanIkkeOppgisValg && kanIkkeOppgis) {
        annenForelder.kanIkkeOppgis = kanIkkeOppgis;
    }
    if (vis.annenForelderOppfølging.skalFarEllerMedmorHaForeldrepengerSpørsmål) {
        annenForelder.skalHaForeldrepenger = skalHaForeldrepenger;
    }
    if (vis.annenForelderOppfølging.harRettPåForeldrepengerSpørsmål) {
        annenForelder.harRettPåForeldrepenger = harRettPåForeldrepenger;
    }
    if (vis.annenForelderOppfølging.erAnnenForelderInformertSpørsmål) {
        annenForelder.erInformertOmSøknaden = erInformertOmSøknaden;
    }
    if (vis.annenForelderOppfølging.erMorUførSpørsmål) {
        annenForelder.erUfør = erUfør;
    }

    return annenForelder;
};

export const cleanupAnnenForelderBarn = (søknad: Partial<Søknad>, søkerinfo: Søkerinfo): Partial<Barn> => {
    const vis = getAnnenForelderVisibility(søknad, søkerinfo!);
    if (!vis) {
        return {};
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
