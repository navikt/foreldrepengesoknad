import { Søknad } from 'app/context/types/Søknad';
import AnnenForelder, { AnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { Periode, UttaksperiodeBase, Periodetype } from 'uttaksplan/types/Periode';
import Barn from 'app/context/types/Barn';
import Søker from 'app/context/types/Søker';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { Situasjon } from 'app/types/Situasjon';
import { Søkerrolle } from 'app/types/Søkerrolle';
import { assertUnreachable } from 'app/utils/globalUtil';
import { mapAttachmentsToSøknadForInnsending } from 'app/utils/vedleggUtils';

export interface AnnenForelderOppgittForInnsending extends Omit<AnnenForelder, 'erUfør'> {
    harMorUføretrygd?: boolean;
}

type AnnenForelderForInnsending = AnnenForelderIkkeOppgitt | AnnenForelderOppgittForInnsending;

type BarnForInnsending = Omit<Barn, 'datoForAleneomsorg'>;

type UttaksPeriodeForInnsending = Omit<UttaksperiodeBase, 'erMorForSyk'>;

type PeriodeForInnsending = Exclude<Periode, 'Uttaksperiode'> | UttaksPeriodeForInnsending;

type LocaleForInnsending = 'NB' | 'NN';

type SøkerrolleInnsending = 'MOR' | 'FAR' | 'MEDMOR';

interface SøkerForInnsending extends Omit<Søker, 'språkkode'> {
    språkkode: LocaleForInnsending;
    rolle: SøkerrolleInnsending;
}

export interface SøknadForInnsending
    extends Omit<Søknad, 'barn' | 'annenForelder' | 'uttaksplan' | 'søker' | 'søkersituasjon'> {
    barn: BarnForInnsending;
    annenForelder: AnnenForelderForInnsending;
    uttaksplan: PeriodeForInnsending[];
    søker: SøkerForInnsending;
    situasjon: Situasjon;
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

const konverterRolle = (rolle: Søkerrolle): SøkerrolleInnsending => {
    switch (rolle) {
        case 'mor':
            return 'MOR';
        case 'far':
            return 'FAR';
        case 'medmor':
            return 'MEDMOR';
        default:
            return assertUnreachable(rolle, 'Søkerrolle er ikke satt');
    }
};

const cleanSøker = (søker: Søker, søkersituasjon: Søkersituasjon): SøkerForInnsending => {
    const cleanedSpråkkode = søker.språkkode === 'nb' ? 'NB' : 'NN';

    return { ...søker, rolle: konverterRolle(søkersituasjon.rolle), språkkode: cleanedSpråkkode };
};

export const cleanUpSøknadsdataForInnsending = (søknad: Søknad): SøknadForInnsending => {
    const { annenForelder, barn, uttaksplan, søker, søkersituasjon, ...rest } = søknad;
    const cleanedAnnenForelder = cleanAnnenForelder(annenForelder);
    const cleanedUttaksplan = cleanPerioder(uttaksplan);
    const cleanedBarn = cleanBarn(barn);
    const cleanedSøker = cleanSøker(søker, søkersituasjon);

    const cleanedSøknad: SøknadForInnsending = {
        ...rest,
        annenForelder: cleanedAnnenForelder,
        barn: cleanedBarn,
        uttaksplan: cleanedUttaksplan,
        søker: cleanedSøker,
        situasjon: søkersituasjon.situasjon,
    };

    const søknadForInnsending = mapAttachmentsToSøknadForInnsending(cleanedSøknad);

    return søknadForInnsending;
};
