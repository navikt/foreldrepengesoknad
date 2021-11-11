import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { guid } from 'nav-frontend-js-utils';
import { Periode } from 'uttaksplan/types/Periode';
import { Uttaksstatus } from 'uttaksplan/utils/uttaksstatus';
import { UttaksplanBuilder } from './UttaksplanBuilder';

interface AddPeriodeResult {
    updatedPlan: Periode[];
    id: string;
}

const addPeriode = (
    getUttaksstatusFunc: (tilgjengStønadskontoer: TilgjengeligStønadskonto[], uttaksplan: Periode[]) => Uttaksstatus,
    uttaksplan: Periode[],
    nyPeriode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    familiehendelsesdato: Date,
    erFlerbarnssøknad: boolean,
    erEndringsøknadUtenEkisterendeSak: boolean,
    relevantStartDatoForUttak: Date | undefined,
    harMidlertidigOmsorg: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    opprinneligPlan?: Periode[]
): AddPeriodeResult => {
    const familiehendelsedato = familiehendelsesdato;
    const builder = UttaksplanBuilder(
        getUttaksstatusFunc,
        uttaksplan,
        familiehendelsedato,
        tilgjengeligeStønadskontoer,
        erFlerbarnssøknad,
        erEndringsøknadUtenEkisterendeSak,
        relevantStartDatoForUttak,
        harMidlertidigOmsorg,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        opprinneligPlan
    );
    const id = guid();

    return {
        updatedPlan: builder.leggTilPeriodeOgBuild({
            ...nyPeriode,
            id,
        }).perioder,
        id,
    };
};

export default addPeriode;
