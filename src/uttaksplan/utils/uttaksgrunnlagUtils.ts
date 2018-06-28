import {
    Uttaksgrunnlag,
    Uttaksdatoer,
    UttaksplanAppProps,
    Uttaksinfo
} from 'uttaksplan/types/uttaksgrunnlag';
import { Dekningsgrad } from 'common/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import {
    getTilgjengeligeStønadskontoer,
    getTilgjengeligUttakEnkel
} from 'uttaksplan/utils/stønadskontoUtils';
import {
    getAntallUkerTotalt,
    getSisteMuligePermisjonsdag,
    getFørsteMuligePermisjonsdag
} from 'uttaksplan/utils/permisjonUtils';
import {
    Uttaksdagen,
    Periodene,
    getTidsperiode
} from 'uttaksplan/utils/dataUtils';
import { Periode } from 'uttaksplan/types';
import { Tidsperiode } from 'nav-datovelger';

export function getUttaksgrunnlag(
    props: UttaksplanAppProps,
    dekningsgrad: Dekningsgrad
): Uttaksgrunnlag {
    const permisjonsregler = getPermisjonsregler(props.termindato);
    return {
        ...props,
        dekningsgrad,
        permisjonsregler,
        tilgjengeligeStønadskontoer: getTilgjengeligeStønadskontoer(
            props.søker
        ),
        tilgjengeligeUttak: getTilgjengeligUttakEnkel(
            permisjonsregler,
            dekningsgrad
        ),
        antallUttaksdagerTilgjengelig:
            getAntallUkerTotalt(permisjonsregler, dekningsgrad) * 5
    };
}

export function getUttaksdatoer(termindato: Date): Uttaksdatoer {
    const permisjonsregler = getPermisjonsregler(termindato);
    return {
        førsteMuligeUttaksdag: getFørsteMuligePermisjonsdag(
            termindato,
            permisjonsregler
        ),
        sisteMuligeUttaksdag: getSisteMuligePermisjonsdag(
            termindato,
            permisjonsregler
        ),
        sisteUttaksdagFørFødsel: Uttaksdagen(termindato).forrige(),
        førsteUttaksdagEtterFødsel: Uttaksdagen(termindato).denneEllerNeste()
    };
}

export const getUttaksinfo = (perioder: Periode[]): Uttaksinfo | undefined => {
    if (perioder.length === 0) {
        return undefined;
    }
    const periodene = Periodene(perioder);
    const antallDagerOpphold = periodene.getAntallDagerOpphold();
    const antallDagerUtsettelser = periodene.getAntallDagerUtsatt();
    const antallDagerUttak = periodene.getAntallDagerUttak();
    const antallDagerTotalt =
        antallDagerOpphold + antallDagerUtsettelser + antallDagerUttak;
    const registrertTidsperiode = periodene.getFørsteOgSisteRegistrerteUttaksdager() as Tidsperiode;
    const registrertTidsperiodeInkludertOpphold = periodene.getFørsteOgSisteRegistrerteUttaksdager(
        true
    ) as Tidsperiode;
    const beregnetSistePermisjonsdag = getTidsperiode(
        registrertTidsperiode.startdato,
        antallDagerTotalt
    ).sluttdato;
    return {
        antallDagerTotalt,
        antallDagerOpphold,
        antallDagerUtsettelser,
        antallDagerUttak,
        registrertTidsperiode,
        registrertTidsperiodeInkludertOpphold,
        beregnetSistePermisjonsdag
    };
};
