import { Søknad } from 'app/context/types/Søknad';
import AnnenForelder, { AnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { Periode, UttaksperiodeBase, Periodetype } from 'uttaksplan/types/Periode';
import Barn from 'app/context/types/Barn';
import Søker from 'app/context/types/Søker';

export interface AnnenForelderOppgittForInnsending extends Omit<AnnenForelder, 'erUfør'> {
    harMorUføretrygd?: boolean;
}

type AnnenForelderForInnsending = AnnenForelderIkkeOppgitt | AnnenForelderOppgittForInnsending;

type BarnForInnsending = Omit<Barn, 'datoForAleneomsorg'>;

type UttaksPeriodeForInnsending = Omit<UttaksperiodeBase, 'erMorForSyk'>;

type PeriodeForInnsending = Exclude<Periode, 'Uttaksperiode'> | UttaksPeriodeForInnsending;

type LocaleForInnsending = 'NB' | 'NN';

interface SøkerForInnsending extends Omit<Søker, 'språkkode'> {
    språkkode: LocaleForInnsending;
}

export interface SøknadForInnsending extends Omit<Søknad, 'barn' | 'annenForelder' | 'uttaksplan' | 'søker'> {
    barn: BarnForInnsending;
    annenForelder: AnnenForelderForInnsending;
    uttaksplan: PeriodeForInnsending[];
    søker: SøkerForInnsending;
}

const cleanUttaksperiode = (uttaksPeriode: UttaksperiodeBase): UttaksPeriodeForInnsending => {
    const { erMorForSyk, ...periodeRest } = uttaksPeriode;
    return periodeRest;
};

const cleanPerioder = (uttaksplan: Periode[]): PeriodeForInnsending[] => {
    return uttaksplan.map((periode) => {
        if (periode.type === Periodetype.Uttak) {
            return cleanUttaksperiode(periode);
        }
        return periode;
    });
};

const cleanAnnenForelder = (annenForelder: AnnenForelder): AnnenForelderForInnsending => {
    if (isAnnenForelderOppgitt(annenForelder)) {
        const { erUfør, erForSyk, ...annenForelderRest } = annenForelder;
        return { harMorUføretrygd: erUfør, ...annenForelderRest };
    }
    return annenForelder;
};

const cleanBarn = (barn: Barn): BarnForInnsending => {
    const { datoForAleneomsorg, ...barnRest } = barn;
    return barnRest;
};

const cleanSøker = (søker: Søker): SøkerForInnsending => {
    const cleanedSpråkkode = søker.språkkode === 'nb' ? 'NB' : 'NN';

    return { ...søker, språkkode: cleanedSpråkkode };
};

export const cleanUpSøknadsdataForInnsending = (søknad: Søknad): SøknadForInnsending => {
    const { annenForelder, barn, uttaksplan, søker } = søknad;
    const cleanedAnnenForelder = cleanAnnenForelder(annenForelder);
    const cleanedUttaksplan = cleanPerioder(uttaksplan);
    const cleanedBarn = cleanBarn(barn);
    const cleanedSøker = cleanSøker(søker);

    return {
        ...søknad,
        annenForelder: cleanedAnnenForelder,
        barn: cleanedBarn,
        uttaksplan: cleanedUttaksplan,
        søker: cleanedSøker,
    };
};
